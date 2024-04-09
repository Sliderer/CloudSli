import {Component} from "react";
import CSS from "csstype";
import {Directory} from "../atoms/Directory";
import {ColorPalette} from "../../colorPalette";
import styled from "styled-components";
import {FileSystemObject} from "../../models/FileSystemObject";
import {FilesSystemObjects} from "../../enums/FilesSystemObjects";
import {File} from "../atoms/File";
import {DirectoryCreationPanel} from "../atoms/DirectoryCreationPanel";

interface DirectoriesSelectionPanelProps {
    fileObjects: FileSystemObject[];
    onClose: () => void;
    onBack: () => void;
    onChooseDirectory: (directory: string) => void;
    onExit: () => void;
    onCreateDirectory: (name: string) => Promise<void>;
}

interface DirectoriesSelectionPanelState {
    openCreationPanel: boolean
}


export class DirectoriesSelectionPanel extends Component<DirectoriesSelectionPanelProps, DirectoriesSelectionPanelState> {

    constructor(props: DirectoriesSelectionPanelProps) {
        super(props);
        this.state = {
            openCreationPanel: false
        }
    }

    panelStyle: CSS.Properties = {
        position: "absolute",
        overlay: "auto",
        zIndex: 2,
        padding: "10px",
        height: "600px",
        top: '-50%',
        width: "600px",
        background: ColorPalette.darkBlue,
        filter: `drop-shadow(0px 2px 7px ${ColorPalette.white})`,
        justifyContent: "center",
        borderRadius: "10px",
    };

    buttonsPanelStyle: CSS.Properties = {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    };

    DirectoriesGrid = styled.div`
        max-width: 600px;
        display: grid;
        grid-template-columns: repeat(4, 3fr);
        gap: 10px;
        overflow-y: scroll;
        height: 515px;

    `

    CloseButton = styled.button`
        height: 30px;
        border: 0;
        border-bottom-left-radius: 10px;
        filter: drop-shadow(0px -4px 7px ${ColorPalette.white});
        color: ${ColorPalette.darkBlue};

        &:hover {
            background: ${ColorPalette.fadedBlue};
        }
    `;

    ChooseButton = styled.button`
        height: 30px;
        border: 0;
        border-bottom-right-radius: 10px;
        filter: drop-shadow(0px -4px 7px ${ColorPalette.white});
        color: ${ColorPalette.darkBlue};

        &:hover {
            background: ${ColorPalette.fadedBlue};
        }
    `;

    chooseButtonStyle: CSS.Properties = {
        height: "30px",
        border: 0,
        borderBottomRightRadius: "10px",
        filter: `drop-shadow(0px 2px 7px ${ColorPalette.white})`,
        color: ColorPalette.darkBlue,
    };

    imagesStyle: CSS.Properties = {
        width: '50px',
        height: '50px'
    }

    render = () => {

        let fileObjects = this.props.fileObjects.sort((object1, object2) => {
                if (object1.objectType === FilesSystemObjects.Directory) {
                    return -1
                }
                return 1
            }
        )

        const createDirectory = () => {
            this.setState({openCreationPanel: true})
        }

        const finishCreation = async (name: string) => {
            this.setState({openCreationPanel: false})
            await this.props.onCreateDirectory(name)
            fileObjects.push({objectType: FilesSystemObjects.Directory, name: name})
        }

        return (
            <div style={this.panelStyle}>
                {
                    this.state.openCreationPanel ?
                        <DirectoryCreationPanel callback={finishCreation}/>
                        :
                        <>
                            <div style={{display: 'flex', marginBottom: 10}}>
                                <button style={{background: ColorPalette.darkBlue, border: 0, float: 'left'}}
                                        onClick={createDirectory}>
                                    <img style={this.imagesStyle} src={'/addDirectoryIcon.png'}/>
                                </button>
                                <button style={{background: ColorPalette.darkBlue, border: 0, float: 'right'}}
                                        onClick={this.props.onExit}>
                                    <img style={this.imagesStyle} src={'/closeIcon.png'}/>
                                </button>
                            </div>
                            <this.DirectoriesGrid>
                                {fileObjects.map((fileObject) => {
                                    if (fileObject.objectType === FilesSystemObjects.Directory) {
                                        return <Directory
                                            directoryName={fileObject.name}
                                            onClick={this.props.onChooseDirectory}/>;
                                    } else {
                                        return <File fileName={fileObject.name}/>;
                                    }

                                })}
                            </this.DirectoriesGrid>
                            <div style={this.buttonsPanelStyle}>
                                <this.CloseButton onClick={this.props.onBack}>
                                    Назад
                                </this.CloseButton>
                                <this.ChooseButton onClick={this.props.onClose}>
                                    Выбрать
                                </this.ChooseButton>
                            </div>
                        </>
                }

            </div>
        );
    };
}
