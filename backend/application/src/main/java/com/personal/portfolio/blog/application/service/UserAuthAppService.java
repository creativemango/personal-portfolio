package com.personal.portfolio.blog.application.service;

import com.personal.portfolio.blog.application.dto.LoginResult;
import com.personal.portfolio.blog.application.dto.RegisterResult;
import com.personal.portfolio.blog.domain.context.AdminPolicy;
import com.personal.portfolio.blog.application.exception.AuthFailedException;
import com.personal.portfolio.blog.domain.model.User;
import com.personal.portfolio.blog.domain.model.UserRole;
import com.personal.portfolio.blog.domain.repository.UserRepository;
import com.personal.portfolio.blog.domain.service.AuthenticationService;
import org.springframework.stereotype.Service;

@Service
public class UserAuthAppService {
    private final UserRegistrationService userRegistrationService;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final AdminPolicy adminPolicy;

    public UserAuthAppService(UserRegistrationService userRegistrationService,
                              AuthenticationService authenticationService,
                              UserRepository userRepository,
                              AdminPolicy adminPolicy) {
        this.userRegistrationService = userRegistrationService;
        this.authenticationService = authenticationService;
        this.userRepository = userRepository;
        this.adminPolicy = adminPolicy;
    }

    public RegisterResult register(String username, String password, String email) {
        User user = userRegistrationService.registerUser(username, password, email);
        if (adminPolicy.isAdminUsername(username)) {
            user.setRole(UserRole.ADMIN);
            user = userRepository.save(user);
        }
        RegisterResult result = new RegisterResult();
        result.setId(user.getId());
        result.setUsername(user.getUsername());
        result.setEmail(user.getEmail());
        result.setDisplayName(user.getDisplayName());
        result.setRole(user.getRole() != null ? user.getRole().name() : "VISITOR");
        return result;
    }

    public LoginResult login(String username, String password) {
        User user = userRegistrationService.authenticate(username, password);
        if (user == null) {
            throw new AuthFailedException("Invalid username or password");
        }
        // Ensure admin role consistency
        if (adminPolicy.isAdminUsername(user.getUsername()) && user.getRole() != UserRole.ADMIN) {
            user.setRole(UserRole.ADMIN);
            user = userRepository.save(user);
        }
        String role = user.getRole() != null ? user.getRole().name() : "VISITOR";
        String token = authenticationService.generateToken(user.getUsername(), user.getId(), role);
        LoginResult result = new LoginResult();
        result.setToken(token);
        result.setId(user.getId());
        result.setUsername(user.getUsername());
        result.setEmail(user.getEmail());
        result.setDisplayName(user.getDisplayName());
        result.setRole(role);
        return result;
    }
}
