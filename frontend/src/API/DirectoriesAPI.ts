import {injectable, singleton} from "tsyringe";
import {API} from "./API";
import axios from "axios";
import 'reflect-metadata'

@injectable()
class DirectoriesAPI extends API{

    constructor() {
        super();
    }

    public getSubDirectories = async (login: string, currentPath: string) => {
        return await DirectoriesAPI.api.get<string[]>(`/get-subdirs/${login}/${currentPath}`)
    }
}

export default DirectoriesAPI;