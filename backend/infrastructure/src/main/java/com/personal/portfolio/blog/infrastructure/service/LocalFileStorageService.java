package com.personal.portfolio.blog.infrastructure.service;

import com.personal.portfolio.blog.domain.service.FileStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * 本地文件存储服务实现
 */
@Service
@Slf4j
public class LocalFileStorageService implements FileStorageService {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @Override
    public void store(String relativePath, InputStream content) {
        try {
            Path targetLocation = Paths.get(uploadDir).resolve(relativePath).normalize();
            
            // 确保目录存在
            Files.createDirectories(targetLocation.getParent());
            
            // 保存文件
            Files.copy(content, targetLocation, StandardCopyOption.REPLACE_EXISTING);
            
            log.info("文件已保存至: {}", targetLocation);
        } catch (IOException e) {
            log.error("无法保存文件: {}", relativePath, e);
            throw new RuntimeException("文件存储失败", e);
        }
    }
}
