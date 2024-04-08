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
    maxWidth: '150px',
    maxHeight: '150px',
    borderRadius: '10px',
    display: 'inline-block',
    filter: `drop-shadow(0px 2px 7px ${ColorPalette.white})`,
    color: ColorPalette.darkBlue,
    verticalAlign: 'middle',
  }

  render = () => {
    return (
      <div
        style={this.buttonStyle}
        onClick={() => {
          this.props.onClick(this.props.directoryName);
        }}
      >
        <div style={{display: 'grid', justifyContent: 'center', justifyItems: 'center', paddingLeft: 10, paddingRight: 10, marginTop: '20px'}}>
            <img style={{width: 50, height: 50}} src="/directoryIcon.png"/>
            <p style={{wordBreak: 'break-all', textAlign: 'center'}}>{this.props.directoryName}</p>
        </div>

      </div>
    );
  };
}
