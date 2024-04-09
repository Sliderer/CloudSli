package cloud.server.controllers;

import cloud.server.config.Config;
import cloud.server.models.FileSystemObject;
import cloud.server.scanners.DirectoriesScanner;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class DirectoriesScannerController {



    @Autowired
    private DirectoriesScanner directoriesScanner;

    @GetMapping("/get-subdirs/{login}/{path}")
    public List<FileSystemObject> getInputDirs(@PathVariable String login, @PathVariable String path, HttpServletResponse response) {
        try{
            return directoriesScanner.scanDirectory(login, path);
        } catch (IOException e){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return new ArrayList<>();
    }

    @GetMapping("/get-subdirs/{login}/")
    public List<FileSystemObject> getInputDirs(@PathVariable String login, HttpServletResponse response) {
        try{
            return directoriesScanner.scanDirectory(login, "");
        } catch (IOException e){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return new ArrayList<>();
    }


}
