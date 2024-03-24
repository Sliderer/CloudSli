import React, {Component, useState} from 'react';
import axios from "axios";

const App = () => {

  const sendFile = async (files: FileList | null) => {
    if (files === null){
        return
    }


    for (let i = 0; i < files.length; ++i){
      const fd = new FormData()
      fd.append('file', files[i])
      await axios.post('http://127.0.0.1:8080/load-file', fd)
    }
  }

  return <div>
    <input onChange={(e) => {sendFile(e.target.files)}} type='file'/>
    <button>Send</button>
  </div>
}


export default App;
