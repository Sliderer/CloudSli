import React from 'react';
import ReactDOM from 'react-dom/client';
import Loader from './ui/views/Loader';
import {FilesUploader} from "./ui/moleculas/FilesUploading";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/load-files",
        element: <Loader/>
    }
])

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
