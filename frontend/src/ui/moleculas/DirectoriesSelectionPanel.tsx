import {Component} from "react";
import CSS from "csstype";
import {Directory} from "../atoms/Directory";
import {ColorPalette} from "../../colorPalette";
import styled from "styled-components";
import {FileSystemObject} from "../../models/FileSystemObject";
import {FilesSystemObjects} from "../../enums/FilesSystemObjects";
import {File} from "../atoms/File";

interface DirectoriesSelectionPanelProps {
    fileObjects: FileSystemObject[];
    onClose: () => void;
    onBack: () => void;
    onChooseDirectory: (directory: string) => void;
}

export class DirectoriesSelectionPanel extends Component<DirectoriesSelectionPanelProps> {
    panelStyle: CSS.Properties = {
        position: "absolute",
        overlay: "auto",
        zIndex: 2,
        padding: "10px",
        height: "400px",
        width: "400px",
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

    directoriesGridStyle: CSS.Properties = {
        maxWidth: '350',
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        overflowY: 'scroll',
        height: '370px',
    };

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

    render = () => {
        this.props.fileObjects.sort((object1, object2) => {
            if (object1.objectType === FilesSystemObjects.Directory){
                return -1
            }
            return 1
        }
    )

        return (
            <div style={this.panelStyle}>
                <div style={this.directoriesGridStyle}>
                    {this.props.fileObjects.map((fileObject) => {
                        if (fileObject.objectType === FilesSystemObjects.Directory) {
                            return <Directory
                                directoryName={fileObject.name}
                                onClick={this.props.onChooseDirectory}
                            />
                        } else {
                            return <File fileName={fileObject.name}/>
                        }

                    })}
                </div>

                <div style={this.buttonsPanelStyle}>
                    <this.CloseButton onClick={this.props.onBack}>
                        Назад
                    </this.CloseButton>
                    <this.ChooseButton onClick={this.props.onClose}>
                        Выбрать
                    </this.ChooseButton>
                </div>
            </div>
        );
    };
}
