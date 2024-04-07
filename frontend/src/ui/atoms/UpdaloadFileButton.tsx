import { Component, MouseEventHandler } from "react"
import { ColorPalette } from "../../colorPalette"
import CSS from 'csstype'
import '../styles/fonts.css'
import styled from "styled-components"

interface UpdloadFileButtonProps{
    onClick: MouseEventHandler<HTMLButtonElement>
}

export class UpdloadFileButton extends Component<UpdloadFileButtonProps>{

    UploadButton = styled.button`
        font-size: 20px;
        border-radius: 10px 10px 20px 20px;
        padding: 5px;
        background: ${ColorPalette.white};
        border: 0;
        filter: drop-shadow(0px 0px 7px ${ColorPalette.white});
        color: ${ColorPalette.darkBlue};
        font-family: Jost;
        &:hover {
            background: ${ColorPalette.fadedBlue};
        }
    `
    
    render = () => {
        return <this.UploadButton 
        onClick={this.props.onClick}>Отправить</this.UploadButton>
    }
}
