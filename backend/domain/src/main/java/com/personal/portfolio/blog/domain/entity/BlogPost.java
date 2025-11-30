package com.personal.portfolio.blog.domain.entity;

import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import lombok.Getter;
import lombok.Setter;
import com.baomidou.mybatisplus.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 博客文章实体类
 */
@TableName("blog_posts")
@Getter
@Setter
public class BlogPost {
    
    /**
     * 文章ID，主键，自增
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 文章标题，必填，最大长度200字符
     */
    private String title;
    
    /**
     * 文章别名，用于URL，唯一，必填，最大长度200字符
     */
    private String slug;
    
    /**
     * 文章内容，必填，TEXT类型
     */
    private String content;
    
    /**
     * 文章摘要，可选，最大长度500字符
     */
    private String summary;
    
    /**
     * 封面图片URL，可选，最大长度255字符
     */
    private String coverImage;
    
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
     * 分类名称，可选
     */
    private String category;
    
    /**
     * 标签列表，可选
     */
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> tags;
    
    public BlogPost() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public BlogPost(String title, String slug, String content, Long authorId) {
        this();
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.authorId = authorId;
    }
    
    /**
     * 发布博客文章
     */
    public void publish() {
        this.isPublished = true;
        this.publishedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
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
    public void updateContent(String title, String slug, String content, String summary, String coverImage, String category, List<String> tags) {
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.summary = summary;
        this.coverImage = coverImage;
        this.category = category;
        this.tags = tags;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 增加浏览量
     */
    public void incrementViewCount() {
        this.viewCount++;
    }
    
    /**
     * 增加点赞数
     */
    public void incrementLikeCount() {
        this.likeCount++;
    }
    
    /**
     * 减少点赞数
     */
    public void decrementLikeCount() {
        if (this.likeCount > 0) {
            this.likeCount--;
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
     * 验证博客文章是否有效
     */
    public boolean isValid() {
        return title != null && !title.trim().isEmpty() &&
               slug != null && !slug.trim().isEmpty() &&
               content != null && !content.trim().isEmpty() &&
               authorId != null;
    }
    
    /**
     * 更新前自动设置更新时间
     */
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
