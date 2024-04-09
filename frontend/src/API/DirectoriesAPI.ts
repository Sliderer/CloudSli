import {injectable, singleton} from "tsyringe";
import {API} from "./API";
import axios from "axios";
import 'reflect-metadata'
import {FileSystemObject} from "../models/FileSystemObject";

@injectable()
class DirectoriesAPI extends API{

    constructor() {
        super();
    }

    public getSubDirectories = async (login: string, currentPath: string[]) => {
        let path = currentPath.join('/')
        return await DirectoriesAPI.api.get<FileSystemObject[]>(`/get-subdirs/${login}/${path}`)
    }

    public createDirectory = async (login: string, directoryPath: string) => {
        return await DirectoriesAPI.api.post(`/create-dir/${login}/${directoryPath}`)
    }
}

export default DirectoriesAPI;