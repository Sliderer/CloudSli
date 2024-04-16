package cloud.server.controllers;

import cloud.server.config.Config;
import cloud.server.services.UploaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
public class UploaderController {

    @Autowired
    private UploaderService uploaderService;

    private final Config config;

    @Autowired
    public UploaderController(Config config) {
        this.config = config;
    }

    @PostMapping("/load-file/{login}")
    public void loadFile(@PathVariable String login, @RequestParam String path, @RequestBody MultipartFile file) {
        uploaderService.uploadFile(file, config, login, path);
    }

}
