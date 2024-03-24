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

    public sendFile = async (login: string, formData: FormData, onUploadProgress: Function) => {
        await axios.post(SERVER_ADDRESS + `/load-file/${login}`, formData,
            {
                onUploadProgress: (progress) => {
                    onUploadProgress(progress)
                }
            })
    }
}

export default LoaderAPI;