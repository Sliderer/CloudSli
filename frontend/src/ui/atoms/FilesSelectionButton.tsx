import { ChangeEvent, ChangeEventHandler, Component, InputHTMLAttributes } from "react"
import CSS from 'csstype'
import { ColorPalette } from "../../colorPalette"
import '../styles/fonts.css'
import '../styles/animations.css'
import styled from "styled-components"

interface FilesSelectionButtonProps {
    onChange: ChangeEventHandler<HTMLInputElement>
}

export class FilesSelectionButton extends Component<FilesSelectionButtonProps>{

    InputLabel = styled.label`
        background: ${ColorPalette.white};
        padding: 10px 20px;
        border-radius: 5px 20px 20px 5px;
        text-align: enter;
        filter: drop-shadow(0px 0px 7px ${ColorPalette.white});
        &:hover {
            background: ${ColorPalette.fadedBlue};
        };
        animation: smoothAppearance 1s forwards, smoothAppearanceFromBottom 1s forwards;
    `
    
    inputFileSpan: CSS.Properties = {
        color: ColorPalette.darkBlue,
        textAlign: 'center', 
        fontFamily: "Jost", 
        fontSize: '20px'
    }
    
    inputFile: CSS.Properties = {
        width: 0,
        height: 0,
    }
    
    inputFileLabelHover: CSS.Properties = {
        background: ColorPalette.darkBlue
    }

    render = () => {
        return <this.InputLabel>
                <input style={this.inputFile} onChange={this.props.onChange} type="file" name="file" multiple/>
                <span style={this.inputFileSpan}>Выберите файл</span>
            </this.InputLabel>
    }
}