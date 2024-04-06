import { Component, MouseEventHandler } from "react"
import { ColorPalette } from "../../colorPalette"
import CSS from 'csstype'

interface UpdloadFileButtonProps{
    onClick: MouseEventHandler<HTMLButtonElement>
}

export class UpdloadFileButton extends Component<UpdloadFileButtonProps>{
    
    buttonStyle: CSS.Properties = {
        fontSize: '20px',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0, 
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        padding: '5px', 
        background: ColorPalette.white, 
        border: 0,
        color: ColorPalette.darkBlue
    }
    
    render = () => {
        return <button 
        style={this.buttonStyle}
        onClick={this.props.onClick}>Отправить</button>
    }
}
