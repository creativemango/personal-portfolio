package com.personal.portfolio.blog.interfaces.dto.response;

import lombok.Data;

/**
 * 用户信息响应DTO
 */
@Data
public class UserProfileResponse {
    private String id;
    private String login;
    private String username;
    private String name;
    private String email;
    private String avatarUrl;
    private String bio;
    private String location;
    private String company;
    private String blog;
    private String twitterUsername;
    private Integer publicRepos;
    private Integer followers;
    private Integer following;
    private String createdAt;
    private String updatedAt;
    private String role;
    private String error;
}
