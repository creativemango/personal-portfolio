package com.personal.portfolio.blog.infrastructure.persistence.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.personal.portfolio.blog.infrastructure.persistence.entity.BlogPostEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 博客文章MyBatis Plus Mapper接口 - 使用持久化实体
 */
@Mapper
public interface BlogPostMapper extends BaseMapper<BlogPostEntity> {
    
    /**
     * 查找已发布的博客文章
     */
    @Select("SELECT * FROM blog_posts WHERE is_published = true ORDER BY published_at DESC")
    List<BlogPostEntity> selectPublishedPosts();
    
    /**
     * 根据作者ID查找博客文章
     */
    @Select("SELECT * FROM blog_posts WHERE author_id = #{authorId} ORDER BY created_at DESC")
    List<BlogPostEntity> selectByAuthorId(Long authorId);
    
    /**
     * 检查标题是否已存在
     */
    @Select("SELECT COUNT(*) FROM blog_posts WHERE title = #{title}")
    int countByTitle(String title);
}
