package com.personal.portfolio.blog.infrastructure.util;

/**
 * 路径工具类
 * 用于生成统一的文件路径格式
 */
public class PathUtil {
    
    /**
     * 生成博客封面图片路径
     * 格式: {blog_id}/cover/{filename}
     *
     * @param blogId 博客ID
     * @param originalFilename 原始文件名
     * @return 格式化后的路径字符串
     */
    public static String generateCoverPath(Long blogId, String originalFilename) {
        if (blogId == null) {
            throw new IllegalArgumentException("Blog ID cannot be null");
        }
        
        // 确保文件名不包含路径分隔符，防止目录遍历
        String safeFilename = originalFilename;
        if (originalFilename != null) {
            int lastSeparatorIndex = Math.max(originalFilename.lastIndexOf('/'), originalFilename.lastIndexOf('\\'));
            if (lastSeparatorIndex >= 0) {
                safeFilename = originalFilename.substring(lastSeparatorIndex + 1);
            }
        } else {
            safeFilename = "cover.jpg"; // 默认文件名
        }
        
        return String.format("%d/cover/%s", blogId, safeFilename);
    }
}
