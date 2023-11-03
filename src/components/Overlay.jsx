import React from 'react';
import { DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';

const Overlay = ({ children }) => {
	// Animation for when the dragged item is dropped

	const animation = {
		sideEffects: defaultDropAnimationSideEffects({
			styles: {
				active: {
					opacity: '0.5',
				},
			},
		}),
	};

	return (
		<DragOverlay dropAnimation={animation} adjustScale={true}>
			{children}
		</DragOverlay>
	);
};

export default Overlay;
