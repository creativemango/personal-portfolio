# 数据库表结构设计文档

## 概述
本文档描述了个人博客系统的数据库表结构设计，使用H2内存数据库。

## 表结构

### 1. users (用户表)
| 字段名 | 类型 | 长度 | 约束 | 描述 |
|--------|------|------|------|------|
| id | BIGINT | - | PRIMARY KEY, AUTO_INCREMENT | 用户ID |
| username | VARCHAR | 50 | UNIQUE, NOT NULL | 用户名 |
| email | VARCHAR | 100 | UNIQUE, NOT NULL | 邮箱 |
| password | VARCHAR | 255 | NOT NULL | 密码 |
| display_name | VARCHAR | 100 | - | 显示名称 |
| avatar_url | VARCHAR | 255 | - | 头像URL |
| bio | VARCHAR | 500 | - | 个人简介 |
| role | VARCHAR | 20 | NOT NULL | 角色 |
| is_active | BOOLEAN | - | NOT NULL | 是否激活 |
| created_at | TIMESTAMP | - | NOT NULL | 创建时间 |
| updated_at | TIMESTAMP | - | NOT NULL | 更新时间 |

### 2. categories (分类表)
| 字段名 | 类型 | 长度 | 约束 | 描述 |
|--------|------|------|------|------|
| id | BIGINT | - | PRIMARY KEY, AUTO_INCREMENT | 分类ID |
| name | VARCHAR | 50 | UNIQUE, NOT NULL | 分类名称 |
| slug | VARCHAR | 50 | UNIQUE, NOT NULL | 分类别名 |
| description | VARCHAR | 200 | - | 分类描述 |
| color | VARCHAR | 7 | - | 分类颜色 |
| is_active | BOOLEAN | - | NOT NULL | 是否激活 |
| created_at | TIMESTAMP | - | NOT NULL | 创建时间 |
| updated_at | TIMESTAMP | - | NOT NULL | 更新时间 |

### 3. blog_posts (博客文章表)
| 字段名 | 类型 | 长度 | 约束 | 描述 |
|--------|------|------|------|------|
| id | BIGINT | - | PRIMARY KEY, AUTO_INCREMENT | 文章ID |
| title | VARCHAR | 200 | NOT NULL | 文章标题 |
| slug | VARCHAR | 200 | UNIQUE, NOT NULL | 文章别名 |
| content | TEXT | - | NOT NULL | 文章内容 |
| summary | VARCHAR | 500 | - | 文章摘要 |
| cover_image | VARCHAR | 255 | - | 封面图片 |
| is_published | BOOLEAN | - | NOT NULL | 是否发布 |
| view_count | INTEGER | - | NOT NULL | 浏览量 |
| like_count | INTEGER | - | NOT NULL | 点赞数 |
| comment_count | INTEGER | - | NOT NULL | 评论数 |
| created_at | TIMESTAMP | - | NOT NULL | 创建时间 |
| updated_at | TIMESTAMP | - | NOT NULL | 更新时间 |
| published_at | TIMESTAMP | - | - | 发布时间 |
| author_id | BIGINT | - | FOREIGN KEY, NOT NULL | 作者ID |
| category_id | BIGINT | - | FOREIGN KEY | 分类ID |

### 4. comments (评论表)
| 字段名 | 类型 | 长度 | 约束 | 描述 |
|--------|------|------|------|------|
| id | BIGINT | - | PRIMARY KEY, AUTO_INCREMENT | 评论ID |
| content | TEXT | - | NOT NULL | 评论内容 |
| is_approved | BOOLEAN | - | NOT NULL | 是否批准 |
| like_count | INTEGER | - | NOT NULL | 点赞数 |
| created_at | TIMESTAMP | - | NOT NULL | 创建时间 |
| updated_at | TIMESTAMP | - | NOT NULL | 更新时间 |
| author_id | BIGINT | - | FOREIGN KEY, NOT NULL | 作者ID |
| blog_post_id | BIGINT | - | FOREIGN KEY, NOT NULL | 文章ID |
| parent_comment_id | BIGINT | - | FOREIGN KEY | 父评论ID |

## 关系说明

### 一对多关系
1. **用户 ↔ 文章**: 一个用户可以写多篇文章
2. **用户 ↔ 评论**: 一个用户可以发表多条评论
3. **分类 ↔ 文章**: 一个分类可以包含多篇文章
4. **文章 ↔ 评论**: 一篇文章可以有多个评论
5. **评论 ↔ 评论**: 一个评论可以有多个回复（自关联）

### 外键约束
- `blog_posts.author_id` → `users.id`
- `blog_posts.category_id` → `categories.id`
- `comments.author_id` → `users.id`
- `comments.blog_post_id` → `blog_posts.id`
- `comments.parent_comment_id` → `comments.id`

## 索引建议
1. `users.username` - 唯一索引
2. `users.email` - 唯一索引
3. `categories.name` - 唯一索引
4. `categories.slug` - 唯一索引
5. `blog_posts.slug` - 唯一索引
6. `blog_posts.author_id` - 外键索引
7. `blog_posts.category_id` - 外键索引
8. `comments.blog_post_id` - 外键索引
9. `comments.author_id` - 外键索引

## 实体类对应关系
- `User` → `users` 表
- `Category` → `categories` 表
- `BlogPost` → `blog_posts` 表
- `Comment` → `comments` 表
