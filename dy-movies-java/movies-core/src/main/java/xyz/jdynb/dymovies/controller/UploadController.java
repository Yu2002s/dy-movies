package xyz.jdynb.dymovies.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import xyz.jdynb.dymovies.common.pojo.Result;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/uploads")
@Tag(name = "上传文件")
public class UploadController {

    @PostMapping
    @Operation(summary = "上传文件到服务器")
    public Result<String> upload(
            @Parameter(name = "file", required = true, description = "文件")
            @RequestParam("file") MultipartFile file) {
        try {
            file.transferTo(new File("D:\\" + file.getOriginalFilename()));
        } catch (IOException e) {
            return Result.error(e.getMessage());
        }
        return Result.success("上传文件成功", "D:\\" + file.getOriginalFilename());
    }

}
