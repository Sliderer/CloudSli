import {FilesSystemObjects} from "../enums/FilesSystemObjects";

export interface FileSystemObject {
    objectType: FilesSystemObjects,
    name: string
}