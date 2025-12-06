# DDD + 代码简洁之道项目代码规范

## 一、架构分层规范

### 1.1 分层架构（四层架构）
```
┌─────────────────────────────────────┐
│           用户界面层                 │
│           (User Interface Layer)     │
├─────────────────────────────────────┤
│           应用服务层                 │
│       (Application Service Layer)    │
├─────────────────────────────────────┤
│           领域层                     │
│           (Domain Layer)             │
├─────────────────────────────────────┤
│           基础设施层                 │
│      (Infrastructure Layer)          │
└─────────────────────────────────────┘
```

### 1.2 依赖关系规则（严格单向依赖）
- 用户界面层 → 应用服务层 → 领域层 ← 基础设施层
- **禁止**：应用服务层依赖基础设施层（通过依赖倒置）
- **禁止**：领域层依赖外层任何组件
- **允许**：基础设施层实现领域层的接口

### 1.3 各层职责
```java
// 领域层 - 核心业务逻辑
domain/
├── model/              # 聚合根、实体、值对象
├── service/           # 领域服务
├── repository/        # 仓储接口
├── event/            # 领域事件
└── factory/          # 工厂

// 应用层 - 协调领域对象完成用例
application/
├── service/          # 应用服务
├── dto/              # 数据传输对象
├── command/          # 命令对象
├── query/            # 查询对象
└── event/            # 应用事件

// 基础设施层 - 技术实现
infrastructure/
├── persistence/      # 持久化实现
├── external/         # 外部服务调用
├── message/          # 消息队列
└── config/           # 配置

// 用户界面层
interfaces/
├── web/              # Web控制器
├── rpc/              # RPC接口
├── graphql/          # GraphQL
└── dto/              # 请求/响应对象
```

## 二、代码简洁规范

### 2.1 类规范
- **最大行数**：单个类不超过 **300行**（理想状态200行）
- **单一职责**：每个类只做一件事
- **命名规范**：
    - 实体类：名词，如 `User`, `BlogPost`
    - 领域服务：`XXXDomainService`，如 `BlogPostDomainService`
    - 应用服务：`XXXAppService`，如 `BlogPostAppService`
    - 仓储接口：`XXXRepository`，如 `BlogPostRepository`
    - 工厂：`XXXFactory`，如 `BlogPostFactory`

### 2.2 方法规范
- **最大行数**：单个方法不超过 **30行**
- **参数数量**：不超过 **4个**（强制）
- **圈复杂度**：不超过 **10**
- **抽象级别一致**：方法内所有语句在同一抽象级别

### 2.3 函数设计原则
```java
// ❌ 不好的示例 - 方法太长，参数太多
public void processOrder(Long orderId, Long userId, String address, 
                         List<OrderItem> items, boolean useCoupon, 
                         String paymentMethod, String remark) {
    // 超过20行逻辑...
}

// ✅ 好的示例 - 使用命令对象封装参数
public void processOrder(CreateOrderCommand command) {
    validateCommand(command);          // 3行
    Order order = createOrder(command); // 5行  
    saveOrder(order);                   // 2行
    publishEvent(order);                // 3行
    // 总计13行
}
```

### 2.4 异常处理规范
- **受检异常**：仅在基础设施层使用
- **领域异常**：继承 `RuntimeException`
- **异常消息**：明确说明原因和解决方案
- **不要吞异常**：禁止空的catch块

## 三、DDD核心元素规范

### 3.1 实体（Entity）
```java
// ✅ 正确的实体设计
public class Order extends BaseEntity<OrderId> {
    private OrderStatus status;
    private Money totalAmount;
    private Address shippingAddress;
    private List<OrderItem> items;
    
    // 1. 保护不变式
    public void addItem(OrderItem item) {
        if (status != OrderStatus.CREATED) {
            throw new IllegalOrderStateException("只能向新建订单添加商品");
        }
        this.items.add(item);
        this.totalAmount = calculateTotal();
    }
    
    // 2. 业务方法不超过15行
    public void pay(Payment payment) {
        validatePayment(payment);      // 3行
        applyPayment(payment);         // 5行
        changeStatus(OrderStatus.PAID); // 2行
        recordPayment(payment);         // 3行
        // 总计13行
    }
    
    // 3. 使用值对象封装基本类型
    public void changeAddress(Address newAddress) {
        this.shippingAddress = newAddress;
    }
}
```

### 3.2 值对象（Value Object）
```java
// ✅ 不可变的值对象
public class Address implements ValueObject {
    private final String province;
    private final String city;
    private final String detail;
    
    // 1. 所有属性通过构造函数设置
    public Address(String province, String city, String detail) {
        this.province = Objects.requireNonNull(province);
        this.city = Objects.requireNonNull(city);
        this.detail = Objects.requireNonNull(detail);
    }
    
    // 2. 实现equals和hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Address)) return false;
        Address address = (Address) o;
        return province.equals(address.province) &&
               city.equals(address.city) &&
               detail.equals(address.detail);
    }
}
```

### 3.3 聚合根（Aggregate Root）
```java
// ✅ 聚合根示例
public class Order extends BaseAggregateRoot<OrderId> {
    // 1. 保护内部状态
    private List<OrderItem> items = new ArrayList<>();
    
    // 2. 控制边界访问
    public List<OrderItem> getItems() {
        return Collections.unmodifiableList(items);
    }
    
    // 3. 发布领域事件
    public void cancel() {
        this.status = OrderStatus.CANCELLED;
        registerEvent(new OrderCancelledEvent(this.id));
    }
    
    // 4. 工厂方法创建复杂对象
    public static Order create(CreateOrderCommand command, User user) {
        Order order = new Order();
        order.id = OrderId.generate();
        order.userId = user.getId();
        order.status = OrderStatus.CREATED;
        return order;
    }
}
```

### 3.4 领域服务（Domain Service）
```java
// ✅ 领域服务 - 无状态服务
@Service
@Slf4j
public class OrderPaymentService {
    
    // 1. 方法参数不超过4个
    public PaymentResult processPayment(Order order, PaymentMethod method, Money amount) {
        // 2. 方法体不超过20行
        validatePayment(order, method, amount);  // 4行
        Payment payment = createPayment(order, method, amount);  // 5行
        PaymentResult result = executePayment(payment);  // 6行
        updateOrderPayment(order, result);  // 3行
        return result;  // 1行
        // 总计19行
    }
    
    // 3. 私有辅助方法不超过10行
    private Payment createPayment(Order order, PaymentMethod method, Money amount) {
        return Payment.builder()
                .orderId(order.getId())
                .method(method)
                .amount(amount)
                .build();
    }
}
```

### 3.5 应用服务（Application Service）
```java
// ✅ 应用服务 - 协调者角色
@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class OrderAppService {
    private final OrderRepository orderRepository;
    private final OrderPaymentService paymentService;
    private final EventPublisher eventPublisher;
    
    // 1. 使用命令对象减少参数
    public OrderResult createOrder(CreateOrderCommand command) {
        // 2. 每行一个操作，清晰明了
        validateCommand(command);                     // 验证输入
        Order order = buildOrder(command);            // 构建领域对象
        orderRepository.save(order);                  // 持久化
        eventPublisher.publish(new OrderCreatedEvent(order.getId()));  // 发布事件
        return OrderResult.success(order.getId());    // 返回结果
        // 总计6行逻辑
    }
    
    // 3. 一个方法一个用例
    @Transactional
    public void cancelOrder(CancelOrderCommand command) {
        Order order = findOrder(command.getOrderId());
        order.cancel(command.getReason());  // 委托给领域对象
        orderRepository.save(order);
    }
}
```

## 四、代码质量硬性指标

### 4.1 静态代码分析规则
```yaml
# SonarQube/SonarLint配置
rules:
  # 方法复杂度
  - rule: "Method complexity should not exceed 10"
    metric: "CyclomaticComplexity"
    threshold: 10
    
  - rule: "Method length should not exceed 20 lines"
    metric: "MethodLength"
    threshold: 20
    
  - rule: "Class length should not exceed 300 lines"
    metric: "ClassLength"
    threshold: 300
    
  - rule: "Parameters count should not exceed 4"
    metric: "ParameterCount"
    threshold: 4
    
  # 依赖规则
  - rule: "Domain layer should not depend on outer layers"
    from: "**/domain/**"
    to: ["**/application/**", "**/infrastructure/**", "**/interfaces/**"]
    severity: "BLOCKER"
```

### 4.2 测试规范
```java
// ✅ 测试类规范
class OrderServiceTest {
    
    // 1. 每个测试方法不超过15行
    @Test
    void should_create_order_successfully() {
        // Given - 3行
        CreateOrderCommand command = buildValidCommand();
        
        // When - 1行
        OrderResult result = orderService.createOrder(command);
        
        // Then - 3行
        assertThat(result.isSuccess()).isTrue();
        assertThat(result.getOrderId()).isNotNull();
        // 总计7行
    }
    
    // 2. 测试方法名明确表达场景和预期
    @Test
    void should_throw_exception_when_order_items_empty() {
        // BDD风格：Given-When-Then
    }
}
```

### 4.3 包结构规范
```
src/main/java/com/example/
├── domain/                          # 领域层
│   ├── model/                      # 领域模型
│   │   ├── order/                  # 订单聚合
│   │   │   ├── Order.java          # 聚合根 <300行
│   │   │   ├── OrderItem.java      # 实体 <200行
│   │   │   ├── OrderId.java        # 值对象 <100行
│   │   │   ├── Address.java        # 值对象 <100行
│   │   │   └── OrderStatus.java    # 枚举
│   │   └── user/                   # 用户聚合
│   ├── service/                    # 领域服务
│   │   ├── OrderService.java       # <300行，每个方法<20行
│   │   └── PaymentService.java
│   ├── repository/                 # 仓储接口
│   │   ├── OrderRepository.java
│   │   └── UserRepository.java
│   ├── event/                      # 领域事件
│   │   └── OrderCreatedEvent.java
│   └── factory/                    # 工厂
│       └── OrderFactory.java
├── application/                     # 应用层
│   ├── service/                    # 应用服务
│   │   ├── OrderAppService.java    # <300行
│   │   └── UserAppService.java
│   ├── dto/                        # DTO
│   │   ├── CreateOrderCommand.java # 命令对象
│   │   └── OrderResult.java        # 返回结果
│   └── event/                      # 应用事件
├── infrastructure/                  # 基础设施层
│   ├── persistence/                # 持久化实现
│   │   ├── OrderRepositoryImpl.java
│   │   └── mapper/                 # 数据映射
│   ├── external/                   # 外部服务
│   │   └── PaymentClient.java
│   └── config/                     # 配置
└── interfaces/                      # 用户界面层
    ├── web/                        # Web接口
    │   ├── OrderController.java    # <200行，每个方法<15行
    │   └── dto/                    # 请求响应DTO
    └── rpc/                        # RPC接口
```

## 五、代码审查检查清单

### 5.1 强制性规则（一票否决）
- [ ] 领域层是否依赖了外层组件？
- [ ] 类是否超过300行？
- [ ] 方法是否超过20行？
- [ ] 方法参数是否超过4个？
- [ ] 圈复杂度是否超过10？
- [ ] 是否有空catch块？
- [ ] 是否在领域层使用了基础设施术语？

### 5.2 建议性规则
- [ ] 方法是否单一职责？
- [ ] 命名是否准确表达意图？
- [ ] 是否使用了基本类型而不是值对象？
- [ ] 是否过度使用getter/setter暴露内部状态？
- [ ] 是否每个测试用例只验证一个行为？

### 5.3 架构规则
- [ ] 聚合根是否控制了自己的边界？
- [ ] 实体是否保护了自己的不变式？
- [ ] 应用服务是否只做协调工作？
- [ ] 领域服务是否无状态？
- [ ] 仓储接口是否在领域层定义？

## 六、开发工作流规则

### 6.1 Git提交规范
```
feat(domain): 添加订单取消功能
- Order实体添加cancel()方法（15行）
- OrderService添加验证逻辑（12行）
- 添加订单取消事件
- 方法参数控制在3个以内
- 类行数未超过250行
```

### 6.2 重构时机
当出现以下情况时立即重构：
1. 方法超过30行时
2. 参数超过4个时
3. 发现重复代码时
4. 类职责不清晰时

### 6.3 代码生成规则
```
请遵循DDD+代码简洁规范：
1. 类不超过300行，方法不超过30行
2. 方法参数不超过4个，优先使用值对象封装
3. 领域层不依赖外层组件
4. 使用聚合根保护不变式
5. 应用服务只做协调，业务逻辑在领域层
6. 优先使用不可变值对象
7. 每个方法单一职责，抽象级别一致
```

## 七、示例模板

### 7.1 命令对象模板
```java
// 行数：<50行
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderCommand implements Command {
    @NotNull
    private Long userId;
    
    @NotEmpty
    private List<OrderItemCommand> items;  // 使用值对象列表
    
    @Valid
    private AddressCommand address;        // 嵌套值对象
    
    private String couponCode;
    
    // 验证方法 <10行
    public void validate() {
        if (items.isEmpty()) {
            throw new ValidationException("订单商品不能为空");
        }
    }
}
```

### 7.2 实体方法模板
```java
// 业务方法模板 <15行
public void changeStatus(OrderStatus newStatus, String reason) {
    // 1. 验证前置条件（3-5行）
    validateTransition(this.status, newStatus);
    
    // 2. 修改状态（1行）
    this.status = newStatus;
    this.statusReason = reason;
    
    // 3. 记录变更（2-3行）
    this.updatedAt = LocalDateTime.now();
    
    // 4. 发布事件（2-3行）
    if (newStatus == OrderStatus.CANCELLED) {
        registerEvent(new OrderCancelledEvent(this.id, reason));
    }
    // 总计<15行
}
```
