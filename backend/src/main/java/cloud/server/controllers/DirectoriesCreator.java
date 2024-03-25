package cloud.server.controllers;

import cloud.server.config.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@RestController
@CrossOrigin
public class DirectoriesCreator {

    private final Config config;

    @Autowired
    public DirectoriesCreator(Config config) {
        this.config = config;
    }

    @PostMapping("/create-dir/{login}/{dirName}")
    public void createDir(@PathVariable String login, @PathVariable String dirName){
        String pathToDir = config.storagePrefix + login + "/" + dirName;
        File file = new File(pathToDir);
        if (!file.exists()){
            file.mkdir();
        }
    }
}
