import React from 'react';
import ReactDOM from 'react-dom/client';
import Uploader from './ui/views/Uploader';
import {FilesUploader} from "./ui/moleculas/FilesUploading";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Downloader from './ui/views/Downloader';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: '/upload-files',
        element: <Uploader/>
    }, 
    {
        path: '/download-files', 
        element: <Downloader/>
    }
])

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
