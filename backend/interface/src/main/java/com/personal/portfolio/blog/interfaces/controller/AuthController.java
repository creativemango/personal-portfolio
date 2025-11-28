package com.personal.portfolio.blog.interfaces.controller;

import com.personal.portfolio.blog.application.service.UserRegistrationService;
import com.personal.portfolio.blog.domain.entity.User;
import com.personal.portfolio.blog.interfaces.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    private final UserRegistrationService userRegistrationService;
    private final JwtUtil jwtUtil;

    public AuthController(UserRegistrationService userRegistrationService, JwtUtil jwtUtil) {
        this.userRegistrationService = userRegistrationService;
        this.jwtUtil = jwtUtil;
    }

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
    public Map<String, Object> getUserProfile(@AuthenticationPrincipal Object principal) {
        Map<String, Object> userInfo = new HashMap<>();
        
        if (principal != null) {
            // 处理 OAuth2 用户
            if (principal instanceof OAuth2User) {
                OAuth2User oauth2User = (OAuth2User) principal;
                userInfo.put("id", oauth2User.getAttribute("id"));
                userInfo.put("login", oauth2User.getAttribute("login"));
                userInfo.put("name", oauth2User.getAttribute("name"));
                userInfo.put("email", oauth2User.getAttribute("email"));
                userInfo.put("avatar_url", oauth2User.getAttribute("avatar_url"));
                userInfo.put("bio", oauth2User.getAttribute("bio"));
                userInfo.put("location", oauth2User.getAttribute("location"));
                userInfo.put("company", oauth2User.getAttribute("company"));
                userInfo.put("blog", oauth2User.getAttribute("blog"));
                userInfo.put("twitter_username", oauth2User.getAttribute("twitter_username"));
                userInfo.put("public_repos", oauth2User.getAttribute("public_repos"));
                userInfo.put("followers", oauth2User.getAttribute("followers"));
                userInfo.put("following", oauth2User.getAttribute("following"));
                userInfo.put("created_at", oauth2User.getAttribute("created_at"));
                userInfo.put("updated_at", oauth2User.getAttribute("updated_at"));
            } 
            // 处理本地用户（从 Spring Security 上下文获取）
            else {
                org.springframework.security.core.Authentication authentication = 
                    SecurityContextHolder.getContext().getAuthentication();
                if (authentication != null && authentication.isAuthenticated() && 
                    !(authentication.getPrincipal() instanceof String)) {
                    
                    // 这里假设认证主体包含用户信息，实际需要根据你的认证配置调整
                    String username = authentication.getName();
                    userInfo.put("login", username);
                    userInfo.put("username", username);
                    userInfo.put("name", username);
                    userInfo.put("avatar_url", "https://via.placeholder.com/35x35/667eea/ffffff?text=" + 
                        username.substring(0, 1).toUpperCase());
                } else {
                    userInfo.put("error", "用户未登录");
                }
            }
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
    public Map<String, Object> getApiUserProfile(@AuthenticationPrincipal Object principal) {
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
     * API端点：用户注册
     */
    @PostMapping("/api/register")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String username = request.get("username");
            String password = request.get("password");
            String email = request.get("email");
            
            if (username == null || password == null) {
                response.put("success", false);
                response.put("message", "用户名和密码不能为空");
                return ResponseEntity.badRequest().body(response);
            }
            
            User user = userRegistrationService.registerUser(username, password, email);
            
            response.put("success", true);
            response.put("message", "注册成功");
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", user.getId());
            userInfo.put("username", user.getUsername());
            userInfo.put("email", user.getEmail());
            userInfo.put("displayName", user.getDisplayName());
            response.put("user", userInfo);
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "注册失败，请稍后重试");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * API端点：用户名密码登录
     */
    @PostMapping("/api/login")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String username = request.get("username");
            String password = request.get("password");
            
            if (username == null || password == null) {
                response.put("success", false);
                response.put("message", "用户名和密码不能为空");
                return ResponseEntity.badRequest().body(response);
            }
            
            User user = userRegistrationService.authenticate(username, password);
            
            if (user != null) {
                // 生成 JWT Token
                String token = jwtUtil.generateToken(user.getUsername(), user.getId());
                
                response.put("success", true);
                response.put("message", "登录成功");
                response.put("token", token);
                Map<String, Object> userInfo = new HashMap<>();
                userInfo.put("id", user.getId());
                userInfo.put("username", user.getUsername());
                userInfo.put("email", user.getEmail());
                userInfo.put("displayName", user.getDisplayName());
                response.put("user", userInfo);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "用户名或密码错误");
                return ResponseEntity.status(401).body(response);
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "登录失败，请稍后重试");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * API端点：检查用户名是否可用
     */
    @GetMapping("/api/check-username")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> checkUsernameAvailability(@org.springframework.web.bind.annotation.RequestParam String username) {
        Map<String, Object> response = new HashMap<>();
        
        if (username == null) {
            response.put("success", false);
            response.put("message", "用户名不能为空");
            return ResponseEntity.badRequest().body(response);
        }
        
        boolean available = userRegistrationService.isUsernameAvailable(username);
        response.put("success", true);
        response.put("available", available);
        response.put("message", available ? "用户名可用" : "用户名已存在");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * API端点：检查邮箱是否可用
     */
    @GetMapping("/api/check-email")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> checkEmailAvailability(@org.springframework.web.bind.annotation.RequestParam(required = false) String email) {
        Map<String, Object> response = new HashMap<>();
        
        if (email == null || email.trim().isEmpty()) {
            response.put("success", true);
            response.put("available", true);
            response.put("message", "邮箱可用");
            return ResponseEntity.ok(response);
        }
        
        boolean available = userRegistrationService.isEmailAvailable(email);
        response.put("success", true);
        response.put("available", available);
        response.put("message", available ? "邮箱可用" : "邮箱已存在");
        
        return ResponseEntity.ok(response);
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
