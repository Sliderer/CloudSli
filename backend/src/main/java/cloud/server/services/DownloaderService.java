package cloud.server.services;

import cloud.server.config.Config;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.net.MalformedURLException;
import java.nio.file.Paths;

@Component
public class DownloaderService {

    public ResponseEntity downloadFile(Config config, String login, String path) throws MalformedURLException {
        String filePath = config.storagePrefix + login + path;
        Resource file = new UrlResource(Paths.get(filePath).toUri());
        return ResponseEntity.ok().body(file);
    }
}
