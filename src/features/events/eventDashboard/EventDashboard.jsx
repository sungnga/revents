import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import EventListItemPlaceholder from './EventListItemPlaceholder';

// Semantic UI uses a 16-col grid system
function EventDashboard() {
	const { events } = useSelector((state) => state.event);
	const { loading } = useSelector((state) => state.async);

	return (
		<Grid>
			<Grid.Column width={10}>
				{loading && (
					<>
						<EventListItemPlaceholder />
						<EventListItemPlaceholder />
					</>
				)}
				<EventList events={events} />
			</Grid.Column>
			<Grid.Column width={6}>
				<h2>Event Filters</h2>
			</Grid.Column>
		</Grid>
	);
}

export default EventDashboard;
