import { Component } from "react";
import CSS from "csstype";
import { Directory } from "../atoms/Directory";
import { ColorPalette } from "../../colorPalette";
import styled from "styled-components";

interface DirectoriesSelectionPanelProps {
  directories: string[];
  onClose: () => void;
  onBack: () => void;
  onChooseDirectory: (directory: string) => void;
}

export class DirectoriesSelectionPanel extends Component<DirectoriesSelectionPanelProps> {
  panelStyle: CSS.Properties = {
    position: "absolute",
    overlay: "auto",
    zIndex: 2,
    padding: "10px",
    height: "300px",
    minWidth: "350px",
    background: ColorPalette.darkBlue,
    filter: `drop-shadow(0px 2px 7px ${ColorPalette.white})`,
    justifyContent: "center",
    borderRadius: "10px",
  };

  buttonsPanelStyle: CSS.Properties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  };

  directoriesGridStyle: CSS.Properties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "20px",
  };

  CloseButton = styled.button`
    height: 30px;
    border: 0;
    border-bottom-left-radius: 10px;
    filter: drop-shadow(0px -4px 7px ${ColorPalette.white});
    color: ${ColorPalette.darkBlue};
    &:hover {
      background: ${ColorPalette.fadedBlue};
    }
  `;

  ChooseButton = styled.button`
    height: 30px;
    border: 0;
    border-bottom-right-radius: 10px;
    filter: drop-shadow(0px -4px 7px ${ColorPalette.white});
    color: ${ColorPalette.darkBlue};
    &:hover {
      background: ${ColorPalette.fadedBlue};
    }
  `;

  chooseButtonStyle: CSS.Properties = {
    height: "30px",
    border: 0,
    borderBottomRightRadius: "10px",
    filter: `drop-shadow(0px 2px 7px ${ColorPalette.white})`,
    color: ColorPalette.darkBlue,
  };

  render = () => {
    console.log('panel rerender')
    return (
      <div style={this.panelStyle}>
        <div style={this.directoriesGridStyle}>
          {this.props.directories.map((directory) => (
            <Directory
              directoryName={directory}
              onClick={this.props.onChooseDirectory}
            />
          ))}
        </div>

        <div style={this.buttonsPanelStyle}>
          <this.CloseButton onClick={this.props.onBack}>
            Назад
          </this.CloseButton>
          <this.ChooseButton onClick={this.props.onClose}>
            Выбрать
          </this.ChooseButton>
        </div>
      </div>
    );
  };
}
