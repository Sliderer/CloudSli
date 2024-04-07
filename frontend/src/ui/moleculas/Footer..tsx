import { Component } from "react";
import CSS from "csstype";
import { ColorPalette } from "../../colorPalette";

export class Footer extends Component {
  divStyle: CSS.Properties = {
    position: "absolute",
    bottom: "0%",
    margin: '0px',
    width: "100%",
  };

  pStyle: CSS.Properties = {
    color: ColorPalette.white,
    filter: `drop-shadow(0px 2px 7px ${ColorPalette.white})`,
    fontSize: '12px'
  };

  hrStyle: CSS.Properties = {
    color: ColorPalette.white,
    width: '90%',
    filter: `drop-shadow(0px 0px 5px ${ColorPalette.white})`,
  };

  render = () => {
    return (
      <div style={this.divStyle}>
        <hr style={this.hrStyle} />
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <p style={this.pStyle}>by Sliderer</p>
        </div>
      </div>
    );
  };
}
