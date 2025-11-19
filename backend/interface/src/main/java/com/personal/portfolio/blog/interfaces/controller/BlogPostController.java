package com.personal.portfolio.blog.interfaces.controller;

import com.personal.portfolio.blog.application.service.BlogPostService;
import com.personal.portfolio.blog.domain.entity.BlogPost;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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
        BlogPost blogPost = blogPostService.createBlogPost(
            request.getTitle(), 
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
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable UUID id) {
        BlogPost blogPost = blogPostService.getBlogPostById(id);
        return ResponseEntity.ok(blogPost);
    }
    
    /**
     * 发布博客文章
     */
    @PutMapping("/{id}/publish")
    public ResponseEntity<BlogPost> publishBlogPost(@PathVariable UUID id) {
        BlogPost blogPost = blogPostService.publishBlogPost(id);
        return ResponseEntity.ok(blogPost);
    }
    
    /**
     * 更新博客文章
     */
    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updateBlogPost(
            @PathVariable UUID id, 
            @RequestBody UpdateBlogPostRequest request) {
        BlogPost blogPost = blogPostService.updateBlogPost(
            id, 
            request.getTitle(), 
            request.getContent()
        );
        return ResponseEntity.ok(blogPost);
    }
    
    /**
     * 删除博客文章
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable UUID id) {
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
        private String content;
        private String author;
    }
    
    /**
     * 更新博客文章请求DTO
     */
    @Getter
    @Setter
    public static class UpdateBlogPostRequest {
        private String title;
        private String content;
    }
}
