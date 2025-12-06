package com.personal.portfolio.blog.domain.model.valueobject;

import lombok.EqualsAndHashCode;
import lombok.Getter;

/**
 * 标题值对象
 * 封装标题的业务规则和验证逻辑
 */
@Getter
@EqualsAndHashCode
public class Title implements ValueObject {
    
    private final String value;
    private static final int MAX_LENGTH = 200;
    private static final int MIN_LENGTH = 1;
    
    /**
     * 私有构造函数，通过工厂方法创建
     */
    private Title(String value) {
        validate(value);
        this.value = value.trim();
    }
    
    /**
     * 工厂方法：从字符串创建Title
     */
    public static Title of(String value) {
        return new Title(value);
    }
    
    /**
     * 验证标题
     */
    private void validate(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException("标题不能为空");
        }
        
        String trimmed = value.trim();
        if (trimmed.length() < MIN_LENGTH) {
            throw new IllegalArgumentException("标题长度不能小于" + MIN_LENGTH + "个字符");
        }
        
        if (trimmed.length() > MAX_LENGTH) {
            throw new IllegalArgumentException("标题长度不能超过" + MAX_LENGTH + "个字符");
        }
    }
    
    /**
     * 获取标题值
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
     * 判断标题是否包含特定关键词
     */
    public boolean containsKeyword(String keyword) {
        return value.toLowerCase().contains(keyword.toLowerCase());
    }
    
    /**
     * 获取标题长度
     */
    public int length() {
        return value.length();
    }
    
    /**
     * 判断标题是否为空（仅包含空白字符）
     */
    public boolean isBlank() {
        return value.trim().isEmpty();
    }
}
