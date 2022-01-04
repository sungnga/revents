import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';
import { fetchEvents } from '../eventActions';
import { RETAIN_STATE } from '../eventConstants';
import EventFilters from './EventFilters';
import EventList from './EventList';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventsFeed from './EventsFeed';

// Semantic UI uses a 16-col grid system
function EventDashboard() {
	const limit = 2;
	const dispatch = useDispatch();
	const { events, moreEvents, filter, startDate, lastVisible, retainState } =
		useSelector((state) => state.event);
	const { loading } = useSelector((state) => state.async);
	const { authenticated } = useSelector((state) => state.auth);
	const [loadingInitial, setLoadingInitial] = useState(false);

	useEffect(() => {
		if (retainState) return;
		setLoadingInitial(true);

		// fetchEvents is an async function, so it returns a promise
		// what's returned in the promise is lastVisible
		// set this lastVisible in the lastDocSnapshot local state
		dispatch(fetchEvents(filter, startDate, limit)).then(() => {
			setLoadingInitial(false);
		});

		// reset the events to its initial state when the component unmounts
		return () => {
			dispatch({ type: RETAIN_STATE });
		};
	}, [dispatch, filter, startDate, retainState]);

	function handleFetchNextEvents() {
		dispatch(fetchEvents(filter, startDate, limit, lastVisible));
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
				<EventList
					events={events}
					getNextEvents={handleFetchNextEvents}
					loading={loading}
					moreEvents={moreEvents}
				/>
			</Grid.Column>
			<Grid.Column width={6}>
				{authenticated && <EventsFeed />}
				<EventFilters loading={loading} />
			</Grid.Column>
			<Grid.Column width={10}>
				<Loader active={loading} />
			</Grid.Column>
		</Grid>
	);
}

export default EventDashboard;
