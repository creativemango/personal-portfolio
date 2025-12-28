package com.personal.portfolio.blog.domain.context;

/**
 * 当前用户上下文接口
 * 提供获取当前认证用户信息的能力
 * 遵循依赖倒置原则：domain层定义接口，infrastructure层实现
 */
public interface CurrentUserContext {
    
    /**
     * 获取当前用户ID
     * @return 当前用户ID，如果未认证返回null
     */
    Long getCurrentUserId();
    
    /**
     * 获取当前用户名
     * @return 当前用户名，如果未认证返回null
     */
    String getCurrentUsername();
    
    /**
     * 检查用户是否已认证
     * @return 是否已认证
     */
    boolean isAuthenticated();
    
    /**
     * 获取当前用户语言
     * @return 用户语言
     */
    String getCurrentLanguage();

    /**
     * 获取当前用户主机信息
     * @return 主机信息
     */
    String getCurrentHost();
    
    /**
     * 获取当前用户头像URL
     * @return 头像URL
     */
    String getCurrentAvatarUrl();
}
