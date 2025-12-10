package com.personal.portfolio.blog.application.service;

import com.personal.portfolio.blog.application.dto.CreateBlogPostCommand;
import com.personal.portfolio.blog.application.event.BlogPostCreatedApplicationEvent;
import com.personal.portfolio.blog.application.exception.BusinessException;
import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.blog.domain.repository.BlogPostRepository;

import io.github.linpeilie.Converter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

/**
 * 博客文章应用服务 - 协调领域对象和基础设施
 */
@Service
@Validated
@RequiredArgsConstructor
public class BlogPostAppService {
    
    private final BlogPostRepository blogPostRepository;
    private final ApplicationEventPublisher applicationEventPublisher;
    private static final Converter converter = new Converter();

    /**
     * 创建博客文章（使用命令对象）
     */
    public BlogPost createBlogPost(@Valid CreateBlogPostCommand command) {
        // 检查标题是否已存在 - 业务规则校验
        if (blogPostRepository.existsByTitle(command.getTitle())) {
            throw new BusinessException("博客标题已存在: " + command.getTitle());
        }
        
        BlogPost blogPost = converter.convert(command, BlogPost.class);
        blogPost.registerCreateEvent();
        // 验证博客文章是否有效
        if (!blogPost.isValid()) {
            throw new BusinessException("博客文章内容无效");
        }
        
        // 保存博客文章
        BlogPost savedBlogPost = blogPostRepository.save(blogPost);
        
        // 发布博客创建应用事件
        publishBlogPostCreatedEvent(savedBlogPost);
        
        return savedBlogPost;
    }
    
    /**
     * 发布博客创建应用事件
     */
    private void publishBlogPostCreatedEvent(BlogPost blogPost) {
        BlogPostCreatedApplicationEvent event = new BlogPostCreatedApplicationEvent(
            blogPost.getId(),
            blogPost.getTitle(),
            blogPost.getAuthorId(),
            blogPost.getCreatedAt()
        );
        applicationEventPublisher.publishEvent(event);
    }
    
    /**
     * 发布博客文章
     */
    public BlogPost publishBlogPost(Long id) {
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
    public BlogPost getBlogPostById(Long id) {
        return blogPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("博客文章不存在: " + id));
    }
    
    /**
     * 更新博客文章
     */
    public BlogPost updateBlogPost(Long id, String title, String slug, String content, String summary, String coverImage, String category, List<String> tags) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("博客文章不存在: " + id));
        
        // 检查新标题是否与其他文章冲突
        String currentTitle = blogPost.getTitle();
        if (currentTitle != null && !currentTitle.equals(title) && blogPostRepository.existsByTitle(title)) {
            throw new IllegalArgumentException("博客标题已存在: " + title);
        }
        
        // 更新内容
        blogPost.updateContent(title, slug, content, summary, coverImage, category, tags);
        return blogPostRepository.save(blogPost);
    }
    
    /**
     * 删除博客文章
     */
    public void deleteBlogPost(Long id) {
        if (!blogPostRepository.findById(id).isPresent()) {
            throw new IllegalArgumentException("博客文章不存在: " + id);
        }
        blogPostRepository.delete(id);
    }
}
