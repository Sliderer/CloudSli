package cloud.server.controllers;

import cloud.server.config.Config;
import cloud.server.services.DownloaderService;

import java.nio.file.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
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
        try {
            return downloaderService.downloadFile(config, login, path);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body(null);
    }

}
