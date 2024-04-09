package cloud.server.controllers;

import cloud.server.config.Config;
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
    private final Config config;

    @Autowired
    public LoaderController(Config config) {
        this.config = config;
    }


    @PostMapping("/load-file/{login}/{path}")
    public void loadFile(@PathVariable String login, @PathVariable String path, @RequestBody MultipartFile file, HttpServletResponse response) throws IOException {
        String originalFileName = file.getOriginalFilename();
        String directory = config.storagePrefix + login + "/" + path;
        String pathString = directory + "/" + originalFileName;
        File fileDestination = new File(directory);
        if (!fileDestination.exists()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        Files.copy(file.getInputStream(), Paths.get(pathString), StandardCopyOption.REPLACE_EXISTING);
    }

    @PostMapping("/load-file/{login}/")
    public void loadFile(@PathVariable String login, @RequestBody MultipartFile file, HttpServletResponse response) {
        try{
            String originalFileName = file.getOriginalFilename();
            String directory = config.storagePrefix + login;
            String pathString = directory + "/" + originalFileName;
            File fileDestination = new File(directory);
            if (!fileDestination.exists()) {
                if (!fileDestination.mkdir()) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                }
            }
            Files.copy(file.getInputStream(), Paths.get(pathString), StandardCopyOption.REPLACE_EXISTING);
        } catch(IOException e){
            e.printStackTrace();
        }
    }

}
