package cloud.server.controllers;

import cloud.server.database.DirectoriesRepository;
import cloud.server.config.CloudConfig;
import cloud.server.models.Directory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class DirectoriesCreator {

    @Autowired
    private CloudConfig config;

    @Autowired
    private DirectoriesRepository directoriesRepository;


    @PostMapping("/create-dir/{login}")
    public void createDir(@PathVariable String login, @RequestParam String path){
        String pathToDir = config.storagePrefix + login + path + "/";
        long count = directoriesRepository.findDirectoriesByName(pathToDir).size();
        if (count == 0){
            directoriesRepository.save(new Directory(pathToDir));
        }
    }
}
