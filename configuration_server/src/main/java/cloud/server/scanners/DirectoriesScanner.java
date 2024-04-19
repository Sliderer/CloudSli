package cloud.server.scanners;


import cloud.server.config.Config;
import cloud.server.database.DirectoriesRepository;
import cloud.server.database.FilesRepository;
import cloud.server.enums.FileSystemObjects;
import cloud.server.models.Directory;
import cloud.server.models.FileSystemObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Component
public class DirectoriesScanner {

    private final Config config;

    @Autowired
    private DirectoriesRepository directoriesRepository;
    
    @Autowired
    private FilesRepository filesRepository;

    @Autowired
    public DirectoriesScanner(Config config) {
        this.config = config;
    }

    public List<FileSystemObject> scanDirectory(String login, String path) throws IOException {
        String pathToObject = config.storagePrefix + login + path;
        List<FileSystemObject> result = new ArrayList<>();

        directoriesRepository.findAll().stream().filter(directory -> directory.getName().equals(pathToObject)).forEach(
            directory -> {
                result.add(new FileSystemObject(FileSystemObjects.Directory, directory.getName()));
            }
        );
        
        filesRepository.findAll().stream().filter(file -> file.getName().equals(pathToObject)).forEach(
            file -> {
                result.add(new FileSystemObject(FileSystemObjects.File, file.getName()));
            }
        );

        return result;
    }
}
