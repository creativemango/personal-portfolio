package com.personal.portfolio.blog.infrastructure.persistence;

import com.personal.portfolio.blog.domain.entity.BlogPost;
import com.personal.portfolio.blog.domain.repository.BlogPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * 博客文章仓储实现 - 基础设施层实现领域层定义的接口
 * 采用依赖倒置原则
 */
@Repository
@RequiredArgsConstructor
public class BlogPostRepositoryImpl implements BlogPostRepository {
    
    // 使用内存存储作为示例，实际项目中可以使用数据库
    private final ConcurrentHashMap<UUID, BlogPost> blogPostStore = new ConcurrentHashMap<>();
    
    @Override
    public BlogPost save(BlogPost blogPost) {
        blogPostStore.put(blogPost.getId(), blogPost);
        return blogPost;
    }
    
    @Override
    public Optional<BlogPost> findById(UUID id) {
        return Optional.ofNullable(blogPostStore.get(id));
    }
    
    @Override
    public List<BlogPost> findAll() {
        return blogPostStore.values().stream()
                .collect(Collectors.toList());
    }
    
    @Override
    public List<BlogPost> findPublishedPosts() {
        return blogPostStore.values().stream()
                .filter(BlogPost::isPublished)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<BlogPost> findByAuthor(String author) {
        return blogPostStore.values().stream()
                .filter(post -> post.getAuthor().equals(author))
                .collect(Collectors.toList());
    }
    
    @Override
    public void delete(UUID id) {
        blogPostStore.remove(id);
    }
    
    @Override
    public boolean existsByTitle(String title) {
        return blogPostStore.values().stream()
                .anyMatch(post -> post.getTitle().equals(title));
    }
}
