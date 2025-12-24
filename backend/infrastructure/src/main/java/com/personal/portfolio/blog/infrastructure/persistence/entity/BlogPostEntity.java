package com.personal.portfolio.blog.infrastructure.persistence.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.personal.portfolio.blog.domain.model.BlogPost;

import io.github.linpeilie.annotations.AutoMapper;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 博客文章持久化实体
 * 包含MyBatis Plus注解，专注于数据存储
 */
@Getter
@Setter
@TableName("blog_posts")
@AutoMapper(target = BlogPost.class)
public class BlogPostEntity {
    
    @TableId(type = IdType.AUTO)
    private Long id;

    @TableField("title")
    private String title;

    @TableField("slug")
    private String slug;

    @TableField("content")
    private String content;
    
    @TableField("summary")
    private String summary;
    
    @TableField("cover_file_path")
    private String coverFilePath;
    
    @TableField("category")
    private String category;
    
    @TableField("is_published")
    private Boolean isPublished;
    
    @TableField("view_count")
    private Integer viewCount;
    
    @TableField("like_count")
    private Integer likeCount;
    
    @TableField("comment_count")
    private Integer commentCount;

    @TableField(value = "created_at", fill = FieldFill.INSERT)
    private LocalDateTime createdAt;

    @TableField(value = "updated_at", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
    
    @TableField("published_at")
    private LocalDateTime publishedAt;
    
    @TableField("author_id")
    private Long authorId;
    
    @TableField("category_id")
    private Long categoryId;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> tags;
    
    /**
     * 默认构造函数
     */
    public BlogPostEntity() {
        this.isPublished = false;
        this.viewCount = 0;
        this.likeCount = 0;
        this.commentCount = 0;
    }
}
