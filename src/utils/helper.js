import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// helper function to merge tailwind classes and conditional classes

export const cn = (...inputs) => {
	return twMerge(clsx(inputs));
};
