import React from 'react';
import { useField } from 'formik';
import { FormField, Label, Select } from 'semantic-ui-react';

function MySelectInput({ label, ...props }) {
	const [field, meta, helpers] = useField(props);

	// NOTE: the meta.error data comes from Yup validationSchema
	// meta.error is going to either be an object or a string
	// the !! will cast a string or object to a boolean
	// if there's an error string, we want it to be true
	// if there's no error string, we want it to be false
	return (
		<FormField error={meta.touched && !!meta.error}>
			<label>{label}</label>
			<Select
				clearable
				value={field.value || null}
				onChange={(e, d) => helpers.setValue(d.value)}
				onBlur={() => helpers.setTouched(true)}
				{...props}
			/>
			{/* if the field been touched and there's an error, render the error label */}
			{meta.touched && meta.error ? (
				<Label basic color='red'>
					{meta.error}
				</Label>
			) : null}
		</FormField>
	);
}

export default MySelectInput;
