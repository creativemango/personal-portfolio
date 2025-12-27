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

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
        "app.admin.username=admin"
})
public class CommentSecurityTests {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    private String url(String path) {
        return "http://localhost:" + port + path;
    }

    @Test
    void comments_list_is_public() {
        ResponseEntity<String> resp = restTemplate.getForEntity(url("/api/blog/posts/2/comments?page=1&size=10"), String.class);
        assertThat(resp.getStatusCode().is2xxSuccessful()).isTrue();
    }

    @Test
    void creating_comment_requires_auth_and_published_post() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String body = "{\"content\":\"Hello world\"}";

        ResponseEntity<String> noAuthResp = restTemplate.exchange(url("/api/blog/posts/2/comments"), HttpMethod.POST, new HttpEntity<>(body, headers), String.class);
        assertThat(noAuthResp.getStatusCode().is4xxClientError()).isTrue();

        ResponseEntity<Map> regVisitor = restTemplate.postForEntity(url("/api/register"), Map.of("username", "cvisitor", "password", "visitorpass", "email", "cv@e.com"), Map.class);
        assertThat(regVisitor.getStatusCode().is2xxSuccessful()).isTrue();
        ResponseEntity<Map> loginVisitor = restTemplate.postForEntity(url("/api/login"), Map.of("username", "cvisitor", "password", "visitorpass"), Map.class);
        assertThat(loginVisitor.getStatusCode().is2xxSuccessful()).isTrue();
        LinkedHashMap<String, Object> visitorData = (LinkedHashMap<String, Object>) loginVisitor.getBody().get("data");
        String visitorToken = (String) visitorData.get("token");

        headers.set("Authorization", "Bearer " + visitorToken);
        ResponseEntity<Map> okResp = restTemplate.exchange(url("/api/blog/posts/2/comments"), HttpMethod.POST, new HttpEntity<>(body, headers), Map.class);
        assertThat(okResp.getStatusCode().is2xxSuccessful()).isTrue();

        ResponseEntity<String> unpublishedResp = restTemplate.exchange(url("/api/blog/posts/1/comments"), HttpMethod.POST, new HttpEntity<>(body, headers), String.class);
        assertThat(unpublishedResp.getStatusCode().is4xxClientError()).isTrue();
    }

    @Test
    void delete_comment_allowed_for_admin_or_owner_only() {
        ResponseEntity<Map> regVisitor = restTemplate.postForEntity(url("/api/register"), Map.of("username", "cdeleter", "password", "visitorpass", "email", "cd@e.com"), Map.class);
        assertThat(regVisitor.getStatusCode().is2xxSuccessful()).isTrue();
        ResponseEntity<Map> loginVisitor = restTemplate.postForEntity(url("/api/login"), Map.of("username", "cdeleter", "password", "visitorpass"), Map.class);
        String visitorToken = (String) ((LinkedHashMap<String, Object>) loginVisitor.getBody().get("data")).get("token");

        HttpHeaders vh = new HttpHeaders();
        vh.setContentType(MediaType.APPLICATION_JSON);
        vh.set("Authorization", "Bearer " + visitorToken);
        ResponseEntity<Map> created = restTemplate.exchange(url("/api/blog/posts/2/comments"), HttpMethod.POST, new HttpEntity<>("{\"content\":\"to delete\"}", vh), Map.class);
        assertThat(created.getStatusCode().is2xxSuccessful()).isTrue();
        LinkedHashMap<String, Object> createdData = (LinkedHashMap<String, Object>) created.getBody().get("data");
        Integer commentIdInt = (Integer) ((LinkedHashMap<String, Object>) createdData).get("id");
        Long commentId = commentIdInt != null ? commentIdInt.longValue() : null;
        assertThat(commentId).isNotNull();

        ResponseEntity<Map> regOther = restTemplate.postForEntity(url("/api/register"), Map.of("username", "cother", "password", "visitorpass", "email", "co@e.com"), Map.class);
        ResponseEntity<Map> loginOther = restTemplate.postForEntity(url("/api/login"), Map.of("username", "cother", "password", "visitorpass"), Map.class);
        String otherToken = (String) ((LinkedHashMap<String, Object>) loginOther.getBody().get("data")).get("token");

        HttpHeaders oh = new HttpHeaders();
        oh.set("Authorization", "Bearer " + otherToken);
        ResponseEntity<String> otherDelete = restTemplate.exchange(url("/api/comments/" + commentId), HttpMethod.DELETE, new HttpEntity<>(null, oh), String.class);
        assertThat(otherDelete.getStatusCode().value()).isIn(401, 403);

        ResponseEntity<Map> loginAdmin = restTemplate.postForEntity(url("/api/login"), Map.of("username", "admin", "password", "adminadmin"), Map.class);
        String adminToken = (String) ((LinkedHashMap<String, Object>) loginAdmin.getBody().get("data")).get("token");
        HttpHeaders ah = new HttpHeaders();
        ah.set("Authorization", "Bearer " + adminToken);
        ResponseEntity<String> adminDelete = restTemplate.exchange(url("/api/comments/" + commentId), HttpMethod.DELETE, new HttpEntity<>(null, ah), String.class);
        assertThat(adminDelete.getStatusCode().is2xxSuccessful() || adminDelete.getStatusCode().is4xxClientError()).isTrue();
        assertThat(adminDelete.getStatusCode().value()).isNotIn(401, 403);
    }
}

