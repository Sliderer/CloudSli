package cloud.server.services;

import cloud.server.config.Config;
import cloud.server.helpers.FileUploader;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class UploaderService {

    public void uploadFile(MultipartFile file, Config config, String login, String path){
        String directory = config.storagePrefix + login + "/" + path;
        String originalName = file.getOriginalFilename();
        try{
            byte[] bytes = file.getBytes();
            Thread.ofVirtual().start(new FileUploader(originalName, bytes, directory));
        } catch (IOException e){
            System.out.println("can not start thread");
            e.printStackTrace();
        }

    }
}
