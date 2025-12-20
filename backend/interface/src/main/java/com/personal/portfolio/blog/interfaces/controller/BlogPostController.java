package com.personal.portfolio.blog.interfaces.controller;

import com.personal.portfolio.blog.application.dto.CreateBlogPostCommand;
import com.personal.portfolio.blog.application.dto.QueryBlogPostCommand;
import com.personal.portfolio.blog.application.service.BlogPostAppService;
import com.personal.portfolio.blog.domain.common.PageResult;
import com.personal.portfolio.blog.domain.context.CurrentUserContext;
import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.blog.interfaces.dto.request.CreateBlogPostRequest;
import com.personal.portfolio.blog.interfaces.dto.request.UpdateBlogPostRequest;
import com.personal.portfolio.blog.interfaces.exception.AuthenticationException;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.github.linpeilie.Converter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * 博客文章控制器 - 处理HTTP请求和响应
 */
@RestController
@RequestMapping("/api/blog/posts")
@RequiredArgsConstructor
public class BlogPostController {
    
    private final BlogPostAppService blogPostAppService;
    private final CurrentUserContext currentUserContext;
    private static final Converter converter = new Converter();

    /**
     * 创建博客文章
     */
    @PostMapping
    public BlogPost createBlogPost(@Valid @RequestBody CreateBlogPostRequest request) {
        // 从当前用户上下文获取authorId
        Long authorId = currentUserContext.getCurrentUserId();
        if (authorId == null) {
            throw new AuthenticationException("用户未登录");
        }
        
        CreateBlogPostCommand command = converter.convert(request, CreateBlogPostCommand.class);
        command.setAuthorId(authorId);
        
        // 使用命令对象调用应用服务
        return blogPostAppService.createBlogPost(command);
    }
    
    /**
     * 分页获取所有博客文章
     */
    @GetMapping
    public PageResult<BlogPost> getAllBlogPosts(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String category) {
        
        QueryBlogPostCommand command = new QueryBlogPostCommand(page, size, keyword, category, status);
        return blogPostAppService.getAllBlogPosts(command);
    }
    
    /**
     * 分页获取已发布的博客文章
     */
    @GetMapping("/published")
    public PageResult<BlogPost> getPublishedBlogPosts(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) String keyword) {
        
        QueryBlogPostCommand command = new QueryBlogPostCommand(page, size, keyword, null, "PUBLISHED");
        return blogPostAppService.getPublishedBlogPosts(command);
    }
    
    /**
     * 根据ID获取博客文章
     */
    @GetMapping("/{id}")
    public BlogPost getBlogPostById(@PathVariable Long id) {
        return blogPostAppService.getBlogPostById(id);
    }
    
    /**
     * 发布博客文章
     */
    @PutMapping("/{id}/publish")
    public BlogPost publishBlogPost(@PathVariable Long id) {
        return blogPostAppService.publishBlogPost(id);
    }
    
    /**
     * 更新博客文章
     */
    @PutMapping("/{id}")
    public BlogPost updateBlogPost(
            @PathVariable Long id, 
            @Valid @RequestBody UpdateBlogPostRequest request) {
        return blogPostAppService.updateBlogPost(
            id, 
            request.getTitle(), 
            request.getSlug(), 
            request.getContent(),
            request.getSummary(),
            request.getCoverImage(),
            request.getCategory(),
            request.getTags()
        );
    }
    
    /**
     * 删除博客文章
     */
    @DeleteMapping("/{id}")
    public void deleteBlogPost(@PathVariable Long id) {
        blogPostAppService.deleteBlogPost(id);
    }
    
    /**
     * 获取所有博客文章（兼容旧接口）
     * @deprecated 使用分页接口替代
     */
    @Deprecated
    @GetMapping("/all")
    public List<BlogPost> getAllBlogPostsOld() {
        return blogPostAppService.getAllBlogPosts();
    }
    
    /**
     * 获取已发布的博客文章（兼容旧接口）
     * @deprecated 使用分页接口替代
     */
    @Deprecated
    @GetMapping("/published/all")
    public List<BlogPost> getPublishedBlogPostsOld() {
        return blogPostAppService.getPublishedBlogPosts();
    }
}
