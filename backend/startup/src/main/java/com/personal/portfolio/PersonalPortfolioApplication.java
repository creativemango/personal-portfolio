package com.personal.portfolio;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@MapperScan("com.personal.portfolio.blog.infrastructure.persistence.mapper")
public class PersonalPortfolioApplication {

    public static void main(String[] args) {
        SpringApplication.run(PersonalPortfolioApplication.class, args);
    }
}
