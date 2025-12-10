package com.personal.portfolio.blog.domain.model.valueobject;

import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.regex.Pattern;

/**
 * Slug值对象
 * 用于URL的友好标识，包含验证和格式化逻辑
 */
@Getter
@EqualsAndHashCode
public class Slug implements ValueObject {

    /**
     * -- GETTER --
     *  获取Slug值
     */
    private final String value;
    private static final int MAX_LENGTH = 200;
    private static final Pattern VALID_SLUG_PATTERN = Pattern.compile("^[a-z0-9]+(?:-[a-z0-9]+)*$");
    
    /**
     * 私有构造函数，通过工厂方法创建
     */
    private Slug(String value) {
        this.value = normalize(value);
    }
    
    /**
     * 工厂方法：从字符串创建Slug
     */
    public static Slug of(String value) {
        return new Slug(value);
    }
    
    /**
     * 从标题生成Slug
     */
    public static Slug fromTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("标题不能为空");
        }
        
        String slug = title.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .trim();
        
        return new Slug(slug);
    }
    
    /**
     * 规范化Slug
     */
    private String normalize(String value) {
        return value.toLowerCase().trim();
    }

    /**
     * 转换为字符串
     */
    @Override
    public String toString() {
        return value;
    }
    
}
