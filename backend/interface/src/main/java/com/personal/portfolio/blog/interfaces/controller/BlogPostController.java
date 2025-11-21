package com.personal.portfolio.blog.interfaces.controller;

import com.personal.portfolio.blog.application.service.BlogPostService;
import com.personal.portfolio.blog.domain.entity.BlogPost;
import com.personal.portfolio.blog.domain.entity.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 博客文章控制器 - 处理HTTP请求和响应
 */
@RestController
@RequestMapping("/blog/posts")
@RequiredArgsConstructor
public class BlogPostController {
    
    private final BlogPostService blogPostService;
    
    /**
     * 创建博客文章
     */
    @PostMapping
    public BlogPost createBlogPost(@RequestBody CreateBlogPostRequest request) {
        // 注意：这里需要先获取User对象，实际项目中可能需要用户认证
        // 这里暂时简化处理，实际使用时需要根据认证信息获取当前用户
        // 临时创建一个简单的User对象用于测试
        User tempUser = new User();
        tempUser.setId(1L); // 临时用户ID
        tempUser.setUsername("testuser");
        tempUser.setEmail("test@example.com");
        tempUser.setDisplayName("测试用户");
        
        return blogPostService.createBlogPost(
            request.getTitle(), 
            request.getSlug(), 
            request.getContent(), 
            tempUser
        );
    }
    
    /**
     * 获取所有博客文章
     */
    @GetMapping
    public List<BlogPost> getAllBlogPosts() {
        return blogPostService.getAllBlogPosts();
    }
    
    /**
     * 获取已发布的博客文章
     */
    @GetMapping("/published")
    public List<BlogPost> getPublishedBlogPosts() {
        return blogPostService.getPublishedBlogPosts();
    }
    
    /**
     * 根据ID获取博客文章
     */
    @GetMapping("/{id}")
    public BlogPost getBlogPostById(@PathVariable Long id) {
        return blogPostService.getBlogPostById(id);
    }
    
    /**
     * 发布博客文章
     */
    @PutMapping("/{id}/publish")
    public BlogPost publishBlogPost(@PathVariable Long id) {
        return blogPostService.publishBlogPost(id);
    }
    
    /**
     * 更新博客文章
     */
    @PutMapping("/{id}")
    public BlogPost updateBlogPost(
            @PathVariable Long id, 
            @RequestBody UpdateBlogPostRequest request) {
        return blogPostService.updateBlogPost(
            id, 
            request.getTitle(), 
            request.getSlug(), 
            request.getContent(),
            request.getSummary(),
            request.getCoverImage()
        );
    }
    
    /**
     * 删除博客文章
     */
    @DeleteMapping("/{id}")
    public void deleteBlogPost(@PathVariable Long id) {
        blogPostService.deleteBlogPost(id);
    }
    
    /**
     * 创建博客文章请求DTO
     */
    @Getter
    @Setter
    public static class CreateBlogPostRequest {
        private String title;
        private String slug;
        private String content;
        private String summary;
        private String coverImage;
        private com.personal.portfolio.blog.domain.entity.User author;
    }
    
    /**
     * 更新博客文章请求DTO
     */
    @Getter
    @Setter
    public static class UpdateBlogPostRequest {
        private String title;
        private String slug;
        private String content;
        private String summary;
        private String coverImage;
    }
}
