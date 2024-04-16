import {ViewModel} from "@yoskutik/react-vvm";
import {autorun, makeObservable, observable} from "mobx";
import {injectable} from "tsyringe";
import LoaderAPI from "../API/UploaderAPI";
import axios, {AxiosProgressEvent} from "axios";
import DirectoriesAPI from "../API/DirectoriesAPI";
import directoriesAPI from "../API/DirectoriesAPI";
import {DirectoriesListHolder} from "./helpers/DirectoriesListHolder";

@injectable()
class UploaderViewModels extends ViewModel {
    @observable progressStatus = {
        active: false,
        progress: 0, 
        isFinished: false
    }

    @observable isSendingFiles: boolean = false
    @observable sendedFileNames: string[] = []

    @observable path: string[] = []
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
        console.log('path ' + this.path)
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

    public resetPath = () => {
        for (let i = 0; i <= this.path.length; ++i){
            this.directoriesListHolder.moveBack()
        }
        console.log(this.getCurrentLayer())
        this.path = []
    }

    public createDirectory = async (login: string, name: string) => {
        const directoryPath = (this.path.length !== 0 ? this.path.join('/') : '') + '/' + name
        await this.directoriesAPI.createDirectory(login, directoryPath)
    }

    public sendFile = async (login: string, files: FileList | null) => {
        console.log(this.path)
        this.progressStatus = {
            active: false, progress: 0, isFinished: false
        }
        this.sendedFileNames = []
        if (!files){
            return
        }

        for (let i = 0; i < files.length; ++i){
            const formData = new FormData()
            formData.append('file', files[i])
            await this.loaderAPI.sendFile(login, formData, this.path, this.onUploadProgress)
            this.progressStatus = {
                active: false, progress: 0, isFinished: false
            }
            this.sendedFileNames.push(files[i].name)
        }
        this.progressStatus.isFinished = true
    }

    private onUploadProgress = (progressEvent: AxiosProgressEvent) => {
        this.progressStatus = {
            active: true, progress: progressEvent.progress! * 100, isFinished: false
        }
    }

}

export default UploaderViewModels