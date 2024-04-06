import { ChangeEvent, ChangeEventHandler, Component, InputHTMLAttributes } from "react"
import CSS from 'csstype'
import { ColorPalette } from "../../colorPalette"

interface FilesSelectionButtonProps {
    onChange: ChangeEventHandler<HTMLInputElement>
}

export class FilesSelectionButton extends Component<FilesSelectionButtonProps>{

    
    inputFileLabel: CSS.Properties = {
        background: ColorPalette.white,
        padding: '10px 20px', 
        borderRadius: '20px', 
        textAlign: 'center', 
    }
    
    inputFileSpan: CSS.Properties = {
        color: ColorPalette.darkBlue,
        textAlign: 'center'
    }
    
    inputFile: CSS.Properties = {
        width: 0,
        height: 0,
    }
    
    inputFileLabelHover: CSS.Properties = {
        background: ColorPalette.darkBlue
    }

    render = () => {
        return <label style={this.inputFileLabel}>
                <input style={this.inputFile} onChange={this.props.onChange} type="file" name="file"/>		
                <span style={this.inputFileSpan}>Выберите файл</span>
            </label>
    }
}