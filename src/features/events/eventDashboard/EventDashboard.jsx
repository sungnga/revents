import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventForm from '../eventForm/EventForm';
import EventList from './EventList';
import { sampleData } from '../../../app/api/sampleData';

// Semantic UI uses a 16-col grid system
function EventDashboard() {
	return (
		<Grid>
			<Grid.Column width={10}>
				<EventList events={sampleData} />
			</Grid.Column>
			<Grid.Column width={6}>
				<EventForm />
			</Grid.Column>
		</Grid>
	);
}

export default EventDashboard;
