package cloud.server.database;

import cloud.server.models.File;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; 

public interface FilesRepository extends JpaRepository<File, Integer> {
    @Query(value="SELECT f FROM File f WHERE f.name LIKE ?1")
    List<File> findFilesByName(String name);
}