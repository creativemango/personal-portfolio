package com.personal.portfolio.blog.domain.model;

import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.personal.portfolio.blog.domain.event.BlogPostCreatedEvent;
import com.personal.portfolio.blog.domain.event.BlogPostPublishedEvent;
import com.personal.portfolio.blog.domain.model.valueobject.Title;
import com.personal.portfolio.blog.domain.model.valueobject.Slug;
import com.personal.portfolio.blog.domain.model.valueobject.Content;
import lombok.Getter;
import com.baomidou.mybatisplus.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 博客文章实体类 - 充血模型实现
 */
@TableName("blog_posts")
@Getter
public class BlogPost {
    
    /**
     * 文章ID，主键，自增
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 文章标题值对象
     */
    @TableField(exist = false)
    private Title title;
    
    /**
     * 文章别名值对象，用于URL
     */
    @TableField(exist = false)
    private Slug slug;
    
    /**
     * 文章内容值对象
     */
    @TableField(exist = false)
    private Content content;
    
    /**
     * 文章摘要，可选，最大长度500字符
     */
    private String summary;
    
    /**
     * 封面图片URL，可选，最大长度255字符
     */
    private String coverImage;
    
    /**
     * 分类名称，可选
     */
    private String category;
    
    /**
     * 是否已发布，默认未发布
     */
    private Boolean isPublished = false;
    
    /**
     * 浏览量，默认0
     */
    private Integer viewCount = 0;
    
    /**
     * 点赞数，默认0
     */
    private Integer likeCount = 0;
    
    /**
     * 评论数，默认0
     */
    private Integer commentCount = 0;
    
    /**
     * 创建时间，必填
     */
    private LocalDateTime createdAt;
    
    /**
     * 更新时间，必填
     */
    private LocalDateTime updatedAt;
    
    /**
     * 发布时间，可选
     */
    private LocalDateTime publishedAt;
    
    /**
     * 作者ID，必填
     */
    private Long authorId;
    
    /**
     * 分类ID，可选
     */
    private Long categoryId;
    
    
    /**
     * 标签列表，可选
     */
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> tags;
    
    /**
     * 领域事件列表（非持久化）
     */
    @TableField(exist = false)
    private transient List<Object> domainEvents = new ArrayList<>();
    
    // MyBatis Plus需要的持久化字段
    @TableField("title")
    private String titleValue;
    
    @TableField("slug")
    private String slugValue;
    
    @TableField("content")
    private String contentValue;
    
    /**
     * 保护性构造函数（JPA/MyBatis需要）
     */
    protected BlogPost() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.tags = new ArrayList<>();
    }
    
    /**
     * 工厂方法：创建新的博客文章
     */
    public static BlogPost create(Title title, Slug slug, Content content, Long authorId) {
        BlogPost blogPost = new BlogPost();
        blogPost.title = title;
        blogPost.slug = slug;
        blogPost.content = content;
        blogPost.authorId = authorId;
        
        // 同步持久化字段
        blogPost.titleValue = title.getValue();
        blogPost.slugValue = slug.getValue();
        blogPost.contentValue = content.getValue();
        
        // 注册博客创建领域事件（ID将在保存后设置）
        blogPost.registerEvent(new BlogPostCreatedEvent(null, title.getValue(), authorId, blogPost.createdAt));
        
        return blogPost;
    }
    
    /**
     * 工厂方法：从基本类型创建（用于兼容旧代码）
     */
    public static BlogPost create(String title, String slug, String content, Long authorId) {
        return create(
            Title.of(title),
            Slug.of(slug),
            Content.of(content),
            authorId
        );
    }
    
    /**
     * 注册领域事件
     */
    public void registerEvent(Object event) {
        if (domainEvents == null) {
            domainEvents = new ArrayList<>();
        }
        domainEvents.add(event);
    }
    
    /**
     * 获取并清空领域事件列表
     */
    public List<Object> getAndClearDomainEvents() {
        List<Object> events = new ArrayList<>(domainEvents);
        domainEvents.clear();
        return events;
    }
    
    /**
     * 获取领域事件列表（不清空）
     */
    public List<Object> getDomainEvents() {
        return new ArrayList<>(domainEvents);
    }
    
    /**
     * 发布博客文章
     */
    public void publish() {
        validateCanPublish();
        
        this.isPublished = true;
        this.publishedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        
        // 注册博客发布领域事件
        registerEvent(new BlogPostPublishedEvent(this.id, this.title.getValue(), this.authorId, this.publishedAt));
    }
    
    /**
     * 取消发布博客文章
     */
    public void unpublish() {
        this.isPublished = false;
        this.publishedAt = null;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 更新博客内容
     */
    public void updateContent(Title newTitle, Slug newSlug, Content newContent, String summary, 
                             String coverImage, String category, List<String> tags) {
        validateCanUpdate();
        
        this.title = newTitle;
        this.slug = newSlug;
        this.content = newContent;
        this.summary = summary;
        this.coverImage = coverImage;
        this.category = category;
        this.tags = tags != null ? new ArrayList<>(tags) : new ArrayList<>();
        this.updatedAt = LocalDateTime.now();
        
        // 同步持久化字段
        this.titleValue = newTitle.getValue();
        this.slugValue = newSlug.getValue();
        this.contentValue = newContent.getValue();
    }
    
    /**
     * 更新博客内容（从基本类型）
     */
    public void updateContent(String title, String slug, String content, String summary, 
                             String coverImage, String category, List<String> tags) {
        updateContent(
            Title.of(title),
            Slug.of(slug),
            Content.of(content),
            summary,
            coverImage,
            category,
            tags
        );
    }
    
    /**
     * 增加浏览量
     */
    public void incrementViewCount() {
        this.viewCount++;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 增加点赞数
     */
    public void incrementLikeCount() {
        this.likeCount++;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 减少点赞数
     */
    public void decrementLikeCount() {
        if (this.likeCount > 0) {
            this.likeCount--;
            this.updatedAt = LocalDateTime.now();
        }
    }
    
    /**
     * 更新评论数
     */
    public void updateCommentCount(int count) {
        this.commentCount = count;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 添加标签
     */
    public void addTag(String tag) {
        if (tag == null || tag.trim().isEmpty()) {
            return;
        }
        
        if (this.tags == null) {
            this.tags = new ArrayList<>();
        }
        
        if (!this.tags.contains(tag.trim())) {
            this.tags.add(tag.trim());
            this.updatedAt = LocalDateTime.now();
        }
    }
    
    /**
     * 移除标签
     */
    public void removeTag(String tag) {
        if (this.tags != null && tag != null) {
            this.tags.remove(tag.trim());
            this.updatedAt = LocalDateTime.now();
        }
    }
    
    /**
     * 获取标签列表（不可修改）
     */
    public List<String> getTags() {
        return Collections.unmodifiableList(tags != null ? tags : new ArrayList<>());
    }
    
    /**
     * 验证博客文章是否有效
     */
    public boolean isValid() {
        return title != null && slug != null && content != null && authorId != null;
    }
    
    /**
     * 判断文章是否已发布
     */
    public boolean isPublished() {
        return Boolean.TRUE.equals(isPublished);
    }
    
    /**
     * 判断文章是否可编辑（未发布或发布时间在24小时内）
     */
    public boolean canBeEdited() {
        if (!isPublished()) {
            return true;
        }
        
        if (publishedAt == null) {
            return true;
        }
        
        return publishedAt.plusHours(24).isAfter(LocalDateTime.now());
    }
    
    /**
     * 判断文章是否热门（浏览量超过1000）
     */
    public boolean isPopular() {
        return viewCount > 1000;
    }
    
    /**
     * 获取文章年龄（天数）
     */
    public long getAgeInDays() {
        if (createdAt == null) {
            return 0;
        }
        return java.time.Duration.between(createdAt, LocalDateTime.now()).toDays();
    }
    
    /**
     * 更新前自动设置更新时间并同步值对象
     */
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
        
        // 同步值对象到持久化字段
        if (this.title != null) {
            this.titleValue = this.title.getValue();
        }
        if (this.slug != null) {
            this.slugValue = this.slug.getValue();
        }
        if (this.content != null) {
            this.contentValue = this.content.getValue();
        }
    }
    
    /**
     * 加载后从持久化字段初始化值对象
     */
    public void postLoad() {
        if (this.titleValue != null) {
            this.title = Title.of(this.titleValue);
        }
        if (this.slugValue != null) {
            this.slug = Slug.of(this.slugValue);
        }
        if (this.contentValue != null) {
            this.content = Content.of(this.contentValue);
        }
        if (this.tags == null) {
            this.tags = new ArrayList<>();
        }
    }
    
    // 私有验证方法
    private void validateCanPublish() {
        if (!isValid()) {
            throw new IllegalStateException("博客文章内容无效，无法发布");
        }
    }
    
    private void validateCanUpdate() {
        if (isPublished() && !canBeEdited()) {
            throw new IllegalStateException("已发布的文章超过24小时编辑期限，无法修改");
        }
    }
    
    // Getter方法（值对象）
    public Title getTitle() {
        return title;
    }
    
    public Slug getSlug() {
        return slug;
    }
    
    public Content getContent() {
        return content;
    }
    
    // 基本类型getter（用于兼容性）
    public String getTitleValue() {
        return title != null ? title.getValue() : titleValue;
    }
    
    public String getSlugValue() {
        return slug != null ? slug.getValue() : slugValue;
    }
    
    public String getContentValue() {
        return content != null ? content.getValue() : contentValue;
    }
    
    // Setter方法（有限制的）
    public void setSummary(String summary) {
        if (summary != null && summary.length() > 500) {
            throw new IllegalArgumentException("摘要长度不能超过500个字符");
        }
        this.summary = summary;
        this.updatedAt = LocalDateTime.now();
    }
    
    public void setCoverImage(String coverImage) {
        if (coverImage != null && coverImage.length() > 255) {
            throw new IllegalArgumentException("封面图片URL长度不能超过255个字符");
        }
        this.coverImage = coverImage;
        this.updatedAt = LocalDateTime.now();
    }
    
    public void setCategory(String category) {
        this.category = category;
        this.updatedAt = LocalDateTime.now();
    }
    
    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
        this.updatedAt = LocalDateTime.now();
    }
}
