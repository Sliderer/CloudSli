package cloud.server.controllers;

import cloud.server.database.FilesRepository;
import cloud.server.config.CloudConfig;
import cloud.server.models.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class FileAdditor {

    @Autowired
    private CloudConfig config;

    @Autowired
    private FilesRepository filesRepository;

    @PostMapping("/load-file/{login}")
    public void createDir(@PathVariable String login, @RequestParam String path){
        String pathToDir = config.storagePrefix + login + "/" + path + "/";
        System.out.println(pathToDir);
        long count = filesRepository.findFilesByName(pathToDir).size();
        if (count == 0){
            filesRepository.save(new File(pathToDir));
        }
    }
}
