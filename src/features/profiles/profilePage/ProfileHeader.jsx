import React, { useEffect, useState } from 'react';
import {
	Button,
	Divider,
	Grid,
	Header,
	Item,
	Reveal,
	Segment,
	Statistic
} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import {
	followUser,
	getFollowingDoc,
	unfollowUser
} from '../../../app/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import {
	setFollowUser,
	setUnfollowUser
} from '../../../features/profiles/profileActions';

function ProfileHeader({ profile, isCurrentUser }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { followingUser } = useSelector((state) => state.profile);

	// get following doc from firestore (async operation)
	// cannot use async function directly in useEffect hook
	// but can create an async function inside the useEffect function
	useEffect(() => {
		if (isCurrentUser) return;
		setLoading(true);
		async function fetchFollowingDoc() {
			try {
				const followingDoc = getFollowingDoc(profile.id);
				if (followingDoc && followingDoc.exists) {
					dispatch(setFollowUser());
				}
			} catch (error) {
				toast.error(error.message);
			}
		}
		fetchFollowingDoc().then(() => setLoading(false));
	}, [dispatch, profile.id, isCurrentUser]);

	async function handleFollowUser() {
		setLoading(true);
    try {
			// updating firestore db
			await followUser(profile);
			// updating followingUser state in Redux
			dispatch(setFollowUser());
		} catch (error) {
			// console.log(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	}

	async function handleUnfollowUser() {
		setLoading(true);
		try {
			// updating firestore db
			await unfollowUser(profile);
			// updating followingUser state in Redux
			dispatch(setUnfollowUser());
		} catch (error) {
			// console.log(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Segment>
			<Grid>
				<Grid.Column width={12}>
					<Item.Group>
						<Item>
							<Item.Image
								avatar
								size='small'
								src={profile.photoURL || '/assets/user.png'}
							/>
							<Item.Content verticalAlign='middle'>
								<Header
									as='h1'
									style={{ display: 'block', marginBottom: 10 }}
									content={profile.displayName}
								/>
							</Item.Content>
						</Item>
					</Item.Group>
				</Grid.Column>
				<Grid.Column width={4}>
					<Statistic.Group>
						<Statistic label='Followers' value={profile.followerCount || 0} />
						<Statistic label='Following' value={profile.followingCount || 0} />
					</Statistic.Group>
					{!isCurrentUser && (
						<>
							<Divider />
							<Reveal animated='move'>
								<Reveal.Content visible style={{ width: '100%' }}>
									<Button
										fluid
										color='teal'
										content={followingUser ? 'Following' : 'Not following'}
									/>
								</Reveal.Content>
								<Reveal.Content hidden style={{ width: '100%' }}>
									<Button
										onClick={
											followingUser
												? () => handleUnfollowUser()
												: () => handleFollowUser()
										}
										loading={loading}
										basic
										fluid
										color={followingUser ? 'red' : 'green'}
										content={followingUser ? 'Unfollow' : 'Follow'}
									/>
								</Reveal.Content>
							</Reveal>
						</>
					)}
				</Grid.Column>
			</Grid>
		</Segment>
	);
}

export default ProfileHeader;
