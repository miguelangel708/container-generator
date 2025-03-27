import React from 'react';
import { createRoot } from 'react-dom/client'

import './index.css';

import App from './App';
import { ContainerProvider } from '@/contexts/container';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContainerProvider>
    <App />
    </ContainerProvider>
  </React.StrictMode>
);