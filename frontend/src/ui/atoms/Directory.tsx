import { Component, MouseEventHandler } from "react";
import CSS from 'csstype'
import { ColorPalette } from "../../colorPalette";
import styled from "styled-components";
import '../styles/fonts.css'

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
    display: 'flex',
    justifyContent: 'center',
    filter: `drop-shadow(0px 2px 7px ${ColorPalette.white})`,
    color: ColorPalette.darkBlue,
    verticalAlign: 'middle',
  }

  DirectoryDiv = styled.div`
        display: grid;
        justify-content: center;
        justify-items: center;
        width: 100px;
        height: 100px;
        padding: 10px;
        margin-top: 20px;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
            width: 0;
        }
    `

  render = () => {
    return (
      <div
        style={this.buttonStyle}
        onClick={() => {
          this.props.onClick(this.props.directoryName);
        }}
      >
        <this.DirectoryDiv>
            <img style={{width: 50, height: 50}} src="/directoryIcon.png"/>
            <p style={{wordBreak: 'break-all', textAlign: 'center', fontFamily: 'Jost'}}>{this.props.directoryName}</p>
        </this.DirectoryDiv>

      </div>
    );
  };
}
