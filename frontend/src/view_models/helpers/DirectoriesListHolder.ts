import {action, observable} from "mobx";

export class DirectoriesListHolder{
    @observable private directoriesList: string[][] = []
    index: number = -1



    public clearDirectoriesList = () => {
        this.directoriesList = []
    }

    public addDirectoriesLayer = (layer: string[]) => {
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
        }
    }
}