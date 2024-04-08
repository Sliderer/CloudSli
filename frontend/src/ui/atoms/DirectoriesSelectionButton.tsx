import { Component, MouseEventHandler } from "react";
import CSS from "csstype";
import { ColorPalette } from "../../colorPalette";
import styled from "styled-components";

export interface DiresctoriesSelectionProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export class DirectoriesSelectiontButton extends Component<DiresctoriesSelectionProps> {

  SelectionButton = styled.button`
    background: ${ColorPalette.white};
    color: ${ColorPalette.darkBlue};
    border: 0;
    border-radius: 20px 5px 5px 20px;
    filter: drop-shadow(0px 0px 7px ${ColorPalette.white});
    &:hover {
        background: ${ColorPalette.fadedBlue};
    };
    display: inline-block;
  `;

  iconStyle: CSS.Properties = {
    width: "35px",
    height: "35px",
  };

  render = () => {
    return (
      <this.SelectionButton onClick={this.props.onClick}>
        <img style={this.iconStyle} src="/directoryIcon.png" />
      </this.SelectionButton>
    );
  };
}
