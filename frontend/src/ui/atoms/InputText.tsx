import { ChangeEventHandler, Component } from "react";
import { ColorPalette } from "../../colorPalette";
import styled from "styled-components";
import '../styles/fonts.css'

interface InputTextProps {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export class InputText extends Component<InputTextProps> {

  CustomInput = styled.input`
    font-family: Jost;
    height: 40px;
    border-radius: 20px 20px 10px 10px;
    border: 0px solid;
    outline: none;
    background: ${ColorPalette.white};
    color: ${ColorPalette.darkBlue};
    text-align: center;
    font-size: 20px;
    filter: drop-shadow(0px 0px 7px ${ColorPalette.white});
    &::placeholder {
        color: ${ColorPalette.darkBlue};
    };
    &:hover {
        background: ${ColorPalette.fadedBlue}
    }
  `

  render = () => {
    return (
      <this.CustomInput
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
      ></this.CustomInput>
    );
  };
}