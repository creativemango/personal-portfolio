package com.personal.portfolio.blog.infrastructure.interceptor;

import static com.personal.portfolio.blog.infrastructure.context.ContextConstants.*;

import com.personal.portfolio.blog.infrastructure.util.JwtUtil;
import com.personal.portfolio.blog.infrastructure.util.ProfileUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class ProfileInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        Object userIdObj = request.getAttribute(USER_ID);
        Long userId = (userIdObj instanceof Long) ? (Long) userIdObj : null;

        Object usernameObj = request.getAttribute(USERNAME);
        String username = (usernameObj instanceof String) ? (String) usernameObj : null;

        String host = getRemoteHost(request);
        log.info("request header username:{}", username);
        ProfileUtil.put(USER_ID, String.valueOf(userId));
        ProfileUtil.put(USERNAME, username);
        ProfileUtil.put(HOST, host);
        return true;
    }

    private String getRemoteHost(HttpServletRequest request) {
        return request.getRemoteHost();
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)  {
        ProfileUtil.remove();
    }

}
