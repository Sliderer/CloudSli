import {ViewModel} from "@yoskutik/react-vvm";
import {autorun, makeObservable, observable} from "mobx";
import {injectable} from "tsyringe";
import LoaderAPI from "../API/LoaderAPI";
import axios, {AxiosProgressEvent} from "axios";
import DirectoriesAPI from "../API/DirectoriesAPI";
import directoriesAPI from "../API/DirectoriesAPI";
import {DirectoriesListHolder} from "./helpers/DirectoriesListHolder";

@injectable()
class LoaderViewModels extends ViewModel {
    @observable progressStatus = {
        active: false,
        progress: 0
    }

    @observable isSendingFiles: boolean = false
    @observable sendedFileNames: string[] = []

    public path: string[] = []
    private directoriesListHolder

    constructor(private loaderAPI: LoaderAPI, private directoriesAPI: DirectoriesAPI) {
        super()
        makeObservable(this)
        this.loaderAPI = new LoaderAPI()
        this.directoriesAPI = new DirectoriesAPI()
        this.directoriesListHolder = new DirectoriesListHolder()
    }

    public getSubDirs = async (login: string) => {
        await this.directoriesAPI.getSubDirectories(login, this.path).then(
            response => {
                this.directoriesListHolder.addDirectoriesLayer(response.data)
            }
        )
    }

    public moveToDirectory = (directoryName: string) => {
        this.path.push(directoryName)
    }

    public moveBack = () => {
        this.directoriesListHolder.moveBack()
        this.path.pop()
    }

    public getCurrentLayer = () => {
        return this.directoriesListHolder.getCurrentLayer()
    }

    public clearDirectoriesList = () => {
        this.directoriesListHolder.clearDirectoriesList()
    }
    

    public sendFile = async (login: string, files: FileList | null) => {
        this.sendedFileNames = []
        if (!files){
            return
        }

        for (let i = 0; i < files.length; ++i){
            const formData = new FormData()
            formData.append('file', files[i])
            await this.loaderAPI.sendFile(login, formData, this.path, this.onUploadProgress)
            this.progressStatus = {
                active: false, progress: 0
            }
            this.sendedFileNames.push(files[i].name)
        }
    }

    private onUploadProgress = (progressEvent: AxiosProgressEvent) => {
        this.progressStatus = {
            active: true, progress: progressEvent.progress! * 100
        }
    }

}

export default LoaderViewModels