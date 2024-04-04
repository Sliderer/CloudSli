package cloud.server.controllers;

import cloud.server.config.Config;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final Config config;

    @Autowired
    public LoaderController(Config config) {
        this.config = config;
    }


    @PostMapping("/load-file/{login}/{path}/")
    public ErrorResponse loadFile(@PathVariable String login, @PathVariable String path, @RequestBody MultipartFile file) throws IOException {
        String originalFileName = file.getOriginalFilename();
        String directory = config.storagePrefix + login + "/" + path;
        String pathString = directory + "/" + originalFileName;
        File fileDestination = new File(directory);
        if (!fileDestination.exists()) {
            return ErrorResponse.create(new RuntimeException(), HttpStatusCode.valueOf(404), "can not find dir");
        }
        Files.copy(file.getInputStream(), Paths.get(pathString), StandardCopyOption.REPLACE_EXISTING);
        return null;
    }

    @PostMapping("/load-file/{login}/")
    public ErrorResponse loadFile(@PathVariable String login, @RequestBody MultipartFile file) throws IOException {
        String originalFileName = file.getOriginalFilename();
        String directory = config.storagePrefix + login;
        String pathString = directory + "/" + originalFileName;
        File fileDestination = new File(directory);
        if (!fileDestination.exists()) {
            if (!fileDestination.mkdir()) {
                return ErrorResponse.create(new RuntimeException(), HttpStatusCode.valueOf(404), "can not create dir");
            }
        }
        Files.copy(file.getInputStream(), Paths.get(pathString), StandardCopyOption.REPLACE_EXISTING);
        return null;
    }

}
