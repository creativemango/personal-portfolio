package com.personal.portfolio.blog.infrastructure.persistence;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.blog.domain.event.BlogPostCreatedEvent;
import com.personal.portfolio.blog.domain.repository.BlogPostRepository;
import com.personal.portfolio.blog.infrastructure.persistence.mapper.BlogPostMapper;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 博客文章仓储实现类 - 使用MyBatis Plus
 */
@Repository
public class BlogPostRepositoryImpl implements BlogPostRepository {
    
    private final BlogPostMapper blogPostMapper;
    private final ApplicationEventPublisher applicationEventPublisher;
    
    public BlogPostRepositoryImpl(BlogPostMapper blogPostMapper, ApplicationEventPublisher applicationEventPublisher) {
        this.blogPostMapper = blogPostMapper;
        this.applicationEventPublisher = applicationEventPublisher;
    }
    
    @Override
    public BlogPost save(BlogPost blogPost) {
        boolean isNew = blogPost.getId() == null;
        
        // 确保在保存前调用preUpdate同步值对象
        blogPost.preUpdate();
        
        if (isNew) {
            // 新增
            blogPostMapper.insert(blogPost);
        } else {
            // 更新
            blogPostMapper.updateById(blogPost);
        }
        
        // 发布领域事件
        publishDomainEvents(blogPost, isNew);
        
        return blogPost;
    }
    
    /**
     * 发布领域事件
     */
    private void publishDomainEvents(BlogPost blogPost, boolean isNew) {
        List<Object> domainEvents = blogPost.getAndClearDomainEvents();
        
        for (Object event : domainEvents) {
            // 如果是BlogPostCreatedEvent且是新增操作，需要设置ID
            if (event instanceof BlogPostCreatedEvent createdEvent && isNew) {
                // 创建新的事件对象，设置正确的ID
                BlogPostCreatedEvent updatedEvent = new BlogPostCreatedEvent(
                    blogPost.getId(),
                    createdEvent.title(),
                    createdEvent.authorId(),
                    createdEvent.createdAt()
                );
                applicationEventPublisher.publishEvent(updatedEvent);
            } else {
                applicationEventPublisher.publishEvent(event);
            }
        }
    }
    
    @Override
    public Optional<BlogPost> findById(Long id) {
        BlogPost blogPost = blogPostMapper.selectById(id);
        if (blogPost != null) {
            // 加载后初始化值对象
            blogPost.postLoad();
        }
        return Optional.ofNullable(blogPost);
    }
    
    @Override
    public List<BlogPost> findAll() {
        LambdaQueryWrapper<BlogPost> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByDesc(BlogPost::getCreatedAt);
        List<BlogPost> blogPosts = blogPostMapper.selectList(queryWrapper);
        // 初始化值对象
        blogPosts.forEach(BlogPost::postLoad);
        return blogPosts;
    }
    
    @Override
    public List<BlogPost> findPublishedPosts() {
        List<BlogPost> blogPosts = blogPostMapper.selectPublishedPosts();
        // 初始化值对象
        blogPosts.forEach(BlogPost::postLoad);
        return blogPosts;
    }
    
    @Override
    public List<BlogPost> findByAuthor(String author) {
        // 注意：这里需要根据实际情况调整，因为现在使用authorId而不是author对象
        // 暂时返回空列表，需要根据业务需求调整
        return java.util.Collections.emptyList();
    }
    
    @Override
    public void delete(Long id) {
        blogPostMapper.deleteById(id);
    }
    
    @Override
    public boolean existsByTitle(String title) {
        int count = blogPostMapper.countByTitle(title);
        return count > 0;
    }
}
