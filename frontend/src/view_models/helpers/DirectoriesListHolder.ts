import {action, observable} from "mobx";

export class DirectoriesListHolder{
    @observable private directoriesList: string[][] = []

    public clearDirectoriesList = () => {
        this.directoriesList = []
    }

    public addDirectoriesLayer = (layer: string[]) => {
        this.directoriesList.push(layer)
    }

    public getLastLayer = () => {
        return this.directoriesList.at( this.directoriesList.length - 1)
    }

    public deleteLastLayer = () => {

    }
}