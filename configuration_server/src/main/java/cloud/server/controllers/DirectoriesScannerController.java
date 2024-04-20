package cloud.server.controllers;

import cloud.server.database.DirectoriesRepository;
import cloud.server.models.FileSystemObject;
import cloud.server.scanners.DirectoriesScanner;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class DirectoriesScannerController {

    @Autowired
    private DirectoriesScanner directoriesScanner;
    
    @Autowired
    private DirectoriesCreator directoriesCreator;

    @GetMapping("/get-subdirs/{login}")
    public List<FileSystemObject> getInputDirs(@PathVariable String login, @RequestParam(required = false) String path,
            HttpServletResponse response) {
        return directoriesScanner.scanDirectory(login, path);
    }
}
