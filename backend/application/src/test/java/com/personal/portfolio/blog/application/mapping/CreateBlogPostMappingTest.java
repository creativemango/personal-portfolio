package com.personal.portfolio.blog.application.mapping;

import com.personal.portfolio.blog.application.dto.CreateBlogPostCommand;
import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.util.BeanCopyUtils;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;

public class CreateBlogPostMappingTest {

    @Test
    void toBean_shouldCopyBasicFields() {
        CreateBlogPostCommand cmd = new CreateBlogPostCommand();
        cmd.setTitle("t");
        cmd.setSlug("s");
        cmd.setContent("c");
        cmd.setSummary("sum");
        cmd.setCategory("cat");
        cmd.setTags(Arrays.asList("a","b"));
        cmd.setAuthorId(123L);

        BlogPost post = BeanCopyUtils.toBean(cmd, BlogPost.class);

        assertEquals(cmd.getTitle(), post.getTitle());
        assertEquals(cmd.getSlug(), post.getSlug());
        assertEquals(cmd.getContent(), post.getContent());
        assertEquals(cmd.getSummary(), post.getSummary());
        assertEquals(cmd.getCategory(), post.getCategory());
        assertEquals(cmd.getAuthorId(), post.getAuthorId());
        assertNotNull(post.getTags());
        assertEquals(cmd.getTags().size(), post.getTags().size());
    }
}
