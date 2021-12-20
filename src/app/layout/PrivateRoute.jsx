import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import UnauthModal from '../../features/auth/UnauthModal';

// ...rest takes in the rest of the properties using the spread operator
// properties such as history or location objects that we get from react-router-dom
function PrivateRoute({ component: Component, prevLocation, ...rest }) {
	const { authenticated } = useSelector((state) => state.auth);

	// if not authenticated, the route will activate the UnauthModal
	return (
		<Route
			{...rest}
			render={(props) =>
				authenticated ? <Component {...props} /> : <UnauthModal {...props} />
			}
		/>
	);
}

export default PrivateRoute;
