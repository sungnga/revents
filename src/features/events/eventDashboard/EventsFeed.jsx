import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Segment, Feed } from 'semantic-ui-react';
import {
	firebaseObjectToArray,
	getUserFeedRef
} from '../../../app/firestore/firebaseService';
import { listenToFeed } from '../../profiles/profileActions';

function EventsFeed() {
	const dispatch = useDispatch;
	const { feed } = useSelector((state) => state.profile);

	useEffect(() => {
		getUserFeedRef().on('value', (snapshot) => {
			if (!snapshot.exists()) {
				return;
			}
			const feed = firebaseObjectToArray(snapshot.val()).reverse();
			dispatch(listenToFeed(feed));
		});

		return getUserFeedRef().off();
	}, [dispatch]);

	const image = '/assets/user.png';
	const date = '3 days ago';
	const summary = 'Diana joined an event';

	return (
		<>
			<Header attached color='teal' icon='newspaper' content='News feed' />
			<Segment attached='bottom'>
				<Feed>
					<Feed.Event image={image} date={date} summary={summary} />
					<Feed.Event image={image} date={date} summary={summary} />
					<Feed.Event image={image} date={date} summary={summary} />
					<Feed.Event image={image} date={date} summary={summary} />
				</Feed>
			</Segment>
		</>
	);
}

export default EventsFeed;
