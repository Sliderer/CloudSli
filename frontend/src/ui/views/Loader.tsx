import React, {Component, useState} from 'react';
import 'reflect-metadata'
import LoaderViewModels from "../../view_models/LoaderViewModels";
import {view} from "@yoskutik/react-vvm";
import {HorizontalCenterDiv, ColumnDiv, VerticalCenterDiv} from "../styles/Divs";

const Loader = view(LoaderViewModels)(({viewModel}) => {

  const [files, setFiles] = useState<FileList | null>(null)
  const [login, setLogin] = useState('')

  return <HorizontalCenterDiv>
    <VerticalCenterDiv>
      <ColumnDiv>
        <input placeholder={'Введите свое имя'} onChange={(event) => {setLogin(event.target.value)}}/>
        <input onChange={(e) => {setFiles(e.target.files)}} type='file'/>
        <button onClick={async () => {await viewModel.sendFile(login, files)}}>Отправить</button>
        {viewModel.progressStatus.active && <progress max='100' value={viewModel.progressStatus.progress}></progress>}
      </ColumnDiv>
    </VerticalCenterDiv>

  </HorizontalCenterDiv>
})

export default Loader;
