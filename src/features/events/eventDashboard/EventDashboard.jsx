import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import {
	dataFromSnapshot,
	getEVentsFromFirestore
} from '../../../app/firestore/firestoreService';
import { listenToEvents } from '../eventActions';
import EventFilters from './EventFilters';
import EventList from './EventList';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import {
	asyncActionError,
	asyncActionFinish,
	asyncActionStart
} from '../../../app/async/asyncReducer';

// Semantic UI uses a 16-col grid system
function EventDashboard() {
	const dispatch = useDispatch();
	const { events } = useSelector((state) => state.event);
	const { loading } = useSelector((state) => state.async);

  useEffect(() => {
		// turn on loading indicator
		dispatch(asyncActionStart());
		const unsubscribe = getEVentsFromFirestore({
			// what to do next with the data
			next: (snapshot) => {
				dispatch(
					listenToEvents(
						snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
					)
				);
				// turn off loading indicator
				dispatch(asyncActionFinish());
			},
			// store the error message in Redux store
			error: (error) => dispatch(asyncActionError(error)),
			// when listening to the data, we'll never get to this point
			complete: () => console.log('you will never see this message')
		});
		return unsubscribe;
	}, [dispatch]);

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
				<EventFilters />
			</Grid.Column>
		</Grid>
	);
}

export default EventDashboard;
