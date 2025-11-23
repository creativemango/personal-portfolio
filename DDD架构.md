# 📌 1. DDD 领域架构图（UML）

下面是博客系统的 **领域上下文图（Context Map）**，我用 ASCII 图，为了你可以复制到文档里：

```
                  +-----------------------+
                  |   Configuration BC    |
                  |  - Site settings      |
                  |  - SEO, social links  |
                  +-----------+-----------+
                              |
                              v
+-------------------+     +---+------------------+     +------------------+
|   Auth BC         |     |   User BC           |     |  Media BC         |
| - Login           |<--->| - User Profile      |<--->| - Upload files    |
| - Token (JWT)     |     | - Roles/Permissions |     | - Images, assets  |
+-------------------+     +---------------------+     +-------------------+

                              |
                              v

+-------------------+     +------------------+       +----------------------+
|  Comment BC       |<--->|  Content BC      |<----->| Search BC            |
| - Create comment  |     | - Article        |       | - Index / query      |
| - Reply comment   |     | - Tag / Category |       +----------------------+
| - Audit comment   |     | - Publication    |
+-------------------+     +------------------+

                              |
                              v

+-----------------------+
| Statistics BC         |
| - PV/UV tracking      |
| - Analytics           |
+-----------------------+

                          |
                          v
+------------------------+
| Notification BC        |
| - Email notifications  |
| - Comment notify       |
+------------------------+
```

---

# 📌 2. 聚合 / 实体 / 值对象设计（核心领域）

## ⭐ 2.1 Content（内容领域）—— *核心领域*

### 🔶 Aggregates（聚合根）

#### **Aggregate: Article**

```
Article
 ├── ArticleId (ValueObject)
 ├── Title (ValueObject)
 ├── Content (ValueObject - Markdown/HTML)
 ├── Excerpt (ValueObject)
 ├── CoverImage (ValueObject)
 ├── Status (Draft/Published) (ValueObject)
 ├── Tags (List<TagId>)
 ├── Categories (List<CategoryId>)
 ├── CreatedAt
 ├── UpdatedAt
 └── AuthorId (Entity reference)
```

#### **Aggregate: Tag**

```
Tag
 ├── TagId
 └── Name
```

#### **Aggregate: Category**

```
Category
 ├── CategoryId
 └── Name
```

---

## ⭐ 2.2 Comment（评论领域）

#### **Aggregate: Comment**

```
Comment
 ├── CommentId
 ├── ArticleId
 ├── UserId
 ├── Content (ValueObject)
 ├── ParentId (optional)
 ├── Status (Pending/Approved/Rejected)
 ├── CreatedAt
 └── IPAddress (ValueObject)
```

---

## ⭐ 2.3 User（作者 /登录用户领域）

```
User
 ├── UserId
 ├── Username
 ├── Email
 ├── Role (Admin/Author)
 ├── Avatar (ValueObject)
 └── CreatedAt
```

---

## ⭐ 2.4 Auth（通用鉴权领域）

```
Auth
 ├── Token (ValueObject)
 ├── RefreshToken (ValueObject)
 └── ExpiredAt
```

---

## ⭐ 2.5 Media（文件领域）

```
MediaFile
 ├── FileId
 ├── FileName
 ├── Url
 ├── Size
 └── UploadedAt
```

---

# 📌 3. 实际项目文件结构（两套：Spring Boot + NestJS）

---

# ⭐ 3.1 Spring Boot (Java) - 完整 DDD 项目结构

```
src
└── main
    ├── java/com/example/blog
    │   ├── common/                  # 通用工具
    │   ├── shared/                  # shared kernel
    │   │   ├── domain
    │   │   │   ├── ValueObject.java
    │   │   │   └── Entity.java
    │   │   └── exceptions
    │   │
    │   ├── content/
    │   │   ├── domain/
    │   │   │   ├── model/           # Article, Tag, Category
    │   │   │   ├── service/         # Domain service
    │   │   │   └── repository/      # Repository interface
    │   │   ├── application/         # Use cases
    │   │   ├── infra/               # Repository impl + DB
    │   │   └── api/                 # Controllers
    │   │
    │   ├── comment/
    │   │   ├── domain/  
    │   │   ├── application/
    │   │   ├── infra/
    │   │   └── api/
    │   │
    │   ├── user/
    │   ├── auth/
    │   ├── media/
    │   ├── search/
    │   ├── notification/
    │   └── statistics/
    │
    └── resources/
```

---

# ⭐ 3.2 NestJS - 完整 DDD 项目结构

```
src
├── shared/
│   ├── domain/
│   │   ├── base.entity.ts
│   │   └── base.vo.ts
│   ├── utils/
│   └── exceptions/
│
├── content/
│   ├── domain/
│   │   ├── article.ts
│   │   ├── tag.ts
│   │   ├── category.ts
│   │   └── article.repository.ts
│   ├── application/
│   │   ├── article.service.ts
│   │   └── commands/
│   ├── infra/
│   │   ├── article.orm-entity.ts
│   │   ├── article.repository.impl.ts
│   │   └── content.module.ts
│   └── api/
│       └── article.controller.ts
│
├── comment/
├── user/
├── auth/
├── media/
├── search/
├── notification/
└── statistics/
```

---

# 📌 4. 可直接复制的“博客项目 DDD 模板”（带示例代码）

---

## ⭐ 4.1 Domain Entity（Java 示例）

### Article.java

```java
public class Article extends AggregateRoot {

    private ArticleId id;
    private Title title;
    private ContentBody content;
    private Excerpt excerpt;
    private ArticleStatus status;
    private List<TagId> tags;
    private List<CategoryId> categories;
    private UserId authorId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public void publish() {
        if (status == ArticleStatus.DRAFT) {
            this.status = ArticleStatus.PUBLISHED;
            this.updatedAt = LocalDateTime.now();
        }
    }
}
```

---

## ⭐ 4.2 Repository Interface

```java
public interface ArticleRepository {
    Optional<Article> findById(ArticleId id);
    void save(Article article);
    List<Article> findByTag(TagId tagId);
}
```

---

## ⭐ 4.3 Application Service

```java
@Service
public class ArticleApplicationService {

    private final ArticleRepository repo;

    public ArticleApplicationService(ArticleRepository repo) {
        this.repo = repo;
    }

    public ArticleId createArticle(CreateArticleCommand cmd) {
        Article article = Article.create(
            new Title(cmd.title()),
            new ContentBody(cmd.content()),
            cmd.authorId()
        );
        repo.save(article);
        return article.getId();
    }

    public void publishArticle(String id) {
        Article article = repo.findById(new ArticleId(id))
                .orElseThrow(NotFoundException::new);
        article.publish();
        repo.save(article);
    }
}
```

---

## ⭐ 4.4 Controller

```java
@RestController
@RequestMapping("/articles")
public class ArticleController {

    private final ArticleApplicationService app;

    @PostMapping
    public ArticleId create(@RequestBody CreateArticleCommand cmd) {
        return app.createArticle(cmd);
    }

    @PostMapping("/{id}/publish")
    public void publish(@PathVariable String id) {
        app.publishArticle(id);
    }
}
```


