package com.personal.portfolio.blog.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 分类实体类
 */
@Entity
@Table(name = "categories")
@Getter
@Setter
public class Category {
    
    /**
     * 分类ID，主键，自增
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    /**
     * 分类名称，唯一，必填，最大长度50字符
     */
    @Column(name = "name", unique = true, nullable = false, length = 50)
    private String name;
    
    /**
     * 分类别名，用于URL，唯一，必填，最大长度50字符
     */
    @Column(name = "slug", unique = true, nullable = false, length = 50)
    private String slug;
    
    /**
     * 分类描述，可选，最大长度200字符
     */
    @Column(name = "description", length = 200)
    private String description;
    
    /**
     * 分类颜色，可选，最大长度7字符（十六进制颜色代码）
     */
    @Column(name = "color", length = 7)
    private String color;
    
    /**
     * 是否激活，默认激活
     */
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
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
     * 博客文章列表，一对多关系
     */
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BlogPost> blogPosts = new ArrayList<>();
    
    public Category() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Category(String name, String slug, String description) {
        this();
        this.name = name;
        this.slug = slug;
        this.description = description;
    }
    
    public Category(String name, String slug, String description, String color) {
        this(name, slug, description);
        this.color = color;
    }
    
    /**
     * 更新分类信息
     */
    public void updateCategory(String name, String slug, String description, String color) {
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.color = color;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 激活分类
     */
    public void activate() {
        this.isActive = true;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 停用分类
     */
    public void deactivate() {
        this.isActive = false;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 验证分类信息是否有效
     */
    public boolean isValid() {
        return name != null && !name.trim().isEmpty() &&
               slug != null && !slug.trim().isEmpty();
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
