package cloud.server.helpers;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileUploader implements Runnable {

    public FileUploader(String originalName, byte[] bytes, String directory){
        this.bytes = bytes;
        this.originalFileName = originalName;
        this.directory = directory;
    }

    @Override
    public void run() {
        String pathString = directory + "/" + originalFileName;
        File fileDestination = new File(directory);
        if (!fileDestination.exists()) {
            if (!fileDestination.mkdirs()) {
                return;
            }
        }
        try (FileOutputStream output = new FileOutputStream(pathString)) {
            output.write(bytes);
        } catch (IOException e){
            System.out.println("can not get bytes");
            e.printStackTrace();
        }
    }

    private byte[] bytes;
    private String directory;
    private String originalFileName;
}
