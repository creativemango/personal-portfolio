package com.personal.portfolio.blog.application.config;

import io.github.linpeilie.annotations.MapperConfig;

@MapperConfig(adapterPackage = "com.personal.portfolio.blog.application.mapstruct",
        mapperPackage = "com.personal.portfolio.blog.application.mapstruct",
        adapterClassName = "AppMapperAdapter")
public class AppMapConfig {
}
