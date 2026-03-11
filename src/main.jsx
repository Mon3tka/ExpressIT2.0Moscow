import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { getSiteConfig } from './lib/siteConfig';

// Применяем сохранённые настройки дизайна
const config = getSiteConfig();
if (config.design?.accentColor) {
  document.documentElement.style.setProperty('--accent', config.design.accentColor);
}
if (config.design?.accentHover) {
  document.documentElement.style.setProperty('--accent-hover', config.design.accentHover);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
