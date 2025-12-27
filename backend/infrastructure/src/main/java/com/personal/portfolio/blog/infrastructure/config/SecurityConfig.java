package com.personal.portfolio.blog.infrastructure.config;

import com.personal.portfolio.blog.infrastructure.filter.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.http.HttpMethod;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;

import jakarta.servlet.http.Cookie;

/**
 * Spring Security 配置类
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final OAuth2SuccessHandler oauth2SuccessHandler;
    private final OAuth2FailureHandler oauth2FailureHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 配置 CORS
            .cors(cors -> cors.configurationSource(request -> {
                org.springframework.web.cors.CorsConfiguration corsConfiguration = new org.springframework.web.cors.CorsConfiguration();
                corsConfiguration.setAllowedOriginPatterns(java.util.Arrays.asList("http://localhost:3000", "http://localhost:3001", "http://localhost:3002"));
                corsConfiguration.setAllowedMethods(java.util.Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                corsConfiguration.setAllowedHeaders(java.util.Arrays.asList("*"));
                corsConfiguration.setAllowCredentials(true);
                return corsConfiguration;
            }))
            // 配置会话管理为有状态（OAuth2 需要会话）
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )
            .authorizeHttpRequests(authorize -> authorize
                // 允许公开访问的端点
                .requestMatchers("/", "/login", "/login/oauth2/**", "/oauth2/**", "/blog/**", "/h2-console/**", 
                               "/api/logout", "/api/register", "/api/login", 
                               "/api/check-username", "/api/check-email").permitAll()
                // 访客只读：已发布列表与文章详情
                .requestMatchers(HttpMethod.GET, "/api/blog/posts/published/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/blog/posts/*").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/blog/posts/*/comments").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/blog/posts/*/comments").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/comments/*").authenticated()
                // 管理员权限：文章创建/更新/发布/删除/封面上传/查询全部
                .requestMatchers(HttpMethod.POST, "/api/blog/posts/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/blog/posts/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/blog/posts/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/blog/posts").hasRole("ADMIN")
                // 其他请求需要认证
                .anyRequest().authenticated()
            )
            // API统一返回401/403而不是重定向
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint((request, response, authException) ->
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED))
                .accessDeniedHandler((request, response, accessDeniedException) ->
                    response.sendError(HttpServletResponse.SC_FORBIDDEN))
            )
            // 禁用表单登录（使用 JWT），但保留 OAuth2 登录
            .formLogin(form -> form.disable())
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .successHandler(oauth2SuccessHandler)
                .failureHandler(oauth2FailureHandler)
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

        // 添加 JWT 认证过滤器
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
