package com.personal.portfolio.blog.domain.service;

import com.personal.portfolio.blog.domain.model.BlogPost;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件上传领域服务接口
 */
public interface FileUploadService {
    /**
     * 为博客文章上传封面
     * @param blogPost 博客文章实体
     * @param coverFile 封面文件
     * @return 上传后的封面文件路径
     */
    String uploadCoverForBlog(BlogPost blogPost, MultipartFile coverFile);
}
