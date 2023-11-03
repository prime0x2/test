import React, { useState } from 'react';
import {
	DndContext,
	closestCenter,
	MouseSensor,
	KeyboardSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	rectSortingStrategy,
	sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { useImage } from '../hooks/useImage';
import SortablePhoto from './SortablePhoto';
import Photo from './Photo';
import AddImages from './AddImages';
import Overlay from './Overlay';

const Gallery = () => {
	// Custom hook that utilizes ImageContext to manage images state
	const { images, setImages } = useImage();

	// State to keep track of the currently active item being dragged
	const [activeId, setActiveId] = useState(null);

	// Initialize the drag-and-drop sensors for mouse, keyboard, and touch
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 10,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		})
	);

	// Event handler when a drag operation starts
	const handleDragStart = (event) => {
		setActiveId(event.active.id);
	};

	// Event handler when a drag operation ends
	const handleDragEnd = (event) => {
		const { active, over } = event;

		// Reorder the images if the dragged item was dropped onto another item
		if (active.id !== over.id) {
			setImages((items) => {
				const oldIndex = items.indexOf(active.id);
				const newIndex = items.indexOf(over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}

		setActiveId(null);
	};

	// Event handler when a drag operation is canceled
	const handleDragCancel = () => {
		setActiveId(null);
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragCancel={handleDragCancel}
		>
			<SortableContext items={images} strategy={rectSortingStrategy}>
				{/* Grid layout for displaying images */}

				<div className='container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 p-4 sm:p-6'>
					{/* Mapping images to SortablePhoto components */}

					{images.map((url, index) => (
						<SortablePhoto key={index} url={url} index={index} />
					))}

					{/* Component to add more images */}
					<AddImages />
				</div>
			</SortableContext>

			{/* Overlay for displaying the active image being dragged */}
			<Overlay>
				{activeId ? (
					<Photo
						url={activeId}
						index={images.indexOf(activeId)}
						overlay={true}
					/>
				) : null}
			</Overlay>
		</DndContext>
	);
};

export default Gallery;
