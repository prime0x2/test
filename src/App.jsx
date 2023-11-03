import React from 'react';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';

const App = () => {
	return (
		<main>
			<Navbar />

			<div className='w-full h-[calc(100vh-4rem)] overflow-y-auto'>
				<Gallery />
			</div>
		</main>
	);
};

export default App;
