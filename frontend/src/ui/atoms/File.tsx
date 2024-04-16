import { Component, MouseEventHandler } from "react";
import CSS from "csstype";
import { ColorPalette } from "../../colorPalette";
import styled from "styled-components";
import '../styles/fonts.css'

interface FileProps {
  onClick: (state: boolean, name: string) => void;
  fileName: string;
  isActive: boolean;
  isChangable: boolean;
}

interface FileState {
  isActive: boolean;
}

export class File extends Component<FileProps, FileState> {
  constructor(props: FileProps) {
    super(props);
    this.state = {
      isActive: this.props.isChangable && this.props.isActive,
    };
  }


  FileDiv = styled.div`
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
  `;

  render = () => {

    const buttonStyle: CSS.Properties = {
        background: this.state.isActive ? ColorPalette.fadedBlue :ColorPalette.white,
        border: 0,
        maxWidth: "150px",
        maxHeight: "150px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
        filter: `drop-shadow(0px 2px 7px ${ColorPalette.white})`,
        color: ColorPalette.darkBlue,
        verticalAlign: "middle",
      };    


    return (
      <div style={buttonStyle}>
        <this.FileDiv
          onClick={() => {
            if (this.props.isChangable){
              this.setState({ isActive: !this.state.isActive }, () => {
                console.log(this.state.isActive)
                this.props.onClick(this.state.isActive, this.props.fileName);
              });
              
            }
          }}
        >
          <img style={{ width: 50, height: 50 }} src="/fileIcon.png" />
          <p style={{ wordBreak: "break-all", textAlign: "center", fontFamily: 'Jost' }}>
            {this.props.fileName}
          </p>
        </this.FileDiv>
      </div>
    );
  };
}
