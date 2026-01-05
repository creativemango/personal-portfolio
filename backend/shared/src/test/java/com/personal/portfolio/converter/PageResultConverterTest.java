package com.personal.portfolio.converter;

import com.personal.portfolio.page.PageResult;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.Arrays;

public class PageResultConverterTest {

    public static class Src {
        private Long id;
        private String content;
        private LocalDateTime createdAt;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }

    public static class Dst {
        private Long id;
        private String content;
        private LocalDateTime createdAt;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }

    @Test
    void convert_shouldMapRecordsAndRetainPagination() {
        Src n1 = new Src();
        n1.setId(1L);
        n1.setContent("a");
        n1.setCreatedAt(LocalDateTime.now());
        Src n2 = new Src();
        n2.setId(2L);
        n2.setContent("b");
        n2.setCreatedAt(LocalDateTime.now());

        PageResult<Src> source = PageResult.of(Arrays.asList(n1, n2), 2L, 1, 10);
        PageResultConverter converter = new PageResultConverter();
        PageResult<Dst> target = converter.convert(source, Dst.class);

        assertEquals(2, target.getRecords().size());
        assertEquals(2L, target.getTotal());
        assertEquals(1, target.getPage().intValue());
        assertEquals(10, target.getSize().intValue());
        assertEquals("a", target.getRecords().get(0).getContent());
        assertEquals("b", target.getRecords().get(1).getContent());
    }
}
