import {injectable, singleton} from "tsyringe";
import {API} from "./API";
import axios from "axios";
import {SERVER_ADDRESS} from "../config";
import 'reflect-metadata'

@injectable()
class DownloaderAPI extends API{

    constructor() {
        super();
    }

    public downloadFile = async (login: string, file: string) => {
        let result = await DownloaderAPI.api.get(`/download-file/${login}?path=${file}`);
        return result
    }
}

export default DownloaderAPI;