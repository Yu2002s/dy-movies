package xyz.jdynb.dymovies.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("冬雨影视")
                        .version("1.0.0")
                        .description("冬雨影视后端接口")
                        .contact(new Contact()
                                .name("Test")
                                .email("jiangdongyu54@gmail.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0"))
                ).externalDocs(new ExternalDocumentation()
                        .description("文档说明")
                        .url("http://dyys.jdynb.xyz"));
    }

}
