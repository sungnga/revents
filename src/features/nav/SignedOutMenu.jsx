import React from 'react';
import { Button, Menu } from 'semantic-ui-react';

function SignedOutMenu() {
	return (
		<Menu.Item position='right'>
			<Button basic inverted content='Login' />
			<Button
				basic
				inverted
				content='Register'
				style={{ marginLeft: '.5em' }}
			/>
		</Menu.Item>
	);
}

export default SignedOutMenu;
