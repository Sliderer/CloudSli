package cloud.server.database;

import cloud.server.models.File;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; 

public interface FilesRepository extends JpaRepository<File, Integer> {
}