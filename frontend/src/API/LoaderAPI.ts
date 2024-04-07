import {injectable, singleton} from "tsyringe";
import {API} from "./API";
import axios from "axios";
import {SERVER_ADDRESS} from "../config";
import 'reflect-metadata'

@injectable()
class LoaderAPI extends API{

    constructor() {
        super();
    }

    public sendFile = async (login: string, formData: FormData, currentPath: string[], onUploadProgress: Function) => {
        const path = currentPath.join('/')
        await LoaderAPI.api.post(`/load-file/${login}/${path}`, formData,
            {
                onUploadProgress: (progress) => {
                    onUploadProgress(progress)
                }
            })
    }
}

export default LoaderAPI;