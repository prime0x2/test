import React from 'react';
import { useImage } from '../hooks/useImage';

const Navbar = () => {
	// Custom hook that utilizes ImageContext to manage images state
	const { selectedImages, deleteSelectedImages, clearSelectedImages } =
		useImage();

	return (
		<nav className='w-full h-16 px-4 sm:px-6 bg-white flex items-center justify-between border-b border-gray-300'>
			{selectedImages.length > 0 ? (
				// when one or more images are selected

				<>
					<div className='flex items-center space-x-4'>
						<input
							type='checkbox'
							className='form-checkbox rounded w-5 h-5 text-blue-500 focus:ring-blue-400'
							onChange={clearSelectedImages}
							checked
						/>

						<p className='text-lg text-slate-700'>
							{selectedImages.length} image{selectedImages.length > 1 && 's'}{' '}
							selected
						</p>
					</div>

					<div className='flex items-center space-x-4'>
						<button
							className='px-4 py-2 rounded-md bg-rose-400 text-white text-sm font-medium'
							onClick={deleteSelectedImages}
						>
							Delete
						</button>
					</div>
				</>
			) : (
				// when no images are selected

				<>
					<h3 className='text-lg font-bold text-slate-700'>My Gallery</h3>
				</>
			)}
		</nav>
	);
};

export default Navbar;
