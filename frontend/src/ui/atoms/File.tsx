import {Component, MouseEventHandler} from "react";
import CSS from 'csstype'
import {ColorPalette} from "../../colorPalette";
import styled from "styled-components";

interface FileProps {
    fileName: string;
}

export class File extends Component<FileProps> {

    buttonStyle: CSS.Properties = {
        background: ColorPalette.white,
        border: 0,
        maxWidth: '150px',
        maxHeight: '150px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
        filter: `drop-shadow(0px 2px 7px ${ColorPalette.white})`,
        color: ColorPalette.darkBlue,
        verticalAlign: 'middle',
    }


    FileDiv = styled.div`
        display: grid;
        justify-content: center;
        justify-items: center;
        width: 100px;
        height: 100px;
        padding: 10px;
        margin-top: 20px;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
            width: 0;
        }
    `

    render = () => {

        return (
            <div
                style={this.buttonStyle}
            >
                <this.FileDiv>
                    <img style={{width: 50, height: 50}} src="/fileIcon.png"/>
                    <p style={{wordBreak: 'break-all', textAlign: 'center'}}>{this.props.fileName}</p>
                </this.FileDiv>

            </div>
        );
    };
}
