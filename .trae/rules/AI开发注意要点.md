# AI 开发注意要点

## 概述

本文档专注于 AI 生成代码时容易忽视或出错的地方，特别是 import 导入、依赖配置、注解使用等细节问题。旨在帮助开发者在使用 AI 辅助编程时避免常见陷阱，提高代码质量。

---

## 一、Import 导入常见问题

### 1.1 缺少必要的 Spring 注解导入

**问题示例：**
```java
// ❌ 错误：缺少 import 语句
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    // 编译错误：找不到 @Service、@Autowired 等注解
}

// ✅ 正确：完整的 import 语句
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;
}
```

**必须导入的常见 Spring 注解：**
```java
// 核心注解
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

// 依赖注入
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import javax.annotation.Resource;

// 事务管理
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Isolation;

// Web 相关
import org.springframework.web.bind.annotation.*;
```

### 1.2 Lombok 注解导入错误

**问题示例：**
```java
// ❌ 错误：缺少 Lombok 注解处理器
@Data  // 编译错误：找不到符号
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
}

// ✅ 正确：确保项目中已添加 Lombok 依赖
// pom.xml 中添加：
// <dependency>
//     <groupId>org.projectlombok</groupId>
//     <artifactId>lombok</artifactId>
//     <scope>provided</scope>
// </dependency>

// IDE 中需要安装 Lombok 插件
```

### 1.3 静态导入遗漏

**问题示例：**
```java
// ❌ 错误：未使用静态导入
@Test
void testUserCreation() {
    User user = new User();
    user.setName("John");
    
    // 冗长的写法
    org.assertj.core.api.Assertions.assertThat(user.getName()).isEqualTo("John");
}

// ✅ 正确：使用静态导入
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@Test
void testUserCreation() {
    User user = new User();
    user.setName("John");
    
    // 简洁的写法
    assertThat(user.getName()).isEqualTo("John");
}
```

### 1.4 包路径错误

**问题示例：**
```java
// ❌ 错误：错误的包路径
import java.until.Date;  // 拼写错误
import org.springframwork.stereotype.Service;  // 拼写错误

// ✅ 正确：正确的包路径
import java.util.Date;
import org.springframework.stereotype.Service;

// 检查技巧：
// 1. 使用 IDE 的自动导入功能
// 2. 检查 Maven/Gradle 依赖是否正确
// 3. 查看官方文档确认包名
```

### 1.5 去除无效引用

// ❌ 错误：存在无效的import或者没有使用的字段
---

## 二、依赖注入配置陷阱

### 2.1 @Autowired vs @Resource vs @Inject

**使用场景对比：**

| 注解 | 来源 | 特点 | 使用场景 |
|------|------|------|----------|
| `@Autowired` | Spring | 按类型注入，支持 required=false | Spring 项目首选 |
| `@Resource` | JSR-250 | 按名称注入，支持 name 属性 | 需要按名称注入时 |
| `@Inject` | JSR-330 | 按类型注入，需要 javax.inject 依赖 | 需要标准化注入时 |

**代码示例：**
```java
// ✅ 推荐：使用构造器注入（Spring 4.3+）
@Service
@RequiredArgsConstructor  // Lombok 生成构造器
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    // 无需 @Autowired，Spring 会自动注入
}

// ✅ 备选：使用字段注入（简单场景）
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
}

// ✅ 按名称注入：使用 @Resource
@Service
public class OrderService {
    @Resource(name = "alipayPaymentService")
    private PaymentService paymentService;
}
```

### 2.2 循环依赖处理

**问题示例：**
```java
// ❌ 错误：循环依赖
@Service
public class ServiceA {
    @Autowired
    private ServiceB serviceB;  // ServiceB 依赖 ServiceA
}

@Service
public class ServiceB {
    @Autowired
    private ServiceA serviceA;  // ServiceA 依赖 ServiceB
}
// 启动时报错：Requested bean is currently in creation

// ✅ 解决方案：
// 1. 使用构造器注入 + @Lazy
@Service
public class ServiceA {
    private final ServiceB serviceB;
    
    public ServiceA(@Lazy ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}

// 2. 使用方法注入
@Service
public class ServiceA {
    private ServiceB serviceB;
    
    @Autowired
    public void setServiceB(ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}

// 3. 重构代码，消除循环依赖（推荐）
// 提取公共逻辑到第三个服务中
```

### 2.3 Bean 名称冲突

**问题示例：**
```java
// ❌ 错误：相同类型的多个 Bean
@Configuration
public class Config {
    @Bean
    public DataSource dataSource1() {
        return new HikariDataSource();
    }
    
    @Bean
    public DataSource dataSource2() {
        return new HikariDataSource();
    }
    // 报错：No qualifying bean of type 'DataSource' available
}

// ✅ 解决方案：
// 1. 使用 @Qualifier
@Configuration
public class Config {
    @Bean("primaryDataSource")
    public DataSource dataSource1() {
        return new HikariDataSource();
    }
    
    @Bean("secondaryDataSource")
    public DataSource dataSource2() {
        return new HikariDataSource();
    }
}

@Service
public class UserService {
    @Autowired
    @Qualifier("primaryDataSource")
    private DataSource dataSource;
}

// 2. 使用 @Primary 指定主 Bean
@Configuration
public class Config {
    @Bean
    @Primary  // 优先使用
    public DataSource primaryDataSource() {
        return new HikariDataSource();
    }
    
    @Bean
    public DataSource secondaryDataSource() {
        return new HikariDataSource();
    }
}
```

---

## 三、注解使用注意事项

### 3.1 事务注解 @Transactional

**常见陷阱：**
```java
// ❌ 错误：事务注解在私有方法上
@Service
public class OrderService {
    @Transactional  // 不生效：Spring 使用代理，私有方法无法被代理
    private void updateOrder(Order order) {
        // 事务不会生效
    }
}

// ❌ 错误：自调用问题
@Service
public class OrderService {
    public void processOrder(Long orderId) {
        updateOrderStatus(orderId);  // 事务不生效：自调用绕过代理
    }
    
    @Transactional
    public void updateOrderStatus(Long orderId) {
        // 事务不会生效
    }
}

// ✅ 正确用法：
@Service
@Transactional  // 类级别注解，所有公共方法都有事务
public class OrderService {
    // 方法可以覆盖类级别的事务配置
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void updateOrderStatus(Long orderId) {
        // 新事务中执行
    }
    
    @Transactional(readOnly = true)  // 只读事务，优化性能
    public Order getOrder(Long orderId) {
        return orderRepository.findById(orderId);
    }
}

// ✅ 解决自调用问题：
@Service
public class OrderService {
    @Autowired
    private OrderService selfProxy;  // 注入自身代理
    
    public void processOrder(Long orderId) {
        selfProxy.updateOrderStatus(orderId);  // 通过代理调用，事务生效
    }
    
    @Transactional
    public void updateOrderStatus(Long orderId) {
        // 事务生效
    }
}
```

### 3.2 验证注解 @Valid

**常见错误：**
```java
// ❌ 错误：缺少 @Valid 或验证不生效
@RestController
public class UserController {
    @PostMapping("/users")
    public User createUser(@RequestBody UserRequest request) {  // 缺少 @Valid
        // 请求体不会被验证
        return userService.createUser(request);
    }
}

// ✅ 正确：使用 @Valid 进行验证
@RestController
public class UserController {
    @PostMapping("/users")
    public User createUser(@Valid @RequestBody UserRequest request) {
        // 请求体验证通过后执行
        return userService.createUser(request);
    }
    
    // 嵌套对象验证
    @PostMapping("/orders")
    public Order createOrder(@Valid @RequestBody OrderRequest request) {
        return orderService.createOrder(request);
    }
}

// 嵌套验证示例：
public class OrderRequest {
    @NotBlank
    private String orderNo;
    
    @Valid  // 必须加在嵌套对象上
    private List<OrderItemRequest> items;
    
    @Valid  // 必须加在嵌套对象上
    private AddressRequest address;
}

public class OrderItemRequest {
    @NotNull
    private Long productId;
    
    @Min(1)
    @Max(100)
    private Integer quantity;
}
```

### 3.3 Spring Boot 启动类注解

**正确配置：**
```java
// ✅ 正确：Spring Boot 启动类
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

// 扫描多个包
@SpringBootApplication(
    scanBasePackages = {
        "com.personal.portfolio.blog",
        "com.personal.portfolio.common"
    }
)
@EntityScan(basePackages = "com.personal.portfolio.blog.domain.model")
@EnableJpaRepositories(basePackages = "com.personal.portfolio.blog.domain.repository")
public class PersonalPortfolioApplication {
    public static void main(String[] args) {
        SpringApplication.run(PersonalPortfolioApplication.class, args);
    }
}

// ❌ 错误：缺少必要的注解
// 如果项目使用 JPA，但未添加 @EnableJpaRepositories 或 @EntityScan
// 可能导致 Repository 或 Entity 无法被扫描到
```

---

## 四、异常处理细节

### 4.1 受检异常 vs 非受检异常

**使用原则：**
```java
// ✅ 正确：业务异常使用非受检异常
public class BusinessException extends RuntimeException {
    private String errorCode;
    
    public BusinessException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
    
    // 业务异常应该包含错误码，便于前端处理
}

// 使用示例：
@Service
public class UserService {
    public User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException("USER_NOT_FOUND", "用户不存在"));
    }
}

// ✅ 正确：技术异常可考虑受检异常
public class FileUploadException extends Exception {
    // 文件上传失败，调用者可能需要处理
}

// ❌ 错误：过度使用受检异常
public void processFile() throws IOException, SQLException, ParseException {
    // 多个受检异常，调用者处理困难
}

// ✅ 改进：包装为运行时异常
public void processFile() {
    try {
        // 文件处理逻辑
    } catch (IOException e) {
        throw new BusinessException("FILE_PROCESS_ERROR", "文件处理失败", e);
    }
}
```

### 4.2 全局异常处理器配置

**完整配置示例：**
```java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    
    // 处理业务异常
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<?>> handleBusinessException(
            BusinessException ex, WebRequest request) {
        log.warn("业务异常: {} - {}", ex.getErrorCode(), ex.getMessage());
        
        ApiResponse<?> response = ApiResponse.error(
                ex.getErrorCode(),
                ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    // 处理验证异常
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> handleValidationException(
            MethodArgumentNotValidException ex) {
        log.warn("参数验证失败: {}", ex.getMessage());
        
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());
        
        ApiResponse<?> response = ApiResponse.error(
                "VALIDATION_FAILED",
                "参数验证失败",
                errors
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    // 处理所有其他异常
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleAllExceptions(
            Exception ex, WebRequest request) {
        log.error("系统异常: ", ex);
        
        // 生产环境隐藏详细错误信息
        String message = "prod".equals(env) ? 
                "系统内部错误" : ex.getMessage();
        
        ApiResponse<?> response = ApiResponse.error(
                "INTERNAL_SERVER_ERROR",
                message
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }
}
```

### 4.3 异常消息国际化

**配置示例：**
```java
// 1. 定义错误码枚举
public enum ErrorCode {
    USER_NOT_FOUND("user.not.found", "用户不存在"),
    INVALID_PASSWORD("invalid.password", "密码错误"),
    DUPLICATE_USERNAME("duplicate.username", "用户名已存在");
    
    private final String code;
    private final String defaultMessage;
    
    // 构造函数、getter...
}

// 2. 使用 MessageSource 获取国际化消息
@Service
public class ErrorMessageService {
    @Autowired
    private MessageSource messageSource;
    
    public String getMessage(ErrorCode errorCode, Locale locale, Object... args) {
        return messageSource.getMessage(
                errorCode.getCode(),
                args,
                errorCode.getDefaultMessage(),
                locale
        );
    }
}

// 3. 在异常处理器中使用
@ExceptionHandler(BusinessException.class)
public ResponseEntity<ApiResponse<?>> handleBusinessException(
        BusinessException ex, 
        HttpServletRequest request) {
    
    Locale locale = request.getLocale();
    String message = errorMessageService.getMessage(
            ex.getErrorCode(), 
            locale,
            ex.getArgs()
    );
    
    // 返回国际化后的消息
}
```

---

## 五、类型转换和空值处理

### 5.1 Optional 的正确使用

**常见错误：**
```java
// ❌ 错误：Optional 使用不当
public String getUserName(Long userId) {
    Optional<User> user = userRepository.findById(userId);
    
    if (user.isPresent()) {
        return user.get().getName();  // 直接使用 get()
    }
    return null;
}

// ❌ 错误：不必要的 Optional
public Optional<String> getUserName(Long userId) {
    User user = userRepository.findById(userId).orElse(null);
    return Optional.ofNullable(user).map(User::getName);
    // 过于复杂，直接返回 null 或 Optional 即可
}

// ✅ 正确：简洁的 Optional 使用
public String getUserName(Long userId) {
    return userRepository.findById(userId)
            .map(User::getName)
            .orElse(null);  // 或 orElse("默认值")
}

public Optional<String> getUserNameOptional(Long userId) {
    return userRepository.findById(userId)
            .map(User::getName);
}

// ✅ 正确：链式调用
public String getUserEmail(Long userId) {
    return userRepository.findById(userId)
            .flatMap(User::getProfile)  // profile 也是 Optional
            .map(Profile::getEmail)
            .orElse("default@example.com");
}
```

### 5.2 空指针防护

**防御性编程：**
```java
// ❌ 错误：多层嵌套的空值检查
public String getCityName(User user) {
    if (user != null) {
        Address address = user.getAddress();
        if (address != null) {
            return address.getCity();
        }
    }
    return null;
}

// ✅ 正确：使用 Optional 链
public String getCityName(User user) {
    return Optional.ofNullable(user)
            .map(User::getAddress)
            .map(Address::getCity)
            .orElse(null);
}

// ✅ 正确：使用 Objects.requireNonNull
public void updateUser(User user, String newName) {
    Objects.requireNonNull(user, "用户不能为空");
    Objects.requireNonNull(newName, "新名称不能为空");
    
    user.setName(newName);
}

// ✅ 正确：使用 @NonNull 注解（Lombok 或 Spring）
public void updateUser(@NonNull User user, @NonNull String newName) {
    // Lombok 或 Spring 会在编译时或运行时检查空值
    user.setName(newName);
}
```

### 5.3 集合的空值处理

**安全处理集合：**
```java
// ❌ 错误：可能返回 null 的集合
public List<String> getUserNames() {
    if (someCondition) {
        return null;  // 返回 null 会导致调用者 NPE
    }
    return Arrays.asList("Alice", "Bob");
}

// ✅ 正确：返回空集合
public List<String> getUserNames() {
    if (someCondition) {
        return Collections.emptyList();  // 不可变空列表
    }
    return Arrays.asList("Alice", "Bob");
}

// ✅ 正确：处理可能为 null 的集合
public void processNames(List<String> names) {
    // 使用 CollectionUtils 或 Stream API
    List<String> safeNames = Optional.ofNullable(names)
            .orElse(Collections.emptyList());
    
    safeNames.stream()
            .filter(Objects::nonNull)
            .forEach(this::processName);
}

// ✅ 正确：使用 Apache Commons 或 Spring 工具类
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.util.CollectionUtils;

public void processNames(List<String> names) {
    if (CollectionUtils.isEmpty(names)) {
        return;  // 安全处理空集合
    }
    // 处理逻辑
}
```

---

## 六、测试中的常见陷阱

### 6.1 Mockito 配置错误

**常见问题：**
```java
// ❌ 错误：Mockito 注解未生效
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;  // 未初始化
    
    @InjectMocks
    private UserService userService;  // 依赖未注入
    
    @Test
    void testGetUser() {
        // userRepository 为 null，导致 NPE
        userService.getUser(1L);
    }
}

// ✅ 正确：初始化 Mockito 注解
@ExtendWith(MockitoExtension.class)  // JUnit 5
// 或 @RunWith(MockitoJUnitRunner.class)  // JUnit 4
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @BeforeEach
    void setUp() {
        // 如果有额外初始化，可以在这里进行
        // MockitoAnnotations.openMocks(this);  // 手动初始化
    }
    
    @Test
    void testGetUser() {
        // 配置 Mock
        when(userRepository.findById(1L))
                .thenReturn(Optional.of(new User()));
        
        // 执行测试
        User user = userService.getUser(1L);
        
        // 验证
        assertNotNull(user);
        verify(userRepository).findById(1L);
    }
}
```

### 6.2 测试数据清理

**数据库测试注意事项：**
```java
// ❌ 错误：测试数据未清理
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void testSaveUser() {
        User user = new User("test");
        userRepository.save(user);
        // 测试后数据留在数据库中，影响其他测试
    }
}

// ✅ 正确：使用事务回滚
@DataJpaTest
@Transactional  // 测试后自动回滚
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void testSaveUser() {
        User user = new User("test");
        userRepository.save(user);
        
        // 验证
        assertTrue(userRepository.existsById(user.getId()));
        // 测试结束后自动回滚，数据库状态不变
    }
}

// ✅ 正确：使用 @DirtiesContext
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class IntegrationTest {
    // 每个测试方法后重新加载 Spring 上下文
    // 注意：性能开销较大
}

// ✅ 正确：手动清理
@DataJpaTest
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    
    @AfterEach
    void tearDown() {
        userRepository.deleteAll();  // 手动清理
    }
}
```

### 6.3 集成测试环境配置

**多环境测试配置：**
```java
// ✅ 正确：测试配置文件
// src/test/resources/application-test.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb;MODE=MySQL
    driver-class-name: org.h2.Driver
    username: sa
    password: 
  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: create-drop
    show-sql: true

// 使用 Testcontainers 进行真实数据库测试
@Testcontainers
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:13")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");
    
    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }
    
    // 测试方法...
}
```

---

## 七、配置文件细节

### 7.1 YAML 格式问题

**常见错误：**
```yaml
# ❌ 错误：缩进不一致
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db
      username: root  # 错误：缩进多了
    password: 123456

# ❌ 错误：错误的值类型
server:
  port: "8080"  # 应该是数字，不是字符串

# ✅ 正确：规范的 YAML 格式
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/blog_db?useSSL=false&serverTimezone=UTC
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      connection-timeout: 30000
      maximum-pool-size: 10
  
  jpa:
    hibernate:
      ddl-auto: update  # 开发环境使用 update，生产环境使用 validate
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true
    show-sql: true
  
  # 多环境配置
  profiles:
    active: dev

# 使用 --- 分隔文档块
---
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: jdbc:mysql://prod-db:3306/blog_db
```

### 7.2 环境变量注入

**正确使用环境变量：**
```java
// ✅ 正确：使用 @Value 注入
@Component
public class ApiConfig {
    @Value("${api.base-url:https://api.example.com}")  // 默认值
    private String apiBaseUrl;
    
    @Value("${api.timeout:5000}")
    private int timeout;
}

// ✅ 正确：使用 @ConfigurationProperties
@ConfigurationProperties(prefix = "app.mail")
@Component
@Data  // Lombok
public class MailProperties {
    private String host = "smtp.gmail.com";  // 默认值
    private int port = 587;
    private String username;
    private String password;
    private boolean debug = false;
}

// application.yml 配置：
app:
  mail:
    host: smtp.gmail.com
    port: 587
    username: ${MAIL_USERNAME:default@gmail.com}  # 环境变量优先
    password: ${MAIL_PASSWORD}
    debug: true

// 系统环境变量设置：
// export MAIL_USERNAME=myemail@gmail.com
// export MAIL_PASSWORD=mypassword
```

### 7.3 配置类注意事项

**配置类最佳实践：**
```java
// ✅ 正确：使用 @Configuration 和 @Bean
@Configuration
@EnableConfigurationProperties(MailProperties.class)  // 启用配置属性
public class AppConfig {
    
    @Bean
    @ConditionalOnMissingBean  // 如果不存在则创建
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        return mapper;
    }
    
    @Bean
    @ConditionalOnProperty(name = "app.cache.enabled", havingValue = "true")
    public CacheManager cacheManager() {
        // 根据配置决定是否创建缓存管理器
        return new ConcurrentMapCacheManager("users", "posts");
    }
    
    // 多环境配置
    @Bean
    @Profile("dev")  // 仅开发环境
    public DataSource devDataSource() {
        // 开发环境数据源
    }
    
    @Bean
    @Profile("prod")  // 仅生产环境
    public DataSource prodDataSource() {
        // 生产环境数据源
    }
}
```

---

## 八、前端开发注意点

### 8.1 React Hooks 依赖项

**useEffect 依赖项问题：**
```javascript
// ❌ 错误：缺少依赖项导致 stale closure
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        // 缺少 userId 依赖，当 userId 变化时不会重新获取
        fetchUser(userId).then(setUser);
    }, []);  // 空依赖数组
    
    return <div>{user?.name}</div>;
}

// ✅ 正确：包含所有依赖
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        if (!userId) return;
        
        fetchUser(userId).then(setUser);
    }, [userId]);  // 包含 userId 依赖
    
    return <div>{user?.name}</div>;
}

// ✅ 正确：使用 useCallback 避免重复创建函数
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    
    const fetchUserData = useCallback(async () => {
        if (!userId) return;
        const data = await fetchUser(userId);
        setUser(data);
    }, [userId]);  // 依赖项正确
    
    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);  // 依赖 fetchUserData
    
    return <div>{user?.name}</div>;
}
```

### 8.2 状态更新时机

**异步状态更新问题：**
```javascript
// ❌ 错误：连续设置状态
function Counter() {
    const [count, setCount] = useState(0);
    
    const incrementTwice = () => {
        setCount(count + 1);  // count 是闭包中的旧值
        setCount(count + 1);  // 仍然是旧值，不会累加
    };
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={incrementTwice}>+2</button>
        </div>
    );
}

// ✅ 正确：使用函数式更新
function Counter() {
    const [count, setCount] = useState(0);
    
    const incrementTwice = () => {
        setCount(prev => prev + 1);  // 使用前一个状态
        setCount(prev => prev + 1);  // 正确累加
    };
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={incrementTwice}>+2</button>
        </div>
    );
}

// ✅ 正确：批量更新
function UserForm() {
    const [user, setUser] = useState({ name: '', email: '' });
    
    const handleChange = (field, value) => {
        setUser(prev => ({
            ...prev,
            [field]: value
        }));  // 合并更新
    };
    
    // 而不是：
    // setUser({ ...user, name: value });  // 可能使用旧状态
}
```

### 8.3 API 调用错误处理

**完整的 API 调用模式：**
```javascript
// ✅ 正确：使用 async/await 和错误处理
function useUserData(userId) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;
            
            setLoading(true);
            setError(null);
            
            try {
                const response = await fetch(`/api/users/${userId}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
                console.error('Failed to fetch user:', err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [userId]);
    
    return { data, loading, error };
}

// ✅ 正确：使用 AbortController 取消请求
function useUserData(userId) {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const abortController = new AbortController();
        
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`, {
                    signal: abortController.signal
                });
                
                const result = await response.json();
                setData(result);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Failed to fetch user:', err);
                }
            }
        };
        
        if (userId) {
            fetchData();
        }
        
        return () => {
            abortController.abort();  // 组件卸载时取消请求
        };
    }, [userId]);
    
    return data;
}
```

---

## 九、数据库相关

### 9.1 实体类与数据库映射

**JPA 实体常见问题：**
```java
// ❌ 错误：缺少必要的注解
public class User {
    private Long id;  // 缺少 @Id
    private String name;
    // 默认表名为 user，但在某些数据库中可能是关键字
}

// ❌ 错误：错误的关联映射
@Entity
public class Order {
    @OneToMany
    private List<OrderItem> items;  // 缺少 mappedBy，会创建中间表
    
    // 未指定级联操作和加载策略
}

// ✅ 正确：完整的实体定义
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "app_user")  // 避免使用数据库关键字
@Data  // Lombok
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_name", nullable = false, length = 50)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

// ✅ 正确：关联映射
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();
    
    @ManyToOne(fetch = FetchType.LAZY)  // 推荐懒加载
    @JoinColumn(name = "user_id")
    private User user;
    
    // 辅助方法维护双向关联
    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }
}
```

### 9.2 枚举类型处理

**枚举映射策略：**
```java
// ❌ 错误：枚举使用默认映射
public enum OrderStatus {
    PENDING,   // 数据库存储为 0
    PAID,      // 数据库存储为 1
    SHIPPED,   // 数据库存储为 2
    DELIVERED  // 数据库存储为 3
}

@Entity
public class Order {
    private OrderStatus status;  // 默认使用 ORDINAL，修改顺序会破坏数据
}

// ✅ 正确：使用 STRING 类型
public enum OrderStatus {
    PENDING("pending"),
    PAID("paid"),
    SHIPPED("shipped"),
    DELIVERED("delivered");
    
    private final String code;
    
    OrderStatus(String code) {
        this.code = code;
    }
    
    public String getCode() {
        return code;
    }
}

@Entity
public class Order {
    @Enumerated(EnumType.STRING)  // 存储为字符串
    @Column(name = "status", length = 20)
    private OrderStatus status;
}

// ✅ 正确：使用自定义转换器
@Converter(autoApply = true)
public class OrderStatusConverter implements AttributeConverter<OrderStatus, String> {
    @Override
    public String convertToDatabaseColumn(OrderStatus status) {
        return status != null ? status.getCode() : null;
    }
    
    @Override
    public OrderStatus convertToEntityAttribute(String code) {
        if (code == null) return null;
        
        return Arrays.stream(OrderStatus.values())
                .filter(s -> s.getCode().equals(code))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("未知状态: " + code));
    }
}
```

### 9.3 乐观锁配置

**防止并发更新问题：**
```java
// ✅ 正确：使用 @Version 实现乐观锁
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @Column(name = "stock_quantity")
    private Integer stockQuantity;
    
    @Version  // 乐观锁版本字段
    private Integer version;
    
    // 减少库存的方法，考虑并发
    public boolean reduceStock(Integer quantity) {
        if (stockQuantity < quantity) {
            return false;
        }
        
        this.stockQuantity -= quantity;
        return true;
    }
}

// 使用示例：
@Service
@Transactional
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    
    public boolean purchase(Long productId, Integer quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessException("PRODUCT_NOT_FOUND"));
        
        // 在事务中处理，如果版本冲突会抛出 OptimisticLockingFailureException
        boolean success = product.reduceStock(quantity);
        
        if (success) {
            productRepository.save(product);  // 保存时会检查版本
            return true;
        }
        
        return false;
    }
}

// 处理乐观锁异常：
@ExceptionHandler(OptimisticLockingFailureException.class)
public ResponseEntity<ApiResponse<?>> handleOptimisticLockingFailure(
        OptimisticLockingFailureException ex) {
    
    log.warn("乐观锁异常: {}", ex.getMessage());
    
    return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(ApiResponse.error(
                    "CONCURRENT_MODIFICATION",
                    "数据已被其他用户修改，请刷新后重试"
            ));
}
```

---

## 总结

AI 生成代码时容易忽视的细节问题主要集中在：

1. **Import 和依赖**：缺少必要的导入语句，依赖版本冲突
2. **注解使用**：注解配置错误，作用域不当
3. **异常处理**：异常类型选择不当，错误信息不完整
4. **空值处理**：未考虑空值情况，导致 NPE
5. **测试配置**：测试环境配置错误，测试数据污染
6. **并发问题**：未考虑线程安全，缺少锁机制
7. **数据库映射**：ORM 配置错误，性能问题
8. **前端状态管理**：状态更新时机错误，内存泄漏

开发时应特别注意这些方面，结合本文档提供的示例和解决方案，可以有效避免常见错误，提高代码质量。

**最后提醒：**
- 始终检查生成的代码是否包含必要的 import 语句
- 验证注解配置是否符合框架要求
- 考虑边界情况和异常场景
- 编写全面的单元测试
- 进行代码审查，特别是 AI 生成的代码

---
**文档版本：** v1.0  
**更新日期：** 2025-12-23  
**适用范围：** 个人博客项目全栈开发
