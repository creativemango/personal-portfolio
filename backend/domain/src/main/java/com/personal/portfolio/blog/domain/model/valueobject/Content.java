package com.personal.portfolio.blog.domain.model.valueobject;

import lombok.EqualsAndHashCode;
import lombok.Getter;

/**
 * 内容值对象
 * 封装博客内容的业务规则和验证逻辑
 */
@Getter
@EqualsAndHashCode
public class Content implements ValueObject {
    
    private final String value;
    private static final int MAX_LENGTH = 10000; // 假设最大长度为10000字符
    private static final int MIN_LENGTH = 10;    // 最小长度为10字符
    
    /**
     * 私有构造函数，通过工厂方法创建
     */
    private Content(String value) {
        validate(value);
        this.value = value.trim();
    }
    
    /**
     * 工厂方法：从字符串创建Content
     */
    public static Content of(String value) {
        return new Content(value);
    }
    
    /**
     * 验证内容
     */
    private void validate(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException("内容不能为空");
        }
        
        String trimmed = value.trim();
        if (trimmed.length() < MIN_LENGTH) {
            throw new IllegalArgumentException("内容长度不能小于" + MIN_LENGTH + "个字符");
        }
        
        if (trimmed.length() > MAX_LENGTH) {
            throw new IllegalArgumentException("内容长度不能超过" + MAX_LENGTH + "个字符");
        }
    }
    
    /**
     * 获取内容值
     */
    public String getValue() {
        return value;
    }
    
    /**
     * 转换为字符串
     */
    @Override
    public String toString() {
        return value;
    }
    
    /**
     * 获取内容长度
     */
    public int length() {
        return value.length();
    }
    
    /**
     * 获取摘要（前100个字符）
     */
    public String getSummary() {
        if (value.length() <= 100) {
            return value;
        }
        return value.substring(0, 100) + "...";
    }
    
    /**
     * 获取纯文本内容（移除HTML标签）
     */
    public String getPlainText() {
        return value.replaceAll("<[^>]*>", "");
    }
    
    /**
     * 判断内容是否包含特定关键词
     */
    public boolean containsKeyword(String keyword) {
        return value.toLowerCase().contains(keyword.toLowerCase());
    }
    
    /**
     * 获取段落数量（按换行符分割）
     */
    public int getParagraphCount() {
        if (value.isEmpty()) {
            return 0;
        }
        return value.split("\\n\\s*\\n").length;
    }
    
    /**
     * 判断内容是否为空（仅包含空白字符）
     */
    public boolean isBlank() {
        return value.trim().isEmpty();
    }
    
    /**
     * 获取字数统计
     */
    public int getWordCount() {
        if (value.isEmpty()) {
            return 0;
        }
        return value.trim().split("\\s+").length;
    }
}
