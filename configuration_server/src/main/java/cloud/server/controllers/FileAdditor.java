package cloud.server.controllers;

import cloud.server.database.FilesRepository;
import cloud.server.config.Config;
import cloud.server.models.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class FileAdditor {

    private final Config config;

    @Autowired
    private FilesRepository filesRepository;

    @Autowired
    public FileAdditor(Config config) {
        this.config = config;
    }

    @PostMapping("/load-file/{login}")
    public void createDir(@PathVariable String login, @RequestParam String path){
        String pathToDir = config.storagePrefix + login + "/" + path;
        System.out.println(pathToDir);
        long count = filesRepository.findAll().stream().filter(file -> file.getName().equals(pathToDir)).count();
        if (count == 0){
            filesRepository.save(new File(pathToDir));
        }
    }
}
