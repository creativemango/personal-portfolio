package com.personal.portfolio.blog.domain.service;

import com.personal.portfolio.blog.domain.model.User;

import java.util.List;

/**
 * 用户管理领域服务
 * 处理用户相关的复杂业务逻辑
 */
public interface UserManagementService {
    
    /**
     * 注册新用户（包含完整的业务验证）
     */
    User registerUser(String username, String email, String password, 
                     String displayName, String avatarUrl);
    
    /**
     * 更新用户资料（包含验证）
     */
    User updateUserProfile(User user, String displayName, String bio, 
                          String location, String company, String website, 
                          String twitterUsername);
    
    /**
     * 合并用户账户（例如合并GitHub和本地账户）
     */
    User mergeUserAccounts(User primaryUser, User secondaryUser);
    
    /**
     * 验证用户名是否可用
     */
    boolean isUsernameAvailable(String username);
    
    /**
     * 验证邮箱是否可用
     */
    boolean isEmailAvailable(String email);
    
    /**
     * 搜索用户（根据多种条件）
     */
    List<User> searchUsers(String keyword, UserSearchCriteria criteria);
    
    /**
     * 获取用户活跃度评分
     */
    UserActivityScore getUserActivityScore(User user);
    
    /**
     * 验证用户权限
     */
    boolean hasPermission(User user, String permission);
    
    /**
     * 获取用户角色
     */
    List<String> getUserRoles(User user);
    
    /**
     * 用户搜索条件
     */
    class UserSearchCriteria {
        private Boolean isActive;
        private Boolean isDeveloper;
        private Integer minFollowers;
        private Integer maxFollowers;
        private String location;
        
        public UserSearchCriteria() {}
        
        public Boolean getIsActive() {
            return isActive;
        }
        
        public UserSearchCriteria setIsActive(Boolean isActive) {
            this.isActive = isActive;
            return this;
        }
        
        public Boolean getIsDeveloper() {
            return isDeveloper;
        }
        
        public UserSearchCriteria setIsDeveloper(Boolean isDeveloper) {
            this.isDeveloper = isDeveloper;
            return this;
        }
        
        public Integer getMinFollowers() {
            return minFollowers;
        }
        
        public UserSearchCriteria setMinFollowers(Integer minFollowers) {
            this.minFollowers = minFollowers;
            return this;
        }
        
        public Integer getMaxFollowers() {
            return maxFollowers;
        }
        
        public UserSearchCriteria setMaxFollowers(Integer maxFollowers) {
            this.maxFollowers = maxFollowers;
            return this;
        }
        
        public String getLocation() {
            return location;
        }
        
        public UserSearchCriteria setLocation(String location) {
            this.location = location;
            return this;
        }
    }
    
    /**
     * 用户活跃度评分
     */
    class UserActivityScore {
        private final User user;
        private final int score;
        private final String level;
        private final String description;
        
        public UserActivityScore(User user, int score, String level, String description) {
            this.user = user;
            this.score = score;
            this.level = level;
            this.description = description;
        }
        
        public User getUser() {
            return user;
        }
        
        public int getScore() {
            return score;
        }
        
        public String getLevel() {
            return level;
        }
        
        public String getDescription() {
            return description;
        }
        
        public boolean isActive() {
            return score >= 50;
        }
        
        public boolean isHighlyActive() {
            return score >= 80;
        }
        
        public boolean isInactive() {
            return score < 30;
        }
    }
}
