import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Divider, Modal } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';

function UnauthModal({ history, setModalOpen }) {
	const [open, setOpen] = React.useState(true);
	const { prevLocation } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	function handleClose() {
		// if no history object, simply close the modal and the user stays on the same page
		if (!history) {
			setOpen(false);
			setModalOpen(false);
			return; //don't do anything else after the modal is closed
		}
		// if there is history object and prevLocation, redirect user
		if (history && prevLocation) {
			history.push(prevLocation.pathname);
		} else {
			history.push('/events');
		}
		// close the modal
		setOpen(false);
	}

	// close the UnauthModal once the user clicked on either the Login or Register button
	function handleOpenLoginModal(modalType) {
		// NOTE: The modalType is pass an an object
		dispatch(openModal({ modalType }));
		setOpen(false);
    if (setModalOpen !== undefined) {
      setModalOpen(false);
    }
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
						onClick={() => handleOpenLoginModal('LoginForm')}
					/>
					<Button.Or />
					<Button
						fluid
						color='green'
						content='Register'
						onClick={() => handleOpenLoginModal('RegisterForm')}
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
