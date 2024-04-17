import {injectable, singleton} from "tsyringe";
import {API} from "./API";
import 'reflect-metadata'

@injectable()
class DownloaderAPI extends API{

    constructor() {
        super();
    }

    public downloadFile = async (login: string, file: string) => {
        let result = await DownloaderAPI.storage_api.get(`/download-file/${login}?path=${file}`, {responseType: 'blob'});
        return result
    }
}

export default DownloaderAPI;