package com.personal.portfolio.blog.infrastructure.config;

import com.personal.portfolio.blog.infrastructure.interceptor.ProfileInterceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private ProfileInterceptor profileInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        String patternsAll = "/**";

        registry.addInterceptor(profileInterceptor).addPathPatterns(patternsAll);

    }

    @Override
    public void addResourceHandlers(org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry registry) {
        // Map /uploads/** to the local uploads directory
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}
