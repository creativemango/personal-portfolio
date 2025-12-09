package com.personal.portfolio.blog.infrastructure.context;

import com.personal.portfolio.blog.domain.context.CurrentUserContext;
import com.personal.portfolio.blog.infrastructure.util.ProfileUtil;
import org.springframework.stereotype.Component;

/**
 * 基于ThreadLocal的当前用户上下文实现
 * 使用ProfileUtil获取用户信息，包装为CurrentUserContext接口
 */
@Component
public class ThreadLocalCurrentUserContext implements CurrentUserContext {
    
    @Override
    public Long getCurrentUserId() {
        try {
            return ProfileUtil.getUserId();
        } catch (Exception e) {
            return null;
        }
    }
    
    @Override
    public String getCurrentUsername() {
        try {
            return ProfileUtil.getUsername();
        } catch (Exception e) {
            return null;
        }
    }
    
    @Override
    public boolean isAuthenticated() {
        return getCurrentUserId() != null;
    }
    
    @Override
    public String getCurrentLanguage() {
        try {
            return ProfileUtil.getLanguage();
        } catch (Exception e) {
            return null;
        }
    }
    
    @Override
    public String getCurrentHost() {
        try {
            return ProfileUtil.getHost();
        } catch (Exception e) {
            return null;
        }
    }
}
