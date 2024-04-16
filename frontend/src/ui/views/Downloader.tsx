import React, {ChangeEvent, useState} from "react";
import "reflect-metadata";
import {view} from "@yoskutik/react-vvm";
import {UpdloadFileButton} from "../atoms/UpdaloadFileButton";
import {InputText} from "../atoms/InputText";
import {DirectoriesSelectiontButton} from "../atoms/DirectoriesSelectionButton";
import {ColorPalette} from "../../colorPalette";
import {Logo} from "../atoms/Logo";
import {DirectoriesSelectionPanel} from "../moleculas/DirectoriesSelectionPanel";
import {Footer} from "../moleculas/Footer.";
import {FileSystemObject} from "../../models/FileSystemObject";
import {useNavigate, useNavigation} from "react-router-dom";
import styled from "styled-components";
import DownloaderViewModel from "../../view_models/DownloaderViewModel";
import UploaderViewModels from "../../view_models/UploaderViewModel";
import { Functionality, FunctionalityChanger } from "../moleculas/FunctionalityChanger";

const SelectedFilesDiv = styled.div`
    display: grid;
    max-height: 300px;
    justify-items: center;
    overflow-y: scroll;
    filter: drop-shadow(0px 0px 5px ${ColorPalette.white});
    &::-webkit-scrollbar {
        display: none;
    }
`

const Downloader = view(DownloaderViewModel)(({viewModel}) => {
    const savedLogin = localStorage.getItem("login");
    const [files, setFiles] = useState<FileList | null>(null);
    const [login, setLogin] = useState(savedLogin ? savedLogin : "");
    const [fileObjectsList, setFileObjectsListList] = useState<
        FileSystemObject[]
    >([]);
    const [directoryName, setDirectoryName] = useState('')
    const [needToShowDirectories, setNeedToShowDirectories] = useState(false);
    const navigate = useNavigate();

    const updateDirectoriesList = async () => {
        await viewModel.getSubDirs(login);

        const lastLayer = viewModel.getCurrentLayer();
        if (lastLayer) {
            setFileObjectsListList(lastLayer);
        }
    };

    const showDirectories = async () => {
        if (login.length !== 0) {
            await updateDirectoriesList();
            setNeedToShowDirectories(true);
        }
    };

    const closeDirectoriesSelectionPanel = () => {
        setNeedToShowDirectories(false);
    };

    const selectFiles = (e: ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    };

    const updateLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };

    const downloadFile = async () => {
        const result = await viewModel.downloadFile(login)
    };

    const onChooseDirectory = async (directory: string) => {
        viewModel.moveToDirectory(directory);
        await updateDirectoriesList();
        setDirectoryName(directory)
    };

    const onChooseFile = (fileName: string) => {
        viewModel.addFile(fileName)
    }

    const onBack = () => {
        viewModel.moveBack();
        updateDirectoriesList()
    };

    const resetPath = () => {
        viewModel.resetPath()
        closeDirectoriesSelectionPanel()
    }

    document.body.style.backgroundColor = ColorPalette.darkBlue;
    document.body.style.margin = "0px";

    let fileNames: string[] = []
    if (files) {
        for (let i = 0; i < files.length; ++i) {
            fileNames.push(files[i].name)
        }
    }
    
    if (viewModel.downloadedFiles.length !== 0){
        const file = viewModel.downloadedFiles[viewModel.downloadedFiles.length - 1]
        const url = window.URL.createObjectURL(
            new Blob([file.response.data]),
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            file.fileName,
          );
        
          document.body.appendChild(link);
          link.click();
          viewModel.downloadedFiles.pop()
          if (viewModel.downloadFile.length === 0){
            viewModel.clearSelectedFiles()
          }
    }

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    right: "50%",
                    display: "grid",
                    justifyContent: "center",
                }}
            >
                {needToShowDirectories && (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <DirectoriesSelectionPanel
                            fileObjects={fileObjectsList}
                            onBack={onBack}
                            onClose={closeDirectoriesSelectionPanel}
                            onDirectoryClick={onChooseDirectory}
                            onFileClick={onChooseFile}
                            onExit={resetPath}
                        />
                    </div>
                )}

                <div style={{display: "flex", justifyContent: "center", margin: 10}}>
                    <Logo/>
                </div>

                <div style={{display: "flex", justifyContent: "center", width: 400}}>
                    <div style={{display: "grid"}}>
                        <InputText placeholder="Введите свое имя" onChange={updateLogin} defaultValue={savedLogin}/>

                        <div
                            style={{
                                display: "grid",
                                marginTop: "30px",
                                marginBottom: "30px"
                            }}
                        >
                            <DirectoriesSelectiontButton onClick={showDirectories}/>
                        </div>

                        <SelectedFilesDiv>
                                {
                                    viewModel.files.map(file => <p style={{
                                        color: ColorPalette.white,
                                        font: 'jost',
                                        wordBreak: "break-all",
                                        textAlign: 'left'
                                    }}>{file.fileName}</p>)
                                }
                            </SelectedFilesDiv>

                        <UpdloadFileButton text={'Скачать'} onClick={downloadFile}/>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                    <FunctionalityChanger functionality={Functionality.UploadFile}/>
                </div>
            </div>
            <Footer/>
        </>
    );
});

export default Downloader;
