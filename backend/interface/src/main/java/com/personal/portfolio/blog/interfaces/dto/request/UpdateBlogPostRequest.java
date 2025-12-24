package com.personal.portfolio.blog.interfaces.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

/**
 * 更新博客文章请求DTO
 */
@Getter
@Setter
public class UpdateBlogPostRequest {
    @NotBlank(message = "博客标题不能为空")
    @Size(min = 1, max = 200, message = "标题长度必须在1-200个字符之间")
    private String title;
    
    @NotBlank(message = "博客别名不能为空")
    @Size(min = 1, max = 100, message = "别名长度必须在1-100个字符之间")
    private String slug;
    
    @NotBlank(message = "博客内容不能为空")
    private String content;
    
    @Size(max = 500, message = "摘要长度不能超过500个字符")
    private String summary;
    
    private String coverFilePath;
    
    @Size(max = 50, message = "分类长度不能超过50个字符")
    private String category;
    
    private List<@Size(max = 20, message = "每个标签长度不能超过20个字符") String> tags;
}
