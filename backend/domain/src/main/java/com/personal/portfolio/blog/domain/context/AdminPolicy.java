package com.personal.portfolio.blog.domain.context;

public interface AdminPolicy {
    boolean isAdminUsername(String username);
    boolean isAdminGithubId(String githubId);
}

