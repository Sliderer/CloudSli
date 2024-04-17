package cloud.server.models;

import jakarta.persistence.*;

@Entity
public class Directory {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name="nested_folders")
    private Integer[] nestedFolders;

    @Column(name="nested_files")
    private Integer[] nestedFiles;

    public Directory(String name, Integer[] nestedFolders, Integer[] nestedFiles) {
        this.name = name;
        this.nestedFolders = nestedFolders;
        this.nestedFiles = nestedFiles;
    }
}
