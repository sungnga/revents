import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { increment, decrement } from './testReducer';

function Sandbox() {
	// Create a dispatch function using useDispatch hook
	const dispatch = useDispatch();
	const data = useSelector((state) => state.data);

	// Here we can call our dispatch function and dispatch our action creator
	// The action creator function is looking for an amount
	return (
		<>
			<h1>Testing 123</h1>
			<h3>The data is: {data} </h3>
			<Button
				onClick={() => dispatch(increment(20))}
				content='Increment'
				color='green'
			/>
			<Button
				onClick={() => dispatch(decrement(10))}
				content='Decrement'
				color='red'
			/>
		</>
	);
}

export default Sandbox;
