package com.personal.portfolio.blog.application.service;

import com.personal.portfolio.blog.application.dto.QueryBlogPostCommand;
import com.personal.portfolio.page.PageResult;
import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.blog.domain.repository.BlogPostRepository;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 博客文章应用服务 - 协调领域对象和基础设施
 */
@Service
@Validated
@RequiredArgsConstructor
@Slf4j
public class BlogPostAppService {

    private final BlogPostRepository blogPostRepository;

    /**
     * 发布博客文章
     */
    public BlogPost publishBlogPost(Long id) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("博客文章不存在: " + id));

        blogPost.publish();
        return blogPostRepository.save(blogPost);
    }

    /**
     * 获取所有博客文章
     *
     * @deprecated 使用分页方法替代
     */
    @Deprecated
    public List<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }

    /**
     * 获取已发布的博客文章
     *
     * @deprecated 使用分页方法替代
     */
    @Deprecated
    public List<BlogPost> getPublishedBlogPosts() {
        return blogPostRepository.findPublishedPosts();
    }

    /**
     * 分页查询所有博客文章
     */
    public PageResult<BlogPost> getAllBlogPosts(@Valid QueryBlogPostCommand command) {
        PageResult<BlogPost> pageResult = blogPostRepository.findPageWithConditions(
                command.getPage(), command.getSize(), command.getTitle(), command.getCategory(), command.getStatus());

        return convertToApplicationPageResult(pageResult);
    }

    /**
     * 分页查询已发布的博客文章
     */
    public PageResult<BlogPost> getPublishedBlogPosts(@Valid QueryBlogPostCommand command) {
        PageResult<BlogPost> pageResult = blogPostRepository.findPublishedPage(
                command.getPage(), command.getSize(), command.getTitle());

        return convertToApplicationPageResult(pageResult);
    }

    /**
     * 根据ID获取博客文章
     */
    public BlogPost getBlogPostById(Long id) {
        return blogPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("博客文章不存在: " + id));
    }

    /**
     * 更新博客文章
     */
    public BlogPost updateBlogPost(Long id, String title, String slug, String content, String summary, String coverFilePath, String category, List<String> tags) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("博客文章不存在: " + id));

        // 检查新标题是否与其他文章冲突
        String currentTitle = blogPost.getTitle();
        if (currentTitle != null && !currentTitle.equals(title) && blogPostRepository.existsByTitle(title)) {
            throw new IllegalArgumentException("博客标题已存在: " + title);
        }

        // 更新内容
        blogPost.updateContent(title, slug, content, summary, coverFilePath, category, tags);
        return blogPostRepository.save(blogPost);
    }

    /**
     * 删除博客文章
     */
    public void deleteBlogPost(Long id) {
        if (!blogPostRepository.findById(id).isPresent()) {
            throw new IllegalArgumentException("博客文章不存在: " + id);
        }
        blogPostRepository.delete(id);
    }

    /**
     * 将领域层的分页结果转换为应用层的分页结果
     */
    private PageResult<BlogPost> convertToApplicationPageResult(PageResult<BlogPost> domainPageResult) {
        return new PageResult<>(
                domainPageResult.getRecords(),
                domainPageResult.getTotal(),
                domainPageResult.getPage(),
                domainPageResult.getSize()
        );
    }
}
