package xyz.jdynb.dymovies;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@OpenAPIDefinition(info = @Info(title = "冬雨影视后端接口", description = "冬雨影视后端接口", version = "1.0.0"))
public class DyMoviesApplication {

    public static void main(String[] args) {
        SpringApplication.run(DyMoviesApplication.class, args);
    }

}
