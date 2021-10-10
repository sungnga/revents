import React from 'react';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng
} from 'react-places-autocomplete';
import { useField } from 'formik';
import { FormField, Label, List, Segment } from 'semantic-ui-react';

function MyPlaceInput({ label, options, ...props }) {
	const [field, meta, helpers] = useField(props);

	function handleSelect(address) {
		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => helpers.setValue({ address, latLng }))
			.catch((error) => helpers.setError(error));
	}

	return (
		<PlacesAutocomplete
			// The city (field.value) object will have an address and latLng properties
			// The square bracket notation is accessing a property of an object
			value={field.value['address']}
			onChange={(value) => helpers.setValue({ address: value })}
			onSelect={(value) => handleSelect(value)}
			searchOptions={options}
		>
			{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
				<FormField error={meta.touched && !!meta.error}>
					<input {...getInputProps({ name: field.name, ...props })} />
					{/* if the field been touched and there's an error, render the error label */}
					{meta.touched && meta.error ? (
						<Label basic color='red'>
							{meta.error}
						</Label>
					) : null}
					{suggestions?.length > 0 && (
						<Segment
							loading={loading}
							style={{
								marginTop: 0,
								position: 'absolute',
								zIndex: 1000,
								width: '100%'
							}}
						>
							<List selection>
								{suggestions.map((suggestion, index) => (
									<List.Item
										key={index}
										{...getSuggestionItemProps(suggestion)}
									>
										<List.Header>
											{suggestion.formattedSuggestion.mainText}
										</List.Header>
										<List.Description>
											{suggestion.formattedSuggestion.secondaryText}
										</List.Description>
									</List.Item>
								))}
							</List>
						</Segment>
					)}
				</FormField>
			)}
		</PlacesAutocomplete>
	);
}

export default MyPlaceInput;
