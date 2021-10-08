import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
	const { pathname } = useLocation();

	// The useEffect hook will run when the ScrollToTop component first mounts
	// Whenever there's a change to a page's pathname URL (useEffect dependency),
	// the function window.scrollTo() will execute
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

export default ScrollToTop;
