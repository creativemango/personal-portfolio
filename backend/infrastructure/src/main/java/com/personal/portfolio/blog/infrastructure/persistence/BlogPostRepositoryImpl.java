package com.personal.portfolio.blog.infrastructure.persistence;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.blog.domain.event.BlogPostCreatedEvent;
import com.personal.portfolio.blog.domain.repository.BlogPostRepository;
import com.personal.portfolio.blog.infrastructure.persistence.entity.BlogPostEntity;
import com.personal.portfolio.blog.infrastructure.persistence.mapper.BlogPostMapper;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import io.github.linpeilie.Converter;

/**
 * 博客文章仓储实现类 - 使用MyBatis Plus和持久化实体
 */
@Repository
public class BlogPostRepositoryImpl implements BlogPostRepository {
    
    private final BlogPostMapper blogPostMapper;
    private static final Converter converter = new Converter();
    private final ApplicationEventPublisher applicationEventPublisher;
    
    public BlogPostRepositoryImpl(
            BlogPostMapper blogPostMapper,
            ApplicationEventPublisher applicationEventPublisher) {
        this.blogPostMapper = blogPostMapper;
        this.applicationEventPublisher = applicationEventPublisher;
    }
    
    @Override
    public BlogPost save(BlogPost blogPost) {
        boolean isNew = blogPost.getId() == null;
        
        // 转换为持久化实体
        BlogPostEntity entity = converter.convert(blogPost, BlogPostEntity.class);;
        
        if (isNew) {
            // 新增
            blogPostMapper.insert(entity);
            // 设置生成的ID回领域对象
            blogPost.setId(entity.getId());
        } else {
            // 更新
            blogPostMapper.updateById(entity);
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
        BlogPostEntity entity = blogPostMapper.selectById(id);
        if (entity == null) {
            return Optional.empty();
        }
        BlogPost domain = converter.convert(entity, BlogPost.class);
        return Optional.ofNullable(domain);
    }
    
    @Override
    public List<BlogPost> findAll() {
        LambdaQueryWrapper<BlogPostEntity> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByDesc(BlogPostEntity::getCreatedAt);
        List<BlogPostEntity> entities = blogPostMapper.selectList(queryWrapper);
        
        // 转换为领域对象
        return entities.stream()
                .map(entity -> converter.convert(entity, BlogPost.class))
                .collect(Collectors.toList());
    }
    
    @Override
    public List<BlogPost> findPublishedPosts() {
        List<BlogPostEntity> entities = blogPostMapper.selectPublishedPosts();
        
        // 转换为领域对象
        return entities.stream()
                .map(entity -> converter.convert(entity, BlogPost.class))
                .collect(Collectors.toList());
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
