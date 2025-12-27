package com.personal.portfolio.converter;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.personal.portfolio.page.PageResult;

import java.util.Collections;
import java.util.List;

import io.github.linpeilie.Converter;

public class PageResultConverter {

    private static final Converter converter = new Converter();

    /**
     * 通用 PageResult 转换
     */
    public <A, B> PageResult<B> convert(PageResult<A> source, Class<B> targetClass) {
        if (source == null) {
            return new PageResult<>(Collections.emptyList(), 0L, 1, 10);
        }

        // 转换列表元素
        List<B> convertedList = source.getRecords() != null && !source.getRecords().isEmpty()
                ? converter.convert(source.getRecords(), targetClass)
                : Collections.emptyList();

        // 创建新的 PageResult（保留分页信息）
        return PageResult.of(
                convertedList,
                source.getTotal(),
                source.getPage(),
                source.getSize()
        );
    }

    /**
     * 从 IPage 转换到 PageResult
     */
    public <E, D> PageResult<D> convertFromIPage(IPage<E> iPage, Class<D> targetClass) {
        if (iPage == null) {
            return new PageResult<>(Collections.emptyList(), 0L, 1, 10);
        }

        // 转换列表元素
        List<D> convertedList = iPage.getRecords() != null && !iPage.getRecords().isEmpty()
                ? converter.convert(iPage.getRecords(), targetClass)
                : Collections.emptyList();

        // 创建 PageResult
        return PageResult.of(
                convertedList,
                iPage.getTotal(),
                (int) iPage.getCurrent(),
                (int) iPage.getSize()
        );
    }
}
