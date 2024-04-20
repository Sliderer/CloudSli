import {injectable, singleton} from "tsyringe";
import {API} from "./API";
import 'reflect-metadata'

@injectable()
class UploaderAPI extends API{

    constructor() {
        super();
    }

    public sendFile = async (login: string, fileName: string, formData: FormData, currentPath: string[], onUploadProgress: Function) => {
        const path = currentPath.join('/')
        console.log(`request /load-file/${login}/${path}`)
        await UploaderAPI.storage_api.post(`/load-file/${login}?path=${path}`, formData,
            {
                onUploadProgress: (progress) => {
                    onUploadProgress(progress)
                }
            }).then(
                () => {
                    this.sendFileToConfigurationServer(login, path + '/' + fileName)
                }
            )
    }

    private sendFileToConfigurationServer = (login: string, fullPath: string) => {
        UploaderAPI.configuration_api.post(`/load-file/${login}?path=${fullPath}`)
    }
}

export default UploaderAPI;