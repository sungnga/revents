import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';
import { deleteFromFirebaseStorage } from '../../../app/firestore/firebaseService';
import {
	deletePhotoFromCollection,
	getUserPhotos,
	setMainPhoto
} from '../../../app/firestore/firestoreService';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { listenToUserPhotos } from '../profileActions';

function PhotosTab({ profile, isCurrentUser }) {
	const [editMode, setEditMode] = useState(false);
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.async);
	const { photos } = useSelector((state) => state.profile);
	const [updating, setUpdating] = useState({ isUpdating: false, target: null });
	const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

	// When the PhotosTab component loads, this hook runs
	// Get user photos from firestore photos collection
	// Store the photos in photos property in profileReducer
	useFirestoreCollection({
		query: () => getUserPhotos(profile.id),
		data: (photos) => dispatch(listenToUserPhotos(photos)),
		deps: [profile.id, dispatch]
	});

	async function handleSetMainPhoto(photo, target) {
		setUpdating({ isUpdating: true, target });
		try {
			await setMainPhoto(photo);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setUpdating({ isUpdating: false, target: null });
		}
	}

	async function handleDeletePhoto(photo, target) {
		setDeleting({ isDeleting: true, target });
		try {
			await deleteFromFirebaseStorage(photo.name);
			await deletePhotoFromCollection(photo.id);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setDeleting({ isDeleting: false, target: null });
		}
	}

	return (
		<Tab.Pane loading={loading}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' icon='user' content={`Photos`} />
					{isCurrentUser && (
						<Button
							onClick={() => setEditMode(!editMode)}
							floated='right'
							basic
							content={editMode ? 'Cancel' : 'Add Photo'}
						/>
					)}
				</Grid.Column>
				<Grid.Column width={16}>
					{editMode ? (
						<PhotoUploadWidget setEditMode={setEditMode} />
					) : (
						<Card.Group itemsPerRow={5}>
							{photos.map((photo) => (
								<Card key={photo.id}>
									<Image src={photo.url} />
									<Button.Group>
										{/* disable the Main button if the photo is already set to profile photo */}
										<Button
											name={photo.id}
											loading={
												updating.isUpdating && updating.target === photo.id
											}
											onClick={(e) => handleSetMainPhoto(photo, e.target.name)}
											disabled={photo.url === profile.photoURL}
											basic
											color='green'
											content='Main'
										/>
										{/* disable the delete button if the photo is the profile photo */}
										<Button
											loading={
												deleting.isDeleting && deleting.target === photo.id
											}
											disabled={photo.url === profile.photoURL}
											name={photo.id}
											onClick={(e) => handleDeletePhoto(photo, e.target.name)}
											basic
											color='red'
											icon='trash'
										/>
									</Button.Group>
								</Card>
							))}
						</Card.Group>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
}

export default PhotosTab;
