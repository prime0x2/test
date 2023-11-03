import React from 'react';
import { useImage } from '../hooks/useImage';
import toast from 'react-hot-toast';

const AddImages = () => {
	// Custom hook that utilizes ImageContext to manage images state
	const { addNewImage } = useImage();

	// Event handler for file input change
	const handleFileChange = async (e) => {
		const image = e.target.files[0];

		if (!image) return;

		const toastId = toast.loading('Uploading image...');

		// Check if the file is an image (only JPEG and PNG are allowed)
		if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
			toast.error('Only JPEG and PNG images are allowed', { id: toastId });
			return;
		}

		// Check if the file size is less than 4MB
		if (image.size > 4 * 1024 * 1024) {
			toast.error('Image size should be less than 4MB', { id: toastId });
			return;
		}

		// Upload image to Imgbb (free image hosting service https://imgbb.com/)

		try {
			const formData = new FormData();
			formData.append('image', image);

			// Move this to .env file
			const IMGBB_API_KEY = '0cf1355caf74bfe8eeccc59df18ec459';
			const url = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;

			const req = await fetch(url, {
				method: 'POST',
				body: formData,
			});

			const res = await req.json();

			if (res.success) {
				const imageUrl = res.data?.medium?.url || res.data?.url;

				// Add image to the context
				addNewImage(imageUrl);
				toast.success('Image uploaded successfully', { id: toastId });
			} else {
				toast.error('Unable to upload image', { id: toastId });
			}
		} catch (error) {
			toast.error('Unable to upload image', { id: toastId });
		} finally {
			e.target.value = ''; // Clear the input field
		}
	};

	return (
		<label className='w-full h-40 sm:h-44 lg:h-48 xl:h-64 bg-white border-2 border-dashed rounded-md flex flex-col items-center justify-center overflow-hidden'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 512 512'
				className='w-12 h-12 text-gray-400'
			>
				<path
					d='M432 112V96a48.14 48.14 0 00-48-48H64a48.14 48.14 0 00-48 48v256a48.14 48.14 0 0048 48h16'
					fill='none'
					stroke='currentColor'
					strokeLinejoin='round'
					strokeWidth='32'
				/>
				<rect
					x='96'
					y='128'
					width='400'
					height='336'
					rx='45.99'
					ry='45.99'
					fill='none'
					stroke='currentColor'
					strokeLinejoin='round'
					strokeWidth='32'
				/>
				<ellipse
					cx='372.92'
					cy='219.64'
					rx='30.77'
					ry='30.55'
					fill='none'
					stroke='currentColor'
					strokeMiterlimit='10'
					strokeWidth='32'
				/>
				<path
					d='M342.15 372.17L255 285.78a30.93 30.93 0 00-42.18-1.21L96 387.64M265.23 464l118.59-117.73a31 31 0 0141.46-1.87L496 402.91'
					fill='none'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='32'
				/>
			</svg>

			<h1 className='md:text-lg font-medium text-gray-500'>Add Image</h1>
			<p className='text-sm text-center text-gray-400 flex flex-col sm:flex-row sm:gap-x-2'>
				<span>MAX 4MB</span>
				<span>(JPG, JPEG or PNG)</span>
			</p>

			<input
				type='file'
				hidden
				multiple={false}
				accept='image/*'
				onChange={handleFileChange}
			/>
		</label>
	);
};

export default AddImages;
