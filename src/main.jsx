import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import SiteMotion from './SiteMotion.jsx';
import CursorFollower from './CursorFollower.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(<><App /><CursorFollower /><SiteMotion /></>);
