import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Divider, Modal } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';

function UnauthModal() {
	const [open, setOpen] = React.useState(true);
	const dispatch = useDispatch();

	function handleClose() {
		setOpen(false);
	}

	return (
		<Modal open={open} size='mini' onClose={handleClose}>
			<Modal.Header content='You need to be signed in to do that' />
			<Modal.Content>
				<p>Please either login or register to see this content</p>
				<Button.Group widths={4}>
					<Button
						fluid
						color='teal'
						content='Login'
						onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))}
					/>
					<Button.Or />
					<Button
						fluid
						color='green'
						content='Register'
						onClick={() => dispatch(openModal({ modalType: 'RegisterForm' }))}
					/>
				</Button.Group>
				<Divider />
				<div style={{ textAlign: 'center' }}>
					<p>Or click cancel to continue as a guest</p>
					<Button content='Cancel' onClick={handleClose} />
				</div>
			</Modal.Content>
		</Modal>
	);
}

export default UnauthModal;
