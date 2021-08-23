import React from 'react';
import { Grid } from 'semantic-ui-react';

// Semantic UI uses a 16-col grid system
function EventDashboard() {
	return (
		<Grid>
			<Grid.Column width={10}>
				<h2>Left Column</h2>
			</Grid.Column>
			<Grid.Column width={6}>
				<h2>Right Column</h2>
			</Grid.Column>
		</Grid>
	);
}

export default EventDashboard;
