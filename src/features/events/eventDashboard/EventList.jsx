import React from 'react';
import EventListItem from './EventListItem';

function EventList({ events, selectEvent }) {
	return (
		<>
			{events.map((event) => (
				<EventListItem key={event.id} event={event} selectEvent={selectEvent} />
			))}
		</>
	);
}

export default EventList;
