package com.personal.portfolio.blog.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 博客文章实体类
 */
@Entity
@Table(name = "blog_posts")
@Getter
@Setter
public class BlogPost {
    
    /**
     * 文章ID，主键，自增
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    /**
     * 文章标题，必填，最大长度200字符
     */
    @Column(name = "title", nullable = false, length = 200)
    private String title;
    
    /**
     * 文章别名，用于URL，唯一，必填，最大长度200字符
     */
    @Column(name = "slug", unique = true, nullable = false, length = 200)
    private String slug;
    
    /**
     * 文章内容，必填，TEXT类型
     */
    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;
    
    /**
     * 文章摘要，可选，最大长度500字符
     */
    @Column(name = "summary", length = 500)
    private String summary;
    
    /**
     * 封面图片URL，可选，最大长度255字符
     */
    @Column(name = "cover_image", length = 255)
    private String coverImage;
    
    /**
     * 是否已发布，默认未发布
     */
    @Column(name = "is_published", nullable = false)
    private Boolean isPublished = false;
    
    /**
     * 浏览量，默认0
     */
    @Column(name = "view_count", nullable = false)
    private Integer viewCount = 0;
    
    /**
     * 点赞数，默认0
     */
    @Column(name = "like_count", nullable = false)
    private Integer likeCount = 0;
    
    /**
     * 评论数，默认0
     */
    @Column(name = "comment_count", nullable = false)
    private Integer commentCount = 0;
    
    /**
     * 创建时间，必填
     */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    /**
     * 更新时间，必填
     */
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    /**
     * 发布时间，可选
     */
    @Column(name = "published_at")
    private LocalDateTime publishedAt;
    
    /**
     * 作者，多对一关系，必填
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
    
    /**
     * 分类，多对一关系，可选
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    
    /**
     * 评论列表，一对多关系
     */
    @OneToMany(mappedBy = "blogPost", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();
    
    public BlogPost() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public BlogPost(String title, String slug, String content, User author) {
        this();
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.author = author;
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
    public void updateContent(String title, String slug, String content, String summary, String coverImage) {
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.summary = summary;
        this.coverImage = coverImage;
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
               author != null;
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
