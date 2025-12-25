package com.personal.portfolio.blog.infrastructure.config;

import com.personal.portfolio.blog.domain.context.AdminPolicy;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app.admin")
public class AdminProperties implements AdminPolicy {
    private String username;
    private String githubId;

    @Override
    public boolean isAdminUsername(String username) {
        return this.username != null && username != null && this.username.equalsIgnoreCase(username);
    }

    @Override
    public boolean isAdminGithubId(String githubId) {
        return this.githubId != null && githubId != null && this.githubId.equals(githubId);
    }
}
