package com.personal.portfolio.blog.interfaces.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * 认证控制器
 */
@Controller
public class AuthController {

    /**
     * 登录页面
     */
    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    /**
     * 获取当前用户信息
     */
    @GetMapping("/user/profile")
    @ResponseBody
    public Map<String, Object> getUserProfile(@AuthenticationPrincipal OAuth2User principal) {
        Map<String, Object> userInfo = new HashMap<>();
        
        if (principal != null) {
            userInfo.put("id", principal.getAttribute("id"));
            userInfo.put("login", principal.getAttribute("login"));
            userInfo.put("name", principal.getAttribute("name"));
            userInfo.put("email", principal.getAttribute("email"));
            userInfo.put("avatar_url", principal.getAttribute("avatar_url"));
            userInfo.put("bio", principal.getAttribute("bio"));
            userInfo.put("location", principal.getAttribute("location"));
            userInfo.put("company", principal.getAttribute("company"));
            userInfo.put("blog", principal.getAttribute("blog"));
            userInfo.put("twitter_username", principal.getAttribute("twitter_username"));
            userInfo.put("public_repos", principal.getAttribute("public_repos"));
            userInfo.put("followers", principal.getAttribute("followers"));
            userInfo.put("following", principal.getAttribute("following"));
            userInfo.put("created_at", principal.getAttribute("created_at"));
            userInfo.put("updated_at", principal.getAttribute("updated_at"));
        } else {
            userInfo.put("error", "用户未登录");
        }
        
        return userInfo;
    }

    /**
     * API端点：获取当前用户信息
     */
    @GetMapping("/api/user/profile")
    @ResponseBody
    public Map<String, Object> getApiUserProfile(@AuthenticationPrincipal OAuth2User principal) {
        return getUserProfile(principal);
    }

    /**
     * API端点：退出登录
     */
    @PostMapping("/api/logout")
    @ResponseBody
    public ResponseEntity<Map<String, String>> apiLogout(HttpServletRequest request, HttpServletResponse response) {
        // 清除认证信息
        SecurityContextHolder.clearContext();
        
        // 使当前会话失效
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        
        // 清除所有相关cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("JSESSIONID") || 
                    cookie.getName().equals("grafana_session") || 
                    cookie.getName().equals("grafana_session_expiry")) {
                    cookie.setValue("");
                    cookie.setPath("/");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }
        
        Map<String, String> result = new HashMap<>();
        result.put("message", "退出登录成功");
        result.put("redirect_url", "/");
        
        return ResponseEntity.ok()
                .header("Set-Cookie", "JSESSIONID=; Path=/; HttpOnly; Max-Age=0")
                .header("Set-Cookie", "grafana_session=; Path=/; Max-Age=0")
                .header("Set-Cookie", "grafana_session_expiry=; Path=/; Max-Age=0")
                .body(result);
    }

    /**
     * 首页
     */
    @GetMapping("/")
    @ResponseBody
    public Map<String, String> home() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "欢迎访问个人作品集网站");
        response.put("login_url", "/login");
        return response;
    }
}
