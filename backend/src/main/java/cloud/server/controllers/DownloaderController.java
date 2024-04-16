package cloud.server.controllers;

import cloud.server.config.Config;
import cloud.server.services.DownloaderService;
import jakarta.servlet.http.HttpServletResponse;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.file.*;

import org.apache.catalina.startup.ClassLoaderFactory.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class DownloaderController {

    @Autowired
    private DownloaderService downloaderService;

    private final Config config;

    @Autowired
    public DownloaderController(Config config) {
        this.config = config;
    }

    @GetMapping("/download-file/{login}")
    public ResponseEntity loadFile(@PathVariable String login, @RequestParam String path) {
        String filePath = config.storagePrefix + login + "/" + path;
        try {
            File file = new File(filePath);
            InputStream fileInputStream = new FileInputStream(file);
            HttpHeaders headers = new HttpHeaders(); 
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName());
            InputStreamResource inputStreamResource = new InputStreamResource(fileInputStream);
            return ResponseEntity.ok().contentLength(Files.size(Paths.get(filePath))).headers(headers)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM).body(inputStreamResource);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body(null);
    }

}
