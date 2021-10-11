import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function TestMap({ location }) {
	// console.log(location);
	const { lat, lng } = location.center;

	return (
		// Important! Always set the container height explicitly
		<div style={{ height: '100vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'GOOGLE_MAPS_API_KEY' }}
				center={location.center}
				zoom={location.zoom}
			>
				<AnyReactComponent lat={lat} lng={lng} text='My Marker' />
			</GoogleMapReact>
		</div>
	);
}

export default TestMap;
