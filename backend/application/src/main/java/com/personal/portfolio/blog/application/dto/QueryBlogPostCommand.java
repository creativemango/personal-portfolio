package com.personal.portfolio.blog.application.dto;

import lombok.Data;
import jakarta.validation.constraints.Min;

/**
 * 分页查询博客文章命令对象
 */
@Data
public class QueryBlogPostCommand {
    @Min(value = 1, message = "页码必须大于0")
    private Integer page = 1;
    
    @Min(value = 1, message = "每页条数必须大于0")
    private Integer size = 10;
    
    private String title; // 可选：按标题模糊查询
    private String category; // 可选：按分类查询
    private String status; // 可选：按状态查询
    
    public QueryBlogPostCommand() {
    }
    
    public QueryBlogPostCommand(Integer page, Integer size) {
        this.page = page;
        this.size = size;
    }
    
    public QueryBlogPostCommand(Integer page, Integer size, String title, String category, String status) {
        this.page = page;
        this.size = size;
        this.title = title;
        this.category = category;
        this.status = status;
    }
}
