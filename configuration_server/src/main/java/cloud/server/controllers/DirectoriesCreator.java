package cloud.server.controllers;

import cloud.server.database.DirectoriesRepository;
import cloud.server.config.Config;
import cloud.server.models.Directory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.Collection;

@RestController
@CrossOrigin
public class DirectoriesCreator {

    private final Config config;

    @Autowired
    private DirectoriesRepository directoriesRepository;

    @Autowired
    public DirectoriesCreator(Config config) {
        this.config = config;
    }

    @PostMapping("/create-dir/{login}")
    public void createDir(@PathVariable String login, @RequestParam String path){
        String pathToDir = config.storagePrefix + login + path;
        long count = directoriesRepository.findAll().stream().filter(directory -> directory.getName().equals(pathToDir)).count();
        if (count == 0){
            directoriesRepository.save(new Directory(pathToDir));
        }
    }
}
