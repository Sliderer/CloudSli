package cloud.server.scanners;

import cloud.server.config.CloudConfig;
import cloud.server.database.DirectoriesRepository;
import cloud.server.database.FilesRepository;
import cloud.server.enums.FileSystemObjects;
import cloud.server.models.FileSystemObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DirectoriesScanner {

    @Autowired
    private CloudConfig config;

    @Autowired
    private DirectoriesRepository directoriesRepository;

    @Autowired
    private FilesRepository filesRepository;

    private String formatFileName(String parentPath, String childPath) {
        return childPath.substring(parentPath.length(), childPath.length() - 1);
    }


    private boolean isNestedDirectory(String parentPath, String childPath) {

        return childPath.substring(parentPath.length(), childPath.length() - 1).lastIndexOf('/') == -1;
    }


    public List<FileSystemObject> scanDirectory(String login, String path) {
        String parentPath = config.storagePrefix + login + path + "/";
        List<FileSystemObject> result = new ArrayList<>();

        directoriesRepository.findDirectoriesByName(parentPath + "%/")
                .forEach(
                        directory -> {
                            if (isNestedDirectory(parentPath, directory.getName())){
                                result.add(new FileSystemObject(FileSystemObjects.Directory, formatFileName(parentPath, directory.getName())));
                            }
                        });

        filesRepository.findFilesByName(parentPath + "%/").forEach(
                file -> {
                    if (isNestedDirectory(parentPath, file.getName())){
                        result.add(new FileSystemObject(FileSystemObjects.File, formatFileName(parentPath, file.getName())));
                    }
                });

        return result;
    }
}
