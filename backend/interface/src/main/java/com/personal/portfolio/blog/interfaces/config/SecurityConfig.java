package com.personal.portfolio.blog.interfaces.config;

import com.personal.portfolio.blog.interfaces.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.http.Cookie;

/**
 * Spring Security 配置类
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 配置会话管理为无状态
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(authorize -> authorize
                // 允许公开访问的端点
                .requestMatchers("/", "/login", "/oauth2/**", "/blog/**", "/h2-console/**", 
                               "/api/user/profile", "/api/logout", "/api/register", "/api/login", 
                               "/api/check-username", "/api/check-email", "/user/profile").permitAll()
                // 其他请求需要认证
                .anyRequest().authenticated()
            )
            // 禁用表单登录和 OAuth2 登录（使用 JWT）
            .formLogin(form -> form.disable())
            .oauth2Login(oauth2 -> oauth2.disable())
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

        // 添加 JWT 认证过滤器
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
