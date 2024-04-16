import React, {ChangeEvent, useState} from "react";
import "reflect-metadata";
import UploaderViewModels from "../../view_models/UploaderViewModel";
import {view} from "@yoskutik/react-vvm";
import {UpdloadFileButton} from "../atoms/UpdaloadFileButton";
import {InputText} from "../atoms/InputText";
import {FilesSelectionButton} from "../atoms/FilesSelectionButton";
import {DirectoriesSelectionButton} from "../atoms/DirectoriesSelectionButton";
import {ColorPalette} from "../../colorPalette";
import {Logo} from "../atoms/Logo";
import {DirectoriesSelectionPanel} from "../moleculas/DirectoriesSelectionPanel";
import {Footer} from "../moleculas/Footer.";
import {
    Functionality,
    FunctionalityChanger,
} from "../moleculas/FunctionalityChanger";
import {FileSystemObject} from "../../models/FileSystemObject";
import {useNavigate, useNavigation} from "react-router-dom";
import {FilesUploader} from "../moleculas/FilesUploading";
import styled from "styled-components";

const SelectedFilesDiv = styled.div`
    display: grid;
    max-height: 300px;
    overflow-y: scroll;
    filter: drop-shadow(0px 0px 5px ${ColorPalette.white});
    &::-webkit-scrollbar {
        display: none;
    }
`

const Uploader = view(UploaderViewModels)(({viewModel}) => {
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

    const uploadFile = async () => {
        localStorage.setItem("login", login);
        viewModel.isSendingFiles = true;
        setFiles(null)
        setDirectoryName('')
        await viewModel.sendFile(login, files);
    };

    const onChooseDirectory = async (directory: string) => {
        viewModel.moveToDirectory(directory);
        await updateDirectoriesList();
        setDirectoryName(directory)
    };

    const onBack = () => {
        viewModel.moveBack();
        updateDirectoriesList()
    };

    const closeSendingFiles = () => {
        viewModel.isSendingFiles = false;
    };

    const resetPath = () => {
        viewModel.resetPath()
        closeDirectoriesSelectionPanel()
    }

    const createDirectory = async (name: string) => {
        await viewModel.createDirectory(login, name)
        await updateDirectoriesList()
    }

    document.body.style.backgroundColor = ColorPalette.darkBlue;
    document.body.style.margin = "0px";

    if (viewModel.isSendingFiles) {
        return (
            <FilesUploader
                onClose={closeSendingFiles}
                sendedFileNames={viewModel.sendedFileNames}
                progress={viewModel.progressStatus.progress}
                isFinished={viewModel.progressStatus.isFinished}
            />
        );
    }

    let fileNames: string[] = []
    if (files) {
        for (let i = 0; i < files.length; ++i) {
            fileNames.push(files[i].name)
        }
    }
    console.log(...viewModel.path)

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
                            onFileClick={(name) => {}}
                            onExit={resetPath}
                            onCreateDirectory={createDirectory}
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
                                gridTemplateColumns: "1fr 2fr",
                                gridGap: "10px",
                            }}
                        >
                            <DirectoriesSelectionButton onClick={showDirectories}/>
                            <FilesSelectionButton onChange={selectFiles}/>

                        </div>

                        <div
                            style={{
                                display: "grid",
                                wordBreak: "break-all",
                                gridTemplateColumns: "1fr 2fr",
                                gridGap: "10px",
                            }}
                        >
                            <p style={{
                                color: ColorPalette.white,
                                font: 'jost',
                                textAlign: 'center',
                                filter: `drop-shadow(0px 0px 5px ${ColorPalette.white})`
                            }}>{directoryName}</p>
                            <SelectedFilesDiv>
                                {
                                    fileNames.map(file => <p style={{
                                        color: ColorPalette.white,
                                        font: 'jost',
                                        wordBreak: "break-all",
                                        textAlign: 'left'
                                    }}>{file}</p>)
                                }
                            </SelectedFilesDiv>

                        </div>

                        <UpdloadFileButton text={'Отправить'} onClick={uploadFile}/>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                    <FunctionalityChanger functionality={Functionality.DownloadFile}/>
                </div>
            </div>
            <Footer/>
        </>
    );
});

export default Uploader;
