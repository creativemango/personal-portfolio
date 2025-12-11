package com.personal.portfolio.blog.domain.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 用户实体类 - 充血模型实现
 * 纯领域模型，不包含任何持久化注解
 */
@Getter
@Setter
public class User {
    
    /**
     * 用户ID，主键，自增
     */
    private Long id;
    
    /**
     * GitHub用户ID
     */
    private String githubId;
    
    /**
     * 用户名，必填，最大长度50字符
     */
    private String username;
    
    /**
     * 邮箱地址，可选，最大长度100字符
     */
    private String email;
    
    /**
     * 显示名称，可选，最大长度100字符
     */
    private String displayName;
    
    /**
     * 头像URL，可选，最大长度255字符
     */
    private String avatarUrl;
    
    /**
     * 个人简介，可选，最大长度500字符
     */
    private String bio;
    
    /**
     * 位置信息，可选，最大长度100字符
     */
    private String location;
    
    /**
     * 公司信息，可选，最大长度100字符
     */
    private String company;
    
    /**
     * 个人网站，可选，最大长度255字符
     */
    private String website;
    
    /**
     * Twitter用户名，可选，最大长度50字符
     */
    private String twitterUsername;
    
    /**
     * 公开仓库数量
     */
    private Integer publicRepos = 0;
    
    /**
     * 粉丝数量
     */
    private Integer followers = 0;
    
    /**
     * 关注数量
     */
    private Integer following = 0;

    /**
     * 密码，用于本地账户登录
     */
    private String password;

    /**
     * 是否为本地注册账户
     */
    private Boolean isLocalAccount = true;

    /**
     * 创建时间，必填
     */
    private LocalDateTime createdAt;

    /**
     * 更新时间，必填
     */
    private LocalDateTime updatedAt;
    
    /**
     * 保护性构造函数（JPA/MyBatis需要）
     * 改为public以支持MapStruct映射
     */
    public User() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 工厂方法：创建GitHub用户
     */
    public static User createGitHubUser(String githubId, String username, String email, 
                                       String avatarUrl, String displayName) {
        User user = new User();
        user.githubId = githubId;
        user.username = username;
        user.email = email;
        user.avatarUrl = avatarUrl;
        user.displayName = displayName != null ? displayName : username;
        user.isLocalAccount = false;
        
        return user;
    }
    
    /**
     * 工厂方法：创建本地用户
     */
    public static User createLocalUser(String username, String email, String password) {
        validateLocalUser(username, email, password);
        
        User user = new User();
        user.username = username;
        user.email = email;
        user.password = password;
        user.displayName = username;
        user.isLocalAccount = true;
        
        return user;
    }
    
    /**
     * 更新用户资料
     */
    public void updateProfile(String displayName, String bio, String location, 
                             String company, String website, String twitterUsername) {
        this.displayName = displayName;
        this.bio = bio;
        this.location = location;
        this.company = company;
        this.website = website;
        this.twitterUsername = twitterUsername;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 更新GitHub信息
     */
    public void updateGitHubInfo(String avatarUrl, Integer publicRepos, 
                                Integer followers, Integer following, String bio) {
        this.avatarUrl = avatarUrl;
        this.publicRepos = publicRepos != null ? publicRepos : 0;
        this.followers = followers != null ? followers : 0;
        this.following = following != null ? following : 0;
        
        // 如果用户没有设置bio，使用GitHub的bio
        if (this.bio == null || this.bio.trim().isEmpty()) {
            this.bio = bio;
        }
        
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 更改密码
     */
    public void changePassword(String oldPassword, String newPassword) {
        if (!isLocalAccount) {
            throw new IllegalStateException("非本地账户不能更改密码");
        }
        
        if (!validatePassword(oldPassword)) {
            throw new IllegalArgumentException("旧密码不正确");
        }
        
        validatePasswordStrength(newPassword);
        this.password = newPassword;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 验证密码 - 基础验证
     * 只检查是否为本地账户和密码是否设置
     * 具体的密码匹配验证在应用层使用PasswordService进行
     */
    public boolean validatePassword(String inputPassword) {
        if (!isLocalAccount) {
            throw new IllegalStateException("非本地账户没有密码");
        }
        
        return this.password != null && !this.password.trim().isEmpty();
    }
    
    /**
     * 设置密码（用于初始化）
     */
    public void setPassword(String password) {
        if (!isLocalAccount) {
            throw new IllegalStateException("非本地账户不能设置密码");
        }
        
        validatePasswordStrength(password);
        this.password = password;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 判断用户是否有GitHub账户
     */
    public boolean hasGitHubAccount() {
        return githubId != null && !githubId.trim().isEmpty();
    }
    
    /**
     * 判断用户是否是活跃用户（有头像和简介）
     */
    public boolean isActiveUser() {
        return avatarUrl != null && !avatarUrl.trim().isEmpty() &&
               bio != null && !bio.trim().isEmpty();
    }
    
    /**
     * 判断用户是否是开发者（有公司信息或公开仓库）
     */
    public boolean isDeveloper() {
        return (company != null && !company.trim().isEmpty()) || publicRepos > 0;
    }
    
    /**
     * 获取用户年龄（注册天数）
     */
    public long getAccountAgeInDays() {
        if (createdAt == null) {
            return 0;
        }
        return java.time.Duration.between(createdAt, LocalDateTime.now()).toDays();
    }
    
    /**
     * 判断用户是否是新用户（注册时间小于30天）
     */
    public boolean isNewUser() {
        return getAccountAgeInDays() < 30;
    }
    
    /**
     * 获取完整的个人资料URL
     */
    public String getProfileUrl() {
        if (website != null && !website.trim().isEmpty()) {
            return website;
        }
        
        if (hasGitHubAccount()) {
            return "https://github.com/" + username;
        }
        
        return null;
    }
    
    /**
     * 获取Twitter完整URL
     */
    public String getTwitterUrl() {
        if (twitterUsername != null && !twitterUsername.trim().isEmpty()) {
            return "https://twitter.com/" + twitterUsername;
        }
        return null;
    }
    
    /**
     * 更新前自动设置更新时间
     */
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 验证本地用户信息
     */
    private static void validateLocalUser(String username, String email, String password) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("用户名不能为空");
        }
        
        if (username.length() > 50) {
            throw new IllegalArgumentException("用户名长度不能超过50个字符");
        }
        
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("邮箱不能为空");
        }
        
        if (!email.contains("@")) {
            throw new IllegalArgumentException("邮箱格式无效");
        }
        
        validatePasswordStrength(password);
    }
    
    /**
     * 验证密码强度 - 基础验证
     * 注意：具体的密码强度验证应该在应用层使用PasswordService进行
     * 这里只做最基本的长度检查
     */
    private static void validatePasswordStrength(String password) {
        if (password == null || password.length() < 8) {
            throw new IllegalArgumentException("密码长度至少8个字符");
        }
        
        // 更宽松的验证，具体验证在应用层进行
        // 这里只检查长度，不检查字符类型
    }
    
    // Setter方法（有限制的）
    public void setEmail(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("邮箱格式无效");
        }
        this.email = email;
        this.updatedAt = LocalDateTime.now();
    }
    
    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
        this.updatedAt = LocalDateTime.now();
    }
    
    public void setBio(String bio) {
        this.bio = bio;
        this.updatedAt = LocalDateTime.now();
    }
}
