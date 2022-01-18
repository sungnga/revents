import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Segment, Feed } from 'semantic-ui-react';
import {
	firebaseObjectToArray,
	getUserFeedRef
} from '../../../app/firestore/firebaseService';
import { listenToFeed } from '../../profiles/profileActions';
import EventFeedItem from './EventFeedItem';
import { onValue, off } from '@firebase/database';

function EventsFeed() {
	const dispatch = useDispatch();
	const { feed } = useSelector((state) => state.profile);
	// console.log(feed);

	useEffect(() => {
		onValue(getUserFeedRef(), (snapshot) => {
			if (!snapshot.exists()) {
				return;
			}
			const feed = firebaseObjectToArray(snapshot.val()).reverse();
			dispatch(listenToFeed(feed));
		});

		return () => {
			off(getUserFeedRef());
		};
	}, [dispatch]);

	return (
		<>
			<Header attached color='teal' icon='newspaper' content='News feed' />
			<Segment attached='bottom'>
				<Feed>
					{feed.map((post) => (
						<EventFeedItem post={post} key={post.id} />
					))}
				</Feed>
			</Segment>
		</>
	);
}

export default EventsFeed;
