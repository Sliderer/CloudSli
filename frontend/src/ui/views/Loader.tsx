import React, { ChangeEvent, useState } from "react";
import "reflect-metadata";
import LoaderViewModels from "../../view_models/LoaderViewModels";
import { view } from "@yoskutik/react-vvm";
import { UpdloadFileButton } from "../moleculas/UpdaloadFileButton";
import { InputText } from "../moleculas/InputText";
import { FilesSelectionButton } from "../moleculas/FilesSelectionButton";
import { DirectoriesSelectiontButton } from "../moleculas/DirectoriesSelectionButton";
import { ColorPalette } from "../../colorPalette";

const Loader = view(LoaderViewModels)(({ viewModel }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [login, setLogin] = useState("");
  const [directoriesList, setDirectoriesList] = useState<string[]>([]);

  const showDirectories = async () => {
    if (login.length !== 0) {
      viewModel.clearDirectoriesList();
      await viewModel.getSubDirs(login);

      const lastLayer = viewModel.getLastLayer();
      if (lastLayer) {
        setDirectoriesList(lastLayer);
      }
    }
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

  document.body.style.backgroundColor = ColorPalette.lightBlue;

  return (
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="/cloudIcon.png" />
      </div>

      <div style={{ display: "flex", justifyContent: "center", width: 500}}>
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

            <div>
              {directoriesList.map((directory) => {
                return (
                  <button
                    onClick={() => {
                      viewModel.moveToDirectory(directory);
                    }}
                  >
                    {directory}
                  </button>
                );
              })}
            </div>
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
        </div>
      </div>
    </div>
  );
});

export default Loader;
