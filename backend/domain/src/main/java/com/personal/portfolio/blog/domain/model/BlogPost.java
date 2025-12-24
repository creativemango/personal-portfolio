package com.personal.portfolio.blog.domain.model;

import com.personal.portfolio.blog.domain.event.BlogPostCreatedEvent;
import com.personal.portfolio.blog.domain.event.BlogPostPublishedEvent;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 博客文章领域实体 - 纯充血模型实现
 * 不包含任何持久化注解，专注于业务逻辑
 */
@Setter
@Getter
public class BlogPost {
    
    private Long id;
    private String title;
    private String slug;
    private String content;
    private String summary;
    private String coverFilePath;
    private String category;
    private Boolean isPublished;
    private Integer viewCount;
    private Integer likeCount;
    private Integer commentCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime publishedAt;
    private Long authorId;
    private Long categoryId;
    private List<String> tags;
    
    private transient List<Object> domainEvents = new ArrayList<>();
    
    /**
     * 保护性构造函数（用于重建）
     */
    public BlogPost() {
        this.isPublished = false;
        this.viewCount = 0;
        this.likeCount = 0;
        this.commentCount = 0;
        this.tags = new ArrayList<>();
        this.domainEvents = new ArrayList<>();
    }
    
    /**
     * 工厂方法：创建新的博客文章
     */
    public void registerCreateEvent() {
        this.registerEvent(new BlogPostCreatedEvent(null, this.title, this.authorId, this.createdAt));
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
        registerEvent(new BlogPostPublishedEvent(this.id, this.title, this.authorId, this.publishedAt));
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
    public void updateContent(String title, String slug, String content, String summary, 
                             String coverFilePath, String category, List<String> tags) {
        validateCanUpdate();
        
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.summary = summary;
        this.coverFilePath = coverFilePath;
        this.category = category;
        this.tags = tags != null ? new ArrayList<>(tags) : new ArrayList<>();
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 更新封面图片
     */
    public void updateCover(String coverFilePath) {
        validateCanUpdate();
        
        if (coverFilePath == null || coverFilePath.trim().isEmpty()) {
            throw new IllegalArgumentException("封面路径不能为空");
        }
        
        this.coverFilePath = coverFilePath;
        this.updatedAt = LocalDateTime.now();
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
     * 设置封面图片（封装技术细节）
     * @param coverFilePath 封面文件路径
     */
    public void setCoverFromUpload(String coverFilePath) {
        // 业务规则校验
        if (coverFilePath == null || coverFilePath.trim().isEmpty()) {
            throw new IllegalArgumentException("封面路径不能为空");
        }
        // 这里可以添加更多校验，例如路径格式等
        // if (!coverFilePath.matches("...")) { ... }
        
        this.coverFilePath = coverFilePath;
        this.updatedAt = LocalDateTime.now();
        
        // 可选：发布领域事件
        // registerEvent(new BlogPostCoverUpdatedEvent(this.id, coverFilePath));
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
    
}
