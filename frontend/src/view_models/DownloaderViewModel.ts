import {ViewModel} from "@yoskutik/react-vvm";
import {autorun, makeObservable, observable} from "mobx";
import {injectable} from "tsyringe";
import LoaderAPI from "../API/UploaderAPI";
import axios, {AxiosProgressEvent, AxiosResponse} from "axios";
import DirectoriesAPI from "../API/DirectoriesAPI";
import directoriesAPI from "../API/DirectoriesAPI";
import {DirectoriesListHolder} from "./helpers/DirectoriesListHolder";
import DownloaderAPI from "../API/DownloaderAPI";

export interface DownloadedFile {
    response: AxiosResponse,
    fileName: string
}

interface SelectedFile {
    fileName: string, 
    filePath: string,
}


@injectable()
class DownloaderViewModel extends ViewModel {

    @observable files: SelectedFile[] = []
    @observable downloadedFiles: DownloadedFile[] = []
    @observable path: string[] = []
    private directoriesListHolder

    constructor(private downloaderAPI: DownloaderAPI, private directoriesAPI: DirectoriesAPI) {
        super()
        makeObservable(this)
        this.downloaderAPI = new DownloaderAPI()
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

    public resetPath = () => {
        for (let i = 0; i <= this.path.length; ++i){
            this.directoriesListHolder.moveBack()
        }
        this.path = []
    }

    public addFile = (fileName: string) => {
        let filePath = this.path.join('/') + '/' + fileName
        this.files.push({fileName, filePath: filePath})
    }

    public deleteFile = (fileName: string) => {
        this.files = this.files.filter(file => file.fileName !== fileName)
    }

    public getPath = () => {
        return this.path.join('/')
    }

    public downloadFile = async (login: string) => {
        for (let file of this.files) {
            let result = await this.downloaderAPI.downloadFile(login, file.filePath)
            this.downloadedFiles.push({fileName: file.fileName, response: result})
        }
        this.files = []
    }

    public clearSelectedFiles = () => {
        this.files = []
    }

}

export default DownloaderViewModel