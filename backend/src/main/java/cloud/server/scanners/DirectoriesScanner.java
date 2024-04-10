package cloud.server.scanners;


import cloud.server.config.Config;
import cloud.server.enums.FileSystemObjects;
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
    public DirectoriesScanner(Config config) {
        this.config = config;
    }

    public List<FileSystemObject> scanDirectory(String login, String path) throws IOException {
        Path pathToDir = Paths.get(config.storagePrefix + login + "/" + path);
        List<FileSystemObject> result = new ArrayList<>();
        File files = new File(String.valueOf(pathToDir));
        if (files == null){
            throw new IOException();
        }
        System.out.println(path);
        for (File file : files.listFiles()){
            String fileName = file.getName();
            if (file.isDirectory()){
                result.add(new FileSystemObject(FileSystemObjects.Directory, fileName));
            }
            if (file.isFile()){
                result.add(new FileSystemObject(FileSystemObjects.File, fileName));
            }
        }
        return result;
    }
}
