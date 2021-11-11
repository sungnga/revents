import React, { useEffect } from 'react';
import { Header, Comment, Segment } from 'semantic-ui-react';
import EventDetailedChatForm from './EventDetailedChatForm';
import { useDispatch, useSelector } from 'react-redux';
import {
	firebaseObjectToArray,
	getEventChatRef
} from '../../../app/firestore/firebaseService';
import { listenToEventChat } from '../eventActions';

function EventDetailedChat({ eventId }) {
	const dispatch = useDispatch();
	const { comments } = useSelector((state) => state.event);

	useEffect(() => {
		// get event chat data from firebase RealTime Database
		// it returns as a snapshot object
		getEventChatRef(eventId).on('value', (snapshot) => {
			if (!snapshot.exists()) return;
			// console.log(firebaseObjectToArray(snapshot.val()));
			// first, convert firebase object to an array
			// store the array in comments property in eventReducer
			dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val())));
		});
	}, [eventId, dispatch]);

	return (
		<>
			<Segment
				textAlign='center'
				attached='top'
				inverted
				color='teal'
				style={{ border: 'none' }}
			>
				<Header>Chat about this event</Header>
			</Segment>

			<Segment attached>
				<Comment.Group>
					<Comment>
						<Comment.Avatar src='/assets/user.png' />
						<Comment.Content>
							<Comment.Author as='a'>Matt</Comment.Author>
							<Comment.Metadata>
								<div>Today at 5:42PM</div>
							</Comment.Metadata>
							<Comment.Text>How artistic!</Comment.Text>
							<Comment.Actions>
								<Comment.Action>Reply</Comment.Action>
							</Comment.Actions>
						</Comment.Content>
					</Comment>

					<Comment>
						<Comment.Avatar src='/assets/user.png' />
						<Comment.Content>
							<Comment.Author as='a'>Elliot Fu</Comment.Author>
							<Comment.Metadata>
								<div>Yesterday at 12:30AM</div>
							</Comment.Metadata>
							<Comment.Text>
								<p>
									This has been very useful for my research. Thanks as well!
								</p>
							</Comment.Text>
							<Comment.Actions>
								<Comment.Action>Reply</Comment.Action>
							</Comment.Actions>
						</Comment.Content>
						<Comment.Group>
							<Comment>
								<Comment.Avatar src='/assets/user.png' />
								<Comment.Content>
									<Comment.Author as='a'>Jenny Hess</Comment.Author>
									<Comment.Metadata>
										<div>Just now</div>
									</Comment.Metadata>
									<Comment.Text>Elliot you are always so right :)</Comment.Text>
									<Comment.Actions>
										<Comment.Action>Reply</Comment.Action>
									</Comment.Actions>
								</Comment.Content>
							</Comment>
						</Comment.Group>
					</Comment>

					<Comment>
						<Comment.Avatar src='/assets/user.png' />
						<Comment.Content>
							<Comment.Author as='a'>Joe Henderson</Comment.Author>
							<Comment.Metadata>
								<div>5 days ago</div>
							</Comment.Metadata>
							<Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
							<Comment.Actions>
								<Comment.Action>Reply</Comment.Action>
							</Comment.Actions>
						</Comment.Content>
					</Comment>

					<EventDetailedChatForm eventId={eventId} />
				</Comment.Group>
			</Segment>
		</>
	);
}

export default EventDetailedChat;
