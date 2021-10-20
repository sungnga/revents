/* global google */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Segment, Confirm } from 'semantic-ui-react';
import { listenToEvents } from '../eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import {
	addEventToFirestore,
	cancelEventToggle,
	listenToEventFromFirestore,
	updateEventInFirestore
} from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

function EventForm({ match, history }) {
	const dispatch = useDispatch();
	const [loadingCancel, setLoadingCancel] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);

	// Use useSelector hook to get the event state from the store
	// Use find() method to find the event based on event id from the URL params
	// Hence the selectedEvent holds the event data
	// Use this data to populate the event form fields
	const selectedEvent = useSelector((state) =>
		state.event.events.find((e) => e.id === match.params.id)
	);
	const { loading, error } = useSelector((state) => state.async);

	// ?? is the null conditional operator
	// The ?? means that if selectedEvent is null, the initialValues is set to whatever is on the right of the ??
	// If selectedEvent is NOT null, set the initialValues to the values of selectedEvent
	const initialValues = selectedEvent ?? {
		title: '',
		category: '',
		description: '',
		city: {
			address: '',
			latLng: null
		},
		venue: {
			address: '',
			latLng: null
		},
		date: ''
	};

	const validationSchema = Yup.object({
		title: Yup.string().required('You must provide a title'),
		category: Yup.string().required('You must provide a category'),
		description: Yup.string().required(),
		city: Yup.object().shape({
			address: Yup.string().required('City is required')
		}),
		venue: Yup.object().shape({
			address: Yup.string().required('Venue is required')
		}),
		date: Yup.string().required()
	});

	async function handleCancelToggle(event) {
		setConfirmOpen(false);
		setLoadingCancel(true);
		try {
			await cancelEventToggle(event);
			setLoadingCancel(false);
		} catch (error) {
			setLoadingCancel(true);
			toast.error(error.message);
		}
	}

	useFirestoreDoc({
		// cast the match.params.id into a boolean
		// by default, shouldExecute is set to true
		// if no event id (shouldExecute is false), return early
		// this stops from listening to firestore
		shouldExecute: !!match.params.id,
		// query an event doc in the events collection in Firestore db
		query: () => listenToEventFromFirestore(match.params.id),
		// store the event in Redux store
		data: (event) => dispatch(listenToEvents([event])),
		deps: [match.params.id, dispatch]
	});

	if (loading) return <LoadingComponent content='Loading event...' />;

	if (error) return <Redirect to='/error' />;

	return (
		<Segment clearing>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						selectedEvent
							? await updateEventInFirestore(values)
							: await addEventToFirestore(values);
						setSubmitting(false);
						history.push('/events');
					} catch (error) {
						toast.error(error.message);
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting, dirty, isValid, values }) => (
					<Form className='ui form'>
						<Header sub color='teal' content='Event Details' />
						<MyTextInput name='title' placeholder='Event title' />
						<MySelectInput
							name='category'
							placeholder='Event category'
							options={categoryData}
						/>
						<MyTextArea name='description' placeholder='Description' rows={3} />
						<Header sub color='teal' content='Event Location Details' />
						<MyPlaceInput name='city' placeholder='City' />
						{/* disable the venue input field if there's no latLng values for city field */}
						<MyPlaceInput
							name='venue'
							disabled={!values.city.latLng}
							placeholder='Venue'
							options={{
								location: new google.maps.LatLng(values.city.latLng),
								radius: 1000,
								types: ['establishment']
							}}
						/>
						<MyDateInput
							name='date'
							placeholderText='Event date'
							timeFormat='HH:mm'
							showTimeSelect
							timeCaption='time'
							dateFormat='MMMM d, yyyy h:mm a'
						/>

						{selectedEvent && (
							<Button
								loading={loadingCancel}
								type='button'
								floated='left'
								color={selectedEvent.isCancelled ? 'green' : 'red'}
								content={
									selectedEvent.isCancelled
										? 'Reactivate event'
										: 'Cancel event'
								}
								onClick={() => setConfirmOpen(true)}
							/>
						)}
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type='submit'
							floated='right'
							positive
							content='Submit'
						/>
						<Button
							disabled={isSubmitting}
							as={Link}
							to='/events'
							type='submit'
							floated='right'
							content='Cancel'
						/>
					</Form>
				)}
			</Formik>
			<Confirm
				content={
					selectedEvent?.isCancelled
						? 'This will reactivate the event - are you sure?'
						: 'This will cancel the event - are you sure?'
				}
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={() => handleCancelToggle(selectedEvent)}
			/>
		</Segment>
	);
}

export default EventForm;
