import { Component, MouseEventHandler } from "react";
import CSS from 'csstype'
import { ColorPalette } from "../../colorPalette";

interface DirectoryProps {
  directoryName: string;
  onClick: (directory: string) => void;
}

export class Directory extends Component<DirectoryProps> {

  buttonStyle: CSS.Properties = {
    background: ColorPalette.white, 
    border: 0,
    borderRadius: '10px',
    display: 'grid', 
    width: '100px', 
    height: '70px', 
    filter: `drop-shadow(0px 2px 7px ${ColorPalette.white})`,
    color: ColorPalette.darkBlue
  }

  render = () => {
    return (
      <button
        style={this.buttonStyle}
        onClick={() => {
          this.props.onClick(this.props.directoryName);
        }}
      >
        <div style={{display: 'grid', justifyContent: 'center'}}>
            <img src="/directoryIcon.png"/>
            {this.props.directoryName}
        </div>

      </button>
    );
  };
}
