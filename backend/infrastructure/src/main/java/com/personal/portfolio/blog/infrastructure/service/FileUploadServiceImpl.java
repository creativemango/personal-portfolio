package com.personal.portfolio.blog.infrastructure.service;

import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.blog.domain.service.FileStorageService;
import com.personal.portfolio.blog.domain.service.FileUploadService;
import com.personal.portfolio.blog.infrastructure.util.PathUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * 文件上传服务实现
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class FileUploadServiceImpl implements FileUploadService {
    
    private final FileStorageService fileStorageService;
    
    @Override
    public String uploadCoverForBlog(BlogPost blogPost, MultipartFile coverFile) {
        try (var inputStream = coverFile.getInputStream()) {
            String originalFilename = coverFile.getOriginalFilename();
            String coverPath = PathUtil.generateCoverPath(blogPost.getId(), originalFilename);
            
            fileStorageService.store(coverPath, inputStream);
            return coverPath;
            
        } catch (IOException e) {
            log.error("封面文件上传失败", e);
            throw new RuntimeException("封面文件上传失败", e);
        }
    }
}
