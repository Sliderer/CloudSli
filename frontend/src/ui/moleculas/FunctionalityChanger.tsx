import { Component, MouseEventHandler } from "react";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import '../styles/fonts.css'
import styled from "styled-components";
import { ColorPalette } from "../../colorPalette";

export enum Functionality {
  UploadFile,
  DownloadFile,
}

interface FunctionalityChangerProps {
  functionality: Functionality;
}

const StyledLink = styled(Link)`
    color: ${ColorPalette.white};
    text-decoration: none !important;
    outline: none !important;
    font-family: Jost;
    font-size: 15px;
`;

export const FunctionalityChanger = ({
  functionality,
}: {
  functionality: Functionality;
}) => {
  let title: string = "";

  if (functionality === Functionality.DownloadFile) {
    title = "Скачать файлы";
  } else {
    title = "Загрузить файлы";
  }
  const path =
    functionality === Functionality.DownloadFile
      ? "/download-files"
      : "/upload-files";

  return (
    <StyledLink to={path}>{title}</StyledLink>
  );
};
