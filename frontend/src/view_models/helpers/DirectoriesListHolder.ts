import {action, observable} from "mobx";
import {FileSystemObject} from "../../models/FileSystemObject";

export class DirectoriesListHolder{
    @observable private directoriesList: FileSystemObject[][] = []
    index: number = -1



    public clearDirectoriesList = () => {
        this.directoriesList = []
    }

    public addDirectoriesLayer = (layer: FileSystemObject[]) => {
        this.directoriesList.push(layer)
        this.index++
    }

    public getCurrentLayer = () => {
        console.log('index ' + this.index + ' dirs ' + this.directoriesList)
        return this.directoriesList.at(this.index)
    }

    public moveBack = () => {
        if (this.index > 0){
            this.index--
            this.directoriesList.pop()
        }
    }
}