package com.personal.portfolio.blog.domain.service;

import java.io.InputStream;

/**
 * 文件存储服务接口
 * 定义在领域层，实现由基础设施层提供
 */
public interface FileStorageService {
    
    /**
     * 存储文件
     * @param path 文件路径
     * @param content 文件内容流
     */
    void store(String path, InputStream content);
}
