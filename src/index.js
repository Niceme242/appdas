
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
                    
import 'aos/dist/aos.css';
import AOS from 'aos';
AOS.init({ duration: 1000, once: true });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

