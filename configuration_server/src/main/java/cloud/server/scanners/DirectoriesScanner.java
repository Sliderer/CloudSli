package cloud.server.scanners;

import cloud.server.config.Config;
import cloud.server.database.DirectoriesRepository;
import cloud.server.database.FilesRepository;
import cloud.server.enums.FileSystemObjects;
import cloud.server.models.Directory;
import cloud.server.models.FileSystemObject;
import io.micrometer.common.util.StringUtils;

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

    private boolean isNestedDirectory(String parentPath, String childPath) {
        return childPath.length() > parentPath.length() &&
                childPath.substring(0, parentPath.length()).equals(parentPath) &&
                childPath.lastIndexOf('/') == parentPath.length();
    }

    private String formatFileName(String parentPath, String childPath) {
        return childPath.substring(parentPath.length() + 1);
    }

    public List<FileSystemObject> scanDirectory(String login, String path) {
        String parentPath = config.storagePrefix + login + path;
        List<FileSystemObject> result = new ArrayList<>();

        directoriesRepository.findAll().stream().filter(directory -> isNestedDirectory(parentPath, directory.getName()))
                .forEach(
                        directory -> {
                            result.add(new FileSystemObject(FileSystemObjects.Directory, formatFileName(parentPath, directory.getName())));
                        });

        filesRepository.findAll().stream().filter(file -> isNestedDirectory(parentPath, file.getName())).forEach(
                file -> {
                    result.add(new FileSystemObject(FileSystemObjects.File, formatFileName(parentPath, file.getName())));
                });

        return result;
    }
}
