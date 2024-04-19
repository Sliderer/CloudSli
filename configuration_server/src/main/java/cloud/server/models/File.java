package cloud.server.models;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name="files")
@Getter
public class File {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    public File(String name) {
        this.name = name;
    }

    public File() {
        this.name = "";
    }
}
