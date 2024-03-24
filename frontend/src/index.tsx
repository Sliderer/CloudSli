import React from 'react';
import ReactDOM from 'react-dom/client';
import Loader from './ui/views/Loader';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Loader />
  </React.StrictMode>
);
