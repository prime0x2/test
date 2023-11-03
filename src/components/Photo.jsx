import React, { forwardRef, useState } from 'react';
import { cn } from '../utils/helper';
import { useImage } from '../hooks/useImage';

const Photo = forwardRef(function Photo(
	{ url, index, style, overlay, active, ...props },
	ref
) {
	// Custom hook that utilizes ImageContext to manage images state
	const { selectImage, deselectImage, isSelected, deleteImage } = useImage();

	// Check if the image is selected
	const checked = isSelected(url);

	// Event handler to handle image selection/deselection
	const handleCheck = (e) => {
		if (e.target.checked) {
			selectImage(url);
		} else {
			deselectImage(url);
		}
	};

	return (
		<div
			ref={ref}
			style={style}
			{...props}
			className={cn(
				'group relative w-full h-40 sm:h-44 lg:h-48 xl:h-64 bg-white shadow rounded-md overflow-hidden',
				{
					'aspect-square col-span-2 row-span-2 h-80 sm:h-[23.5rem] lg:h-[25.5rem] xl:h-[33.5rem]':
						index === 0, // first image in the grid
					'opacity-60': active?.id === url && !overlay, // dim the image when being dragged
				}
			)}
		>
			<img
				src={url}
				alt='image'
				className='w-full h-full object-cover object-center'
			/>

			<div
				className={cn(
					'absolute top-0 left-0 w-full h-full bg-black/40 hidden overflow-hidden',
					{
						'block bg-blue-200/50': !overlay && checked && active?.id !== url, // show overlay when selected
						'group-hover:block': active?.id !== url && !overlay, // show overlay on hover
					}
				)}
			>
				<input
					type='checkbox'
					className={cn('absolute top-6 left-6 form-checkbox rounded w-6 h-6')}
					onChange={handleCheck}
					checked={checked}
				/>

				{!checked ? (
					<button
						className='absolute top-3 right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-black/50 flex items-center justify-center'
						onClick={() => deleteImage(url)} // delete current image
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 512 512'
							stroke='#fff'
							className='w-7 h-7 sm:w-8 sm:h-8'
						>
							<path
								d='M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320'
								fill='none'
								stroke='#fff'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='32'
							/>
							<path
								stroke='#fff'
								strokeLinecap='round'
								strokeMiterlimit='10'
								strokeWidth='32'
								d='M80 112h352'
							/>
							<path
								d='M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224'
								fill='none'
								stroke='#fff'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='32'
							/>
						</svg>
					</button>
				) : null}
			</div>
		</div>
	);
});

export default Photo;
