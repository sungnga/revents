import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { signOutFirebase } from '../../app/firestore/firebaseService';
import { toast } from 'react-toastify';

function SignedInMenu() {
	const { currentUserProfile } = useSelector((state) => state.profile);
	const history = useHistory();

	async function handleSignOut() {
		try {
			history.push('/');
			await signOutFirebase();
		} catch (error) {
			toast.error(error.message);
		}
	}

	return (
		<Menu.Item position='right'>
			<Image
				avatar
				spaced='right'
				src={currentUserProfile?.photoURL || '/assets/user.png'}
			/>
			<Dropdown pointing='top left' text={currentUserProfile?.displayName}>
				<Dropdown.Menu>
					<Dropdown.Item
						as={Link}
						to='/createEvent'
						text='Create Event'
						icon='plus'
					/>
					<Dropdown.Item
						as={Link}
						to={`/profile/${currentUserProfile?.id}`}
						text='My profile'
						icon='user'
					/>
					<Dropdown.Item
						as={Link}
						to='/account'
						text='My account'
						icon='settings'
					/>
					<Dropdown.Item onClick={handleSignOut} text='Sign out' icon='power' />
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
}

export default SignedInMenu;
