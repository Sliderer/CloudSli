package cloud.server.models;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name="directories")
@Getter
public class Directory {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    public Directory(String name) {
        this.name = name;
    }

    public Directory() {
        this.name = "";
    }
}
