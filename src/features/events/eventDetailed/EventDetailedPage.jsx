import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import EventDetailedChat from './EventDetailedChat';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToEvents } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent'

function EventDetailedPage({ match }) {
	const event = useSelector((state) =>
		state.event.events.find((e) => e.id === match.params.id)
	);
	const { loading } = useSelector((state) => state.async);
	const dispatch = useDispatch();

	useFirestoreDoc({
		// query an event doc in the events collection in Firestore db
		query: () => listenToEventFromFirestore(match.params.id),
		// store the event in Redux store
		data: (event) => dispatch(listenToEvents([event])),
		deps: [match.params.id, dispatch]
	});

	if (loading || !event) return <LoadingComponent content='Loading event...' />;

	return (
		<Grid>
			<Grid.Column width={10}>
				<EventDetailedHeader event={event} />
				<EventDetailedInfo event={event} />
				<EventDetailedChat />
			</Grid.Column>
			<Grid.Column width={6}>
				<EventDetailedSidebar attendees={event.attendees} />
			</Grid.Column>
		</Grid>
	);
}

export default EventDetailedPage;
