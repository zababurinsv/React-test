import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
const container = document.querySelector('#root');

export default () => {
    const root = createRoot(container);
    root.render(<App tab="home" />);
}
