import React, { createContext, useContext } from 'react';
import { images as items } from '../assets/constant';
import toast from 'react-hot-toast';

// Create a context for managing images
export const ImageContext = createContext(null);

export const ImageProvider = ({ children }) => {
	const [images, setImages] = React.useState(items);
	const [selectedImages, setSelectedImages] = React.useState([]);

	// Function to select an image
	const selectImage = (image) => {
		setSelectedImages((prev) => [...prev, image]);
	};

	// Function to deselect an image
	const deselectImage = (image) => {
		setSelectedImages((prev) => prev.filter((item) => item !== image));
	};

	// Function to delete selected images
	const deleteSelectedImages = () => {
		setImages((prev) => {
			const newImages = prev.filter((image) => !selectedImages.includes(image));
			console.log('prev -> ', prev);
			console.log('new -> ', newImages);
			return newImages;
		});
		setSelectedImages([]);

		// Show a toast notification
		toast.success(
			`${selectedImages.length} image${
				selectedImages.length > 1 ? 's' : ''
			} deleted successfully`
		);
	};

	// Function to clear all selected images
	const clearSelectedImages = () => {
		setSelectedImages([]);
	};

	// Function to check if an image is selected
	const isSelected = (image) => selectedImages.includes(image);

	// Function to add a new image
	const addNewImage = (image) => {
		setImages((prev) => [...prev, image]);
	};

	// Function to delete an image
	const deleteImage = (image) => {
		setImages((prev) => prev.filter((item) => item !== image));
		toast.success('Image deleted successfully');
	};

	// context value
	const value = {
		images,
		setImages,
		selectedImages,
		selectImage,
		deselectImage,
		deleteSelectedImages,
		clearSelectedImages,
		isSelected,
		addNewImage,
		deleteImage,
	};

	// Provide the context value to the children
	return (
		<ImageContext.Provider value={value}>{children}</ImageContext.Provider>
	);
};
