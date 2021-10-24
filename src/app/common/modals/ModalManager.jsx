import React from 'react';
import { useSelector } from 'react-redux';
import TestModal from '../../../features/sandbox/TestModal';
import LoginForm from '../../../features/auth/LoginForm';
import RegisterForm from '../../../features/auth/RegisterForm';

function ModalManager() {
	// modalType to lookup will be listed here
	const modalLookup = {
		TestModal,
		LoginForm,
		RegisterForm
	};
	// get the modals state from the store
	const currentModal = useSelector((state) => state.modals);
	let renderedModal;
	if (currentModal) {
		// destructure the modal properties we get from the store
		const { modalType, modalProps } = currentModal;
		// create a new modal component which has the modalType from the store
		const ModalComponent = modalLookup[modalType];
		// pass down any modalProps to the new modal component
		renderedModal = <ModalComponent {...modalProps} />;
	}

	// render the new modal component
	return <span>{renderedModal}</span>;
}

export default ModalManager;
