import React, { ChangeEvent, useState } from "react";
import "reflect-metadata";
import LoaderViewModels from "../../view_models/LoaderViewModels";
import { view } from "@yoskutik/react-vvm";
import { UpdloadFileButton } from "../atoms/UpdaloadFileButton";
import { InputText } from "../atoms/InputText";
import { FilesSelectionButton } from "../atoms/FilesSelectionButton";
import { DirectoriesSelectiontButton } from "../atoms/DirectoriesSelectionButton";
import { ColorPalette } from "../../colorPalette";
import { Logo } from "../atoms/Logo";
import { DirectoriesSelectionPanel } from "../moleculas/DirectoriesSelectionPanel";
import { Footer } from "../moleculas/Footer.";
import {
  Functionality,
  FunctionalityChanger,
} from "../moleculas/FunctionalityChanger";

const Loader = view(LoaderViewModels)(({ viewModel }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [login, setLogin] = useState("");
  const [directoriesList, setDirectoriesList] = useState<string[]>([]);
  const [needToShowDirectories, setNeedToShowDirectories] = useState(false);

  const updateDirectoriesList = async () => {
    
    await viewModel.getSubDirs(login);

    const lastLayer = viewModel.getCurrentLayer();
    if (lastLayer) {
      setDirectoriesList(lastLayer);
    }
  };

  const showDirectories = async () => {
    if (login.length !== 0) {
      if (viewModel.path.length === 0) {
        await updateDirectoriesList()
      }
      setNeedToShowDirectories(true);
    }
  };

  const closeDirectoriesSelectionPanel = () => {
    setNeedToShowDirectories(false);
  };

  const selectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const updateLogin = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const uploadFile = async () => {
    await viewModel.sendFile(login, files);
  };

  const onChooseDirectory = async (directory: string) => {
    viewModel.moveToDirectory(directory);
    await updateDirectoriesList();
  };
  
  const onBack = () => {
    viewModel.moveBack()
    const currentLayer = viewModel.getCurrentLayer()
    if (currentLayer){
      setDirectoriesList(currentLayer)
    }
  }

  document.body.style.backgroundColor = ColorPalette.darkBlue;
  document.body.style.margin = "0px";
  console.log('rerender')
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "50%",
          left: "50%",
          right: "50%",
          display: "grid",
          justifyContent: "center",
        }}
      >
        {needToShowDirectories && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DirectoriesSelectionPanel
              directories={directoriesList}
              onBack={onBack}
              onClose={closeDirectoriesSelectionPanel}
              onChooseDirectory={onChooseDirectory}
            />
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", margin: 10 }}>
          <Logo />
        </div>

        <div style={{ display: "flex", justifyContent: "center", width: 500 }}>
          <div style={{ display: "grid" }}>
            <InputText placeholder="Введите свое имя" onChange={updateLogin} />

            <div
              style={{
                display: "grid",
                marginTop: "20px",
                marginBottom: "20px",
                gridTemplateColumns: "1fr 2fr",
                gridGap: "10px",
              }}
            >
              <DirectoriesSelectiontButton onClick={showDirectories} />
              <FilesSelectionButton onChange={selectFiles} />
            </div>

            <UpdloadFileButton onClick={uploadFile} />

            {viewModel.sendedFileNames.map((fileName) => (
              <p>Файл {fileName} отправлен</p>
            ))}

            {viewModel.progressStatus.active && (
              <progress
                max="100"
                value={viewModel.progressStatus.progress}
              ></progress>
            )}
            <div style={{ marginTop: 30, display: "inherit" }}>
              <FunctionalityChanger
                onClick={(e) => {}}
                functionality={Functionality.DownloadFile}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
});

export default Loader;
