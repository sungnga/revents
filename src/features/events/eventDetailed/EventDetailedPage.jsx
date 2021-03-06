import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import EventDetailedChat from './EventDetailedChat';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToSelectedEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Redirect } from 'react-router';

function EventDetailedPage({ match }) {
	const event = useSelector((state) => state.event.selectedEvent);
	const { loading, error } = useSelector((state) => state.async);
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.auth);
	const isHost = event?.hostUid === currentUser?.uid;
	const isGoing = event?.attendees?.some((a) => a.id === currentUser?.uid);

	useFirestoreDoc({
		// query an event doc in the events collection in Firestore db
		query: () => listenToEventFromFirestore(match.params.id),
		// store the event in Redux store
		data: (event) => dispatch(listenToSelectedEvent(event)),
		deps: [match.params.id, dispatch]
	});

	if (loading || (!event && !error))
		return <LoadingComponent content='Loading event...' />;

	if (error) return <Redirect to='/error' />;

	return (
		<Grid>
			<Grid.Column width={10}>
				<EventDetailedHeader event={event} isHost={isHost} isGoing={isGoing} />
				<EventDetailedInfo event={event} />
				<EventDetailedChat eventId={event.id} />
			</Grid.Column>
			<Grid.Column width={6}>
				<EventDetailedSidebar
					attendees={event.attendees}
					hostUid={event.hostUid}
				/>
			</Grid.Column>
		</Grid>
	);
}

export default EventDetailedPage;
