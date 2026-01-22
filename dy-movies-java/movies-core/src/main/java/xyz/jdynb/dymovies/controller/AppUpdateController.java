package xyz.jdynb.dymovies.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.jdynb.dymovies.common.entity.AppUpdate;
import xyz.jdynb.dymovies.common.pojo.Result;
import xyz.jdynb.dymovies.service.AppUpdateService;

/**
 * App 更新
 */
@RestController
@RequestMapping("/updates")
@Tag(name = "App更新", description = "App更新相关")
public class AppUpdateController {

    @Resource
    private AppUpdateService appUpdateService;

    @Operation(
            summary = "获取更新", // 具体标题
            description = "通过版本号获取最新版本更新" // 描述
            // operationId = "checkUpdate" // 操作符id，默认是方法名称
            // tags = {"检查更新"}
    )
    @GetMapping("/{code}")
    @ApiResponse(
            responseCode = "200", description = "获取成功"
            /*content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Result.class)
            )*/
    )
    @ApiResponse(
            responseCode = "400", description = "获取失败",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Result.class)
            )
    )
    public Result<AppUpdate> checkUpdate(
            @Parameter(
                    // name = "versionCode", // 自定义参数名称
                    required = true, // 必传
                    description = "版本号", // 参数描述
                    example = "1", // 示例
                    in = ParameterIn.PATH
                    /*  // 路径参数
                     schema = @Schema( // 定义规范
                             type = "int"
                     )*/
            )
            @PathVariable("code") long versionCode) throws InterruptedException {
        AppUpdate appUpdate = appUpdateService.findLastByCode(versionCode);
        Thread.sleep(3000);
        if (appUpdate == null) {
            return Result.success("已是最新版本");
        }
        return Result.success(appUpdate);
    }

}
