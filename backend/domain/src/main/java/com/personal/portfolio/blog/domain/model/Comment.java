package com.personal.portfolio.blog.domain.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Comment {
    private Long id;
    private Long postId;
    private Long userId;
    private String authorName;
    private String content;
    private Long parentId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public boolean ownedBy(Long ownerId) {
        if (ownerId == null || this.userId == null) {
            return false;
        }
        return this.userId.equals(ownerId);
    }

    public static String normalizeContent(String raw) {
        if (raw == null) return "";
        return raw.trim();
    }

    public static boolean isValidContent(String raw) {
        if (raw == null) return false;
        String t = raw.trim();
        if (t.isEmpty()) return false;
        return t.length() <= 1000;
    }
}
