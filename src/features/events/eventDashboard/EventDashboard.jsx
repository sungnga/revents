import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from 'semantic-ui-react';
import { fetchEvents } from '../eventActions';
import EventFilters from './EventFilters';
import EventList from './EventList';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventsFeed from './EventsFeed';

// Semantic UI uses a 16-col grid system
function EventDashboard() {
	const limit = 2;
	const dispatch = useDispatch();
	const { events, moreEvents } = useSelector((state) => state.event);
	const { loading } = useSelector((state) => state.async);
	const { authenticated } = useSelector((state) => state.auth);
	const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
	const [loadingInitial, setLoadingInitial] = useState(false);
	const [predicate, setPredicate] = useState(
		new Map([
			['startDate', new Date()],
			['filter', 'all']
		])
	);

	function handleSetPredicate(key, value) {
		setPredicate(new Map(predicate.set(key, value)));
	}

	useEffect(() => {
		setLoadingInitial(true);
		// fetchEvents is an async function, so it returns a promise
		// what's returned in the promise is lastVisible
		// set this lastVisible in the lastDocSnapshot local state
		dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
			setLastDocSnapshot(lastVisible);
			setLoadingInitial(false);
		});
	}, [dispatch, predicate]);

	function handleFetchNextEvents() {
		dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then(
			(lastVisible) => {
				setLastDocSnapshot(lastVisible);
			}
		);
	}

	return (
		<Grid>
			<Grid.Column width={10}>
				{loadingInitial && (
					<>
						<EventListItemPlaceholder />
						<EventListItemPlaceholder />
					</>
				)}
				<EventList events={events} />
				<Button
					loading={loading}
					disabled={!moreEvents}
					onClick={handleFetchNextEvents}
					color='green'
					content='More...'
					floated='right'
				/>
			</Grid.Column>
			<Grid.Column width={6}>
				{authenticated && <EventsFeed />}
				<EventFilters
					predicate={predicate}
					setPredicate={handleSetPredicate}
					loading={loading}
				/>
			</Grid.Column>
		</Grid>
	);
}

export default EventDashboard;
