package com.personal.portfolio.util;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;

import java.util.Collection;
import java.util.List;

public final class BeanCopyUtils {

    private BeanCopyUtils() {}

    public static <T> T toBean(Object source, Class<T> targetClass) {
        return BeanUtil.toBean(source, targetClass);
    }

    public static void copy(Object source, Object target, boolean ignoreNulls) {
        CopyOptions options = CopyOptions.create().setIgnoreNullValue(ignoreNulls);
        BeanUtil.copyProperties(source, target, options);
    }

    public static <T> List<T> toList(Collection<?> sourceList, Class<T> targetClass) {
        return BeanUtil.copyToList(sourceList, targetClass);
    }
}
