import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
//DnD
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<DndProvider backend={HTML5Backend}>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</DndProvider>,
);
