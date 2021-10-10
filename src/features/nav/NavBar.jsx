import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

function NavBar() {
	// destructure authenticated property from auth state
	const { authenticated } = useSelector((state) => state.auth);

	return (
		<Menu inverted fixed='top'>
			<Container>
				<Menu.Item as={NavLink} exact to='/' header>
					<img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
					Re-vents
				</Menu.Item>
				<Menu.Item as={NavLink} to='/events' name='Events' />
				<Menu.Item as={NavLink} to='/sandbox' name='Sandbox' />
				{authenticated && (
					<Menu.Item as={NavLink} to='/createEvent'>
						<Button positive inverted content='Create Event' />
					</Menu.Item>
				)}
				{authenticated ? <SignedInMenu /> : <SignedOutMenu />}
			</Container>
		</Menu>
	);
}

export default NavBar;
