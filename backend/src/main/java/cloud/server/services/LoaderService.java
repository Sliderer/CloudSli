package cloud.server.services;

import cloud.server.config.Config;
import cloud.server.helpers.FileLoader;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class LoaderService {

    public void loadFile(MultipartFile file, Config config, String login, String path){
        String directory = config.storagePrefix + login + "/" + path;
        System.out.println(directory);
        String originalName = file.getOriginalFilename();
        try{
            byte[] bytes = file.getBytes();
            Thread.ofVirtual().start(new FileLoader(originalName, bytes, directory));
        } catch (IOException e){
            System.out.println("can not start thread");
            e.printStackTrace();
        }

    }
}
