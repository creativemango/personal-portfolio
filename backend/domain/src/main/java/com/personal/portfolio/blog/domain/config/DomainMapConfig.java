package com.personal.portfolio.blog.domain.config;

import io.github.linpeilie.annotations.MapperConfig;

@MapperConfig(adapterPackage = "com.personal.portfolio.blog.domain.mapstruct",
        mapperPackage = "com.personal.portfolio.blog.domain.mapstruct",
        adapterClassName = "DomainMapperAdapter")
public class DomainMapConfig {
}
