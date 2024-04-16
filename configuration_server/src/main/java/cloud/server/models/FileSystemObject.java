package cloud.server.models;

import cloud.server.enums.FileSystemObjects;

public record FileSystemObject(FileSystemObjects objectType, String name) {
}
