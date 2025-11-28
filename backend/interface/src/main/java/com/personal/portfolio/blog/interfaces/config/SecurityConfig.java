package com.personal.portfolio.blog.interfaces.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.Cookie;

/**
 * Spring Security 配置类
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                // 允许公开访问的端点
                .requestMatchers("/", "/login", "/oauth2/**", "/blog/**", "/h2-console/**", 
                               "/api/user/profile", "/api/logout", "/api/register", "/api/login", 
                               "/api/check-username", "/api/check-email", "/user/profile").permitAll()
                // 其他请求需要认证
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .permitAll()
            )
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .defaultSuccessUrl("http://localhost:3001/home", true)
                .failureUrl("http://localhost:3001/login?error=true")
            )
            .logout(logout -> logout
                .logoutUrl("/api/logout")
                .logoutSuccessUrl("http://localhost:3001/")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .deleteCookies("JSESSIONID", "grafana_session", "grafana_session_expiry")
                .addLogoutHandler((request, response, authentication) -> {
                    Cookie[] cookies = request.getCookies();
                    if (cookies != null) {
                        for (Cookie cookie : cookies) {
                            if (cookie.getName().equals("JSESSIONID")) {
                                // 清除 Path=/ 的 JSESSIONID
                                Cookie clearCookieRoot = new Cookie("JSESSIONID", "");
                                clearCookieRoot.setPath("/");
                                clearCookieRoot.setMaxAge(0);
                                clearCookieRoot.setHttpOnly(cookie.isHttpOnly());
                                response.addCookie(clearCookieRoot);

                                // 清除 Path=/api 的 JSESSIONID
                                Cookie clearCookieApi = new Cookie("JSESSIONID", "");
                                clearCookieApi.setPath("/api");
                                clearCookieApi.setMaxAge(0);
                                clearCookieApi.setHttpOnly(cookie.isHttpOnly());
                                response.addCookie(clearCookieApi);
                            }
                            if (cookie.getName().equals("grafana_session") || cookie.getName().equals("grafana_session_expiry")) {
                                Cookie clearCookie = new Cookie(cookie.getName(), "");
                                clearCookie.setPath("/");
                                clearCookie.setMaxAge(0);
                                clearCookie.setHttpOnly(cookie.isHttpOnly());
                                response.addCookie(clearCookie);
                            }
                        }
                    }
                })
                .permitAll()
            )
            // 禁用CSRF保护以便于开发（生产环境应该启用）
            .csrf().disable()
            // 允许H2控制台访问
            .headers().frameOptions().disable();

        return http.build();
    }
}
