package com.personal.portfolio;

import com.personal.portfolio.blog.application.service.BlogPostService;
import com.personal.portfolio.blog.domain.repository.BlogPostRepository;
import com.personal.portfolio.blog.infrastructure.persistence.BlogPostRepositoryImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * 应用启动测试
 */
@SpringBootTest
public class ApplicationTest {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    public void contextLoads() {
        // 测试Spring上下文加载成功
        assertNotNull(applicationContext);
    }

    @Test
    public void blogPostRepositoryBeanExists() {
        // 测试BlogPostRepository bean存在
        BlogPostRepository repository = applicationContext.getBean(BlogPostRepository.class);
        assertNotNull(repository);
        assertNotNull(repository instanceof BlogPostRepositoryImpl);
    }

    @Test
    public void blogPostServiceBeanExists() {
        // 测试BlogPostService bean存在
        BlogPostService service = applicationContext.getBean(BlogPostService.class);
        assertNotNull(service);
    }
}
