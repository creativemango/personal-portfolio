package com.personal.portfolio.blog.application.dto;

import lombok.Data;

@Data
public class RegisterResult {
    private Long id;
    private String username;
    private String email;
    private String displayName;
    private String role;
}

