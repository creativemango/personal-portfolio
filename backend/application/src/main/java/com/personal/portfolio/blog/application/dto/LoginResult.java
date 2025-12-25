package com.personal.portfolio.blog.application.dto;

import lombok.Data;

@Data
public class LoginResult {
    private String token;
    private Long id;
    private String username;
    private String email;
    private String displayName;
    private String role;
}

