import React, { Component, MouseEventHandler } from "react";
import CSS from "csstype";
import { ColorPalette } from "../../colorPalette";
import "../styles/fonts.css";
import styled from "styled-components";
import "../styles/fonts.css";
import "../styles/animations.css";
import { Footer } from "./Footer.";

interface FilesUploaderProps {
  sendedFileNames: string[];
  isFinished: boolean;
  progress: number;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export class FilesUploader extends Component<FilesUploaderProps> {
  doneFileLabelStyle: CSS.Properties = {
    color: ColorPalette.white,
    fontFamily: "Jost",
    fontSize: "20px",
    width: "1000px",
    wordBreak: "break-word",
    animation: "smoothAppearance 1s forwards",
    opacity: 0,
  };

  mainDivStyle: CSS.Properties = {
    position: "absolute",
    top: "10%",
    left: "50%",
    right: "50%",
    display: "grid",
    justifyItems: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  innerProcessDiv: CSS.Properties = {
    background: ColorPalette.fadedBlue,
    width: '170px',
    height: '170px',
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    filter: `drop-shadow(0px 0px 15px ${ColorPalette.white})`,
  }

  BackButton = styled.button`
    opacity: 0;
    margin-top: 50px;
    animation: smoothAppearance 2s forwards;
    background: ${ColorPalette.white};
    border: 0;
    color: ${ColorPalette.darkBlue};
    padding: 10px 20px;
    font-family: Jost;
    font-size: 20px;
    border-radius: 10px;
    filter: drop-shadow(0px 0px 5px ${ColorPalette.white});
    &:hover {
      background: ${ColorPalette.fadedBlue};
    }
  `;

  progressLabelStyle: CSS.Properties = {
    fontFamily: "Jost",
    fontSize: "40px",
    textAlign: "center",
    verticalAlign: "middle",
    color: ColorPalette.darkBlue,
  };

  render = () => {
    let progress = this.props.progress;
    if (progress === 0) {
      progress = 100;
    }

    const ProgressDiv = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;

      width: 250px;
      height: 250px;
      border-radius: 50%;
      background: radial-gradient(
          closest-side,
          ${ColorPalette.darkBlue} 79%,
          transparent 80% 100%
        ),
        conic-gradient(
          ${ColorPalette.fadedBlue} calc(${progress}%),
          ${ColorPalette.darkBlue} 0
        );
      animation: progress 6s 1 forwards;
    `;

    return (
      <div>
        <div style={this.mainDivStyle}>
          <ProgressDiv>
            <div
              style={this.innerProcessDiv}
            >
              <p style={this.progressLabelStyle}>{Math.round(progress)}%</p>
            </div>
          </ProgressDiv>
          <div
            style={{
              position: "absolute",
              top: "120%",
              left: "50%",
              right: "50%",
              display: "grid",
              justifyItems: "center",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {!this.props.isFinished && this.props.sendedFileNames.map((fileName) => (
              <p style={this.doneFileLabelStyle}>Файл {fileName} загружен</p>
            ))}

            {this.props.isFinished && (
              <>
                <p style={this.doneFileLabelStyle}>
                  Все файлы успешно загружены
                </p>
                <this.BackButton onClick={this.props.onClose}>
                  Загрузить еще
                </this.BackButton>
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  };
}
