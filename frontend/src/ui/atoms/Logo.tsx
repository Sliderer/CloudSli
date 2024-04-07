import { Component } from "react";
import CSS from 'csstype';
import { ColorPalette } from "../../colorPalette";

export class Logo extends Component{
    logoStyle: CSS.Properties = {
        filter: `drop-shadow(0px 0px 3px ${ColorPalette.white})`,
    }

    render = () => {
        return <img style={this.logoStyle} src="/cloudIcon.png" />
    }
}