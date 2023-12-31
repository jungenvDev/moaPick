import CreateDOM from 'react-dom/client';
import React from 'react';
import App from "./App";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = CreateDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
