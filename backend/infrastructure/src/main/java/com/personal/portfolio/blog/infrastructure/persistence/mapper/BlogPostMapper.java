package com.personal.portfolio.blog.infrastructure.persistence.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.personal.portfolio.blog.domain.entity.BlogPost;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 博客文章MyBatis Plus Mapper接口
 */
@Mapper
public interface BlogPostMapper extends BaseMapper<BlogPost> {
    
    /**
     * 查找已发布的博客文章
     */
    @Select("SELECT * FROM blog_posts WHERE is_published = true ORDER BY published_at DESC")
    List<BlogPost> selectPublishedPosts();
    
    /**
     * 根据作者ID查找博客文章
     */
    @Select("SELECT * FROM blog_posts WHERE author_id = #{authorId} ORDER BY created_at DESC")
    List<BlogPost> selectByAuthorId(Long authorId);
    
    /**
     * 检查标题是否已存在
     */
    @Select("SELECT COUNT(*) FROM blog_posts WHERE title = #{title}")
    int countByTitle(String title);
}
