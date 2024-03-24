import {ViewModel} from "@yoskutik/react-vvm";
import {makeObservable, observable} from "mobx";
import {injectable} from "tsyringe";
import LoaderAPI from "../API/LoaderAPI";
import axios, {AxiosProgressEvent} from "axios";

@injectable()
class LoaderViewModels extends ViewModel {
    @observable progressStatus = {
        active: false,
        progress: 0
    }


    constructor(private app: LoaderAPI) {
        super()
        makeObservable(this)
        this.app = new LoaderAPI()
    }

    public sendFile = async (login: string, files: FileList | null) => {
        if (!files){
            return
        }

        for (let i = 0; i < files.length; ++i){
            const formData = new FormData()
            formData.append('file', files[i])
            await this.app.sendFile(login, formData, this.onUploadProgress)
            this.progressStatus = {
                active: false, progress: 0
            }
        }
    }

    private onUploadProgress = (progressEvent: AxiosProgressEvent) => {
        this.progressStatus = {
            active: true, progress: progressEvent.progress! * 100
        }
    }

}

export default LoaderViewModels