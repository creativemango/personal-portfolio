package com.personal.portfolio.blog.domain.repository;

import com.personal.portfolio.blog.domain.entity.BlogPost;

import java.util.List;
import java.util.Optional;

/**
 * 博客文章仓储接口 - 领域层定义，基础设施层实现
 * 采用依赖倒置原则
 */
public interface BlogPostRepository {
    
    /**
     * 保存博客文章
     */
    BlogPost save(BlogPost blogPost);
    
    /**
     * 根据ID查找博客文章
     */
    Optional<BlogPost> findById(Long id);
    
    /**
     * 查找所有博客文章
     */
    List<BlogPost> findAll();
    
    /**
     * 查找已发布的博客文章
     */
    List<BlogPost> findPublishedPosts();
    
    /**
     * 根据作者查找博客文章
     */
    List<BlogPost> findByAuthor(String author);
    
    /**
     * 删除博客文章
     */
    void delete(Long id);
    
    /**
     * 检查标题是否已存在
     */
    boolean existsByTitle(String title);
}
