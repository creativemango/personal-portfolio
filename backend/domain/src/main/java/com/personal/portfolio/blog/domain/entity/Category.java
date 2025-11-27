package com.personal.portfolio.blog.domain.entity;

import lombok.Getter;
import lombok.Setter;
import com.baomidou.mybatisplus.annotation.*;

import java.time.LocalDateTime;

/**
 * 博客分类实体类
 */
@TableName("categories")
@Getter
@Setter
public class Category {
    
    /**
     * 分类ID，主键，自增
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 分类名称，必填，最大长度50字符
     */
    private String name;
    
    /**
     * 分类别名，用于URL，唯一，必填，最大长度50字符
     */
    private String slug;
    
    /**
     * 分类描述，可选，最大长度200字符
     */
    private String description;
    
    /**
     * 分类颜色，可选，最大长度20字符
     */
    private String color;
    
    /**
     * 排序权重，默认0
     */
    private Integer sortOrder = 0;
    
    /**
     * 是否启用，默认启用
     */
    private Boolean isEnabled = true;
    
    /**
     * 文章数量，默认0
     */
    private Integer postCount = 0;
    
    /**
     * 创建时间，必填
     */
    private LocalDateTime createdAt;
    
    /**
     * 更新时间，必填
     */
    private LocalDateTime updatedAt;
    
    public Category() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Category(String name, String slug) {
        this();
        this.name = name;
        this.slug = slug;
    }
    
    /**
     * 验证分类是否有效
     */
    public boolean isValid() {
        return name != null && !name.trim().isEmpty() &&
               slug != null && !slug.trim().isEmpty();
    }
    
    /**
     * 增加文章数量
     */
    public void incrementPostCount() {
        this.postCount++;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 减少文章数量
     */
    public void decrementPostCount() {
        if (this.postCount > 0) {
            this.postCount--;
            this.updatedAt = LocalDateTime.now();
        }
    }
    
    /**
     * 更新前自动设置更新时间
     */
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
