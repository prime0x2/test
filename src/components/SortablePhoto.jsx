import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Photo from './Photo';

const SortablePhoto = (props) => {
	// Use the useSortable hook to enable sorting functionality
	const sortable = useSortable({ id: props.url });
	const { attributes, listeners, setNodeRef, transform, transition, active } =
		sortable;

	// Style for the grid item
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		transformOrigin: '0 0',
	};

	// pass sortable properties and attributes to the Photo component
	return (
		<Photo
			ref={setNodeRef}
			style={style}
			active={active}
			{...props}
			{...attributes}
			{...listeners}
		/>
	);
};

export default SortablePhoto;
