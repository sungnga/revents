import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { listenToEVentsFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToEvents } from '../eventActions';
import EventFilters from './EventFilters';
import EventList from './EventList';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';

// Semantic UI uses a 16-col grid system
function EventDashboard() {
	const dispatch = useDispatch();
	const { events } = useSelector((state) => state.event);
	const { loading } = useSelector((state) => state.async);
	const [predicate, setPredicate] = useState(
		new Map([
			['startDate', new Date()],
			['filter', 'all']
		])
	);

	function handleSetPredicate(key, value) {
		setPredicate(new Map(predicate.set(key, value)));
	}

	// using a custom useEffect() hook
	useFirestoreCollection({
		query: () => listenToEVentsFromFirestore(),
		data: (events) => dispatch(listenToEvents(events)),
		deps: [dispatch]
	});

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
				<EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading} />
			</Grid.Column>
		</Grid>
	);
}

export default EventDashboard;
