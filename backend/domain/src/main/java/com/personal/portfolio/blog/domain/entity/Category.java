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
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", unique = true, nullable = false, length = 50)
    private String name;
    
    @Column(name = "slug", unique = true, nullable = false, length = 50)
    private String slug;
    
    @Column(name = "description", length = 200)
    private String description;
    
    @Column(name = "color", length = 7)
    private String color;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
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
