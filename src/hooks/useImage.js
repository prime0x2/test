import { useContext } from 'react';
import { ImageContext } from '../context/ImageContext';

// Custom hook for using the ImageContext
export const useImage = () => {
	const context = useContext(ImageContext);

	if (!context) {
		throw new Error('useImage must be used within ImageProvider');
	}

	return context;
};
