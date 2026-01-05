package com.personal.portfolio.blog.application.service;

import com.personal.portfolio.blog.application.dto.CreateBlogPostCommand;
import com.personal.portfolio.blog.application.event.BlogPostCreatedAppEvent;
import com.personal.portfolio.blog.application.exception.BusinessException;
import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.blog.domain.repository.BlogPostRepository;
import com.personal.portfolio.blog.domain.service.FileUploadService;
import com.personal.portfolio.util.BeanCopyUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * 创建博客文章命令处理器
 */
@Component
@RequiredArgsConstructor
public class BlogCreateAppService {
    
    private final BlogPostRepository blogPostRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final FileUploadService fileUploadService;

    @Transactional
    public BlogPost createBlogPost(CreateBlogPostCommand command) {
        // 验证标题唯一性
        if (blogPostRepository.existsByTitle(command.getTitle())) {
            throw new BusinessException("博客标题已存在: " + command.getTitle());
        }
        
        // 创建博客文章
        BlogPost blogPost = BeanCopyUtils.toBean(command, BlogPost.class);
        blogPost.registerCreateEvent();

        // 验证博客文章是否有效
        if (!blogPost.isValid()) {
            throw new BusinessException("博客文章内容无效");
        }

        // 保存以获取ID
        blogPost = blogPostRepository.save(blogPost);
        
        publishBlogPostCreatedEvent(blogPost);

        return blogPost;
    }

    /**
     * 上传博客封面图片
     */
    @Transactional
    public String uploadCover(Long id, MultipartFile file) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new BusinessException("博客文章不存在: " + id));

        String coverPath = fileUploadService.uploadCoverForBlog(blogPost, file);
        
        blogPost.updateCover(coverPath);
        blogPostRepository.save(blogPost);
        
        return coverPath;
    }

    /**
     * 发布博客创建应用事件
     */
    private void publishBlogPostCreatedEvent(BlogPost blogPost) {
        BlogPostCreatedAppEvent event = new BlogPostCreatedAppEvent(
                blogPost.getId(),
                blogPost.getTitle(),
                blogPost.getAuthorId(),
                blogPost.getCreatedAt()
        );
        eventPublisher.publishEvent(event);
    }
}
