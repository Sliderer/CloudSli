package cloud.server.config;

import cloud.server.models.Directory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Directory, Integer> {
}