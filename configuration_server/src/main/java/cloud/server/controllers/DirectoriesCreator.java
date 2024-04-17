package cloud.server.controllers;

import cloud.server.config.ClientRepository;
import cloud.server.config.Config;
import cloud.server.models.Directory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;

@RestController
@CrossOrigin
public class DirectoriesCreator {

    private final Config config;

    @Autowired
    public DirectoriesCreator(Config config) {
        this.config = config;
    }

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping("/create-dir/{login}")
    public void createDir(@PathVariable String login, @RequestParam String path){
        String pathToDir = config.storagePrefix + login + "/" + path;
        File file = new File(pathToDir);
        file.mkdir();

        clientRepository.save(new Directory(path, new Integer[]{}, new Integer[]{}));
    }
}
