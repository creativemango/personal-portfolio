package com.personal.portfolio.blog.infrastructure.util;

import static com.personal.portfolio.blog.infrastructure.context.ContextConstants.*;

import com.alibaba.ttl.TransmittableThreadLocal;
import com.personal.portfolio.blog.infrastructure.exception.ProfileException;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class ProfileUtil {

    private static final ThreadLocal<Map<String, String>> PROFILES;

    static {
        PROFILES = new TransmittableThreadLocal<>();
        PROFILES.set(new HashMap<>());
    }

    public ProfileUtil() {
    }

    private static Map<String, String> getProfiles() {
        if (null == PROFILES.get()) {
            PROFILES.set(new HashMap<>());
        }
        return PROFILES.get();
    }

    public static void put(String key, String value) {
        getProfiles().put(key, value);
    }

    public static String get(String key) {
        return getProfiles().get(key);
    }

    public static String getUsername() throws ProfileException {
        String username = get(USERNAME);
        if (username == null) {
            throw new ProfileException("username is null");
        }
        return username;
    }

    public static Long getUserId() {
        String userId = get(USER_ID);
        if (userId == null) {
            throw new ProfileException("userId is null");
        }
        return Long.parseLong(userId);
    }

    public static String getHost() {
        return get(HOST);
    }

    public static String getLanguage() {
        return get(LANGUAGE);
    }

    public static void remove() {
        if (Objects.nonNull(PROFILES)) {
            PROFILES.remove();
        }
    }



}
