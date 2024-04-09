import React, {Component} from "react";
import CSS from 'csstype'
import {ColorPalette} from "../../colorPalette";
import '../styles/fonts.css'
import styled from "styled-components";

interface FilesUploaderProps {
    sendedFileNames: string[],
    progress: number
}


export class FilesUploader extends Component<FilesUploaderProps> {

    doneFileLabelStyle: CSS.Properties = {
        color: ColorPalette.white,
        fontFamily: 'Jost',
        fontSize: '20px',
        width: '400px'
    }

    mainDivStyle: CSS.Properties = {
        position: "absolute",
        bottom: "50%",
        left: "50%",
        right: "50%",
        display: "grid",
        justifyItems: 'center',
        alignItems: 'center',
        justifyContent: "center",
        textAlign: 'center'
    }

    ProgressDiv = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100px;
        height: 100px;
        border-radius: 50%;
        background:
                radial-gradient(closest-side, white 79%, transparent 80% 100%),
                conic-gradient(hotpink calc(${this.props.progress * 100} * 1%), pink 0);
        animation: progress 2s 1 forwards;
    `

    render = () => {

        console.log(this.props.progress)
        return <div style={this.mainDivStyle}>
            {
                this.props.progress > 0 &&
                <this.ProgressDiv>

                </this.ProgressDiv>

            }

            {this.props.sendedFileNames.map((fileName) => (
                <p style={this.doneFileLabelStyle}>Файл {fileName} отправлен</p>
            ))}
        </div>
    }
}