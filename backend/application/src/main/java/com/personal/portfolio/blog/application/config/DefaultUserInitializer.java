package com.personal.portfolio.blog.application.config;

import com.personal.portfolio.blog.application.service.UserRegistrationService;
import com.personal.portfolio.blog.domain.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * 默认用户初始化配置
 * 在应用启动时自动创建默认管理员账号
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class DefaultUserInitializer implements CommandLineRunner {

    private final UserRegistrationService userRegistrationService;
    
    // 默认用户配置
    private static final String DEFAULT_USERNAME = "admin";
    private static final String DEFAULT_PASSWORD = "adminadmin";
    private static final String DEFAULT_EMAIL = "admin@example.com";
    
    @Override
    public void run(String... args) {
        try {
            log.info("开始检查默认用户...");
            
            // 检查默认用户是否已存在
            if (userRegistrationService.isUsernameAvailable(DEFAULT_USERNAME)) {
                log.info("默认用户 '{}' 不存在，开始创建...", DEFAULT_USERNAME);
                
                // 创建默认用户
                User defaultUser = userRegistrationService.registerUser(
                    DEFAULT_USERNAME, 
                    DEFAULT_PASSWORD, 
                    DEFAULT_EMAIL
                );
                
                log.info("默认用户创建成功！用户名: {}, 用户ID: {}", 
                        defaultUser.getUsername(), defaultUser.getId());
                log.info("默认登录凭证 - 用户名: {}, 密码: {}", DEFAULT_USERNAME, DEFAULT_PASSWORD);
            } else {
                log.info("默认用户 '{}' 已存在，跳过创建", DEFAULT_USERNAME);
            }
            
            log.info("默认用户检查完成");
        } catch (Exception e) {
            log.error("创建默认用户时发生错误: {}", e.getMessage(), e);
            // 不抛出异常，避免影响应用启动
        }
    }
}
