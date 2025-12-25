package com.personal.portfolio;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.TestPropertySource;

import java.util.LinkedHashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

import com.personal.portfolio.blog.domain.common.ApiResponse;
import com.personal.portfolio.blog.interfaces.dto.response.LoginResponse;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
        "app.admin.username=admin"
})
public class SecurityAuthorizationTests {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    private String url(String path) {
        return "http://localhost:" + port + path;
    }

    @Test
    void visitor_can_access_published_list_and_detail_without_auth() {
        ResponseEntity<String> listResp = restTemplate.getForEntity(url("/api/blog/posts/published?page=1&size=5"), String.class);
        assertThat(listResp.getStatusCode().is2xxSuccessful()).isTrue();

        // Try get one post detail by ID=2 (schema.sql has published item as second insert)
        ResponseEntity<String> detailResp = restTemplate.getForEntity(url("/api/blog/posts/2"), String.class);
        assertThat(detailResp.getStatusCode().is2xxSuccessful()).isTrue();
    }

    @Test
    void creating_post_requires_admin_role() {
        // Without token -> should be 4xx
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String body = "{\"title\":\"t\",\"slug\":\"s\",\"content\":\"c\"}";
        ResponseEntity<String> noAuthResp = restTemplate.exchange(url("/api/blog/posts"), HttpMethod.POST, new HttpEntity<>(body, headers), String.class);
        assertThat(noAuthResp.getStatusCode().is4xxClientError()).isTrue();

        // Register and login as visitor
        ResponseEntity<Map> regVisitor = restTemplate.postForEntity(url("/api/register"), Map.of("username", "visitor", "password", "visitorpass", "email", "v@e.com"), Map.class);
        assertThat(regVisitor.getStatusCode().is2xxSuccessful()).isTrue();
        ResponseEntity<Map> loginVisitor = restTemplate.postForEntity(url("/api/login"), Map.of("username", "visitor", "password", "visitorpass"), Map.class);
        assertThat(loginVisitor.getStatusCode().is2xxSuccessful()).isTrue();
        LinkedHashMap<String, String> visitorResponse = (LinkedHashMap<String, String>) loginVisitor.getBody().get("data");
        String visitorToken = visitorResponse.get("token");

        headers.set("Authorization", "Bearer " + visitorToken);
        ResponseEntity<String> visitorResp = restTemplate.exchange(url("/api/blog/posts"), HttpMethod.POST, new HttpEntity<>(body, headers), String.class);
        assertThat(visitorResp.getStatusCode().value()).isIn(401, 403);

        // Register and login as admin (pre-set via property)
        ResponseEntity<Map> loginAdmin = restTemplate.postForEntity(url("/api/login"), Map.of("username", "admin", "password", "adminadmin"), Map.class);
        assertThat(loginAdmin.getStatusCode().is2xxSuccessful()).isTrue();
        LinkedHashMap<String, String> adminResponse = (LinkedHashMap<String, String>) loginAdmin.getBody().get("data");
        String adminToken = adminResponse.get("token");
        headers.set("Authorization", "Bearer " + adminToken);
        ResponseEntity<String> adminResp = restTemplate.exchange(url("/api/blog/posts"), HttpMethod.POST, new HttpEntity<>(body, headers), String.class);
        // Either created or validation errors unrelated to auth; must not be 401/403
        assertThat(adminResp.getStatusCode().is2xxSuccessful() || adminResp.getStatusCode().is4xxClientError()).isTrue();
        assertThat(adminResp.getStatusCode().value()).isNotIn(401, 403);
    }
}
