import React from 'react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import EventForm from '../../features/events/eventForm/EventForm';
import Sandbox from '../../features/sandbox/Sandbox';

function App() {
	return (
		<>
			<Route exact path='/' component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<>
						<NavBar />
						<Container className='main'>
							<Route exact path='/events' component={EventDashboard} />
							<Route exact path='/sandbox' component={Sandbox} />
							<Route path='/events/:id' component={EventDetailedPage} />
							<Route
								path={['/createEvent', '/manage/:id']}
								component={EventForm}
							/>
						</Container>
					</>
				)}
			/>
		</>
	);
}

export default App;
