import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

function EventFilters({ predicate, setPredicate, loading }) {
	return (
		<>
			<Menu vertical size='large' style={{ width: '100%' }}>
				<Header icon='filter' attached color='teal' content='Filters' />
				<Menu.Item
					content='All Events'
					active={predicate.get('filter') === 'all'}
					onclick={() => setPredicate('filter', 'all')}
					disabled={loading}
				/>
				<Menu.Item
					content="I'm going"
					active={predicate.get('filter') === 'isGoing'}
					onclick={() => setPredicate('filter', 'isGoing')}
					disabled={loading}
				/>
				<Menu.Item
					content="I'm hosting"
					active={predicate.get('filter') === 'isHost'}
					onclick={() => setPredicate('filter', 'isHost')}
					disabled={loading}
				/>
			</Menu>
			<Header icon='calendar' attached color='teal' content='Select date' />
			<Calendar
				onChange={(date) => setPredicate('startDate', date)}
				value={predicate.get('startDate') || new Date()}
				tileDisabled={() => loading}
			/>
		</>
	);
}

export default EventFilters;
