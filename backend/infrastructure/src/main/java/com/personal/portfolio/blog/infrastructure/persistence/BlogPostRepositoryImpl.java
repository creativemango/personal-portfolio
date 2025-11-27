package com.personal.portfolio.blog.infrastructure.persistence;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.personal.portfolio.blog.domain.entity.BlogPost;
import com.personal.portfolio.blog.domain.repository.BlogPostRepository;
import com.personal.portfolio.blog.infrastructure.persistence.mapper.BlogPostMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 博客文章仓储实现类 - 使用MyBatis Plus
 */
@Repository
public class BlogPostRepositoryImpl implements BlogPostRepository {
    
    private final BlogPostMapper blogPostMapper;
    
    public BlogPostRepositoryImpl(BlogPostMapper blogPostMapper) {
        this.blogPostMapper = blogPostMapper;
    }
    
    @Override
    public BlogPost save(BlogPost blogPost) {
        if (blogPost.getId() == null) {
            // 新增
            blogPost.preUpdate();
            blogPostMapper.insert(blogPost);
        } else {
            // 更新
            blogPost.preUpdate();
            blogPostMapper.updateById(blogPost);
        }
        return blogPost;
    }
    
    @Override
    public Optional<BlogPost> findById(Long id) {
        BlogPost blogPost = blogPostMapper.selectById(id);
        return Optional.ofNullable(blogPost);
    }
    
    @Override
    public List<BlogPost> findAll() {
        LambdaQueryWrapper<BlogPost> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByDesc(BlogPost::getCreatedAt);
        return blogPostMapper.selectList(queryWrapper);
    }
    
    @Override
    public List<BlogPost> findPublishedPosts() {
        return blogPostMapper.selectPublishedPosts();
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
