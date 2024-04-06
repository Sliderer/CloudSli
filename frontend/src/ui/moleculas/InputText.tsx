import { ChangeEventHandler, Component } from "react"
import { ColorPalette } from "../../colorPalette"
import CSS from 'csstype'

interface InputTextProps {
    placeholder: string, 
    onChange: ChangeEventHandler<HTMLInputElement>
}

export class InputText extends Component<InputTextProps>{

    inputStyle = {
        height: '30px', 
        borderRadius: '10px 10px 0px 0px', 
        border: 0, 
        background: ColorPalette.white, 
        color: ColorPalette.darkBlue, 
    }

    render = () => {
        return <input 
        style={this.inputStyle}
        placeholder={this.props.placeholder} onChange={this.props.onChange}/>
    }
}