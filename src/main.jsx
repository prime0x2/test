import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import './index.css';
import { ImageProvider } from './context/ImageContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ImageProvider>
			<App />

			<Toaster position='top-center' />
		</ImageProvider>
	</React.StrictMode>
);
