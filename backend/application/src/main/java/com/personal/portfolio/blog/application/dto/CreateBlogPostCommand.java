package com.personal.portfolio.blog.application.dto;

import lombok.Data;

import java.util.List;

/**
 * 创建博客文章命令对象
 * 用于封装创建博客文章的参数，减少方法参数数量
 */
@Data
public class CreateBlogPostCommand {
    
    private String title;
    private String slug;
    private String content;
    private String summary;
    private String coverImage;
    private String category;
    private List<String> tags;
    private Long authorId;
    
    /**
     * 验证命令是否有效
     */
    public boolean isValid() {
        return title != null && !title.trim().isEmpty() &&
               slug != null && !slug.trim().isEmpty() &&
               content != null && !content.trim().isEmpty() &&
               authorId != null;
    }
    
    /**
     * 获取验证错误信息
     */
    public String getValidationError() {
        if (title == null || title.trim().isEmpty()) {
            return "博客标题不能为空";
        }
        if (slug == null || slug.trim().isEmpty()) {
            return "博客别名不能为空";
        }
        if (content == null || content.trim().isEmpty()) {
            return "博客内容不能为空";
        }
        if (authorId == null) {
            return "作者ID不能为空";
        }
        return null;
    }
}
