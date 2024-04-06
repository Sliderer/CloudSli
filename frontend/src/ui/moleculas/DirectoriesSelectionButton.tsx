import { Component, MouseEventHandler } from "react"
import CSS from 'csstype'
import { ColorPalette } from "../../colorPalette"

export interface DiresctoriesSelectionProps {
    onClick: MouseEventHandler<HTMLButtonElement>
}

export class DirectoriesSelectiontButton extends Component<DiresctoriesSelectionProps> {

    buttonStyle: CSS.Properties = {
        background: ColorPalette.white, 
        color: ColorPalette.darkBlue,
        border: 0, 
        borderRadius: '20px',
    }

    iconStyle: CSS.Properties = {
        width: '30px',
        height: '30px'
    }


    render = () => {
        return <button style={this.buttonStyle} onClick={this.props.onClick}>
            <img style={this.iconStyle} src="/directoryIcon.png"/>
            
        </button>
    }
}