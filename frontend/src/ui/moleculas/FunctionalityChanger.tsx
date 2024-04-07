import { Component, MouseEventHandler } from "react";

export enum Functionality {
    UploadFile, 
    DownloadFile
}

interface FunctionalityChangerProps {
    functionality: Functionality,
    onClick: MouseEventHandler<HTMLButtonElement>
}

export class FunctionalityChanger extends Component<FunctionalityChangerProps> {
    
    render = () => {
        let title: string = ''
        if (this.props.functionality === Functionality.DownloadFile){
            title = 'Загрузить файлы'
        } else {
            title = 'Скачать файлы'
        }

        return <button onClick={this.props.onClick}>{title}</button>
    }
}