# DDD 充血模型规范补充

## 一、充血模型核心理念

### 1.1 基本原则
- **数据+行为一体**：实体不仅是数据容器，更是业务行为的载体
- **封装业务规则**：业务规则内聚在实体内部，而不是散落在服务中
- **保护不变式**：实体始终保证自身状态的有效性
- **最小化贫血**：避免只有getter/setter的"哑巴对象"

## 二、充血模型实现规范

### 2.1 实体设计规范

```java
// ✅ 正确的充血实体示例
public class Order extends BaseAggregateRoot<OrderId> {
    private OrderStatus status;
    private Money totalAmount;
    private Address shippingAddress;
    private List<OrderItem> items = new ArrayList<>();
    private PaymentInfo paymentInfo;
    
    // ============ 构造方法 ============
    // 1. 保护性构造：确保创建时就是有效的
    protected Order() {
        // JPA等框架需要
    }
    
    // 2. 工厂方法：封装创建逻辑
    public static Order create(Long userId, List<OrderItem> items, Address address) {
        Order order = new Order();
        order.id = OrderId.generate();
        order.userId = userId;
        order.status = OrderStatus.CREATED;
        order.createdAt = LocalDateTime.now();
        
        // 通过业务方法添加商品，而不是直接设置
        items.forEach(order::addItem);
        order.changeAddress(address);
        
        return order;
    }
    
    // ============ 业务方法 ============
    // 3. 每个业务方法不超过30行
    public void addItem(Product product, int quantity) {
        // 验证业务规则（3-5行）
        validateCanAddItem();
        validateProduct(product);
        validateQuantity(quantity);
        
        // 执行业务操作（5-8行）
        OrderItem item = OrderItem.create(product, quantity, this);
        items.add(item);
        recalculateTotalAmount();
        
        // 发布领域事件（2-3行）
        if (shouldNotifyInventory(items.size())) {
            registerEvent(new OrderItemAddedEvent(this.id, product.getId(), quantity));
        }
        // 总计<30行
    }
    
    public void cancel(String reason) {
        // 保护不变式：只有特定状态可以取消
        if (!status.canCancel()) {
            throw new OrderStateException("当前状态不可取消订单");
        }
        
        this.status = OrderStatus.CANCELLED;
        this.cancelReason = reason;
        this.cancelledAt = LocalDateTime.now();
        
        // 级联取消子项
        items.forEach(item -> item.cancel());
        
        registerEvent(new OrderCancelledEvent(this.id, reason));
    }
    
    public void pay(Payment payment) {
        // 验证支付
        validatePayment(payment);
        
        // 执行支付
        this.paymentInfo = PaymentInfo.from(payment);
        this.status = OrderStatus.PAID;
        this.paidAt = LocalDateTime.now();
        
        // 计算折扣等业务逻辑
        applyDiscountIfEligible();
        
        registerEvent(new OrderPaidEvent(this.id, payment.getAmount()));
    }
    
    public void ship(String trackingNumber) {
        // 验证状态
        if (status != OrderStatus.PAID) {
            throw new OrderStateException("只有已支付的订单可以发货");
        }
        
        // 更新状态
        this.status = OrderStatus.SHIPPED;
        this.trackingNumber = trackingNumber;
        this.shippedAt = LocalDateTime.now();
        
        // 生成发货单
        ShippingNote note = generateShippingNote();
        this.shippingNote = note;
        
        registerEvent(new OrderShippedEvent(this.id, trackingNumber));
    }
    
    // ============ 计算属性 ============
    // 4. 将计算逻辑内聚在实体中
    public Money calculateTotalWithTax() {
        Money subtotal = calculateSubtotal();
        Money tax = calculateTax(subtotal);
        return subtotal.add(tax);
    }
    
    public boolean isOverdue() {
        if (status != OrderStatus.SHIPPED) {
            return false;
        }
        return shippedAt.plusDays(30).isBefore(LocalDateTime.now());
    }
    
    public int getItemCount() {
        return items.stream()
                   .mapToInt(OrderItem::getQuantity)
                   .sum();
    }
    
    // ============ 验证方法 ============
    // 5. 验证逻辑内聚
    private void validateCanAddItem() {
        if (status != OrderStatus.CREATED) {
            throw new OrderStateException("订单已确认，无法添加商品");
        }
        if (items.size() >= MAX_ITEMS) {
            throw new BusinessRuleException("订单商品数量超过限制");
        }
    }
    
    private void validatePayment(Payment payment) {
        if (payment.getAmount().isLessThan(totalAmount)) {
            throw new PaymentException("支付金额不足");
        }
        if (payment.getCurrency() != totalAmount.getCurrency()) {
            throw new PaymentException("货币类型不匹配");
        }
    }
    
    // ============ 内部方法 ============
    // 6. 私有方法实现细节
    private void recalculateTotalAmount() {
        this.totalAmount = items.stream()
                               .map(OrderItem::getSubtotal)
                               .reduce(Money.ZERO, Money::add);
    }
    
    private void applyDiscountIfEligible() {
        if (isEligibleForDiscount()) {
            Discount discount = calculateDiscount();
            this.totalAmount = totalAmount.subtract(discount.getAmount());
            this.appliedDiscount = discount;
        }
    }
    
    private boolean isEligibleForDiscount() {
        return totalAmount.isGreaterThan(Money.of(100))
                && isFirstOrderOfMonth();
    }
}
```

### 2.2 值对象的充血设计

```java
// ✅ 充血的值对象
public class Money implements ValueObject, Comparable<Money> {
    private final BigDecimal amount;
    private final Currency currency;
    
    // 业务方法丰富
    public Money add(Money other) {
        validateSameCurrency(other);
        return new Money(amount.add(other.amount), currency);
    }
    
    public Money subtract(Money other) {
        validateSameCurrency(other);
        return new Money(amount.subtract(other.amount), currency);
    }
    
    public Money multiply(BigDecimal multiplier) {
        return new Money(amount.multiply(multiplier), currency);
    }
    
    public Money divide(BigDecimal divisor) {
        return new Money(amount.divide(divisor, RoundingMode.HALF_EVEN), currency);
    }
    
    // 业务判断方法
    public boolean isZero() {
        return amount.compareTo(BigDecimal.ZERO) == 0;
    }
    
    public boolean isPositive() {
        return amount.compareTo(BigDecimal.ZERO) > 0;
    }
    
    public boolean isNegative() {
        return amount.compareTo(BigDecimal.ZERO) < 0;
    }
    
    public boolean isGreaterThan(Money other) {
        validateSameCurrency(other);
        return amount.compareTo(other.amount) > 0;
    }
    
    public boolean isLessThan(Money other) {
        validateSameCurrency(other);
        return amount.compareTo(other.amount) < 0;
    }
    
    // 工厂方法
    public static Money zero(Currency currency) {
        return new Money(BigDecimal.ZERO, currency);
    }
    
    public static Money of(long amount, Currency currency) {
        return new Money(BigDecimal.valueOf(amount), currency);
    }
    
    // 格式化输出
    public String format() {
        return NumberFormat.getCurrencyInstance(currency.getLocale())
                          .format(amount);
    }
}
```

### 2.3 聚合根的边界控制

```java
public class Order extends BaseAggregateRoot<OrderId> {
    // 1. 内部集合使用不可变视图暴露
    private List<OrderItem> items = new ArrayList<>();
    
    public List<OrderItem> getItems() {
        return Collections.unmodifiableList(items);
    }
    
    // 2. 通过业务方法修改集合
    public void addItem(OrderItem item) {
        // 业务验证...
        items.add(item);
        recalculateTotal();
    }
    
    public void removeItem(ProductId productId) {
        // 业务验证...
        items.removeIf(item -> item.getProductId().equals(productId));
        recalculateTotal();
    }
    
    // 3. 聚合内实体的业务方法
    public void updateItemQuantity(ProductId productId, int newQuantity) {
        OrderItem item = findItem(productId);
        item.updateQuantity(newQuantity);  // OrderItem也有自己的业务逻辑
        recalculateTotal();
    }
    
    private OrderItem findItem(ProductId productId) {
        return items.stream()
                   .filter(item -> item.getProductId().equals(productId))
                   .findFirst()
                   .orElseThrow(() -> new ItemNotFoundException(productId));
    }
}
```

### 2.4 内部实体的充血设计

```java
// ✅ 内部实体的充血设计
public class OrderItem extends BaseEntity<Long> {
    private ProductId productId;
    private String productName;
    private Money unitPrice;
    private int quantity;
    private Money subtotal;
    
    // 业务方法
    public void updateQuantity(int newQuantity) {
        if (newQuantity <= 0) {
            throw new IllegalArgumentException("数量必须大于0");
        }
        if (newQuantity > MAX_QUANTITY_PER_ITEM) {
            throw new BusinessRuleException("单商品数量超过限制");
        }
        
        this.quantity = newQuantity;
        recalculateSubtotal();
    }
    
    public void applyDiscount(Discount discount) {
        if (!discount.isApplicableTo(this)) {
            throw new DiscountException("折扣不适用于此商品");
        }
        
        this.unitPrice = discount.applyTo(unitPrice);
        recalculateSubtotal();
    }
    
    public boolean isSameProduct(ProductId otherProductId) {
        return this.productId.equals(otherProductId);
    }
    
    // 计算属性
    private void recalculateSubtotal() {
        this.subtotal = unitPrice.multiply(BigDecimal.valueOf(quantity));
    }
    
    public Money getSubtotal() {
        return subtotal;
    }
}
```

## 三、充血模型检查清单

### 3.1 必须有的特征（强制）
- [ ] **业务方法丰富**：实体至少有3个以上的业务方法
- [ ] **验证内聚**：业务规则验证在实体内部完成
- [ ] **不变式保护**：任何状态修改都经过验证
- [ ] **无公开setter**：避免 `setStatus()`，使用 `cancel()`、`complete()` 等方法
- [ ] **领域事件发布**：重要状态变更发布领域事件

### 3.2 推荐有的特征
- [ ] **工厂方法**：提供语义化的创建方式
- [ ] **计算属性**：将计算逻辑内聚
- [ ] **查询方法**：提供业务意义的查询方法（如 `isOverdue()`）
- [ ] **级联操作**：聚合根控制内部实体的状态变更
- [ ] **快照方法**：提供 `toSnapshot()` 用于持久化或传输

### 3.3 禁止的特征
- [ ] **贫血模型**：只有getter/setter，没有业务方法
- [ ] **上帝方法**：一个方法做多件事情（超过20行）
- [ ] **泄露实现**：暴露内部数据结构（如返回 `ArrayList` 而不是 `List`）
- [ ] **外部验证**：在实体外部验证业务规则
- [ ] **原始偏执**：过度使用基本类型而不是值对象

## 四、充血模型与分层协作

### 4.1 应用服务调用充血模型
```java
@Service
@Transactional
@RequiredArgsConstructor
public class OrderAppService {
    private final OrderRepository orderRepository;
    
    // ✅ 正确的调用方式：委托给实体
    public void cancelOrder(CancelOrderCommand command) {
        Order order = orderRepository.findById(command.getOrderId())
                                    .orElseThrow(() -> new OrderNotFoundException());
        
        // 调用实体的业务方法，而不是自己实现逻辑
        order.cancel(command.getReason(), command.getCancelledBy());
        
        orderRepository.save(order);
        // 总计<10行
    }
    
    // ❌ 错误的做法：在应用服务实现业务逻辑
    public void cancelOrderWrong(CancelOrderCommand command) {
        Order order = orderRepository.findById(command.getOrderId())
                                    .orElseThrow(() -> new OrderNotFoundException());
        
        // 贫血模型的典型错误：在外部验证和修改状态
        if (!order.getStatus().canCancel()) {
            throw new IllegalStateException();
        }
        order.setStatus(OrderStatus.CANCELLED);  // 直接setter
        order.setCancelReason(command.getReason());
        order.setUpdatedAt(LocalDateTime.now());
        // ... 更多散落的业务逻辑
    }
}
```

### 4.2 工厂的充血使用
```java
@Component
public class OrderFactory {
    
    // ✅ 复杂的创建逻辑封装在工厂中
    public Order createFromCart(ShoppingCart cart, User user, Discount discount) {
        Order order = Order.create(user.getId());
        
        // 转换购物车项为订单项
        cart.getItems().forEach(cartItem -> {
            OrderItem orderItem = createOrderItem(cartItem);
            order.addItem(orderItem);
        });
        
        // 应用折扣
        if (discount != null && discount.isApplicableTo(order)) {
            order.applyDiscount(discount);
        }
        
        // 设置配送地址
        order.changeAddress(user.getDefaultAddress());
        
        return order;
    }
    
    private OrderItem createOrderItem(CartItem cartItem) {
        return OrderItem.builder()
                       .productId(cartItem.getProductId())
                       .productName(cartItem.getProductName())
                       .unitPrice(cartItem.getPrice())
                       .quantity(cartItem.getQuantity())
                       .build();
    }
}
```

## 五、测试充血模型

### 5.1 单元测试规范
```java
class OrderTest {
    
    @Test
    void should_add_item_to_order_successfully() {
        // Given
        Order order = Order.create(userId);
        Product product = createProduct();
        
        // When
        order.addItem(product, 2);
        
        // Then
        assertThat(order.getItemCount()).isEqualTo(2);
        assertThat(order.getItems()).hasSize(1);
        assertThat(order.getTotalAmount()).isEqualTo(product.getPrice().multiply(2));
    }
    
    @Test
    void should_throw_exception_when_adding_item_to_paid_order() {
        // Given
        Order order = Order.create(userId);
        order.pay(createPayment());  // 改变状态
        
        // When & Then
        assertThatThrownBy(() -> order.addItem(createProduct(), 1))
                .isInstanceOf(OrderStateException.class)
                .hasMessage("订单已确认，无法添加商品");
    }
    
    @Test
    void should_calculate_total_with_tax_correctly() {
        // Given
        Order order = Order.create(userId);
        order.addItem(createProduct(price: Money.of(100)), 2);
        
        // When
        Money totalWithTax = order.calculateTotalWithTax();
        
        // Then
        assertThat(totalWithTax).isEqualTo(Money.of(236));  // 200 + 18%税
    }
}
```

## 六、充血模型重构指南

### 6.1 从贫血模型重构为充血模型

```java
// ❌ 重构前：贫血模型
public class Order {
    // 只有数据字段
    private Long id;
    private String status;
    private BigDecimal totalAmount;
    private List<OrderItem> items;
    
    // 只有getter/setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    // ... 更多getter/setter
}

// ✅ 重构步骤1：添加业务方法
public class Order {
    // 步骤1：将setter改为业务方法
    public void cancel(String reason) {
        if (!"CREATED".equals(status) && !"PAID".equals(status)) {
            throw new IllegalStateException("无法取消");
        }
        this.status = "CANCELLED";
        this.cancelReason = reason;
    }
    
    // 步骤2：添加更多的业务方法
    public void addItem(Product product, int quantity) {
        // 业务逻辑...
    }
    
    // 步骤3：用值对象替换基本类型
    private OrderStatus status;  // 枚举值对象
    private Money totalAmount;   // 值对象
    
    // 步骤4：保护内部状态
    public List<OrderItem> getItems() {
        return Collections.unmodifiableList(items);
    }
}

// ✅ 重构完成：完全的充血模型
public class Order extends BaseAggregateRoot<OrderId> {
    private OrderStatus status;
    private Money totalAmount;
    private List<OrderItem> items = new ArrayList<>();
    
    // 丰富的业务方法
    public void cancel(String reason) { /* ... */ }
    public void addItem(Product product, int quantity) { /* ... */ }
    public void removeItem(ProductId productId) { /* ... */ }
    public void pay(Payment payment) { /* ... */ }
    public void ship(String trackingNumber) { /* ... */ }
    public boolean isOverdue() { /* ... */ }
    public Money calculateTotalWithTax() { /* ... */ }
    
    // 工厂方法
    public static Order create(Long userId, Address address) { /* ... */ }
}
```

### 6.2 充血模型代码生成提示词
```
请生成充血模型的DDD实体代码，要求：

1. 数据+行为一体：实体包含丰富的业务方法
2. 每个业务方法不超过30行代码
3. 方法参数不超过4个
4. 保护不变式：所有状态变更都经过验证
5. 使用值对象替换基本类型
6. 提供工厂方法创建实例
7. 发布领域事件
8. 暴露不可变视图的内部集合
9. 包含业务计算属性（如isOverdue()）
10. 无公开setter方法，只有有业务意义的修改方法
```

## 七、充血模型度量指标

### 7.1 质量指标
| 指标 | 目标值 | 说明 |
|------|--------|------|
| 业务方法/属性比 | ≥ 1.5 | 每个属性对应1.5个业务方法 |
| setter方法数 | 0 | 充血模型不应有公开setter |
| 业务方法平均行数 | ≤ 15 | 保持方法简洁 |
| 验证方法内聚度 | 100% | 所有业务验证都在实体内部 |
| 不变式保护覆盖率 | 100% | 所有状态变更都保护不变式 |

### 7.2 代码示例模板
```java
// 充血实体模板
public class {EntityName} extends BaseAggregateRoot<{EntityId}> {
    // 1. 状态字段（使用值对象）
    private {ValueObject} field1;
    private List<{ChildEntity}> children = new ArrayList<>();
    
    // 2. 工厂方法
    public static {EntityName} create({Params}) {
        {EntityName} entity = new {EntityName}();
        // 初始化逻辑...
        return entity;
    }
    
    // 3. 业务方法（每个<30行）
    public void {businessAction}({Params}) {
        // 验证（3-5行）
        validate{BusinessAction}({Params});
        
        // 执行（5-8行）
        execute{BusinessAction}({Params});
        
        // 发布事件（2-3行）
        publish{BusinessAction}Event({Params});
    }
    
    // 4. 查询方法
    public boolean is{SomeCondition}() {
        // 业务判断逻辑
    }
    
    // 5. 保护内部状态
    public List<{ChildEntity}> getChildren() {
        return Collections.unmodifiableList(children);
    }
    
    // 6. 私有验证方法
    private void validate{BusinessAction}({Params}) {
        // 验证逻辑
    }
}
```

充血模型是DDD实现的核心，通过将数据和行为紧密结合，使领域模型真正成为业务逻辑的承载者，而不是简单的数据容器。
