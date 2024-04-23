package cloud.server.database;

import cloud.server.models.Directory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; 
import java.util.Collection;
import java.util.List;

public interface DirectoriesRepository extends JpaRepository<Directory, Integer> {
}