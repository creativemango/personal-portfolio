package com.personal.portfolio.blog.application.service;

import com.personal.portfolio.blog.domain.entity.BlogPost;
import com.personal.portfolio.blog.domain.repository.BlogPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

/**
 * 博客文章应用服务 - 协调领域对象和基础设施
 */
@Service
@RequiredArgsConstructor
public class BlogPostService {
    
    private final BlogPostRepository blogPostRepository;
    
    /**
     * 创建博客文章
     */
    public BlogPost createBlogPost(String title, String content, String author) {
        // 检查标题是否已存在
        if (blogPostRepository.existsByTitle(title)) {
            throw new IllegalArgumentException("博客标题已存在: " + title);
        }
        
        BlogPost blogPost = new BlogPost(title, content, author);
        
        // 验证博客文章是否有效
        if (!blogPost.isValid()) {
            throw new IllegalArgumentException("博客文章内容无效");
        }
        
        return blogPostRepository.save(blogPost);
    }
    
    /**
     * 发布博客文章
     */
    public BlogPost publishBlogPost(UUID id) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("博客文章不存在: " + id));
        
        blogPost.publish();
        return blogPostRepository.save(blogPost);
    }
    
    /**
     * 获取所有博客文章
     */
    public List<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }
    
    /**
     * 获取已发布的博客文章
     */
    public List<BlogPost> getPublishedBlogPosts() {
        return blogPostRepository.findPublishedPosts();
    }
    
    /**
     * 根据ID获取博客文章
     */
    public BlogPost getBlogPostById(UUID id) {
        return blogPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("博客文章不存在: " + id));
    }
    
    /**
     * 更新博客文章
     */
    public BlogPost updateBlogPost(UUID id, String title, String content) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("博客文章不存在: " + id));
        
        // 检查新标题是否与其他文章冲突
        if (!blogPost.getTitle().equals(title) && blogPostRepository.existsByTitle(title)) {
            throw new IllegalArgumentException("博客标题已存在: " + title);
        }
        
        blogPost.updateContent(title, content);
        return blogPostRepository.save(blogPost);
    }
    
    /**
     * 删除博客文章
     */
    public void deleteBlogPost(UUID id) {
        if (!blogPostRepository.findById(id).isPresent()) {
            throw new IllegalArgumentException("博客文章不存在: " + id);
        }
        blogPostRepository.delete(id);
    }
}
