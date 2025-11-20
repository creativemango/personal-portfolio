package com.personal.portfolio.blog.interfaces.controller;

import com.personal.portfolio.blog.application.service.BlogPostService;
import com.personal.portfolio.blog.domain.entity.BlogPost;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 博客文章控制器 - 处理HTTP请求和响应
 */
@RestController
@RequestMapping("/api/blog/posts")
@RequiredArgsConstructor
public class BlogPostController {
    
    private final BlogPostService blogPostService;
    
    /**
     * 创建博客文章
     */
    @PostMapping
    public ResponseEntity<BlogPost> createBlogPost(@RequestBody CreateBlogPostRequest request) {
        // 注意：这里需要先获取User对象，实际项目中可能需要用户认证
        // 这里暂时简化处理，实际使用时需要根据认证信息获取当前用户
        BlogPost blogPost = blogPostService.createBlogPost(
            request.getTitle(), 
            request.getSlug(), 
            request.getContent(), 
            request.getAuthor()
        );
        return ResponseEntity.ok(blogPost);
    }
    
    /**
     * 获取所有博客文章
     */
    @GetMapping
    public ResponseEntity<List<BlogPost>> getAllBlogPosts() {
        List<BlogPost> blogPosts = blogPostService.getAllBlogPosts();
        return ResponseEntity.ok(blogPosts);
    }
    
    /**
     * 获取已发布的博客文章
     */
    @GetMapping("/published")
    public ResponseEntity<List<BlogPost>> getPublishedBlogPosts() {
        List<BlogPost> blogPosts = blogPostService.getPublishedBlogPosts();
        return ResponseEntity.ok(blogPosts);
    }
    
    /**
     * 根据ID获取博客文章
     */
    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable Long id) {
        BlogPost blogPost = blogPostService.getBlogPostById(id);
        return ResponseEntity.ok(blogPost);
    }
    
    /**
     * 发布博客文章
     */
    @PutMapping("/{id}/publish")
    public ResponseEntity<BlogPost> publishBlogPost(@PathVariable Long id) {
        BlogPost blogPost = blogPostService.publishBlogPost(id);
        return ResponseEntity.ok(blogPost);
    }
    
    /**
     * 更新博客文章
     */
    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updateBlogPost(
            @PathVariable Long id, 
            @RequestBody UpdateBlogPostRequest request) {
        BlogPost blogPost = blogPostService.updateBlogPost(
            id, 
            request.getTitle(), 
            request.getSlug(), 
            request.getContent(),
            request.getSummary(),
            request.getCoverImage()
        );
        return ResponseEntity.ok(blogPost);
    }
    
    /**
     * 删除博客文章
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable Long id) {
        blogPostService.deleteBlogPost(id);
        return ResponseEntity.noContent().build();
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
