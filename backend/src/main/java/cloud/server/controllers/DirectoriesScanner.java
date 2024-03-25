package cloud.server.controllers;

import cloud.server.config.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class DirectoriesScanner {

    private final Config config;

    @Autowired
    public DirectoriesScanner(Config config) {
        this.config = config;
    }

    @GetMapping("/get-input-dirs/{login}/{path}")
    public List<String> getInputDirs(@PathVariable String login, @PathVariable String path) {
        Path pathToDir = Paths.get(config.storagePrefix + login + "/" + path);
        List<String> result = new ArrayList<>();
        try (DirectoryStream<Path> directoryStream = Files.newDirectoryStream(pathToDir, (Path file) -> Files.isDirectory(file))) {
            for (Path dirPath: directoryStream){
                result.add(String.valueOf(dirPath.getFileName()));
            }
        } catch (Exception e) {

        }

        return result;
    }
}
