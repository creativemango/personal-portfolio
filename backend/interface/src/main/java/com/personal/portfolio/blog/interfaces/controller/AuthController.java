package com.personal.portfolio.blog.interfaces.controller;

import com.personal.portfolio.blog.application.service.UserRegistrationService;
import com.personal.portfolio.blog.domain.model.User;
import com.personal.portfolio.blog.domain.repository.UserRepository;
import com.personal.portfolio.blog.domain.service.AuthenticationService;
import com.personal.portfolio.blog.interfaces.dto.request.LoginRequest;
import com.personal.portfolio.blog.interfaces.dto.request.RegisterRequest;
import com.personal.portfolio.blog.interfaces.dto.response.*;
import com.personal.portfolio.blog.interfaces.exception.InvalidCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

/**
 * 认证控制器
 */
@Controller
@Slf4j
public class AuthController {

    private final UserRegistrationService userRegistrationService;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    public AuthController(UserRegistrationService userRegistrationService, 
                         AuthenticationService authenticationService,
                         UserRepository userRepository) {
        this.userRegistrationService = userRegistrationService;
        this.authenticationService = authenticationService;
        this.userRepository = userRepository;
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
    public UserProfileResponse getUserProfile(@AuthenticationPrincipal Object principal,
                                            HttpServletRequest request) {
        UserProfileResponse userInfo = new UserProfileResponse();
        
        log.info("getUserProfile called, principal type: " + (principal != null ? principal.getClass().getName() : "null"));
        
        if (principal != null) {
            // 处理 OAuth2 用户
            if (principal instanceof OAuth2User) {
                OAuth2User oauth2User = (OAuth2User) principal;
                log.info("OAuth2 User attributes: " + oauth2User.getAttributes());
                
                userInfo.setId(oauth2User.getAttribute("id") != null ? oauth2User.getAttribute("id").toString() : null);
                userInfo.setLogin(oauth2User.getAttribute("login"));
                userInfo.setUsername(oauth2User.getAttribute("login"));
                userInfo.setName(oauth2User.getAttribute("name"));
                userInfo.setEmail(oauth2User.getAttribute("email"));
                userInfo.setAvatarUrl(oauth2User.getAttribute("avatar_url"));
                userInfo.setBio(oauth2User.getAttribute("bio"));
                userInfo.setLocation(oauth2User.getAttribute("location"));
                userInfo.setCompany(oauth2User.getAttribute("company"));
                userInfo.setBlog(oauth2User.getAttribute("blog"));
                userInfo.setTwitterUsername(oauth2User.getAttribute("twitter_username"));
                userInfo.setPublicRepos(oauth2User.getAttribute("public_repos"));
                userInfo.setFollowers(oauth2User.getAttribute("followers"));
                userInfo.setFollowing(oauth2User.getAttribute("following"));
                userInfo.setCreatedAt(oauth2User.getAttribute("created_at"));
                userInfo.setUpdatedAt(oauth2User.getAttribute("updated_at"));
            } 
            // 处理本地用户（JWT 认证）
            else {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                log.info("Authentication: " + authentication);
                log.info("Principal class: " + (authentication != null && authentication.getPrincipal() != null ? 
                    authentication.getPrincipal().getClass().getName() : "null"));
                log.info("Is authenticated: " + (authentication != null ? authentication.isAuthenticated() : "null"));
                
                if (authentication != null && authentication.isAuthenticated()) {
                    String username = authentication.getName();
                    log.info("Username from authentication: " + username);
                    
                    // 从请求属性中获取用户ID（由 JWT 过滤器设置）
                    Long userId = (Long) request.getAttribute("USER_ID");
                    log.info("User ID from request attribute: " + userId);
                    
                    if (username != null && !username.equals("anonymousUser")) {
                        userInfo.setId(userId != null ? userId.toString() : null);
                        userInfo.setLogin(username);
                        userInfo.setUsername(username);
                        userInfo.setName(username);
                        userInfo.setAvatarUrl("https://via.placeholder.com/35x35/667eea/ffffff?text=" + 
                            username.substring(0, 1).toUpperCase());
                        
                        // 尝试从数据库获取更多用户信息
                        try {
                            // 直接使用 UserRepository 查找用户
                            User user = userRepository.findByUsername(username).orElse(null);
                            if (user != null) {
                                userInfo.setEmail(user.getEmail());
                                userInfo.setBio(user.getBio());
                                // 确保 ID 正确设置（优先使用数据库中的 ID）
                                if (user.getId() != null) {
                                    userInfo.setId(user.getId().toString());
                                }
                            }
                        } catch (Exception e) {
                            log.info("Could not fetch user details from database: " + e.getMessage());
                        }
                    } else {
                        userInfo.setError("用户未登录或匿名用户");
                    }
                } else {
                    userInfo.setError("用户未登录");
                }
            }
        } else {
            userInfo.setError("用户未登录");
        }
        
        log.info("Returning user info: " + userInfo);
        return userInfo;
    }

    /**
     * API端点：获取当前用户信息
     */
    @GetMapping("/api/user/profile")
    @ResponseBody
    public UserProfileResponse getApiUserProfile(@AuthenticationPrincipal Object principal,
                                               HttpServletRequest request) {
        return getUserProfile(principal, request);
    }

    /**
     * API端点：退出登录
     */
    @PostMapping("/api/logout")
    @ResponseBody
    public LogoutResponse apiLogout(HttpServletRequest request, HttpServletResponse httpResponse) {
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
                    httpResponse.addCookie(cookie);
                }
            }
        }
        
        LogoutResponse result = new LogoutResponse();
        result.setRedirectUrl("/");
        
        return result;
    }

    /**
     * API端点：用户注册
     */
    @PostMapping("/api/register")
    @ResponseBody
    public RegisterResponse register(@RequestBody RegisterRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();
        String email = request.getEmail();
        
        if (username == null || password == null) {
            throw new IllegalArgumentException("用户名和密码不能为空");
        }
        
        User user = userRegistrationService.registerUser(username, password, email);
        
        RegisterResponse response = new RegisterResponse();
        RegisterResponse.UserInfo userInfo = new RegisterResponse.UserInfo();
        userInfo.setId(user.getId());
        userInfo.setUsername(user.getUsername());
        userInfo.setEmail(user.getEmail());
        userInfo.setDisplayName(user.getDisplayName());
        response.setUser(userInfo);
        
        return response;
    }
    
    /**
     * API端点：用户名密码登录
     */
    @PostMapping("/api/login")
    @ResponseBody
    public LoginResponse login(@RequestBody LoginRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();
        
        if (username == null || password == null || username.trim().isEmpty() || password.trim().isEmpty()) {
            throw new IllegalArgumentException("用户名和密码不能为空");
        }
        
        User user = userRegistrationService.authenticate(username, password);
        
        if (user == null) {
            throw new InvalidCredentialsException();
        }
        
        // 生成 JWT Token
        String token = authenticationService.generateToken(user.getUsername(), user.getId());
        
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        
        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo();
        userInfo.setId(user.getId());
        userInfo.setUsername(user.getUsername());
        userInfo.setEmail(user.getEmail());
        userInfo.setDisplayName(user.getDisplayName());
        response.setUser(userInfo);
        
        return response;
    }
    
    /**
     * API端点：检查用户名是否可用
     */
    @GetMapping("/api/check-username")
    @ResponseBody
    public CheckUsernameResponse checkUsernameAvailability(@RequestParam String username) {
        if (username == null) {
            throw new IllegalArgumentException("用户名不能为空");
        }
        
        boolean available = userRegistrationService.isUsernameAvailable(username);
        CheckUsernameResponse response = new CheckUsernameResponse();
        response.setAvailable(available);
        
        return response;
    }
    
    /**
     * API端点：检查邮箱是否可用
     */
    @GetMapping("/api/check-email")
    @ResponseBody
    public CheckEmailResponse checkEmailAvailability(@RequestParam(required = false) String email) {
        if (email == null || email.trim().isEmpty()) {
            CheckEmailResponse response = new CheckEmailResponse();
            response.setAvailable(true);
            return response;
        }
        
        boolean available = userRegistrationService.isEmailAvailable(email);
        CheckEmailResponse response = new CheckEmailResponse();
        response.setAvailable(available);
        
        return response;
    }

    /**
     * 首页
     */
    @GetMapping("/")
    @ResponseBody
    public HomeResponse home() {
        HomeResponse response = new HomeResponse();
        response.setLoginUrl("/login");
        return response;
    }
}
