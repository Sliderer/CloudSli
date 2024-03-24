package cloud.server.controllers;

import org.apache.coyote.Response;
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

    private final String storagePrefix = "CloudStorage/";

    @PostMapping("/load-file/{login}")
    public ErrorResponse loadFile(@PathVariable String login, @RequestBody MultipartFile file) throws IOException {
        String originalFileName = file.getOriginalFilename();
        String directory = storagePrefix + login;
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
