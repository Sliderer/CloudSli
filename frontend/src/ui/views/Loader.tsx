import React, {Component, useState} from 'react';
import 'reflect-metadata'
import LoaderViewModels from "../../view_models/LoaderViewModels";
import {view} from "@yoskutik/react-vvm";
import {HorizontalCenterDiv, ColumnDiv, VerticalCenterDiv} from "../styles/Divs";
import userEvent from "@testing-library/user-event";

const Loader = view(LoaderViewModels)(({viewModel}) => {

    const [files, setFiles] = useState<FileList | null>(null)
    const [login, setLogin] = useState('')
    const [directoriesList, setDirectoriesList] = useState<string[]>([])

    const showDirectories = async () => {
        if (login.length !== 0){
            viewModel.clearDirectoriesList()
            await viewModel.getSubDirs(login)
            console.log(viewModel.getLastLayer())
            const lastLayer = viewModel.getLastLayer()
            if (lastLayer){
                setDirectoriesList(lastLayer)
            }
        }
    }

    return <HorizontalCenterDiv>
        <ColumnDiv>
            <input placeholder={'Введите свое имя'} onChange={(event) => {
                setLogin(event.target.value)
            }}/>
            <button onClick={showDirectories}>Выбрать папку</button>

            {
                directoriesList.map(
                    directory => {
                        return <button onClick={() => {viewModel.moveToDirectory(directory)}}>{directory}</button>
                    }
                )
            }


            <input onChange={(e) => {
                setFiles(e.target.files)
            }} type='file' multiple/>


            <button onClick={async () => {
                await viewModel.sendFile(login, files)
            }}>Отправить
            </button>

            {viewModel.sendedFileNames.map(fileName => <p>Файл {fileName} отправлен</p>)}

            {viewModel.progressStatus.active &&
                <progress max='100' value={viewModel.progressStatus.progress}></progress>}
        </ColumnDiv>

    </HorizontalCenterDiv>
})

export default Loader;
