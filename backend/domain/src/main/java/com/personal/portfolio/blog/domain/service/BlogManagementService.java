package com.personal.portfolio.blog.domain.service;

import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.blog.domain.model.User;
import com.personal.portfolio.blog.domain.model.valueobject.Title;
import com.personal.portfolio.blog.domain.model.valueobject.Slug;
import com.personal.portfolio.blog.domain.model.valueobject.Content;

import java.util.List;

/**
 * 博客管理领域服务
 * 处理跨BlogPost和User实体的复杂业务逻辑
 */
public interface BlogManagementService {
    
    /**
     * 创建博客文章（包含完整的业务验证）
     */
    BlogPost createBlogPost(Title title, Slug slug, Content content, User author, 
                           String summary, String coverImage, String category, List<String> tags);
    
    /**
     * 发布博客文章（包含状态验证和事件发布）
     */
    BlogPost publishBlogPost(BlogPost blogPost, User publisher);
    
    /**
     * 批量发布博客文章
     */
    List<BlogPost> publishBlogPosts(List<BlogPost> blogPosts, User publisher);
    
    /**
     * 转移博客文章所有权
     */
    BlogPost transferBlogPostOwnership(BlogPost blogPost, User currentOwner, User newOwner);
    
    /**
     * 验证用户是否有权限编辑博客文章
     */
    boolean canUserEditBlogPost(User user, BlogPost blogPost);
    
    /**
     * 验证用户是否有权限发布博客文章
     */
    boolean canUserPublishBlogPost(User user, BlogPost blogPost);
    
    /**
     * 获取用户的博客统计信息
     */
    UserBlogStatistics getUserBlogStatistics(User user);
    
    /**
     * 推荐相关博客文章
     */
    List<BlogPost> recommendRelatedBlogPosts(BlogPost blogPost, int limit);
    
    /**
     * 检查博客标题是否唯一
     */
    boolean isBlogTitleUnique(Title title, User author);
    
    /**
     * 检查博客Slug是否唯一
     */
    boolean isBlogSlugUnique(Slug slug);
    
    /**
     * 博客文章统计信息
     */
    class UserBlogStatistics {
        private final long totalPosts;
        private final long publishedPosts;
        private final long totalViews;
        private final long totalLikes;
        
        public UserBlogStatistics(long totalPosts, long publishedPosts, 
                                 long totalViews, long totalLikes) {
            this.totalPosts = totalPosts;
            this.publishedPosts = publishedPosts;
            this.totalViews = totalViews;
            this.totalLikes = totalLikes;
        }
        
        public long getTotalPosts() {
            return totalPosts;
        }
        
        public long getPublishedPosts() {
            return publishedPosts;
        }
        
        public long getTotalViews() {
            return totalViews;
        }
        
        public long getTotalLikes() {
            return totalLikes;
        }
        
        public double getPublishRate() {
            return totalPosts > 0 ? (double) publishedPosts / totalPosts : 0.0;
        }
        
        public double getAverageViewsPerPost() {
            return publishedPosts > 0 ? (double) totalViews / publishedPosts : 0.0;
        }
        
        public double getAverageLikesPerPost() {
            return publishedPosts > 0 ? (double) totalLikes / publishedPosts : 0.0;
        }
    }
}
