package xyz.jdynb.dymovies.common.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import xyz.jdynb.dymovies.common.validator.UpdateGroup;

import java.time.LocalDateTime;

/**
 * App 更新表
 * @TableName app_update
 */
@Data
@Schema(
        name = "AppUpdate", // 自定义名称
        description = "App更新实体类" // 描述
)
public class AppUpdate {
    /**
     * 唯一id
     */
    @NotNull(groups = UpdateGroup.class)
    @Schema(
            name = "id", // 自定义字段名称
            description = "唯一id",  // 描述
            example = "1",  // 示例
            requiredMode = Schema.RequiredMode.REQUIRED, // 必传
            accessMode =  Schema.AccessMode.READ_ONLY, // 只读
            type = "int",
            minLength = 1,
            maxLength = 9999,
            minimum = "1"
    )
    private Integer id;

    /**
     * 版本名
     */
    @NotNull
    @NotBlank
    @Schema(description = "版本号", example = "1.0.0")
    private String versionName;

    /**
     * 版本代码
     */
    @NotNull
    @Schema(description = "版本代码", example = "1")
    private Integer versionCode;

    /**
     * 更新内容
     */
    @NotNull
    @NotBlank
    @Schema(description = "更新内容", example = "test123")
    private String content;

    /**
     * 状态
     */
    @Schema(description = "0开启，1关闭", example = "1")
    private Integer status;

    /**
     * 是否强制更新
     */
    @Schema(description = "是否强制更新, 1强制，0不强制", example = "1")
    private Integer isForce;

    /**
     * 更新地址
     */
    @NotNull
    @NotBlank
    @Schema(description = "更新地址", example = "https://www.baidu.com")
    private String url;

    /**
     * 更新时间
     */
    @Schema(
            title = "更新时间",
            description = "更新发布的时间",
            example = "2025-02-01 12:00:00",
            type = "string",
            format = "date-time",
            accessMode = Schema.AccessMode.READ_ONLY
    )
    private LocalDateTime createAt;
}