package cloud.server.database;

import cloud.server.models.Directory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; 
import java.util.Collection;
import java.util.List;

public interface DirectoriesRepository extends JpaRepository<Directory, Integer> {
    @Query(value="SELECT d FROM Directory d WHERE d.name LIKE ?1")
    List<Directory> findDirectoriesByName(String name);
}