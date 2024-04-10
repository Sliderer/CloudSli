package cloud.server.controllers;

import cloud.server.config.Config;
import cloud.server.services.LoaderService;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@CrossOrigin
public class LoaderController {

    @Autowired
    private LoaderService loaderService;

    private final Config config;

    @Autowired
    public LoaderController(Config config) {
        this.config = config;
    }

    @PostMapping("/load-file/{login}")
    public void loadFile(@PathVariable String login, @RequestParam String path, @RequestBody MultipartFile file) {
        loaderService.loadFile(file, config, login, path);
    }

}
