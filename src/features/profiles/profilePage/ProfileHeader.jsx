import React, { useState } from 'react';
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
	unfollowUser
} from '../../../app/firestore/firestoreService';

function ProfileHeader({ profile, isCurrentUser }) {
	const [loading, setLoading] = useState(false);

	async function handleFollowUser() {
		setLoading(true);
		try {
			await followUser(profile);
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	}

	async function handleUnfollowUser() {
		setLoading(true);
		try {
			await unfollowUser(profile);
		} catch (error) {
			console.log(error);
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
									<Button fluid color='teal' content='Following' />
								</Reveal.Content>
								<Reveal.Content hidden style={{ width: '100%' }}>
									<Button
										onClick={handleFollowUser}
										loading={loading}
										basic
										fluid
										color='green'
										content='Follow'
									/>
								</Reveal.Content>
							</Reveal>
							<Button
								onClick={handleUnfollowUser}
								loading={loading}
								basic
								fluid
								color='red'
								content='Unfollow'
							/>
						</>
					)}
				</Grid.Column>
			</Grid>
		</Segment>
	);
}

export default ProfileHeader;
