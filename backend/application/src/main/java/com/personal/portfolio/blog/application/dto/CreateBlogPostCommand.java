package com.personal.portfolio.blog.application.dto;

import jakarta.validation.constraints.NotNull;
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
    
    private String category;
    
    private List<String> tags;
    
    @NotNull(message = "作者ID不能为空")
    private Long authorId;
}
