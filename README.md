## NOTES AND STEPS TO BUILDING THIS PROJECT
The codebase for each step can be found in the commit link


## PROJECT SETUP

### [1. Create project using create-react-app]()
- Run in the command line:
  - `npx create-react-app revents --use-npm`
  - The `--use-npm` flag is to ensure that we're using the npm package manager
- Once the React app is successfully created, cd into the project directory: `cd revents`
- Then run: `npm start`. This starts up the development server
- Can view the revents application in the browser: `http://localhost:3000`

### [2. Add hot module replacement]()
- The hot module replacement prevents a full page reload when we make changes to our code. It incrementally updates the page as we update our code. This is a common thing to do
- In index.js file:
  ```js
  const rootEl = document.getElementById('root');

  function render() {
    ReactDOM.render(<App />, rootEl);
  }

  // If we make changes to our App component and module.hot is available,
  // update the page with the App component without doing a full page reload
  if (module.hot) {
    module.hot.accept('./App', function () {
      setTimeout(render);
    });
  }

  render();
  ```

### [3. Add folder structure to our project]()
- We want to add a little folder structure and rearrange files of our project and also clean up any files from create-react-app that we don't 
  - All the features we will build in this project will go inside the 'features' folder
  - All the common features and components that will be used across the application will go inside the 'app' folder

### [4. Install Semantic UI CSS + Semantic UI React libraries]()
- Docs: www.react.semantic-ui.com
- Install Semantic UI React and Semantic UI CSS libraries
  - Run to install both: `npm i semantic-ui-react semantic-ui-css`
- In index.js file:
  - Import the semantic min css just above the styles.css file: `import 'semantic-ui-css/semantic.min.css';`
- When using Semantic UI React library, we can import style components inside our components to add styles to our JSX. We add component attributes to specify the style we want from that style component. An example is in App.jsx file


## EVENT DASHBOARD PAGE LAYOUTS

### [1. Create a basic EventDashboard component]()
- This component renders two columns: a 10-column grid and a 6-column grid using Semantic Grid component
- In src/features/events/eventDashboard folder, create a component called EventDashboard.jsx
- NOTE: the file extension for a React component is `.jsx` instead of plain `.js` to denote that it contains JSX in it
- In EventDashboard.jsx file:
  - Import React: `import React from 'react';`
  - Import semantic Grid component: `import { Grid } from 'semantic-ui-react';`
  - Write an EventDashboard functional component
    - Render the Semantic UI Grid in JSX for now
    - Semantic UI uses a 16-column grid system
    ```javascript
    // Semantic UI uses a 16-col grid system
    export default function EventDashboard() {
      return (
        <Grid>
          <Grid.Column width={10}>
            <h2>Left Column</h2>
          </Grid.Column>
          <Grid.Column width={6}>
            <h2>Right Column</h2>
          </Grid.Column>
        </Grid>
      );
    }
    ```
- In src/app/layout folder, create a component called App.jsx
- In App.jsx file:
  - Import React: `import React from 'react';`
  - Import the EventDashboard component: `import EventDashboard from '../../features/events/eventDashboard/EventDashboard';`
  - Write an App functional component that renders other components to the page
  - Render the EventDashboard component inside JSX
  ```javascript
  export default function App() {
    return (
      <div>
        <h1>Re-vents</h1>
        <EventDashboard />
      </div>
    );
  }
  ```

### [2. Create a NavBar component, add styling]()
- All the assets (logo, images, etc.) we will use in this project can be found in public/assets folder
- Create a NavBar menu and add styles to it
- In features/nav folder, create a component called NavBar.jsx
- In NavBar.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic Button, Container, and Menu components: `import { Button, Container, Menu } from 'semantic-ui-react';`
  - Write a NavBar functional component that renders the navigation menu using Semantic UI components
  ```javascript
  import React from 'react';
  import { Button, Container, Menu } from 'semantic-ui-react';

  export default function NavBar() {
    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item header>
            <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
          </Menu.Item>
          <Menu.Item name='Events' />
          <Menu.Item>
            <Button positive inverted content='Create Event' />
          </Menu.Item>
          <Menu.Item position='right'>
            <Button basic inverted content='Login' />
            <Button
              basic
              inverted
              content='Register'
              style={{ marginLeft: '0.5em' }}
            />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
  ```
- In App.jsx file:
  - Import the NavBar component: `import NavBar from '../../features/nav/NavBar';`
  - Import Semantic Container: `import { Container } from 'semantic-ui-react';` 
  - Render the NavBar component just above the EventDashboard component. Also wrap the EventDashboard component in a container so we can apply styles to it
  ```javascript
  import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
  import NavBar from '../../features/nav/NavBar';
  import { Container } from 'semantic-ui-react';

  export default function App() {
    return (
      <>
        <NavBar />
        <Container className='main'>
          <EventDashboard />
        </Container>
      </>
    );
  }
  ```
- In src/app/layout folder, create a file called styles.css. This page will contain the project's css styles
- In styles.css file:
  - Apply background color styles to the NavBar menu
  - Apply styles for the main container so that there's a space between the navbar and the main content
  ```css
  body {
    background-color: #eaeaea;
  }

  .ui.fixed.menu {
    background-image: linear-gradient(
      135deg,
      rgb(24, 42, 115) 0%,
      rgb(33, 138, 174) 69%,
      rgb(32, 167, 172) 89%
    );
  }

  .ui.main.container {
    margin-top: 7em;
  }
  ```

### [3. Create event list items: EventList, EventListItem, and EventListAttendee components]()
- In the EventDashboard 10-column grid section, create and display the EventList component. The EventList component renders the EventListItem components. Each EventListItem component renders the title of the event, who is hosting the event, date, venue, description of the event, a button to view the event detail, and list of attendees (the EventListAttendee component)
- In features/events/eventDashboard folder, create a component called EventList.jsx
- In EventList.jsx file:
  - Import React: `import React from 'react';`
  - Import the EventListItem component: `import EventListItem from './EventListItem';`
  - Write an EventList functional component that renders the EventListItem component several times
  ```javascript
  export default function EventList() {
    return (
      <>
        <EventListItem />
        <EventListItem />
        <EventListItem />
        <EventListItem />
      </>
    );
  }
  ```
- In features/events/eventDashboard folder, create a component called EventListItem.jsx
- In EventListItem.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic components: `import { Button, Icon, Item, List, Segment } from 'semantic-ui-react';`
  - Import the EventListAttendee component: `import EventListAttendee from './EventListAttendee';`
  - Write an EventListItem functional component that renders the list item details using Semantic UI
    - Render several EventListAttendee components
  ```javascript
  export default function EventListItem() {
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src='/assets/user.png' />
              <Item.Content>
                <Item.Header content='Event Title' />
                <Item.Description>Hosted by Bob</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>

        <Segment>
          <span>
            <Icon name='clock' /> Date
            <Icon name='marker' />
            Venue
          </span>
        </Segment>

        <Segment secondary>
          <List horizontal>
            <EventListAttendee />
            <EventListAttendee />
            <EventListAttendee />
          </List>
        </Segment>

        <Segment clearing>
          <div>Description of event</div>
          <Button color='teal' floated='right' content='View' />
        </Segment>
      </Segment.Group>
    );
  }
  ```
- In features/events/eventDashboard folder, create a component called EventListAttendee.jsx
- In EventListAttendee.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic Image and List components: `import { Image, List } from 'semantic-ui-react';`
  - Write an EventListAttendee functional component that renders list items of users
  ```javascript
  export default function EventListAttendee() {
    return (
      <List.Item>
        <Image size='mini' circular src='/assets/user.png' />
      </List.Item>
    );
  }
  ```
- In the EventDashboard.jsx file:
  - Import the EventList component: `import EventList from './EventList';`
  - Render the EventList component inside the 10-column Grid component
  ```javascript
  <Grid.Column width={10}>
    <EventList />
  </Grid.Column>
  ```

### [4. Create an event form: EventForm component]()
- In features/events/eventForm folder, create a component called EventForm.jsx
- In EventForm.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic components: `import { Button, Form, Header, Segment } from 'semantic-ui-react';`
  - Write an EventForm functional component that renders a form using Semantic UI to create an event
    ```javascript
    export default function EventForm() {
      return (
        <Segment clearing>
          <Header content='Create new event' />
          <Form>
            <Form.Field>
              <input type='text' placeholder='Event Title' />
            </Form.Field>
            <Form.Field>
              <input type='text' placeholder='Category' />
            </Form.Field>
            <Form.Field>
              <input type='text' placeholder='Description' />
            </Form.Field>
            <Form.Field>
              <input type='text' placeholder='City' />
            </Form.Field>
            <Form.Field>
              <input type='text' placeholder='Venue' />
            </Form.Field>
            <Form.Field>
              <input type='date' placeholder='Date' />
            </Form.Field>
            <Button type='submit' floated='right' positive content='Submit' />
            <Button type='submit' floated='right' content='Cancel' />
          </Form>
        </Segment>
      );
    }
    ```
- In EventDashboard.jsx file:
  - Import the EventForm component: `import EventForm from '../eventForm/EventForm';`
  - Render the component inside the 6-column Grid component
  ```javascript
  <Grid.Column width={6}>
    <EventForm />
  </Grid.Column>
  ```

### [5. Passing props down to child components]()
- In src/app/api folder, there's a sampleData.js file which contains sample data of events that we can use display events information
- In EventDashboard.jsx file:
  - Import the sample data file: `import { sampleData } from '../../../app/api/sampleData';`
  - The EventDashboard component is a parent of the EventList component. Parent can pass properties/props down to child components
  - Pass the events props to the EventList child component and assign its value to sampleData
    - `<EventList events={sampleData} />`
- In EventList.jsx file:
  - To receive properties/props being passed down from the parent component, simply take `props` as an argument
    - `export default function EventList(props) { ... }`
  - Now the EventList component has assess to the events sample data by using the `props.events` notation
  - We can further destructure the events object from props
    - `export default function EventList({ events }) { ... }`
  - Loop over the events array using the .map() method and pass down the event item, as event props, to the EventListItem component
  ```javascript
  export default function EventList({ events }) {
    return (
      <>
        {events.map((event) => (
          <EventListItem event={event} key={event.id} />
        ))}
      </>
    );
  }
  ```
- In EventListItem.jsx file:
  - Receive the event props as an argument from EventList parent component and destructure it
    - `export default function EventListItem({ event }) { ... }`
  - Now we can update the event generic detail information with the event properties, which have the sample data
  - To display the list of attendees, loop through the event.attendees array using the .map() method and pass down the attendee item, as attendee props, to the EventListAttendee child component
  ```javascript
  export default function EventListItem({ event }) {
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header content={event.title} />
                <Item.Description>Hosted by {event.hostedBy}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>

        <Segment>
          <span>
            <Icon name='clock' /> {event.date}
            <Icon name='marker' />
            {event.venue.address}
          </span>
        </Segment>

        <Segment secondary>
          <List horizontal>
            {event.attendees.map((attendee) => (
              <EventListAttendee attendee={attendee} key={attendee.id} />
            ))}
          </List>
        </Segment>

        <Segment clearing>
          <div>{event.description}</div>
          <Button color='teal' floated='right' content='View' />
        </Segment>
      </Segment.Group>
    );
  }
  ```
- In EventListAttendee.jsx file:
  - Receive the attendee props as an argument from EventListItem parent component and destructure it
    - `export default function EventListAttendee({ attendee }) { ... }`
  - Replace the image source with `attendee.photoURL`
  ```javascript
  export default function EventListAttendee({ attendee }) {
    return (
      <List.Item>
        <Image size='mini' circular src={attendee.photoURL} />
      </List.Item>
    );
  }
  ```

### [6. React component state: using React useState hook]()
- We can make use of React's useState hook to keep track of the state of component. For example, we want to keep track of the state whether the EventForm component is displayed or not. And we can toggle this state in various places within our application. We can use useState hook to keep track of the list of events (when we add or delete events)
- In EventDashboard.jsx file:
  - Import react useState hook: `import React, { useState } from 'react';`
  - Create an `events` state and initialize its value to sampleData. Now the `events` state holds the data sample coming from the dataSample.js file
    - `const [events, setEvents] = useState(sampleData);`
  - For the events props that we pass down to the EventList child component, we can assign its value to events state
    - `<EventList events={events} />`
- Now let's work on showing and hiding the EventForm based on the state. When the "Create Event" button in the NavBar is clicked, we want to display the EventForm. When the "Cancel" button in the EventForm is clicked, we want to hide the EventForm
- In App.jsx file:
  - Import react useState hook: `import React, { useState } from 'react';`
  - Create a formOpen state and initialize it to false
    - `const [formOpen, setFormOpen] = useState(false);`
  - Pass the setFormOpen method down as props to the NavBar child component. The NavBar component will consume this method, setting the state to true, when the 'Create Event' button is clicked. This will trigger the EventForm component to display in the EventDashboard component
    - `<NavBar setFormOpen={setFormOpen} />`
  - Pass the formOpen state and setFormOpen method down as props to the EventDashboard component
    - `<EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />` 
  ```javascript
  export default function App() {
    const [formOpen, setFormOpen] = useState(false);

    return (
      <>
        <NavBar setFormOpen={setFormOpen} />
        <Container className='main'>
          <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
        </Container>
      </>
    );
  }
  ```
- In the NavBar.jsx file:
  - Receive the setFormOpen props as an argument from App parent component and destructure it
    - `export default function NavBar({ setFormOpen }) { ... }`
  - In the 'Create Event' button element
    - Add an onClick event that will execute the setFormOpen method when the button is clicked
    - Execute the setFormOpen method inside an arrow/anonymous function and pass in true as an argument
    - We execute the setFormOpen method inside an arrow function because we want to call setFormOpen() only when the button is clicked. We don't want to execute setFormOpn() when the NavBar component loads
    - `<Button onClick={() => setFormOpen(true)} positive inverted content='Create Event' />`
- In EventDashboard.jsx file:
  - Receive the formOpen and setFormOpen props as an argument from App parent component and destructure them
    - `export default function EventDashboard({ formOpen, setFormOpen }) { ... }`
  - Pass the setFormOpen method down as props to the EventForm child component. The EventForm component will consume this method, setting the state to false, when the 'Cancel' button is clicked
  - We can show or hide the event form based on the state
    - `{formOpen && <EventForm setFormOpen={setFormOpen} />}`
    - Whatever is on the left of && is true, do whatever is on the right of &&
    - Only display the EventForm component if formOpen state is true
    - This means that when the when the 'Create Event' in the NavBar is clicked, formOpen state is true and EventForm will display
    - When the 'Cancel' button in the EventForm component is clicked, formOpen state is false and EventForm will not display
  ```javascript
  export default function EventDashboard({ formOpen, setFormOpen }) {
    const [events, setEvents] = useState(sampleData);

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          {formOpen && <EventForm setFormOpen={setFormOpen} />}
        </Grid.Column>
      </Grid>
    );
  }
  ```
- In the EventForm.jsx file:
  - Receive the setFormOpen props as an argument from EventDashboard parent component and destructure it
    - `export default function EventForm({ setFormOpen }) { ... }`
  - In the 'Cancel' button element
    - Add an onClick event handler and execute the setFormOpen() method inside an arrow function and set it to false
    ```javascript
    <Button
      onClick={() => setFormOpen(false)}
      type='submit'
      floated='right'
      content='Cancel'
    />
    ```

## CRUD OPERATIONS IN REACT
- Uncontrolled Forms (legacy)
  - Use 'refs' to access the element
  - Give input a ref value
  - Access the field using ref.name.value
  - React has no awareness of the value
- Controlled Components
  - No direct access to the DOM
  - So no access to Input
  - Only concerned with altering State
  - Rely on React to manipulate the DOM via the Virtual DOM

### [1. Basic forms in React: EventForm]()
- Enable the EventForm component to receive input values from the user/EventForm and update the values state with the input values
- In EventDashboard.jsx file:
  - Since we're going to be updating events, we're going to be updating them in events state. So we want to pass down the setEvents method as props to the EventForm child component 
    - `<EventForm setFormOpen={setFormOpen} setEvents={setEvents} />`
- In EventForm.jsx file:
  - Receive the setEvents props as an argument from EventDashboard parent component and destructure it
    - `export default function EventForm({ setEvents }) { ... }`
  - Create an initialValues object with initial empty-value properties
    ```javascript
    const initialValues = {
      title: '',
      category: '',
      description: '',
      city: '',
      venue: '',
      date: ''
    };
    ```
  - Create a values state and initialize its value to the initialValues object. Note that this values state is an object
    - `const [values, setValues] = useState(initialValues);`
  - In the Form element, the handleFormSubmit method is executed when the onSubmit event is triggered. Meaning, when the Submit button is clicked
    - `<Form onSubmit={handleFormSubmit}>`
  - For each Form input element, the handleInputChange method is executed when the input value changes via the onChange event being triggered
    - add name, value, and onChange properties to each form input element
    ```javascript
    <Form.Field>
      <input
        type='text'
        placeholder='Event Title'
        name='title'
        value={values.title}
        onChange={(e) => handleInputChange(e)}
      />
    </Form.Field>
    ```
  - Write a handleInputChange method that updates the values state with the input values
    - It takes the input event as argument
    - Each input element has name and value properties, so we can destructure those from e.target
    - Update the values state with the input values based on its name and value properties
    ```javascript
    function handleInputChange(e) {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    }
    ```
  - Write a handleFormSubmit method that creates an event
    - Console log the values state for now
    ```javascript
    function handleFormSubmit() {
      console.log(values);
    }
    ```

### [2. Creating an event, cuid library]()
- We create a new event by updating the events state with the new event. Do this by creating a method and pass in the values state which comes from the form input values
- In EventDashboard.jsx file:
  - Write a handleCreateEvent method that adds a new event received to the events state using the setEvents() method
    - It takes event as an argument
    - Note that the events state is an array. So when we call the setEvents(), we add the new event to an array
    ```javascript
    function handleCreateEvent(event) {
      setEvents([...events, event]);
    }
    ```
  - Then pass down this handleCreateEvent method as createEvent props to the EventForm child component
    - `<EventForm createEvent={handleCreateEvent} />`
- In EventForm.jsx file:
  - Receive the createEvent props as an argument from EventDashboard parent component and destructure it
    - `export default function EventForm({ createEvent }) { ... }`
  - In the handleFormSubmit() method
    - Execute the createEvent method and pass in the values state as argument
    ```javascript
    function handleFormSubmit() {
      createEvent(values);
    }
    ```
- Now, when we hit form submit to create a new event, we will run into 2 errors
  - First is, we don't have a unique event id. In the EventList component, when we're mapping over the events array, it's expecting to find an event.id for each event
  - Second is, our values object state does not have an attendees property. Since the attendees array is not defined and the .map() method is called on it, we get an error
  - Solution: need to provide the event an id and an array of attendees
- Install a cuid package, a unique identifier: `npm install cuid`
- In EventForm.jsx file:
  - Import the cuid: `import cuid from 'cuid';`
  - In the handleFormSubmit() method:
    - What we provide to the createEvent() method is the existing `values` state object, plus an id property with the cuid value
      - Also add a hostedBy property. Set a default string value for now
      - Also add an attendees property. Set it to an empty array for now
      - Also add a hostPhotoURL property. Set it to a static image for now
    - Lastly, once the form has been submitted to create an event, we want to close the form. Do this by calling the setFormOpen() method and set it to false 
    ```javascript
    function handleFormSubmit() {
      createEvent({
        ...values,
        id: cuid(),
        hostedBy: 'Bob',
        attendees: [],
        hostPhotoURL: '/assets/user.png'
      });
      setFormOpen(false);
    }
    ```

### [3. Selecting an event to read]()
- When we click on the 'View' button on an event, it opens up the event form and populates the values from the event inside the form as well. We need to create a selectedEvent state to store the selected event values. And depending on the condition of this state, we can either show an empty form or a form with the values from the event
- In App.jsx file:
  - Create a selectedEvent state and give its initial value of null
    - `const [selectedEvents, setSelectedEvent] = useState(null);`
  - Write a handleSelectEvent method that sets the selectedEvent state to the event and opens the EventForm
    - It takes event as an argument
  - Write a handleCreateFormOpen method that sets the selectedEvent to null and opens the EventForm
    - It doesn't take any arguments
  - Pass down the handleCreateFormOpen method as setFormOpen props to the NavBar child component
  - For the EventDashboard child component, we pass down the handleSelectEvent method and the selectedEvent state as props
  ```javascript
  export default function App() {
    const [formOpen, setFormOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    function handleSelectEvent(event) {
      setSelectedEvent(event);
      setFormOpen(true);
    }

    function handleCreateFormOpen() {
      setSelectedEvent(null);
      setFormOpen(true);
    }

    return (
      <>
        <NavBar setFormOpen={handleCreateFormOpen} />
        <Container className='main'>
          <EventDashboard
            formOpen={formOpen}
            setFormOpen={setFormOpen}
            selectEvent={handleSelectEvent}
            selectedEvent={selectedEvent}
          />
        </Container>
      </>
    );
  }
  ```
- In EventDashboard.jsx file:
  - Receive the selectEvent and selectedEvent props as an argument from App parent component and destructure them
    - `export default function EventDashboard({ selectEvent, selectedEvent }) {...}`
  - Pass down the selectEvent method as selectEvent props to the EventList child component
    - `<EventList events={events} selectEvent={selectEvent} />`
  - Pass down the selectedEvent state as selectedEvent props to the EventForm child component. This way we can see the selected form
    - `<EventForm selectedEvent={selectedEvent} />`
- In EventList.jsx file:
  - Receive the selectEvent props as an argument from EventDashboard parent component and destructure it
    - `export default function EventList({ events, selectEvent }) {...}`
  - Pass down this props as selectEvent props to the EventListItem child component
    - `<EventListItem event={event} key={event.id} selectEvent={selectEvent} />`
- In EventListItem.jsx file:
  - Receive the selectEvent props as an argument from EventList parent component and destructure it
    - `export default function EventListItem({ event, selectEvent }) {...}`
  - In the 'View' Button element:
    - Add an onClick event property that executes the selectEvent() method when the 'View' button is clicked
    - Call the selectEvent() method inside an arrow function and pass in the event as argument
    ```javascript
    <Button
      onClick={() => selectEvent(event)}
      color='teal'
      floated='right'
      content='View'
    />
    ```
- In EventForm.jsx file:
  - Receive the selectedEvent props as an argument from EventDashboard parent component and destructure it
    - `export default function EventForm({ selectedEvent }) {...}`
  - We're going to use the `?? null conditional operator` to check if the selectedEvent state is null
    - If selectedEvent state is null, then we pass anything to the right of ??. This means that the initialValues is set to the empty-string object
    - If selectedEvent state is NOT null, then the initialValues is set to the selectedEvent state values
    - Remember that when the 'View' button is clicked (in EventListItem component), the setSelectedEvent() method is called (in App.jsx component) to set the event values to the selectedEvent state
    ```javascript
    // ?? is the null conditional operator
    // The ?? means that if selectedEvent is null, the initialValues is set to whatever is on the right of the ??
    // If selectedEvent is NOT null, set the initialValues to the values of selectedEvent
    const initialValues = selectedEvent ?? {
      title: '',
      category: '',
      description: '',
      city: '',
      venue: '',
      date: ''
    };
    ```

### [4. Controlled components with a key: EventForm]()
- The current problem we have is that when we click on the 'View' button to view a different event or click on the 'Create Event' button to create a new event, nothing causes the page to re-render so nothing happens. Behind the scene, however, the EventForm component does have the correct information in props when one of those buttons are clicked
- When we send new props to a component, it does not cause the component to be re-rendered. The work-around solution is to use the special React attribute called `key`. We can add a `key` property to a component. So when the key changes, the component will be recreated with a freshly initialized state
- So we're going to give our EventForm component a key
- In EventDashboard.jsx file:
  - For the EventForm child component, add a key property
  - For the key value, we first check to see if we have a selected event in selectedEvent state, if selectedEvent is not null
    - If it's not null, set the key value to selectedEvent.id
    - If it's null, then set the key to be null itself
  - `<EventForm key={selectedEvent ? selectedEvent.id : null} />`
- Lastly, if the selected event form is opened, we want the form title to say 'Edit the event'. If it's a new event form, the form title should say 'Create new event'
- In EventForm.jsx file:
  - In the Header element, add a conditional to display one or the other
  - `<Header content={selectedEvent ? 'Edit the event' : 'Create new event'} />`

### [5. Updating an event]()
- We can update an event in the events state by check the updatedEvent id with the event id in the events state. If it matches, we can update the event with the new values. Write a method to handle the update event
- In EventDashboard.jsx file:
  - Write a handleUpdateEvent method that updates an event in the events state based on the event id. Also sets the selectedEvent back to null and closes the form
    - This method takes an updatedEvent as argument
    - Use the setEvents() method to set the events state with the updated event, if the updatedEvent id matches with the event id in the events state
    - Use the selectEvent() method to set the selectedEvent state back to null
    ```javascript
    function handleUpdateEvent(updatedEvent) {
      setEvents(
        events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
      );
      selectEvent(null);
    }
    ```
  - Pass down this handleUpdateEvent method as updateEvent props to the EventForm child component
    - `<EventForm updateEvent={handleUpdateEvent} />`
- In EventForm.jsx file:
  - Receive the updateEvent props as an argument from EventDashboard parent component and destructure it
    - `export default function EventForm({ updateEvent }) {...}`
  - In the handleFormSubmit() method:
    - Use a ternary operator to check if selectedEvent state is not null
    - If it's not null, call the updateEvent() method. What we give to the method is the all the current values in selectedEvent state, plus the updated values that's replacing the values in selectedEvent state. The spread operator of `selectedEvent` ensures that we keep the existing properties if its value isn't updated. And the spread operator of `values` will replace the existing values of properties that are updated
    - If it's null, then call the createEvent() method. If we're not updating an event, then we know that we're creating an event
    ```javascript
    function handleFormSubmit() {
      selectedEvent
        ? updateEvent({ ...selectedEvent, ...values })
        : createEvent({
            ...values,
            id: cuid(),
            hostedBy: 'Bob',
            attendees: [],
            hostPhotoURL: '/assets/user.png'
          });
      setFormOpen(false);
    }
    ```

### [6. Deleting an event]()
- In EventDashboard.jsx file:
  - Write a handleDeleteEvent method removes an event from the events state based on its id
    - This method takes an eventId as argument
    - Call the setEvents() method to update the events state
    - Use the .filter() method on events to filter out all the events that does not match the eventId, hence removes the event that matches
    ```javascript
    function handleDeleteEvent(eventId) {
      setEvents(events.filter((evt) => evt.id !== eventId));
    }
    ```
  - Pass down this handleDeleteEvent method as deleteEvent props to the EventList child component
    - `<EventList deleteEvent={handleDeleteEvent} />`
- In EventList.jsx file:
  - Receive the deleteEvent props as an argument from EventDashboard parent component and destructure it
    - `export default function EventList({ deleteEvent }) {...}`
  - Pass down this DeleteEvent method as deleteEvent props to the EventListItem child component
    - `<EventListItem deleteEvent={deleteEvent} />`
- In EventListItem.jsx file:
  - Receive the deleteEvent props as an argument from EventList parent component and destructure it
    - `export default function EventListItem({ deleteEvent }) {...}`  
  - In the render section
    - Create a 'Delete' Button element
    - In the Delete Button element, add an onClick event listener that executes the deleteEvent() method when the 'Delete' button is clicked
    - Call the deleteEvent() method inside an arrow function and pass in the event.id
    ```javascript
    <Button
      onClick={() => deleteEvent(event.id)}
      color='red'
      floated='right'
      content='Delete'
    />
    ```


## ROUTING IN REACT

### Intro to react-router
- Routing
  - SPAs (single page applications) need routers
  - We only have one page (index.html). We don't have the ability to change the page that the user is on
  - We need the facility to redirect users to component rather than to another html page. More complex applications need React Router
- React Router is broken into 3 packages:
  - react-router
  - react-router-dom
  - react-router-native (mobile version)
- React-router-dom and react-router-native re-export all of react-router. React-router contains all of the main functionality. So we only need to install react-router-dom and we get all of the react-router functionality
- The Router
  - `<BrowserRouter>` component
    - We surround our App component in the BrowserRouter component. This will give our App component a routing capability
    - It handles dynamic requests
  - `<HashRouter>`
    - Useful for static websites
  - Can only have a single child component
  - Surround our `<App />` component to work with this limitation
- History
  - The history object is part of the browser. Every browser has a history object
  - The way the routing system works is it uses a history object which:
    - Keeps track of the current location
    - Re-renders whenever that changes and displays whatever components we are routing to
  - The history object comes with a number of methods
    - What we typically do is use the push() method to push a new route into history and this will cause the component to re-render and display what it is we're routing to on the page
  
**Install react-router-dom**
  - Install: `npm i react-router-dom`

### [1. Adding HomePage and EventDetailedPage components]()
- In our Revents application, we will use react-router to direct users to these pages:
  - Home page
  - Event dashboard page
  - Event detailed page
  - Event form page
- In features folder, create a new folder called home. In home folder, create a component/file called HomePage.jsx
- In HomePage.jsx file:
  - Import React: `import React from 'react';`
  - Write a HomePage functional component that renders a 'Homepage' text for now
- In features/events folder, create a new folder called eventDetailed. In eventDetailed folder, create a component/file called EventDetailedPage.jsx
- In EventDetailedPage.jsx file:
  - Import React: `import React from 'react';`
  - Write a EventDetailedPage functional component that render a 'Event Detailed Page' text for now

### [2. Routing configuration]()
- Website: https://reactrouter.com/web/guides/quick-start
- In index.js file:
  - Import BrowserRouter component: `import { BrowserRouter } from 'react-router-dom';`
  - Wrap the App component inside the BrowserRouter component
  - This will give our App component a routing capability
  ```javascript
  function render() {
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      rootEl
    );
  }
  ```
- So now our App component has routing capability. We can setup the routes inside there
- In App.jsx file:
  - Import the Route component: `import { Route } from 'react-router-dom';`
  - Create routes using the Route component for HomePage, EventDashboard, EventDetailedPage, and EventForm components. Each route has a unique path
  ```javascript
  <Container className='main'>
    <Route path='/' exact component={HomePage} />
    <Route path='/events' exact component={EventDashboard} />
    <Route path='/events/:id' exact component={EventDetailedPage} />
    <Route path='/createEvent' exact component={EventForm} />
  </Container>
  ```

### [3. Using NavLinks and Links]()
- `NavLink` and `Link` are two components provided by react-router-dom that we can use to redirect users to a different page
- `<NavLink>` is a special version of the `<Link>` that will add styling attribute to the rendered element when it matches the current URL. It adds an activeClass and applies styles to a link
- In NavBar.jsx file:
  - Import the NavLink component: `import { NavLink } from 'react-router-dom';`
  - For Semantic UI components, we can use an 'as' property and give its value the name of another component that we want the Semantic component to act as
  - In our case, we want the Semantic `<Menu.Item>` to act as a `<NavLink>` component. Then we can pass in properties that the `<NavLink>` is expecting, such as the 'to' property pathname and 'exact'
  - Note that we no longer use the onClick event for the 'Create Event' button to direct user to the EventForm. We can use the NavLink instead
  ```javascript
  <Menu.Item as={NavLink} exact to='/' header>
    <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
    Re-vents
  </Menu.Item>
  <Menu.Item as={NavLink} to='/events' name='Events' />
  <Menu.Item as={NavLink} to='/createEvent'>
    <Button positive inverted content='Create Event' />
  </Menu.Item>
  ```

### [4. Styling the HomePage]()
- We don't want the NavBar to show when we're on home page. We want something that takes up the entire screen and provide a button that takes us to the events page
- In HomePage.jsx file:
  - Add content and styles to the page using Semantic UI
  ```javascript
  export default function HomePage() {
    return (
      <Segment inverted textAlign='center' vertical className='masthead'>
        <Container>
          <Header as='h1' inverted>
            <Image
              size='massive'
              src='/assets/logo.png'
              style={{ marginBottom: 12 }}
            />
            Re-vents
          </Header>
          <Button size='huge' inverted>
            Get started
            <Icon name='right arrow' inverted />
          </Button>
        </Container>
      </Segment>
    );
  }
  ```
- In styles.css file:
  - Add styles to the home page
  ```css
  .masthead {
    display: flex;
    align-items: center;
    background-image: linear-gradient(
      135deg,
      rgb(24, 42, 115) 0%,
      rgb(33, 138, 174) 69%,
      rgb(32, 167, 172) 89%
    ) !important;
    height: 100vh;
  }

  .masthead h1.ui.header {
    font-size: 4em;
  }
  ```
- In App.jsx file:
  - For the HomePage to appear outside of the NavBar and Container components, we need create another route that renders the NavBar and Container separately from the HomePage
  - This new route takes a path with an expression that says, anything after the / forward slash plus something else, render it differently
  - This new route also takes a render property rather an a component property. This render property takes a function. And inside this function, we can render the NavBar and the Container components. Wrap it inside a fragment tag because it only allows one child component
  ```js
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar setFormOpen={handleCreateFormOpen} />
            <Container className='main'>
              <Route exact path='/events' component={EventDashboard} />
              <Route path='/events/:id' component={EventDetailedPage} />
              <Route path='/createEvent' component={EventForm} />
            </Container>
          </>
        )}
      />
    </>
  );
  ```
- Since the HomePage component is inside a `<Route />` component, we have access to the routing properties. This is props being passed down to the HomePage component. One of these props is the history object. We can use the history.push() method to push another route onto the history object and push the user to that particular route
- In HomePage.jsx file:
  - Receive the history object props as an argument and destructure it
    - `export default function HomePage({ history }) {...}`
  - In the 'Get started' Button element:
    - Add an onClick event handler and execute the `history.push()` method to direct user to a different route when the button is clicked
    - Call the history.push() method inside an arrow function and pass in the pathname as the argument
    ```javascript
    <Button onClick={() => history.push('/events')} size='huge' inverted>
      Get started
      <Icon name='right arrow' inverted />
    </Button>
    ```

### [5. Adding menus for authenticated and unauthenticated users]()
- We're not going to implement any user authentication at this point. We're just going to give the user the ability to fake a login or not login for now
- In features/nav folder, create components/files called SignedInMenu.jsx and SignedOutMenu.jsx
- In SignedOutMenu.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic components: `import { Button, Menu } from 'semantic-ui-react';`
  - Write a SignedOutMenu functional component that renders the 'Login' and 'Register' buttons
    - Cut and paste the 'Login' and 'Register' Button elements from NavBar.jsx file
    ```javascript
    export default function SignedOutMenu() {
      return (
        <Menu.Item position='right'>
          <Button basic inverted content='Login' />
          <Button
            basic
            inverted
            content='Register'
            style={{ marginLeft: '0.5em' }}
          />
        </Menu.Item>
      );
    }
    ```
- In SignedInMenu.jsx file:
  - Import React: `import React from 'react';`
  - Import Link component: `import { Link } from 'react-router-dom';`
  - Import Semantic components: `import { Dropdown, Image, Menu } from 'semantic-ui-react';`
  - Write a SignedInMenu functional component that renders a user already signed in dropdown menu. Usee Semantic UI
    ```javascript
    export default function SignedInMenu() {
      return (
        <Menu.Item position='right'>
          <Image avatar spaced='right' src="/assets/user.png" />
          <Dropdown pointing='top left' text='Bob'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
              <Dropdown.Item text='My profile' icon='user' />
              <Dropdown.Item text='Sign out' icon='power' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      );
    }
    ```
- In NavBar.jsx file:
  - Import the SignedOutMenu component: `import SignedOutMenu from './SignedOutMenu';`
  - Import the SignedInMenu component: `import SignedInMenu from './SignedInMenu';`
  - Call the SignedOutMenu component in the render section: `<SignedOutMenu />`
  - Call the SignedInMenu component in the render section: `<SignedInMenu />`

### [6. Adding fake authentication]()
- For now, we'll use local states in our NavBar component to check if a user is authenticated or not. If the user is authenticated, they get to see the 'Create Event' button and the SignedInMenu appears. If not authenticated, they won't see the 'Create Event' button and the SignedOutMenu appears
- In NavBar.jsx file:
  - Create an authenticated state and set it to false as its initial value state
    - `const [authenticated, setAuthenticated] = useState(false);`
  - In the render section:
    - Write a ternary operator to check if a user is authenticated
      - If authenticated, show the `<SignedInMenu />` component
      - If not authenticated, show the `<SignedOutMenu />` component
      - `{authenticated ? <SignedInMenu /> : <SignedOutMenu />}`
    - Use the && operator to show the 'Create Event' Button/Link only if the user is authenticated
      ```javascript
      {authenticated && (
        <Menu.Item as={NavLink} to='/createEvent'>
          <Button positive inverted content='Create Event' />
        </Menu.Item>
      )}
      ```
  - Pass down the setAuthenticated method as setAuthenticated props to both SignedInMenu and SignedOutMenu components
    - `<SignedInMenu setAuthenticated={setAuthenticated} />`
    - `<SignedOutMenu setAuthenticated={setAuthenticated} />`
- In the SignedOutMenu.jsx file:
  - Receive the setAuthenticated props from the NavBar parent component and destructure it
  - In the 'Login' Button element:
    - Add an onClick event property and execute the setAuthenticated() method and set it to true
    - When the 'Login' button is clicked, the 'Create Event' button appears on the NavBar and switch to the SignedInMenu
    - `<Button onClick={() => setAuthenticated(true)} />`
- In the SignedInMenu.jsx file:
  - Receive the setAuthenticated props from the NavBar parent component and destructure it
  - In the 'Sign out' Dropdown.Item:
    - Add an onClick event property and execute the setAuthenticated() method and set it to false
    - So when the 'Sign out' dropdown is clicked, the 'Create Event' button will not show on the NavBar and switch to the SignedOutMenu
    - `<Dropdown.Item onClick={() => setAuthenticated(false)} text='Sign out' icon='power' />`

### [7. Using the useHistory hook]()
- Since the NavBar component is not in a Route component, it doesn't have access to the browser's history object. So we can't use the history.push() method to push the user to a new route. React-router comes with a useHistory hook that we can utilize instead
- When the authenticated user clicks the 'Sign out' button, it'll direct them to the homepage
- In NavBar.jsx file:
  - Import useHistory hook: `import { useHistory } from 'react-router-dom';`
  - Create a new `history` object by using the useHistory() hook
    - `const history = useHistory();`
  - And now we have access to the browser's `history` object, just like a routed component does
  - Write a handleSignOut method that logs out the user
    - This method sets the authenticated state to false using the setAuthenticated() method
    - And push the user to home page using the history.push() method
    ```javascript
    function handleSignOut() {
      setAuthenticated(false);
      history.push('/');
    }
    ```
  - Pass down this handleSignOut method as signOut props to the SignedInMenu child component
    - `<SignedInMenu signOut={handleSignOut} />`
- In SignedInMenu.jsx file:
  - Receive the signOut method props from the NavBar parent component and destructure it
  - In the 'Sign out' DropDown.Item, call the signOut method on the onClick event handler. We don't need to use the setAuthenticated() method anymore
  - `<Dropdown.Item onClick={signOut} text='Sign out' icon='power' />`

### [8. EventDetailedPage structure: creating smaller components]()
- The Event Detailed Page is significant and will have many features and functionalities. We'll break these into smaller components and render them onto the EventDetailedPage component
- In the features/events/eventDetailed folder, create the following components/files:
  - EventDetailedHeader.jsx
  - EventDetailedInfo.jsx
  - EventDetailedChat.jsx
  - EventDetailedSidebar.jsx
- Write a simple functional component for each of the above and render a simple title text
- In EventDetailedPage.jsx file:
  - Import Semantic Grid component: `import { Grid } from 'semantic-ui-react';`
  - Create the page layout using the Semantic UI Grid and place in the above components
  ```javascript
  export default function EventDetailedPage() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader />
          <EventDetailedInfo />
          <EventDetailedChat />
        </Grid.Column>

        <Grid.Column width={6}>
          <EventDetailedSidebar />
        </Grid.Column>
      </Grid>
    );
  }
  ```
- Now in the EventListItem component, when a user clicks on the 'View' event button, we can direct them to the EventDetailedPage of that event using the Link component
- In EventListItem.jsx file:
  - Import the Link component: `import { Link } from 'react-router-dom';`
  - Use the 'as' property to make the Button element act as a Link component
  - Use the 'to' property to set the pathname of the link
  ```javascript
  <Button
    as={Link}
    to={`/events/${event.id}`}
    color='teal'
    floated='right'
    content='View'
  />
  ```

### [9. Adding EventDetailedPage content]()
- Add content and styles to the following components:
  - EventDetailedHeader.jsx
  - EventDetailedInfo.jsx
  - EventDetailedChat.jsx
  - EventDetailedSidebar.jsx

### [10. Cleaning up the unused code]()
- Cleaning up our code up to this point
- Add a Link component to the 'Manage Event' button in EventDetailedHeader.jsx component, redirecting to manage event page
- Add a Link component to the 'Cancel' button in EventForm.jsx component, redirecting to events page
- We won't have the Create Event form on the right-hand column of the EventDashboard page anymore. When we click on the 'View' button of an event in the events page, it redirect to the EventDetailedPage instead


## REDUX

NOTE: Setting up and configure a Redux store is in the Redux Concepts section
### [1. Setting up Redux store]()
- **Install Redux and React-Redux:**
  - Install: `npm i redux react-redux`
- **Configure the store:**
  - In app folder, create a folder called store. In store folder, create a file called configureStore.js
  - In app/store/configureStore.js file:
    - Import createStore function from Redux: `import { createStore } from 'redux';`
    - Write a configureStore function that returns a store using the createStore() method
      - The createStore() method takes a reducer as an argument
      ```javascript
      import { createStore } from 'redux';

      export function configureStore() {
        return createStore();
      }
      ```
  - So when we initialize our store, we're going to tell about our reducer and our store is going to have some initialState
- **Connecting the React app to the Redux store:**
  - Now we what need to do is tell our React application about our new Redux store and to do that we use the React-Redux library
  - In the main index.js file:
    - Import the Provider from React-Redux: `import { Provider } from 'react-redux';`
    - Wrap the Provider around the App component, including the BrowserRouter
    - Then create a store by calling the configureStore() method that we wrote earlier
    - Pass in this store to the Provider
    - Now our React app is connect to the Redux store
    ```javascript
    import { Provider } from 'react-redux';
    import { configureStore } from './app/store/configureStore';

    const store = configureStore();

    function render() {
      ReactDOM.render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>,
        rootEl
      );
    }
    ```

### [2. Creating the event reducer]()
- In features/events folder, create eventActions.js, eventConstants.js, and eventReducer.js files
- In eventConstants.js file:
  - Create constants for create event, update event, and delete event
    ```javascript
    export const CREATE_EVENT = 'CREATE_EVENT';
    export const DELETE_EVENT = 'DELETE_EVENT';
    export const UPDATE_EVENT = 'UPDATE_EVENT';
    ```
- In eventActions.js file:
  - Import the action constants: `import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from './eventConstants';`
  - Write a createEvent action creator function that takes an event as an argument and returns the create action object
    ```javascript
    export function createEvent(event) {
      return {
        type: CREATE_EVENT,
        payload: event
      };
    }
    ```
  - Write an updateEvent action creator function that takes an event as an argument and returns the update action object
    ```javascript
    export function updateEvent(event) {
      return {
        type: UPDATE_EVENT,
        payload: event
      };
    }
    ```
  - Write a deleteEvent action creator function that takes an eventId as an argument and returns the delete action object
    ```javascript
    export function deleteEvent(eventId) {
      return {
        type: DELETE_EVENT,
        payload: eventId
      };
    }
    ```
- In eventReducer.js file:
  - Import the sample data: `import { sampleData } from '../../app/api/sampleData';`
  - Import the action constants: `import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from './eventConstants';`
  - Create an initial state. This initialState is an object. Initialize the value of the events state property to the sampleData for now
    ```javascript
    import { sampleData } from '../../app/api/sampleData';

    const initialState = {
      events: sampleData
    };
    ```
  - Write an eventReducer function that updates the store state based on the given actions
    - 1st arg is the state. Assign its default value to the initialState
    - 2nd arg is the action. Destructure the type and payload properties from the action object
    - Note that the state is an object. events is a state property and it's an array of objects. Each item in the array is an event
    - Use switch statement to find the type of action, update the store state based on the action type, and return the updated state
    - Now, when updating the store state, we never want to mutate the state itself. Rather, we can use the spread operator(`...`) to create a new object or new array of the state and update that state instead
    - In this case, we return a state object and spread in the initial state using the spread operator(`return { ...state, }`). Then specify the state property we want to update, which in this case, the events state property. Note that the events state is an array of objects. So to update the events state, we use an array to spread in the initial events state followed by the thing we want to update(`events: [...state.events, payload]`)
    - The last case in the switch statement is the default case, which returns the current state
    ```javascript
    import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from './eventConstants';

    export default function eventReducer(state = initialState, { type, payload }) {
      switch (type) {
        case CREATE_EVENT:
          return {
            ...state,
            events: [...state.events, payload]
          };
        case UPDATE_EVENT:
          return {
            ...state,
            events: [
              ...state.events.filter((evt) => evt.id !== payload.id),
              payload
            ]
          };
        case DELETE_EVENT:
          return {
            ...state,
            events: [...state.events.filter((evt) => evt.id !== payload)]
          };
        default:
          return state;
      }
    }
    ```

### [3. Creating a root reducer]()
- Even though we can only have a single store in our application, we can have as many reducers as we like. Think of each reducer as a way to access a piece of the store state. We can combine all the reducers into a single rootReducer and pass that to the createStore() method in the configureStore() function
- In app/store folder, create a file called rootReducer.js
- In app/store/rootReducer.js file:
  - Import the combineReducers function: `import { combineReducers } from 'redux';`
  - Import the eventReducer: `import eventReducer from '../../features/events/eventReducer';`
  - Import the testReducer: `import testReducer from '../../features/sandbox/testReducer';`
  - Create a rootReducer by calling the combineReducers() function
    - The combineReducers() takes an object as an argument
    - In this object, we can assign different reducers to this object properties
    - NOTE THAT THE PROPERTY NAME WE ASSIGN TO EACH REDUCER WILL BECOME THE PROPERTY NAME IN THE STORE AND WE ACCESS A PARTICULAR STATE IN THE STORE BY CALLING THE NAME OF THE REDUCER. For example, to access the events array object in the store, we use state.event, because event is the property name we gave to the eventReducer. And the event property is a state object that has the events property
    ```javascript
    import { combineReducers } from 'redux';
    import testReducer from '../../features/sandbox/testReducer';
    import eventReducer from '../../features/events/eventReducer';

    const rootReducer = combineReducers({
      test: testReducer,
      event: eventReducer
    });

    export default rootReducer;
    ```
- In configureStore.js file:
  - Import the rootReducer: `import rootReducer from './rootReducer';`
  - Pass in the rootReducer as the first argument to the createStore() method
  ```javascript
  import { createStore } from 'redux';
  import { devToolsEnhancer } from 'redux-devtools-extension';
  import rootReducer from './rootReducer';

  export function configureStore() {
    return createStore(rootReducer, devToolsEnhancer());
  }
  ```

### [4. Getting events from the Redux store]()
- Instead of getting events from the local state of a component, we can get the events from the Redux store using the useSelector() hook. useSelector() hook comes with React-Redux library. We display the events in the EventDashboard page and retrieve individual event from the store and display it in the EventDetailedPage
- In EventDashboard.jsx file:
  - Import the useSelector() hook: `import { useSelector } from 'react-redux';`
  - Get the events property from store using the useSelector() hook
    - The useSelector() hook takes a selector function as an argument
    - The selector function is called with the store state and returns the result value based on the name of the reducer used. We get the events property from the store using state.event and event is the name of the reducer
    - Destructure the events property from the store
    - `const { events } = useSelector((state) => state.event);`
  - Since this `events` array is the same name as the `events` array we've been using, everything should work the same in the EventDashboard page  
- Next, we want to populate the individual event information onto the event detailed page. We can get an event info from the store using the useSelector() hook. Since the EventDetailedPage component is a routed component, we can get the event id from the route params. We use this event id to retrieve the event from the store. The event id lives inside the params property and it's inside the match props. match.params.id
- In EventDetailedPage.jsx file:
  - Destructure the match props to get access to the route params
    - `export default function EventDetailedPage({ match }) {...}`
  - Use the useSelector() hook to get an event from the store based on the event id
    ```javascript
    import { useSelector } from 'react-redux';

    const event = useSelector((state) =>
      state.event.events.find((e) => e.id === match.params.id)
    );
    ```
  - Once we retrieve the event from the store, pass down this event object as `event` props to the EventDetailedHeader and EventDetailedInfo child components
    - `<EventDetailedHeader event={event} />`
    - `<EventDetailedInfo event={event} />`
  - Pass down the event.attendees array as `attendees` props to the EventDetailedSidebar child component
    - `<EventDetailedSidebar attendees={event.attendees} />`
- In both EventDetailedHeader.jsx and EventDetailedInfo.jsx files:
  - Receive the event props from the EventDetailedPage parent component and destructure it
  - In the render section, we can populate the event info dynamically based on the event id in the route params
- In EventDetailedSidebar.jsx file:
  - Receive the attendees props from the EventDetailedPage parent component and destructure it
  - Use `attendees.length` to show the total number of people attending
  - Use a ternary operator to see if attendees.length is greater than 1. If it is, display 'People' else display 'Person'
    - `{attendees.length} {attendees.length > 1 ? 'People' : 'Person'} Going`
  - Call .map() method on the attendees array to display each attendee's displayName and photo in the attendees section of the page

### [5. Dispatching event actions]()
- Now that we're able to read events or an event from Redux store, we want to dispatch event actions to update, delete, and create an event in the store
- In EventListItem.jsx file:
  - Import the useDispatch hook: `import { useDispatch } from 'react-redux';`
  - Import the deleteEvent action: `import { deleteEvent } from '../eventActions';`
  - Create a dispatch function using the useDispatch() hook
    - `const dispatch = useDispatch();`
  - In the 'Delete' Button element
    - When the button is clicked, execute the dispatch() method and pass in the deleteEvent() action creator as an argument to dispatch the action to the reducer. Pass in the event.id to the deleteEvent() action method
    - `onClick={() => dispatch(deleteEvent(event.id))}`
- In the EventForm.jsx file:
  - Import useSelector and useDispatch hooks: `import { useSelector, useDispatch } from 'react-redux';`
  - Import the createEvent and updateEvent actions: `import { updateEvent, createEvent } from '../eventActions';`
  - Destructure the match props to get access to the route params
    - `export default function EventForm({ match }) {...}`
  - Use the useSelector() hook to get an event from the store based on the event id
    ```javascript
    const selectedEvent = useSelector((state) =>
      state.event.events.find((e) => e.id === match.params.id)
    );
    ```
  - Create a dispatch function using the useDispatch() hook
    - `const dispatch = useDispatch();`
  - In the handleFormSubmit() method:
    - To update an event, call the dispatch() function and pass in the updateEvent() action creator function as an argument
    - To create an event, call the dispatch() function and pass in the createEvent() action creator function as an argument
- Everything should work as before except this time we retrieve, update, create, and delete an event from Redux store instead of from the local state

### [6. Clean up code, add key to EventForm, solve routing issues]()
- After the user submitted the form to update an event, we want to redirect them to the events list page
- In EventForm.jsx file:
  - Add the `history` props to the EventForm component
    - `export default function EventForm({ match, history }) {...}`
  - In the handleFormSubmit() method, use history.push() method and pass in the pathname to redirect the user
    - `history.push('/events');`
- Another issue we have at the moment is when we redirect user to create a new event, the old data is still populated in the form and not cleared out. The reason for this is we're not giving our component a key, because we're not unmounting the component when we redirect to a new form or manage a new event
- To ensure that we create a new instance of a component, we need to give it a key property. We want to give a key property to our EventForm component. We can do this in the App component because that is where we created the route for the EventForm component
- When we are routed to different pages in our application, the location key value gets updated in the browser's location object. Since the App component is not a routed component, it has no access to the browser's location object. We can use the useLocation() hook from react-router-dom to have access to the location object and then the key property inside it
- In App.jsx file:
  - Import the useLocation hook: `import { Route, useLocation } from 'react-router-dom';`
  - Create a location key using the useLocation() hook. Destructure the key property
    - `const { key } = useLocation();`
  - Specify the key property on the route that contains the EventForm component
    - `<Route path={['/createEvent', '/manage/:id']} component={EventForm} key={key} />`

### [7. Scroll to top: ScrollToTop component]()
- Currently when we go to a different page, it doesn't automatically take us to the top of the page. React-router-dom doesn't do this automatically
- In app/layout folder, create a component/file called ScrollToTop.jsx
- In app/layout/ScrollToTop.jsx file:
  - Import useEffect hook: `import { useEffect } from 'react';`
  - Import useLocation hook: `import { useLocation } from 'react-router-dom';`
  - Get the pathname property from the browser's location object using the useLocation hook
    - `const { pathname } = useLocation();`
  - Use useEffect() hook to execute the window.scrollTo() method to scroll to the top of the window when the location pathname property changes
    ```javascript
    import { useEffect } from 'react';
    import { useLocation } from 'react-router-dom';

    export default function ScrollToTop() {
      const { pathname } = useLocation();

      // The useEffect hook will run when the ScrollToTop component first mounts
      // Whenever there's a change to a page's pathname URL (useEffect dependency),
      // the function window.scrollTo() will execute
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

      return null;
    }
    ```
- In the index.js file:
  - Import the ScrollToTop component: `import ScrollToTop from './app/layout/ScrollToTop';`
  - Use the ScrollToTop component just above the App component: `<ScrollToTop />`


## FORMS REVISITED
- React does not provide a Form solution. React is just a library
- Formik is a popular forms solution for React: https://formik.org/docs/api/formik
- A Forms package helps keep track of:
  - values
  - errors
  - visited fields
  - validation
  - handling submission
- Our goal is to create reusable fields, with validation that can be used in any project

### [1. Setting up Formik]()
- Docs: https://formik.org/docs/api/formik
- Install package: `npm i formik`
- In EventForm.jsx file:
  - Import Formik: `import { Formik } from 'formik';`
  - In the render section:
    - Wrap the `<Formik />` component around the entire `<Form />` element
    - In the `<Formik>` component, add the following properties
      ```js
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      ></Formik>
      ```
    - Next thing we want to do is pass down the handleChange, handleSubmit, and the values themselves as props from Formik to the Form element. Note that Formik is the parent component and the Form element is children of Formik component. Formik can pass values and methods to its children via props. We're going to make use of the `render` props to achieve this
    - Just above the Form element, render an arrow function that contains the props that we want to pass down. Also, we can destructure the props objects that we're passing down to Form element. And what this arrow function returns is everything that is inside the Form element itself
      ```js
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form> ... </Form>
        )}
      </Formik>
      ```
    - Then, inside the Form element:
      - We can swap the old `handleFormSubmit` method for `handleSubmit` coming from Formik
      - Swap the `handleInputChange` method for all of the input elements for `handleChange`
      ```js
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}> ... </Form>
        )}
      </Formik>
      ```
  - Test to make sure Formik is working, create a new event and see if the field values are populated and displayed in the console

### [2. Formik with less code]()
- We can make use of some of Formik's helper components such as Form and Field to help us write less code for our EventForm component:
  - `<Form />`: Form is a small wrapper around an HTML `<form>` element that automatically hooks into Formik's `handleSubmit` and `handleReset`. All other props are passed directly through to the DOM node
  - `<Field />`: Field will automatically hook up inputs to Formik. It uses the `name` attribute to match up with Formik state. `<Field />` will default to an HTML `<input />` element 
- In EventForm.jsx file:
  - Import Formik's Form and Field components. And delete the Semantic UI Form component: `import { Formik, Form, Field } from 'formik';`
  - Since we're still using Semantic UI to style our form, we can add the className to the Form element `className='ui form'`
  - For the Semantic UI `<Form.Field />` elements, we can switch it to Semantic UI `FormField` element to style the fields
    - Import: `import { FormField } from 'semantic-ui-react';`
  - We'll use `<Field />` component from Formik for our `<input />` field elements  
  - Our event form structure using Formik now looks like this:
    ```javascript
    import { Formik, Form, Field } from 'formik';

    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      <Form className='ui form'>
        <FormField>
          <Field name='title' placeholder='Event title' />
        </FormField>

        <FormField>
          <Field name='category' placeholder='Category' />
        </FormField>

        <FormField>
          <Field name='description' placeholder='Description' />
        </FormField>

        <FormField>
          <Field name='city' placeholder='City' />
        </FormField>

        <FormField>
          <Field name='venue' placeholder='Venue' />
        </FormField>

        <FormField>
          <Field name='date' placeholder='Event date' type='date' />
        </FormField>

        <Button type='submit' floated='right' positive content='Submit' />
        <Button
          as={Link}
          to='/events'
          type='submit'
          floated='right'
          content='Cancel'
        />
      </Form>
    </Formik>
    ```

### [3. Form validation with Formik validationSchema]()
- Docs: https://formik.org/docs/guides/validation
- Formik Validation: Formik is designed to manage forms with complex validation with ease. Formik supports synchronous and asynchronous form-level and field-level validation. Furthermore, it comes with baked-in support for schema-based form-level validation through Yup
- Install Yup: `npm i yup`
- Another Formik helper component we will use:
  - `<ErrorMessage />`: is a component that renders the error message of a given field if that field has been visited (i.e. `touched[name] === true`) (and there is an `error` message present). It expects that all error messages are stored for a given field as a string. Like `<Field />`, `<FastField />`, and `<FieldArray >`, lodash-like dot path and bracket syntax is supported
- In EventForm.jsx file:
  - Import Yup: `import * as Yup from 'yup';`
  - Import Formik ErrorMessage component: `import { Formik, Form, Field, ErrorMessage } from 'formik';`
  - Use Yup.object() to create a validationSchema
    - We can add our own custom error message as well
    ```javascript
    import * as Yup from 'yup';

    const validationSchema = Yup.object({
      title: Yup.string().required('You must provide a title')
    });
    ```
  - In the `<Formik />` component, add a validationSchema property and set it to the validationSchema we've just created
    ```javascript
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
    ```
  - Use Formik's `<ErrorMessage />` component to render the error message
    - Use Semantic UI Label to add styles to it
    ```js
    <FormField>
      <Field name='title' placeholder='Event title' />
      <ErrorMessage
        name='title'
        render={(error) => <Label basic color='red' content={error} />}
      />
    </FormField>
    ```

### [4. Creating a reusable text input field: MyTextInput component]()
- DOCS for useField() hook: https://formik.org/docs/api/useField 
- Let's create a reusable text input field component that has input error handling and styling. Use Semantic UI for styling and Formik Field props for error handling
- Formik's useField() component:
  - `useField` is a custom React hook that will automatically help you hook up inputs to Formik. You can and should use it to build your own custom input primitives
- In src/app/common/form folder, create a component/file called MyTextInput.jsx
- In MyTextInput.jsx file:
  - Import React: `import React from 'react';`
  - Import useField hook from Formik: `import { useField } from 'formik';`
  - Import Semantic UI FormField component: `import { FormField } from 'semantic-ui-react';`
  - Create a MyTextInput functional component that renders a form input field with error handling message
    - This component receives props from Formik
      - `export default function MyTextInput({ label, ...props }) {...}`
    - Use useField() hook to extract the field and meta properties from Formik Field component
      - `const [field, meta] = useField(props);`
    - Render the form input field using Semantic UI
    ```javascript
    import React from 'react';
    import { useField } from 'formik';
    import { FormField, Label } from 'semantic-ui-react';

    function MyTextInput({ label, ...props }) {
      const [field, meta] = useField(props);

      // NOTE: the meta.error data comes from Yup validationSchema
      // meta.error is going to either be an object or a string
      // the !! will cast a string or object to a boolean
      // if there's an error string, we want it to be true
      // if there's no error string, we want it to be false
      return (
        <FormField error={meta.touched && !!meta.error}>
          <label>{label}</label>
          <input {...field} {...props} />
          {/* if the field been touched and there's an error, render the error label */}
          {meta.touched && meta.error ? (
            <Label basic color='red'>
              {meta.error}
            </Label>
          ) : null}
        </FormField>
      );
    }

    export default MyTextInput;
    ```
- In EventForm.jsx file:
  - Import the MyTextInput component: `import MyTextInput from '../../../app/common/form/MyTextInput';`
  - Inside the `<Form />` component, instantiate the MyTextInput component and give it a name and placeholder properties
    - `<MyTextInput name='title' placeholder='Event title' />`
  - Now we can reduce a form field that looks like this
    ```js
    <FormField>
      <Field name='title' placeholder='Event title' />
      <ErrorMessage
        name='title'
        render={(error) => <Label basic color='red' content={error} />}
      />
    </FormField>
    ```
    to this
    ```js
    import MyTextInput from '../../../app/common/form/MyTextInput';

    <MyTextInput name='title' placeholder='Event title' />
    ```

### [5. Cleaning up the event form]()
- In EventForm.jsx file:
  - Replace the rest of the FormField input fields `<FormField><Form ... />></FormField>` with the MyTextInput component to create the input fields instead.
    - Fill in the values for name and placeholder properties for each component
    - Now our event form looks like this:
    ```js
    <Form className='ui form'>
      <Header sub color='teal' content='Event Details' />
      <MyTextInput name='title' placeholder='Event title' />
      <MyTextInput name='category' placeholder='Event category' />
      <MyTextInput name='description' placeholder='Description' />
      <Header sub color='teal' content='Event Location Details' />
      <MyTextInput name='city' placeholder='City' />
      <MyTextInput name='venue' placeholder='Venue' />
      <MyTextInput name='date' placeholder='Event date' type='date' />

      <Button type='submit' floated='right' positive content='Submit' />
      <Button
        as={Link}
        to='/events'
        type='submit'
        floated='right'
        content='Cancel'
      />
    </Form>
    ```
  - In the validationSchema,
    - Handle the validation logic for all the other inputs as well. Make all input fields required
    ```javascript
    const validationSchema = Yup.object({
      title: Yup.string().required('You must provide a title'),
      category: Yup.string().required('You must provide a category'),
      description: Yup.string().required(),
      city: Yup.string().required(),
      venue: Yup.string().required(),
      date: Yup.string().required()
    });
    ```
  - Next, handle the form submission with Formik onSubmit event. Use the form submission handling we wrote before and paste it in here
    ```js
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        selectedEvent
          ? dispatch(updateEvent({ ...selectedEvent, ...values }))
          : dispatch(
              createEvent({
                ...values,
                id: cuid(),
                hostedBy: 'Bob',
                attendees: [],
                hostPhotoURL: '/assets/user.png'
              })
            );
        history.push('/events');
      }}
    >
    ```

### [6. Creating a reusable textarea input field: MyTextArea component]()
- A textarea field gives you a larger text area than an input field does. This reusable component will have the exact same functionality as the MyTextInput component does. The only difference is instead of an `<input />` element, it uses a `<textarea />` element
- In src/app/common/form folder, create a component/file called MyTextArea.jsx
- In MyTextArea.jsx file:
  - Copy the code from MyTextInput.jsx component and change the `<input />` element to `<textarea />` element
  - `<textarea {...field} {...props} />`
- In EventForm.jsx file:
  - Import the MyTextArea component: `import MyTextArea from '../../../app/common/form/MyTextArea';`
  - For the 'Description' input field, use the MyTextArea component instead of the MyTextInput component
    - We can specify the number of rows the textarea will display using the rows property 
    - `<MyTextArea name='description' placeholder='Description' rows={3} />`

### [7. Creating a reusable select input field: MySelectInput component]()
- This component will have the same error handling functionality as the MyTextInput and MyTextArea components
- DOC for useField() hook: https://formik.org/docs/api/useField 
- In src/app/common/form folder, create a component/file called MySelectInput.jsx
- In MySelectInput.jsx file:
  - Import Semantic Select component: `import { FormField, Label, Select } from 'semantic-ui-react';`
  - Copy and paste the code from MyTextInput component as a starter
  - Bring in the `helpers` property from useField(props) 
  - We'll use `<Select />` form from Semantic UI
    ```js
    const [field, meta, helpers] = useField(props);

    <Select
      clearable
      value={field.value || null}
      onChange={(event, data) => helpers.setValue(data.value)}
      onBlur={() => helpers.setTouched(true)}
      {...props}
    />
    ```
- In src/app/api folder, create a file called categoryOptions.js file
- In categoryOptions.js file:
  - This file contains the categoryData that the user can choose from in the category select input options in an event form when they want to create or update an event
- In EventForm.jsx file:
  - Import the MySelectInput component: `import MySelectInput from '../../../app/common/form/MySelectInput';`
  - Import the categoryData: `import { categoryData } from '../../../app/api/categoryOptions';`
  - For the 'category' input field, swap to use the MySelectInput component instead of the MyTextInput component
    - Add the `options` property to the component and set its value to `categoryData`. The categoryOptions.js file contains the select options data
    - `<MySelectInput name='category' placeholder='Category' options={categoryData} />`

### [8. Creating a reusable date input field: MyDateInput component]()
- We'll be using the React Datepicker library. It gives us a consistent datepicker across every different browsers and operating systems
- Install: `npm i react-datepicker`
- In src/app/common/form folder, create a component/file called MyDateInput.jsx
- In MyDateInput.jsx file:
  - Import the react DatePicker component: `import DatePicker from 'react-datepicker';`
  - Import react-datepicker css file: `import 'react-datepicker/dist/react-datepicker.css';`
  - Import useFormikContext() hook from Formik: `import { useField, useFormikContext } from 'formik';`
  - Copy and paste the code from MySelectInput component as a starter
  - We need to extract the setFieldValue method from Formik using the useFormikContext() hook. The setFieldValue() method will help us set the value from the datepicker
    - `const { setFieldValue } = useFormikContext();`
  - Use the DatePicker component in the render section. Inside the DatePicker component, we need to provide the following:
    - Bring in all the field properties from the field props using the spread operator: `{...field}`
    - Bring in all the props as well: `{...props}`
    - The selected property which brings in the selected date
    - The onChange event property to set the date value. Use the setFieldValue() method to set the value
    ```javascript
    import { useField, useFormikContext } from 'formik';
    import { FormField, Label } from 'semantic-ui-react';
    import DatePicker from 'react-datepicker';
    import 'react-datepicker/dist/react-datepicker.css';

    export default function MyDateInput({ label, ...props }) {
      const { setFieldValue } = useFormikContext();
      const [field, meta] = useField(props);

      return (
        <FormField error={meta.touched && !!meta.error}>
          <label>{label}</label>
          <DatePicker
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={(value) => setFieldValue(field.name, value)}
          />
          {meta.touched && meta.error ? (
            <Label basic color='red'>
              {meta.error}
            </Label>
          ) : null}
        </FormField>
      );
    }
    ```
  - We also want to style the datepicker using the available react-datepicker css. Just import the css file
- In EventForm.jsx file:
  - Import the MyDateInput component: `import MyDateInput from '../../../app/common/form/MyDateInput';`
  - For 'date' input field, use the MyDateInput component instead of the MyTextInput component. And we need to specify the following properties to the component:
    - a name property
    - a placeholderText property instead of placeholder property
    - a timeFormat property to format the time
    - a showTimeSelect property, so the user can select a time
    - a timeCaption property
    - a dateFormat property to format the date in the input when the user selects it
    ```javascript
    import MyDateInput from '../../../app/common/form/MyDateInput';

    <MyDateInput
      name='date'
      placeholderText='Event date'
      timeFormat='HH:mm'
      showTimeSelect
      timeCaption='time'
      dateFormat='MMMM d, yyyy h:mm a'
    />
    ```
- Lastly, we want to apply styles to the datepicker so that the date input field takes up the entire width of the form. Do this in global stylesheet
- In styles.css file:
  ```css
  .react-datepicker-wrapper {
    width: 100%;
  }
  ```

### [9. Date-fns package: format Javascript date object into string]()
- date-fns docs: date-fns.org
- We have a little issue with our current date value. Our date value is a Javascript date object, not a string. So we need to format a Javascript date object into a string that can be displayed on a page. We will use a date package to help us format dates into strings
- The react-datepicker library is already using date-fns, but we want to install a date-fns package separately. When installing date-fns, we want to install the same version as the one in react-datepicker. Run `npm ls date-fns` to see the version that react-datepicker is using. Then install date-fns of the same version. This way, we won't run into any issues
- Install date-fns: `npm i date-fns@2.25.0`
- In EventListItem.jsx, EventDetailedHeader.jsx, and EventDetailedInfo.jsx files:
  - Import date-fns: `import { format } from 'date-fns';`
  - Replace the `{event.id}` Javascript date object with the format version
    - `{format(event.date, 'MMMM d, yyyy h:mm a')}`

### [10. Formik props: control the submit and cancel buttons in event form]()
- In our event form, we want to disable the 'Submit' button if the user hasn't completed the form correctly. To do that, we need to look into other properties/props from Formik to pass down to our form
- We're going to pass properties down to our form from Formik via 'render' props. The way we do that is:
  - Inside the `<Formik />` component, use render props. Render props starts with curly braces and uses an arrow function
  - Inside the render curly bracket, use an arrow function and destructure the props we want from Formik as an argument. Then have the `<Form />` component render inside the render props
    ```javascript
    <Formik>
      {({ props, props, props }) => (
        <Form>
          ...
        </Form>
      )}
    </Formik>
    ```
- In EventForm.jsx file:
  - Extract the isSubmitting, dirty, and isValid properties from Formik and pass them down to our `<Form />` component via render props
  - Our `<Form />` component will render inside the render props. This way our form has access to those props
    ```javascript
    {({ isSubmitting, dirty, isValid }) => (
      <Form className='ui form'>
        ...
      </Form>
    )}    
    ```
  - We want to disable the 'Submit' button if:
    - the form is loading -> isSubmitting
    - the form is not valid -> !isValid
    - the input value hasn't changed from the initial value -> !dirty
    - the form is submitting -> isSubmitting
  - In the 'Submit' Button element, specify the following properties:
    ```javascript
    <Button
      loading={isSubmitting}
      disabled={!isValid || !dirty || isSubmitting}
      type='submit'
      floated='right'
      positive
      content='Submit'
    />
    ```
  - In the 'Cancel' Button element, disable the button if the form is submitting
    ```javascript
    <Button
      disabled={isSubmitting}
      as={Link}
      to='/events'
      type='submit'
      floated='right'
      content='Cancel'
    />
    ```

### [11. Modals: create a modalReducer and ModalWrapper component]()
- When a user clicks on the 'Login' or 'Register' button, we want to display a modal on the screen to allow them to enter login details or register to the application
- Semantic UI has modals that we can use to create our user login/register form
- We'll use Redux to store the state of the modal. So we'll need a modalReducer to communicate with the store
- In src/app/common/modals folder, create a file called modalReducer.js
- In modalReducer.js file:
  - Instead of creating separate files for the constants, action creators, and reducer, we're going to put everything in the modalReducer.js file
  - Create OPEN_MODAL and CLOSE_MODAL constants
  - Create 2 action creator functions, one for openModal and another for closeModal. Each returns the action object
  - Create an initialState and set it to null
  - Create a modalReducer function
    - 1st arg is the state. Set the default state to initialState
    - 2nd arg is the action. Destructure the type and payload properties from the action object
    - Use a switch statement to base on the type
      - In the case of OPEN_MODAL,
        - destructure modalType and modalProps that we're going to get from the payload
        - then return the modalType and modalProps as an object
      - In the case of CLOSE_MODAL,
        - simply return null
      - Default case,
        - return state
      ```js
      // Constants
      const OPEN_MODAL = 'OPEN_MODAL';
      const CLOSE_MODAL = 'CLOSE_MODAL';

      // Action creators
      export function openModal(payload) {
        return {
          type: OPEN_MODAL,
          payload
        };
      }

      export function closeModal() {
        return {
          type: CLOSE_MODAL
        };
      }

      // State
      const initialState = null;

      // Modal reducer
      export default function modalReducer(state = initialState, { type, payload }) {
        switch (type) {
          case OPEN_MODAL:
            // destructure what we're going to get from the payload
            // modalType is the type of modal i.e login or register
            // modalProps is any properties that that modalType has
            const { modalType, modalProps } = payload;
            return { modalType, modalProps };
          case CLOSE_MODAL:
            return null;
          default:
            return state;
        }
      }
      ```
- In rootReducer.js file:
  - Import the modalReducer: `import modalReducer from '../common/modals/modalReducer';`
  - Add the modalReducer as modals property to the combineReducers() function. This will give us access to the modals state
    - `modals: modalReducer`
- Next, we want to create a modal wrapper around any content that we want to put inside the modal itself
- In src/app/common/modals folder, create a component/file called ModalWrapper.jsx
- In ModalWrapper.jsx file:
  - Import the following:
    ```javascript
    import React from 'react';
    import { useDispatch } from 'react-redux';
    import { Modal } from 'semantic-ui-react';
    import { closeModal } from './modalReducer';
    ```
  - Write a ModalWrapper functional component that renders a modal using Semantic UI
    - It receives children, size, and header props as an argument. Destructure them
    - Create a dispatch function using react-redux useDispatch() hook
    - Render the modal using the Semantic UI Modal component. Specify these following  properties to the Modal component:
      - set open property to true
      - on onClose click event, execute the dispatch() method to dispatch the closeModal() action creator function, which doesn't take any arguments
      - set size property to size
    - Inside the Modal component:
      - Check to see if there's a header. If there is, render the modal header inside the `<Modal.Header />`
      - Render the `{children}` inside the `<Modal.Content />`
      - NOTE: anything that's inside the parent component is considered `children` of that component. So anything inside of the `<ModalWrapper />` component is considered `children` of the ModalWrapper component. So in the future whenever we instantiate a ModalWrapper component, any content that's wrapped inside of this component will take place of the `children`
    ```javascript
    export default function ModalWrapper({ children, size, header }) {
      const dispatch = useDispatch();

      return (
        <Modal open={true} onClose={() => dispatch(closeModal())} size={size}>
          {header && <Modal.Header>{header}</Modal.Header>}
          <Modal.Content>{children}</Modal.Content>
        </Modal>
      );
    }
    ```

### [12. Adding a Modal Manager: ModalManager component, testing the modal in Sandbox]()
- Now that we have a a modalReducer and a modalWrapper that we can use around any modals that we create, what we need to do is have a way to select a specific modal and display it on the page
- In src/app/common/modals folder, create a component/file called ModalManager.jsx
- In ModalManager.jsx file:
  - Import React: `import React from 'react';`
  - Import useSelector() hook: `import { useSelector } from 'react-redux';`
  - Create a ModalManager functional component that renders the modal content to be displayed inside a ModalWrapper. This component is the "`{children}`" being passed to the ModalWrapper component and rendered inside the `<ModalWrapper />` component
  - In ModalManager component:
    - Create a modalLookup object that's going to allow us to check what type of modal we want to open. Set it to an empty object for now
      - `const modalLookup = {};`
    - We also want to check what's our current modal actually is in our Redux store. We can use the useSelector() hook to find out
      - `const currentModal = useSelector((state) => state.modals);`
    - Create a renderedModal variable and not have any value for now
      - `let renderedModal;`
    - If we have a modal open, then the modalType and modalProps are going to be what stored in the currentModal state
    - Use an if statement to check if there's a currentModal in the state. If there is,
      - we can destructure the modalType and modalProps from the currentModal object. In our modalReducer, when OPEN_MODAL, we return the modalType and modalProps in an object, hence we can destructure those properties
      - create a ModalComponent from the modalLookup object with the modalType we want to display on the page
      - set the renderedModal to render a `<ModalComponent />` with the modalProps that we have available for this particular modal
      ```javascript
      if (currentModal) {
        const { modalType, modalProps } = currentModal;
        const ModalComponent = modalLookup[modalType];
        renderedModal = <ModalComponent {...modalProps} />;
      }
      ```
    - Then return the renderedModal in a span element to display the new modal component onto the page
    ```javascript
    import React from 'react';
    import { useSelector } from 'react-redux';

    function ModalManager() {
      // modalType to lookup will be listed here
      const modalLookup = {};
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
    ```
- In App.jsx file:
  - Import the ModalManager component: `import ModalManager from '../common/modals/ModalManager';`
  - Instantiate the ModalManager component as the first item in the render section. This will ensure that whenever we open a modal, it's guaranteed to be visible
    - `<ModalManager />`
- **Testing out our modal in sandbox:**
  - In src/features/sandbox folder, create a component called TestModal.jsx
  - In TestModal.jsx file:
    - Instantiate the ModalWrapper component. Also provide the size and header attributes
    - The content that will take place of the `{children}` of the ModalWrapper component is:
      - `<div>The data is: {data}</div>`
    ```js
    import React from 'react';
    import ModalWrapper from '../../app/common/modals/ModalWrapper';

    function TestModal({ data }) {
      return (
        <ModalWrapper size='mini' header='Test Modal'>
          <div>The data is: {data}</div>
        </ModalWrapper>
      );
    }

    export default TestModal;
    ```
  - In ModalManager.jsx file:
    - Import the TestModal component: `import TestModal from '../../../features/sandbox/TestModal';`
    - Inside the modalLookup object, list the TestModal component here
      ```js
      // modalType to lookup will be listed here
      const modalLookup = {
        TestModal
      };
      ```
  - In Sandbox.jsx file:
    - Import the openModal action creator: `import { openModal } from '../../app/common/modals/modalReducer';`
    - Create a new button so that we can open our TestModal type
    - When we click on this button, we dispatch the `openModal` action creator. This openModal action creator needs a payload, which are the modalType and modalProps properties. So here we need to provide these two pieces of information
      - The modalType is set to TestModal string
      - The modalProps is set to data. In this Sandbox component, the data is the data we get from the `test` state in Redux store
    - In summary when we click on this button, it causes the modelReducer function to take the payload (modalType and modalProps) from the openModal action creator and make it part of the store. The ModalManager component is listening to see if there exists a modal in the modals state store (using useSelector hook). If there is, it renders the modal and its data (modalProps) onto the page. The ModalManager is trying to lookup a modal by its modalType. The TestModal component is the modalType. The TestModal instantiates the ModalWrapper component. The data (modalProps) of the TestModal is rendered inside the ModalWrapper as its children. The ModalManager triggers the render of a modal onto the page from the store
    - To close the modal, simply click anywhere on the page. This will dispatch the CLOSE_MODAL action creator and update the state in our reducer. And when we no longer have a modal in the store, we no longer display on the screen
      ```js
      import { openModal } from '../../app/common/modals/modalReducer';

      const data = useSelector((state) => state.test.data);

      return (
        <Button
          onClick={() =>
            dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))
          }
          content='Open Modal'
          color='teal'
        />
      )
      ```

### [13. Creating the sign in form: LoginForm component]()
- On the NavBar, when the user clicks on the 'Login' button, a sign-in modal opens on the page and the user can provide their email and password to login. We'll create a LoginForm component which has the modal content that can be rendered inside the ModalWrapper as children. The ModalManger will look for the type of modal to be displayed. The LoginForm will have validation as well
- In src/features/auth folder, create a component/file called LoginForm.jsx
- In LoginForm.jsx file:
  - Import the following:
    ```javascript
    import React from 'react';
    import { Formik, Form } from 'formik';
    import { Button } from 'semantic-ui-react';
    import * as Yup from 'yup';
    import ModalWrapper from '../../app/common/modals/ModalWrapper';
    import MyTextInput from '../../app/common/form/MyTextInput';
    ```
  - Write a LoginForm functional component that renders a login form using Formik
    - In the render section, instantiate the ModalWrapper component: `<ModalWrapper />`
      - Provide the size and header properties to the ModalWrapper component
      - `<ModalWrapper size='mini' header='Sign in to Revents'>`
    - Inside the `<ModalWrapper />` component, create the login form using `<Formik />` component
    - Provide the following properties to the Formik component:
      - initialValues property and set it to an empty-string email and password object
      - validationSchema property to validate the email and password input fields. Use the Yup library
      - onSubmit property to submit the values. Console log the values for now
      ```javascript
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required()
        })}
        onSubmit={values => {
          console.log(values)
        }}
      >
      ```
    - Inside the Formik tag, we'll pass down some render props to our form via render props: `{({props, props}) => (<Form> ... </Form>)}`
      - The props we want to pass are isSubmitting, isValid and dirty. Destructure them
      - Then render the Formik's `<Form />` component inside render props
    - Inside the Form tag, 
      - we'll use the MyTextInput components to render the email and password text input fields
      - also add a 'Submit' Button
      - then use the Formik props to apply validation logic to the 'Submit' button
    ```javascript
    export default function LoginForm() {
      return (
        <ModalWrapper size='mini' header='Sign in to Revents'>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
              email: Yup.string().required().email(),
              password: Yup.string().required()
            })}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form className='ui form'>
                <MyTextInput name='email' placeholder='Email Address' />
                <MyTextInput
                  name='password'
                  placeholder='Password'
                  type='password'
                />
                <Button
                  loading={isSubmitting}
                  disabled={!isValid || !dirty || isSubmitting}
                  type='submit'
                  fluid
                  size='large'
                  color='teal'
                  content='Login'
                />
              </Form>
            )}
          </Formik>
        </ModalWrapper>
      );
    }
    ```
- In ModalManger.jsx file:
  - We need to tell the ModalManger about the LoginForm modal
  - Import the LoginForm component: `import LoginForm from '../../../features/auth/LoginForm';`
  - Then pass in the LoginForm component to the modalLookup object
    - `const modalLookup = { TestModal, LoginForm };`
- In SignedOutMenu.jsx file:
  - When the 'Login' button is clicked, a login form modal opens
  - Import useDispatch() hook: `import { useDispatch } from 'react-redux';`
  - Import openModel action creator method: `import { openModal } from '../../app/common/modals/modalReducer';`
  - Create a dispatch method using the useDispatch() hook
    - `const dispatch = useDispatch();`
  - In the 'Login' Button element:
    - When the button is clicked, execute the dispatch() method and pass in the openModal action creator
    - We need to provide the payload (modalType and modalProps) to the openModal action creator as an argument. We can provide a modalType property of string value of 'LoginForm', which is the LoginForm component. We don't have any modalProps
    ```javascript
    <Button
      onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))}
      basic
      inverted
      content='Login'
    />
    ```

### [14. Adding an authReducer]()
- Let's create an authReducer so we can store our authentication state in Redux store
- In src/features/auth folder, create authConstants.js, authActions.js, and authReducer.js files
- In authConstants.js file:
  - Create constants for SIGN_IN_USER and SIGN_OUT_USER
  ```javascript
  export const SIGN_IN_USER = 'SIGN_IN_USER';
  export const SIGN_OUT_USER = 'SIGN_OUT_USER';
  ```
- In authActions.js file:
  - Import action constants: `import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';`
  - Write a signInUser action creator function that returns the action object
    - This function takes payload as an argument
    ```javascript
    export function signInUser(payload) {
      return {
        type: SIGN_IN_USER,
        payload
      };
    }
    ```
  - Write a signOutUser action creator function that returns the action object
    - This function doesn't take any arguments
    ```javascript
    export function signOutUser() {
      return {
        type: SIGN_OUT_USER
      };
    }
    ```
- In authReducer.js file:
  - Import the constants: `import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';`
  - Create an initialState object
    ```javascript
    const initialState = {
      authenticated: false,
      currentUser: null
    };
    ```
  - Write an authReducer function that updates the state in the store based on the action type
    - 1st arg is the state. Set the default state to initialState object
    - 2nd arg is the action. Destructure the type and payload properties from the action object
    - Use a switch statement to base on the type
      - In the case of SIGN_IN_USER, we want to return an object with
        - the original state
        - set the authenticated property to true
        - set the currentUser property to an object which contains the user's email and photoURL. The email value comes from the payload props and set the photoURL to a static image for now
      - In the case of SIGN_OUT_USER, we want to return an object with
        - the original state
        - set authenticated to false
        - set currentUser to null
      - Default case,
        - return state
    ```javascript
    import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';

    const initialState = {
      authenticated: false,
      currentUser: null
    };

    export default function authReducer(state = initialState, { type, payload }) {
      switch (type) {
        case SIGN_IN_USER:
          return {
            ...state,
            authenticated: true,
            currentUser: {
              email: payload.email,
              photoURL: '/assets/user.png'
            }
          };
        case SIGN_OUT_USER:
          return {
            ...state,
            authenticated: false,
            currentUser: null
          };
        default:
          return state;
      }
    }
    ```
- In rootReducer.js file:
  - Import the authReducer: `import authReducer from '../../features/auth/authReducer';`
  - Add the authReducer as auth property to the combineReducers() function. This will give us access to the auth state
    ```js
    const rootReducer = combineReducers({
      test: testReducer,
      event: eventReducer,
      modals: modalReducer,
      auth: authReducer
    });
    ```

### [15. Hooking up the LoginForm]()
- When we submit the LoginForm, we want to dispatch the signInUser() action with the login data. We also want to dispatch a closeModal action to close the LoginForm modal
- In LoginForm.jsx file:
  - Import the useDispatch() hook: `import { useDispatch } from 'react-redux';`
  - Import signInUser action: `import { signInUser } from './authActions';`
  - Import closeModal action: `import { closeModal } from '../../app/common/modals/modalReducer';`
  - Create a dispatch method using the useDispatch() hook
    - `const dispatch = useDispatch();`
  - One problem we have is when the 'Submit' button is clicked, the loading spinner never stops. The way Formik works is when we submit, the submitting status is always set to true and after our action is completed, it's up to us to set the submitting status back to false. What we can do is destructure the setSubmitting property from Formik and use it to set the submitting status manually to false after we've submitted our values
  - On onSubmit event property:
    - Use an arrow function to handle submit
    - The function takes 2 arguments. 1st arg is the values we provide. 2nd arg is the setSubmitting property we destructure from Formik 
    - Inside the callback, execute the dispatch() method pass in the signInUser() action and provide it the values
    - Then call the setSubmitting() method to set the submitting status to false
    - Then call another dispatch() method to close the modal using the closeModel() action
    ```javascript
    onSubmit={(values, { setSubmitting }) => {
      dispatch(signInUser(values));
      setSubmitting(false);
      dispatch(closeModal());
    }}
    ```
- In our NavBar component, instead of using the local state to check if a user is authenticated, we can now use our Redux store to see if they're authenticated or not. If they're authenticated user, display the SignedInMenu component. If not, display the SignedOutMenu component
- In NavBar.jsx file:
  - Import the useSelector() hook: `import { useSelector } from 'react-redux';`
  - Get the authenticated state from the Redux store using the useSelector() hook. Destructure the authenticated property from the auth state object
    - `const { authenticated } = useSelector((state) => state.auth);`
  - The authenticated state is either true or false. So in the NavBar, if the user is authenticated, they can see the 'Create Event' button and the `<SignedInMenu />` component is rendered
- In the SignedInMenu component, when the user clicks 'Sign out' we can dispatch the signOutUser() action and redirect them to homepage. Also, once they're successfully signed in, we want to display the currentUser info from our Redux store
- In SignedInMenu.jsx file:
  - Import useSelector() and useDispatch() hooks: `import { useSelector, useDispatch } from 'react-redux';`
  - Import useHistory() hook: `import { useHistory } from 'react-router-dom';`
  - Import signOutUser action: `import { signOutUser } from './authActions';`
  - Create a dispatch method using the useDispatch() hook
    - `const dispatch = useDispatch();`
  - Get the browser history object using the useHistory() hook
    - `const history = useHistory();`
  - When the 'Sign out' dropdown item is clicked, we want to do two things. Call the signOutUser() action to sign out the user and redirect user to home page
    - On the onClick event, use an arrow function to execute the dispatch() method and call the signOutUser() action
    - Then use the history.push() method to direct use to homepage
    ```javascript
    <Dropdown.Item
      onClick={() => {
        dispatch(signOutUser());
        history.push('/');
      }}
      text='Sign out'
      icon='power'
    />
    ```
  - We also want to get the currentUser property from the auth state. Once the user is logged-in, we can populate their info
    - `const { currentUser } = useSelector((state) => state.auth);`
  - For the user profile image, set the image source to `currentUser.photoURL` or the default user static image
    - `src={currentUser.photoURL || '/assets/user.png'}`
  - For the user's name, set it to the first part of their email address or the default text
    - `<Dropdown pointing='top left' text={String(currentUser.email).split('@')[0] || 'User'}>`


## GOOGLE MAPS INTEGRATION
- Google Maps Places Autocomplete
  - Provides dropdown and lookup for locations
  - Can provide different levels: countries, cities, businesses, etc.
- Google Maps integration with React
  - Provides a map of an area with given coordinates
  - Takes a Lat/Lng

### [1. Enable Google Maps APIs, generate Google API key]()
- Go to Google Developer Console site and login with Google account
  - https://console.developers.google.com/
1. Click on the 'New Project' button to create a new project. Name the project
2. In the APIs & Services menu, select Library. In the search bar, find these 3 APIs and click on the Enable button for each one
  - Maps Javascript API
  - Geocoding API
  - Places API
3. We need to manually set the requests limit for all of these API services so that we won't get charged no matter what. We are required to provide billing info to use Google Maps. In the IAM & Admin menu, select Quotas:
  - In the Quotas section, there's a dropdown menu that will have the 3 Maps APIs
  - Go into each one and set the requests limit to 100
4. In the APIs & Services menu, select Credentials
  - Click the '+ CREATE CREDENTIALS' button at the top. This will generate the Google API key. Copy this key
5. While we are developing our application, don't worry about setting the Key restrictions. We will come back to set API restrictions once we publish our application to Firebase

### [2. Setting up React Places Autocomplete, test Google Places in Sandbox]()
- The react-places-autocomplete library is a React component to build a customized UI for Google Maps Places Autocomplete
- Docs: https://github.com/hibiken/react-places-autocomplete
- Install: `npm i react-places-autocomplete`
- Add this script to index.html file just above the project `<title />` tag. Replace the Google API key you get from Google APIs for this project
  - `<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>`
- Later on when we deploy the project, we will restrict the API key to our project site only
- **Testing out Google Places:**
  - In sandbox folder, create a component/file called TestPlaceInput.jsx
  - In TestPlaceInput.jsx file, copy and paste the demo code from the above github website. Then make the following changes:
    - Change from class component to functional component
    - Delete the constructor and add address state using useState() hook:
      - `const [address, setAddress] = useState('');`
    - Change the arrow event handler functions to regular functions
    - Remove all 'this' keyword
    - In the handleSelect() function, call setAddress method to set the address as the last thing. So when a place is selected from the auto-suggest list, the selected place will show up in the input field
    - Add a key to the div tag when mapping over the `suggestions` array
  - In Sandbox.jsx file:
    - Import the TestPlaceInput component
    - Instantiate the component in the render section: `<div><TestPlaceInput /></div>`
  - When typing in the input field, it should give an auto-suggest list of places. And when a place is selected, that selected place will show up in the input field. The lat/long of the place will print in the console

### [3. Creating a custom place input field: MyPlaceInput component]()
- The react-places-autocomplete library gives us:
  - A `<PlacesAutocomplete />` component
  - The geocodeByAddress() method:
    - It takes an address as an argument
    - It's an async operation and what we get back is either a results or an error. The results is an array
    - We can then use the first element of this results array and pass it to the getLatLng() method 
  - The getLatLng() method:
    - It takes the results from geocodeByAddress() method as an argument
    - This is an async operation and what we get back is either the latLng of the place or an error
- In our project, when a user selects a place for venue and city input fields, we want to store, as an object, the text of the address and the lat/lng object so we can use those coordinates to display a map later on
- The `<PlacesAutocomplete />` component needs the following:
  - the value property set to address state
  - the onChange property set to on change event handler (handleChange function)
  - the onSelect property set to on select event handler (handleSelect function)
- The following props we get from the PlacesAutocomplete component via render props:
  - getInputProps() method
  - suggestions - it's an array of suggestions
  - getSuggestionItemProps() method
  - loading
- In src/app/common/form folder, create a component/file called MyPlaceInput.jsx
- In MyPlaceInput.jsx file:
  - Import the following:
    ```javascript
    import React from 'react';
    import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
    import { useField } from 'formik';
    import { FormField, Label, List, Segment } from 'semantic-ui-react';
    ```
  - Write a MyPlaceInput functional component that renders a place autocomplete input field using Formik and Semantic UI
    - This component receives these props: label, options, ...props
    - Use useField() hook to extract field, meta, and helpers properties from Formik Field component
      - `const [field, meta, helpers] = useField(props);`
    - Write a handleSelect function handler that executes the geocodeByAddress() method 
      - The geocodeByAddress() method takes an address as an argument
      - The method takes the address and returns the latLng coordinates
      - It then sets the address and latLng properties as an object in the Redux store using the helpers.setValue() method
      - This is an async operation and we'll either get the results and the latLng coordinates or an error. Use .then() and .catch() methods to handle both
      ```javascript
      function handleSelect(address) {
        geocodeByAddress(address)
          .then((results) => getLatLng(results[0]))
          .then((latLng) => helpers.setValue({ address, latLng }))
          .catch((error) => helpers.setError(error));
      }
      ```
    - Instantiate the `<PlacesAutocomplete />` component that's provided by react-places-autocomplete library
      - Provide the value and event handlers it needs
      - Use render props to extract the props
      - Render the input field inside the `<FormField />` component and apply validation logic
      - Check to see if there's any suggestions in the suggestions array. If there is, map over the array and display each suggestion in a List using Semantic UI
    ```javascript
    export default function MyPlaceInput({ label, options, ...props }) {
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
              <input {...getInputProps({name: field.name, ...props})} />
              {meta.touched && meta.error ? (
                <Label basic color='red'>
                  {meta.error}
                </Label>
              ) : null}
              {suggestions?.length > 0 && (
                <Segment loading={loading} style={{ marginTop: 0, position: 'absolute', zIndex: 1000, width: '100%' }}>
                  <List selection>
                    {suggestions.map(suggestion => (
                      <List.Item {...getSuggestionItemProps(suggestion)} key={suggestion.placeId}>
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
    ```

### [4. Using the place input field: MyPlaceInput component]()
- Let's make use of our MyPlaceInput component in our EventForm
- In EventForm.jsx file:
  - Import the MyPlaceInput component: `import MyPlaceInput from '../../../app/common/form/MyPlaceInput';`
  - For 'City' and 'Venue' input fields, use the `<MyPlaceInput />` component in place of the `<MyTextInput />` component 
  - In the const initialValues object, we need to set the initial values for the city and venue properties as objects, not strings. Because in the PlacesAutocomplete component, we call setValue() to set the value state with an object that has the address and latLng properties in it
    ```javascript
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
    ```
  - Because we've changed the values for city and venue fields/properties into objects, we need to update this change in our validationSchema as well. We need to validate with a Yup.object() instead of Yup.string()
    ```javascript
    city: Yup.object().shape({
      address: Yup.string().required('City is required')
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('Venue is required')
    }),
    ```
- In MyPlaceInput.jsx file:
  - When we're handling the FormField validation error, the error is no longer a string. It's going to an object error that has the properties for the address and latLng. So when there's a field error, we want to specify that we want the address error out of the error object by using the bracket[] notation
    ```javascript
    {meta.touched && meta.error ? (
      <Label basic color='red'>
        {meta.error['address']}
      </Label>
    ) : null}
    ```
  - Another issue we're having is when a user starts typing in the field and leaves the field, we want to make sure that we have the latLng coordinates value. We need to check on the field.onBlur event, which recognizes if someone has touched the field and moved out of it. We want to write an event handler to handle the onBlur event
    - Check if there's NO value in the field.value.latLng. If there isn't, reset the city object property to be empty again
      ```javascript
      function handleBlur(e) {
        field.onBlur(e);
        if (!field.value.latLng) {
          helpers.setValue({ address: '', latLng: null });
        }
      }
      ```
    - Then on the onBlur event in the input element, call the handleBlur function in a callback function
      ```javascript
      <input
        {...getInputProps({
          name: field.name,
          onBlur: (e) => handleBlur(e),
          ...props
        })}
      />
      ```

### [5. Narrowing the place input search results: EventForm]()
- What we want to do next is when we select a specific city, we want to see venues that are located in that city area
- In EventForm.jsx file:
  - In render props, pass down the `values` props to our form
    - `{({ isSubmitting, dirty, isValid, values }) => ( ... )}`
  - In the 'venue' input field, we need to pass two additional properties to the component:
    - the disabled property. We want to disable the venue input field if there's no city latLng value
    - the options property. We want to narrow down the venue results based on the type, radius, and location of a latLng/city
    - add this at the top of the file, because our component doesn't know about the google maps script in index.html file
      - `/* global google */`
    ```javascript
    <MyPlaceInput
      name='venue'
      placeholder='Venue'
      disabled={!values.city.latLng}
      options={{
        location: new google.maps.LatLng(values.city.latLng),
        radius: 1000,
        types: ['establishment']
      }}
    />
    ```
- Since the venue and the city of our event are now objects, not strings, we need to reflect this change in our sampleData.js file as well. So the sampleData.js file has been updated
  ```js
  city: {
    address: 'London, UK',
    latLng: {
      lat: 51.5118074,
      lng: -0.12300089999996544
    }
  },
  venue: {
    address: 'Punch & Judy, Henrietta Street, London, UK',
    latLng: {
      lat: 51.5118074,
      lng: -0.12300089999996544
    }
  },
  ```
- Lastly, in EventListItem.jsx and EventDetailedInfo.jsx files:
  - Update `event.venue` to `event.venue.address`

### [6. google-map-react lib: displaying google maps onto a page in Sandbox]()
- Docs: https://www.npmjs.com/package/google-map-react
- Install: `npm i google-map-react`
- Display a Google map based on the given city's latLng coordinates. We'll use the google-map-react library to display the map. We'll first test out the Google maps in sandbox to display a map based on the city's latLng coordinates that the user typed in the 'Search Places' input field
- **Displaying Google map onto a page in Sandbox:**
- In Sandbox.jsx file:
  - The plan of action:
    - First, we need to create a location state in the Sandbox component
    - Then we can pass down the setLocation method as props to the TestPlaceInput child component to get the city's latLng and store it in the location state in the Sandbox component
    - Once we have the latLng in the state, we can pass down the location state as props to the TestMap component to display a map based on the location latLng
  - Create an initial location state object
    ```javascript
    const defaultProps = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };
    ```
  - Create a location state using useState() hook and set the initial value to defaultProps. Location state is an object
    - `const [location, setLocation] = useState(defaultProps);`
  - Write a handleSetLocation function that sets the center property to be the lat/lng coordinates
    ```javascript
    function handleSetLocation(latLng) {
      setLocation({ ...location, center: { lat: latLng.lat, lng: latLng.lng } });
    }
    ```
  - Pass down the handleSetLocation method as setLocation props to the TestPlaceInput child component
    - `<TestPlaceInput setLocation={handleSetLocation} />`
  - Pass down the location state as location props to the TestMap child component
    - `<TestMap location={location} />`
- In TestPlaceInput.jsx file:
  - Receive the setLocation method props from Sandbox parent component
  - In the handleSelect function, when calling the getLatLng() method and the latLng result comes back, call the setLocation() method to set the location state to latLng. Now the location state in the Sandbox component will have the updated latLng coordinates
    ```javascript
    function handleSelect(address) {
      geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          setLocation(latLng)
          console.log('Success', latLng);
        })
        .catch((error) => console.error('Error', error));
      setAddress(address);
    }
    ```
- In sandbox folder, create a component/file called TestMap.jsx
- In TestMap.jsx file:
  - Copy and paste the example code from the npm google-map-react website. Switch to using a functional component instead of a class component
  - Receive the location state props from Sandbox parent component
  - In the `<GoogleMapReact />` component:
    - Provide the google_maps_api_key as a string
    - Set the center and zoom properties to location.center and location.zoom
    - In the `<AnyReactComponent />` component, provide the lat/lng coordinates
    ```javascript
    import React from 'react';
    import GoogleMapReact from 'google-map-react';

    const AnyReactComponent = ({ text }) => <div>{text}</div>;

    function TestMap({ location }) {
      // console.log(location);
      const { lat, lng } = location.center;

      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'GOOGLE_MAPS_API_KEY' }}
            center={location.center}
            zoom={location.zoom}
          >
            <AnyReactComponent lat={lat} lng={lng} text='My Marker' />
          </GoogleMapReact>
        </div>
      );
    }

    export default TestMap;
    ```

### [7. Adding the map to the EventDetailedPage: EventDetailedMap component]()
  - On the EventDetailedPage, when we click on the 'Show Map' button, we get to see a map of where the event is taking place. The 'Hide Map' button will hide the map
  - In src/features/events/eventDetailed folder, create a component/file called EventDetailedMap.jsx
  - In EventDetailedMap.jsx file:
    - Import React: `import React from 'react';`
    - Import googleMapReact component: `import GoogleMapReact from 'google-map-react';`
    - Import Semantic UI components: `import { Icon, Segment } from 'semantic-ui-react';`
    - Write a EventDetailedMap functional component to display a map of where the event takes place
      - This component receives (event venue) latLng props from the EventDetailedInfo parent component
      - Instantiate the `<GoogleMapReact />` component and specify the bootstrapURLKeys, center, and zoom properties. This is similar to what we had done in the TestMap.jsx component in Sandbox
    - Write a Marker functional component to display a marker icon using Semantic UI
    - Use the `<Marker />` component inside the `<GoogleMapReact />` component and pass down the lat and lng props. This will display the marker on the map where the venue is located
    ```javascript
    import React from 'react';
    import { Icon, Segment } from 'semantic-ui-react';
    import GoogleMapReact from 'google-map-react';

    function Marker() {
      return <Icon name='marker' size='big' color='red' />;
    }

    function EventDetailedMap({ latLng }) {
      const zoom = 14;

      return (
        <Segment attached='bottom' style={{ padding: 0 }}>
          <div style={{ height: 300, width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'GOOGLE_MAPS_API_KEY' }}
              center={latLng}
              zoom={zoom}
            >
              <Marker lat={latLng.lat} lng={latLng.lng} />
            </GoogleMapReact>
          </div>
        </Segment>
      );
    }

    export default EventDetailedMap;
    ```
- In EventDetailedInfo.jsx file:
  - Import the EventDetailedMap component: `import EventDetailedMap from './EventDetailedMap';`
  - As the last item inside the `<Segment.Group>` component, use the EventDetailedMap component and pass down the latLng props. This is the coordinate values of the venue
    - `<EventDetailedMap latLng={event.venue.latLng} />`
  - Next, we only want to show the map on the EventDetailedPage when the 'Show Map' is clicked. So we need to create a local state to toggle between the show and hide map
  - Create a mapOpen state using useState() hook and set the initial value to false. Initially the map is hidden
    - `const [mapOpen, setMapOpen] = useState(false);`
  - For the 'Show Map' Button element, we want to toggle the 'Show Map' and 'Hide Map' button depending on the mapOpen state
    - On onClick event, switch the mapOpen state using the setMapOpenToggle() method
    - Then for the Button content, if mapOpen state is true, show 'Hide Map'. If mapOpen is false, show 'Show Map'
    ```javascript
    <Button
      onClick={() => setMapOpenToggle(!mapOpen)}
      color='teal'
      size='tiny'
      content={mapOpen ? 'Hide Map' : 'Show Map'}
    />
    ```
  - Then in the render section, write a condition to only show the map if mapOpen state is true
    - `{mapOpen && <EventDetailedMap latLng={event.venue.latLng} />}`


## ASYNCHRONOUS CODE

- We need a way to handle asynchronous operations, such as retrieving and storing data in the cloud, in our Redux store. It takes time to read and write data which is stored at some distance away from the client's computer. Redux Thunk is a popular solution for Redux

**Redux Thunk**
- A thunk is a function that wraps an expression to delay its evaluation
- Allows Action Creators to return a function instead of a plain object. Up to this point our action creators have been returning an object which contains a TYPE and a PAYLOAD optionally
- Receives the store's dispatch method which is used to dispatch regular synchronous action when the asynchronous operations have completed. What we want is have our action creator to return the store's dispatch method. This allows us to dispatch actions, wait for something to happen, and then dispatch other actions as well. We use async/await to achieve this
- Acts as middleware that we add to our Redux store. This middleware allows us to use the store's dispatch function inside our Action Creators

**Async/Await**
- ES2017 feature
- Built on top of promises Javascript - cannot be used with plain callbacks
- Makes async code look and behave more like non async code
- Cleaner code than using the .then() method from promises JS

**Install Redux Thunk**
- Install: `npm i redux-thunk`

### [1. Setting up Redux Thunk, create an asyncReducer]()
- In configureStore.js file:
  - The createStore() method takes 3 params: a reducer, a preloadedState(optional), and an enhancer
  - An example of an enhancer is the Redux devTool that we have installed and use earlier. The only store enhancer that ships with Redux is applyMiddleware(). The middleware that we're going to apply is the Redux thunk, but we've also got a devToolEnhancer(). So in order to use both of the devToolEnhancer() and Redux thunk, we're going to bring in the composeWithDevTools() method from redux-devtools-extension. The composeWithDevTools() is already come with the devToolEnhancer()
    - `import { composeWithDevTools } from 'redux-devtools-extension';`
  - Import Redux thunk: `import thunk from 'redux-thunk';`
  - Also import the applyMiddleware method: `import { createStore, applyMiddleware } from 'redux';`
  - In the createStore() method, we're going to pass in the composeWithDevTools() method as a 2nd param. Then call the applyMiddleware() method and pass in thunk
    - `return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));`
  - Now we have both the devToolEnhancer() and applyMiddleware(thunk) enhancers
  ```js
  import { createStore, applyMiddleware } from 'redux';
  import { composeWithDevTools } from 'redux-devtools-extension';
  import rootReducer from './rootReducer';
  import thunk from 'redux-thunk';

  export function configureStore() {
    // 1st arg is a reducer
    // 2nd arg is an enhancer
    // We have 2 enhancers: redux thunk and redux devTool
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
  }
  ```
- Next is we want to create a reducer (controlling a state in the store) for async functions. This particular reducer is going to control the loading state of what's going on in our application. This asyncReducer also controls the error state that we may get back from the async operations.
- In src/app/async folder, create a file called asyncReducer.js
- In asyncReducer.js file:
  - We'll create the async constants, action creators, and reducer in one file
  ```javascript
  // Constants
  const ASYNC_ACTION_START = 'ASYNC_ACTION_START';
  const ASYNC_ACTION_FINISH = 'ASYNC_ACTION_FINISH';
  const ASYNC_ACTION_ERROR = 'ASYNC_ACTION_ERROR';

  // Async action creator functions
  export function asyncActionStart() {
    return {
      type: ASYNC_ACTION_START
    };
  }

  export function asyncActionFinish() {
    return {
      type: ASYNC_ACTION_FINISH
    };
  }

  export function asyncActionERROR(error) {
    return {
      type: ASYNC_ACTION_ERROR,
      payload: error
    };
  }

  // Initial state
  const initialState = {
    loading: false,
    error: null
  };

  // Async reducer
  export default function asyncReducer(state = initialState, { type, payload }) {
    switch (type) {
      // Turns the loading indicator on
      case ASYNC_ACTION_START:
        return {
          ...state,
          loading: true,
          error: null
        };
      // Turns the loading indicator off
      case ASYNC_ACTION_FINISH:
        return {
          ...state,
          loading: false
        };
      // Stores error message getting back from async operation
      case ASYNC_ACTION_ERROR:
        return {
          ...state,
          loading: false,
          error: payload
        };
      default:
        return state;
    }
  }
  ```
- Add the asyncReducer to the rootReducer so it is connected to Redux store
- In rootReducer.js file:
  - Import the asyncReducer: `import asyncReducer from '../async/asyncReducer';`
  - Add the asyncReducer to the combineReducers() method as the value for async property: `async: asyncReducer`

### [2. Returning async functions in action creators]()
- In src/app/common/util folder, create a file called util.js. Any functions that don't belong anywhere else that we can apply anywhere in our application go in this folder
- In util.js file:
  - Write a delay function that delays for a certain amount of time in millisecond (ms)
    - In order for something to be able to wait for this particular function to finish, what we need do is to return a `new Promise()`
    - The promise will end in either resolve or reject
    - In this case, we're going to resolve and we're going to call the `setTimeout()` function, which allows us to add a delay
    - In the setTimeout() function, we pass in the `resolve` and the `ms` (millisecond) that we get from the delay function as an argument
    ```javascript
    export function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    ```

**Testing out async action creators in counter Sandbox:**
- When we installed redux-thunk, it allows us to return a function inside another function. In our action creator function, instead of returning a simple object, we can return an asynchronous function. This allows us to dispatch multiple actions inside an action creator function
- An asynchronous function has the `async` keyword in front of it: `async function () {...}`
- This async function can take, as a parameter, a dispatch method that we get from react-redux store. We use this dispatch method to dispatch multiple actions
- In testReducer.js file:
  - Import the async action creators from the asyncReducer.js file: `import { asyncActionStart, asyncActionError, asyncActionFinish } from '../../app/async/asyncReducer';`
  - Import the delay function: `import { delay } from '../../app/common/util/util';`
  - Inside the increment action creator function:
    - We can return an asynchronous function. This will allow us to dispatch multiple actions inside the increment action creator function
    - To mark a function as an async function, add the `async` keyword in front of it
    - This async function takes a dispatch as an argument. It is a dispatch() method coming from react-redux to dispatch actions
    - Then in this return async function,
      - first, dispatch the asyncActionStart() action. This will turn the loading state to true
      - since we're using an async function, use the `await` keyword and call the delay() function to delay the request for 1 second. The await keyword will wait for the delay() function to finish before performing the next task
      - after that, we want to dispatch another action with the type of INCREMENT_COUNTER and the payload is the amount
      - lastly, dispatch the asyncActionFinish() action. This will turn the loading state back to false
      - note that we want to call the delay() function and dispatch the INCREMENT_COUNTER and asyncActionFinish() actions inside a try/catch block. This way, if there's any problem with this asynchronous action, it's going to be caught by whatever is inside the catch block
      - if an error occurs during the async operation, we catch the error inside the `catch` block. Then we dispatch the asyncActionError() action to send this error to the Redux store in the async reducer. We can do whatever we want with that error in the future
    ```javascript
    import {
      asyncActionError,
      asyncActionFinish,
      asyncActionStart
    } from '../../app/async/asyncReducer';
    import { delay } from '../../app/common/util/utils';

    // Action constant
    const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
    const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

    // Action creator
    export function increment(amount) {
      // We can return an async function because of redux-thunk
      // We get the dispatch method from react-redux
      // This allows us to dispatch multiple actions
      return async function (dispatch) {
        // This will turn the loading indicator from false to true
        dispatch(asyncActionStart());
        try {
          // Delay for 1 second before dispatching the next action
          await delay(1000);
          dispatch({ type: INCREMENT_COUNTER, payload: amount });
          // Turn the loading indicator off - from true to false
          dispatch(asyncActionFinish());
        } catch (error) {
          // If there's an error, send the error to the store
          dispatch(asyncActionError(error));
        }
      };
    }
    ```
  - Do the same thing for the decrement action creator function
  - So now when the 'Increment' or 'Decrement' button is clicked, it'll delay for the amount of time set before it will increment or decrement the counter
- We can use the loading state by displaying a loading icon to the user that something is happening
- In Sandbox.jsx file:
  - Extract and destructure the loading state property from the async reducer using the useSelector() hook
    - `const { loading } = useSelector((state) => state.async);`
  - Then in the 'Increment' Button element, specify the loading property and set its value to the loading state. Do the same thing for the 'Decrement' Button
    ```javascript
    <Button
      loading={loading}
      onClick={() => dispatch(increment(10))}
      content='Increment'
      color='green'
    />
    ```

### [3. Isolating the loading indicators: counter Sandbox]()
- Right now both of the increment and decrement button loading indicators are loading when only one button is clicked. So first we need to identify which button is actually clicked. We can specify a `name` property for each button element. We can then get this name value on the onClick event handler by calling `event.target.name`. For the increment button element, we can name it 'increment' and for the decrement button, name it 'decrement'
- Sandbox.jsx file:
  - Create a target local state using the useState() hook and initialize its value to null
    - `const [target, setTarget] = useState(null);`
  - Inside each of the increment and decrement Button element:
    - Specify the button name property and set the value to 'increment'
    - On the onClick event handler, dispatch the increment action and also call the setTarget() method and pass in `e.target.name`. This will set `name` value of the button element in the target local state
    - So when we click on a button, we're setting the target local state to the name of that button element
    - Then we can use the target state to control the loading indicator. We only show the loading indicator if the target state is equal to the button name AND if the loading state in Redux store is true
    ```javascript
    const [target, setTarget] = useState(null);

    <Button
      name='increment'
      loading={loading && target === 'increment'}
      onClick={(e) => {
        dispatch(increment(10));
        setTarget(e.target.name);
      }}
      content='Increment'
      color='green'
    />
    ```

### [4. Adding toast notifications: react-toastify library]()
- Let's add the ability to notify the user when there's a problem. We'll use a toast notification library called react-toastify
- Install: `npm i react-toastify`
- Toasts, like modals, they need to appear anywhere in our application. For that, we use toasts at the top of the application inside the App.jsx file
- In App.jsx file:
  - Import the react-toastify ToastContainer component: `import { ToastContainer } from 'react-toastify';`
  - Instantiate the `<ToastContainer />` component right after the `<ModalManager />` component
    - Specify the position property and set it to 'bottom-right'
    - Add the hideProgressBar property. This will hide the progress bar when toast notification pops up
    - `<ToastContainer position='bottom-right' hideProgressBar />`
- In index.js file:
  - Import the react-toastify css stylesheet right after the Semantic UI stylesheet
    - `import 'react-toastify/dist/ReactToastify.min.css';`
  - NOTE: the order of these stylesheets is important!
- In testReducer.js file:
  - Import toast: `import { toast } from 'react-toastify';`
  - In the catch block of the action creator functions, call the toast.error() method and pass in the error received from the catch block
    ```js
    catch (error) {
      // If there's an error, send the error to the store
      dispatch(asyncActionError(error));
      // Display a notification to user of the error
      toast.error(error);
    }
    ```
  - To test that the Toast notification is working, throw an error message right after the delay() function in one of the action creators. A toast notification with an error massage 'oops' will pop up when clicking on the 'decrement' button
    ```js
    export function decrement(amount) {
      return async function (dispatch) {
        // This will turn the loading indicator from false to true
        dispatch(asyncActionStart());
        try {
          await delay(1000);
          throw 'oops';
          dispatch({ type: DECREMENT_COUNTER, payload: amount });
          // Turn the loading indicator off - from true to false
          dispatch(asyncActionFinish());
        } catch (error) {
          dispatch(asyncActionError(error));
          toast.error(error);
        }
      };
    }
    ```

### [5. Adding a mock API, create loadEvents action creator]()
- Instead of displaying a static events coming from the sampleData.js file on the EventDashboard page, we can write a fetch-events asynchronous action to fetch the events and store it in the Redux store and then display the events coming from the store. Later on we can fetch the data from a database, such as Firestore, and display it on the page
- In src/app/api folder, create a file called mockApi.js
- In mockApi.js file:
  - Import the delay util function: `import { delay } from '../common/util/util';`
  - Import sampleData file: `import { sampleData } from '../api/sampleData';`
  - Write a fetchSampleData function that delays for 1 second and then returns the sampleData array from sampleData.js file
    ```javascript
    export function fetchSampleData() {
      return delay(1000).then(function () {
        return Promise.resolve(sampleData);
      });
    }
    ```
- **Async action creator function structure:**
  ```javascript
  export function loadEvents() {
    return async function(dispatch) {
      try {

      } catch (error) {

      }
    }
  }
  ```
- We're going to create a loadEvents action creator that calls the fetchSampleData() method to fetch the sampleDate from sampleData.js file. Once this is completed (an async operation), we will use a try/catch block to dispatch the FETCH_EVENTS action type and pass in the events data as payload to our Redux store
- In eventConstants.js file:
  - Add a fetch event constant
    - `export const FETCH_EVENTS = 'FETCH_EVENTS';`
- In eventActions.js file:
  - Import the fetch-event constant: `import { FETCH_EVENTS } from './eventConstants';`
  - Import the async actions: `import { asyncActionError, asyncActionFinish, asyncActionStart } from '../../app/async/asyncReducer';`
  - Import the fetchSampleData function: `import { fetchSampleData } from '../../app/api/mockApi';`
  - Write a loadEvents action creator function that fetches the events data from sampleData.js file and dispatches the FETCH_EVENTS action asynchronously
    - This function returns an async function
    - The async function takes a dispatch as an argument. It is a dispatch() method coming from react-redux to dispatch actions
    - It first dispatches the asyncActonStart() action creator
    - Then in the try/catch block:
      - It calls the fetchSampleData() method to get the data from sampleData.js file and assigns the data to the `events` variable. The `await` keyword is in front of this method because it will wait for this method to complete and have the data returned before moving forward. If this operation fails, it will not move on and will throw an error and the catch block will catch it
      - Once the data is stored in the events variable, the function dispatches the FETCH_EVENTS action with the payload of the `events` data. The eventReducer will look for this FETCH_EVENTS action and will store the events data in the Redux store
      - Lastly, it dispatches the asyncActionFinish() action creator
      - If there's a problem occurred in this process, the catch block will catch the error and the asyncActionError() action is dispatched to received this error
    ```javascript
    export function loadEvents() {
      return async function (dispatch) {
        dispatch(asyncActionStart());
        try {
          const events = await fetchSampleData();
          // console.log(events)
          dispatch({ type: FETCH_EVENTS, payload: events });
          dispatch(asyncActionFinish());
        } catch (error) {
          dispatch(asyncActionError(error));
        }
      };
    }
    ```
- In eventReducer.js file:
  - Import the FETCH_EVENTS constant: `import { FETCH_EVENTS } from './eventConstants';`
  - For the initialState, set the initial values for the `events` property to an empty array instead. We no longer need the sampleData array
    ```javascript
    const initialState = {
      events: []
    };
    ```
  - Inside the eventReducer function:
    - Add a case for FETCH_EVENTS action
    - It returns an object of the original state and the `events` property is set to the payload. Payload contains the events array because the loadEvents() event action creator was invoked and triggered the fetchSampleData() method
      ```javascript
      case FETCH_EVENTS:
        return {
          ...state,
          events: payload
        };
      ```
- Just for testing purposes to see that our async loadEvents() action creator is working properly we can dispatch this action inside the index.js file
- In index.js file:
  - Import the loadEvents() action creator: `import { loadEvents } from './features/events/eventActions';`
  - This file contains the `store` variable so it can dispatch an action creator here
  - To load events from the store onto the EventDashboard page, we can call the loadEvents() action using the store.dispatch() method
    - `store.dispatch(loadEvents());`
  - Notice that this is now an asynchronous action and there's a slight delay before the events load onto the page. This is because in the fetchSampleData() method, we added the `delay(1000)` method for 1 second

### [6. Adding a LoadingComponent to EventDashboard page]()
- On the EventDashboard page, while we are fetching the events data, it would be nice to have a loading indicator to let the use know that something is still happening. We're going to create a LoadingComponent that we can display to the user whenever something is still loading
- In src/app/layout folder, create a component/file called LoadingComponent.jsx
- In LoadingComponent.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic components: `import { Dimmer, Loader } from 'semantic-ui-react';`
  - Write a LoadingComponent functional component that renders a Loader using Semantic UI
    - This component takes some default-value properties
    - The Dimmer Semantic component dims the background page while it is loading
    ```javascript
    export default function LoadingComponent({ inverted = true, content = 'Loading...' }) {
      return (
        <Dimmer inverted={inverted} active={true}>
          <Loader content={content} />
        </Dimmer>
      )
    }
    ```
- In EventDashboard.jsx file:
  - Import the LoadingComponent component: `import LoadingComponent from '../../../app/layout/LoadingComponent';`
  - What we want to do is find out if we're loading. We can find that out from our asyncReducer in Redux store using the useSelector() hook. Destructure the `loading` property
    - `const { loading } = useSelector((state) => state.async);`
  - Then write an if statement to check if we're loading. If we are, we want to return/display the `<LoadingComponent />` component on the page
    - `if (loading) return <LoadingComponent />;`
  - If we are not loading or finished loading, then we want to return/display the JSX

### [7. Using placeholders to improve the UI: EventListItemPlaceholder component]()
- Instead of having a loading indictor taking up the entire page while we are waiting for the content to load, we can indicate the loading using a Semantic UI Placeholder component. A placeholder is used to reserve space for content that soon will appear in a layout. This is a common practice. So we can design where the EventListItem component is showing that it's loading while we're waiting for its content
- In src/features/events/eventDashboard folder, create a component/file called EventListItemPlaceholder.jsx
- In EventListItemPlaceholder.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic components: `import { Segment, Button, Placeholder } from 'semantic-ui-react';`
  - Write a EventListItemPlaceholder functional component that renders a loading placeholder using Semantic UI
    ```javascript
    import React from 'react';
    import { Segment, Button, Placeholder } from 'semantic-ui-react';

    function EventListItemPlaceholder() {
      return (
        <Placeholder fluid>
          <Segment.Group>
            <Segment style={{ minHeight: 110 }}>
              <Placeholder>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Segment>
            <Segment>
              <Placeholder>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            </Segment>
            <Segment secondary style={{ minHeight: 70 }} />
            <Segment clearing>
              <Button disabled color='blue' floated='right' content='View' />
            </Segment>
          </Segment.Group>
        </Placeholder>
      );
    }

    export default EventListItemPlaceholder;
    ```
- In EventDashboard.jsx file:
  - Import the EventListItemPlaceholder component: `import EventListItemPlaceholder from './EventListItemPlaceholder';`
  - We can now remove the LoadingComponent component and use the EventListItemPlaceholder component as loading indicator instead
  - Just above the `<EventList />` component, write a conditional that if `loading` state is true, then render the EventListItemPlaceholder component (render it twice)
    ```javascript
    {loading && (
      <>
        <EventListItemPlaceholder />
        <EventListItemPlaceholder />
      </>
    )}
    ```

### [8. Adding an event filters component: EventFilters component]()
- We want our user to be able to filter the event list based on the filter setting. They can also filter the events by selecting a date on a calendar. These filters will be on the right hand column of the EventDashboard page. We will use a react-calendar widget library for the calendar
- Install the React Calendar widget: `npm i react-calendar`
- In src/features/events/eventDashboard folder, create a component/file called EventFilters.jsx
- In EventFilters.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic components: `import { Header, Menu } from 'semantic-ui-react';`
  - Import the Calendar component: `import Calendar from 'react-calendar';`
  - Write an EventFilters component that renders a filter menu and a calendar widget using Semantic UI
    ```javascript
    import React from 'react';
    import Calendar from 'react-calendar';
    import { Header, Menu } from 'semantic-ui-react';

    function EventFilters() {
      return (
        <>
          <Menu vertical size='large' style={{ width: '100%' }}>
            <Header icon='filter' attached color='teal' content='Filters' />
            <Menu.Item content='All Events' />
            <Menu.Item content="I'm going" />
            <Menu.Item content="I'm hosting" />
          </Menu>
          <Header icon='calendar' attached color='teal' content='Select date' />
          <Calendar />
        </>
      );
    }

    export default EventFilters;
    ```
- In EventDashboard.jsx file:
  - Import the EventFilters component: `import EventFilters from './EventFilters';`
  - In the 6-width grid column, render the EventFilters component
    ```javascript
    <Grid.Column width={6}>
      <EventFilters />
    </Grid.Column>
    ```
- In index.js file:
  - Import the react-calendar stylesheet right after the react-toastify stylesheet
    - `import 'react-calendar/dist/Calendar.css';`
- In styles.css file:
  - Style the react-calendar so that it takes up the full width of the column
  ```css
  .react-calendar {
    width: 100%;
    border: none;
    box-shadow: 0 1px 2px 0 rgba(34, 36, 38, .15);
  }
  ```
- At the moment there's no functionality to the calender, but later on we will be able to filter events using this calendar


## INTRO TO FIRESTORE

**Firestore**
- Firestore is another type of database in the Google Firebase architecture
- Firestore is an area where we can have Collections contain Documents. Those Documents can contain Collections. And the Documents can contain Fields. The Fields can be key/value pairs or objects. An object is made up of key/value properties
- Firestore is NOT a relational database. Firestore is more optimized for reading data rather than writing database
- NoSQL database. That means we can't write structured-query-language queries to query database
- Firestore is more structured than Firebase. Firebase was just one giant json document of keys and values
- Easier to query, can sort and filter at the same time
- Scalable

**Realtime database** 
- We maintain a persistent connection to the database. And anytime there's an update, anybody who's browsing our application and listening to that particular collection in Firestore will get live updates
- For example, if somebody creates a new event in our application and we send that up to Firestore, then anybody who's connected is also going to receive live of that event
- This means that we don't have to write Javascript code to update our application because we maintain that connection to Firestore. As soon as Firestore is updated, then we get the updates on our application without needing to do the extra work

### [1. Setting up Firebase, create Firestore]()
- Website: https://console.firebase.google.com/ Login to the Firebase console with a Google account
- Click the 'Add project' button to create a new project. Give the project a name. If the billing plan screen pops up, choose a different project name. This project is called `re-vents`
- Disable the Google Analytics for this project
- Next is we need to add configuration to our application. Under Home menu, click on the 'Web' icon
  - Register the app and give the app a nickname. Call it re-vents
  - It then gives us a whole bunch of keys and information about the configuration of our Firebase project
  - Copy the code inside the `firebaseConfig` body
- Install the Firebase Javascript SDK
  - `npm i firebase`
- In src/app/config folder, create a file called firebase.js
- In firebase.js file:
  - After installing the Firebase Javascript SDK, we can import various aspects and individual elements of Firebase we want to use in our our app
    ```javascript
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/firestore';
    import 'firebase/compat/database';
    import 'firebase/compat/auth';
    import 'firebase/compat/storage';
    ```
  - Create a firebaseConfig object and paste in the code
    ```javascript
    const firebaseConfig = {
      PASTE_FIREBASE_CONFIG_HERE
    }
    ```
  - We can then initialize our app with firebase and initialize the firestore part
    ```javascript
    firebase.initializeApp(firebaseConfig);
    firebase.firestore();

    export default firebase;
    ```

### [2. Firestore document fields, add events Collection]()
- We're going to manually add data to Firestore database to get a feel of the database structure
- In Firebase, there are two types of database we can create. One is the **Firebase database** and the other is the **Firestore database**
- In Firebase re-vent main dashboard:
  - We want the 'Cloud Firestore' database. Select this in the menu bar
  - Next, click on the 'Create database' button. Select the 'Start in test mode' option
  - Select a 'Cloud Firestore location' closest to you
- Now a cloud Firestore database has been generated for the project
- On the Cloud Firestore page, click on the 'Start collection' button and give the Collection an ID. Call it `events`
- In the `events` Collection:
  - Click on the 'Auto-ID' button. This auto-generates a Document ID for the Collection
  - Fill out the document with the details of an event we've been using. For example,
    - a Field is title, with a Type of string, and a Value of Firestore test event
    - next Field is category, with a Type of string, and a Value of travel
    - the Type for a date Field is timestamp
    - the Type for an object Field is map
    - the Type for attendees Field is an array. Each item in the array is an object Field
  - We're filling in this document data one time to get a feel of the Collection structure

### [3. Listening to Firestore data]()
- Now that we have some data in Firestore, let's implement how we can get the data into our application
- In src/app/firestore folder, create a file called firestoreService.js. This file stores our Firebase and Firestore queries
- In firestoreService.js file:
  - Import firebase from our config: `import firebase from '../config/firebase';`
  - Access the Firestore db:
    - `const db = firebase.firestore();`
  - There are two ways to get data from Firestore. We can either listen to the data or get the data. Use .onSnapshot() method to listen to the data 
    - The .onSnapshot() method takes an observer as an argument
  - Write a getEventsFromFirestore function that gets the events collection from Firestore
    - This function takes an observer as an argument
    - To get a specific collection from Firestore, use db.collection(), and pass in the name of the collection
    - The .onSnapshot() method listens to the data on Firestore and it takes an observer as an argument
    ```javascript
    import firebase from '../config/firebase';

    const db = firebase.firestore();

    export function getEVentsFromFirestore(observer) {
      // .onSnapshot method is listening to the data
      return db.collection('events').onSnapshot(observer);
    }
    ```
- When we're in a component and we want to do something, such as querying an API, we use the useEffect() hook from React. This allows us to do something when the component mounts and dismounts
- In EventDashboard.jsx file:
  - Import useEffect() hook: `import React, { useEffect } from 'react';`
  - Call the useEffect() hook:
    - The useEffect() hook takes a callback function as 1st arg and a dependencies array as 2nd arg
    - When it comes to Firestore, we're going to subscribe, so we're listening to the data, and then we're going to unsubscribe. We're going to subscribe when the component mounts and unsubscribe when the component unmounts
    - In this callback function:
      - Specify an unsubscribe function variable and set it equal to the getEventsFromFirestore() function
      - In this getEventsFromFirestore() function, we need to pass in an observer. What we get back from this function is:
        - a `next` handler. And this is going to be what happens next after we received the data back from Firestore, what do we want to do next with it. Now, our data comes back from Firestore as a snapshot. This snapshot is a collection, so it'll return to us an array of documents in the form of `snapshot.docs`. We can use the .map() method to loop over the array to get the individual event, `docSnapshot`. Then inside this `docSnapshot` we can get the data from the events using `docSnapshot.data()`
        - an error. We're going to console log the error for now
    - Everything inside this callback function is what's going to happen when the component mounts. And because we're listening to something, we're subscribing to something, and then we want to do something when the component unmounts
    - In our case, we want to return a function inside this useEffect() hook when the component unmounts. We return the unsubscribe function in order to unsubscribe from listening to the Firestore data when the component unmounts. When the return function is called, this is what is called when the component unmounts. So anything we add inside this return is effectively going to take an action to unsubscribe from listening to the data: `return unsubscribe;`
    ```javascript
    import React, { useEffect } from 'react';
    import { getEVentsFromFirestore } from '../../../app/firestore/firestoreService';

    useEffect(() => {
      const unsubscribe = getEventsFromFirestore({
        next: (snapshot) =>
          console.log(snapshot.docs.map((docSnapshot) => docSnapshot.data())),
        error: (error) => console.log(error)
      });
      return unsubscribe;
    });
    ```

### [4. Shaping the Firestore data, getting it into Redux store]()
- The data we get back from Firestore has missing document id and the format of the date property is Firestore Timestamp, which is not usable for us. A common thing to do with Firebase and Firestore is shape the data so it's usable in our application. We're going to create a function to help us do that
- In firestoreService.js file:
  - Write a dataFromSnapshot function that makes changes to the data from snapshot and returns the new version of data
    - This function takes snapshot as an argument
    - First thing we want to check is if snapshot exists
      - If it doesn't, return `undefined`
      - If it does exist, we want to get the data out of the snapshot by calling `snapshot.data()` and assign it to `data` variable
    - What we return from this function as an object is: the existing data and the id of snapshot.id 
    ```javascript
    export function dataFromSnapshot(snapshot) {
      // If snapshot doesn't exist, return undefined
      if (!snapshot.exists) return undefined;
      // If it does exist, get the data from snapshot
      const data = snapshot.data();

      // Return the existing data and the id from snapshot.id
      return {
        ...data,
        id: snapshot.id
      };
    }
    ```
- In EventDashboard.jsx file:
  - Import the dataFromSnapshot function: `import { dataFromSnapshot } from '../../../app/firestore/firestoreService';`
  - When mapping through each docSnapshot, we want to call the dataFromSnapshot() function and pass in docSnapshot as an argument
    - `console.log(snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot)))`
  - Now the data we get back should include an id property with the document id
- Next is we want to convert Firestore timestamp date into Javascript date object
- Back in firestoreService.js file and inside the dataFromSnapshot() function:
  - We want to check to see the type of object we get back inside the data. So we're going to loop over all the properties inside the snapshot data. If a property of the data object is a Firestore Timestamp, then we want to convert it into a Javascript date object
  - The date property of data object that we get back from snapshot comes with a handful of methods, and one of those methods is `.toDate()`. This method will convert the timestamp into Javascript date
  - `for (const prop in data) { ... }` this is going to loop over all the properties/prop inside the data object
  - The `if (data.hasOwnProperty(prop)) {...}` is checking for the data properties only, excluding other types of properties
  - Then check to see if the data[prop] is an instance of firebase.firestore.Timestamp. And if it is, we can all the .toDate() method on that data[prop]. And then assign this Javascript date object back to data[prop]
    ```javascript
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        if (data[prop] instanceof firebase.firestore.Timestamp) {
          data[prop] = data[prop].toDate();
        }
      }
    }
    ```
  - Final code:
    ```js
    export function dataFromSnapshot(snapshot) {
      // If snapshot doesn't exist, return undefined
      if (!snapshot.exists) return undefined;
      // If it does exist, get the data from snapshot
      const data = snapshot.data();

      for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
          if (data[prop] instanceof firebase.firestore.Timestamp) {
            data[prop] = data[prop].toDate();
          }
        }
      }

      // Return the existing data and the id from snapshot.id
      return {
        ...data,
        id: snapshot.id
      };
    }
    ```
- **Storing Firestore data in Redux store:**
- Now that we have a data in a format that we can use, we'll create a new action creator in our Redux store, so we can pass the events that we get back from Firestore into the eventReducer
- In eventActions.js file:
  - Write a listenToEvents action creator function that returns as an object, a FETCH_EVENTS action and a payload property of events
    - This function takes events as an argument
    ```javascript
    export function listenToEvents(events) {
      return {
        type: FETCH_EVENTS,
        payload: events
      };
    }
    ```
- In index.js file:
  - We no longer load events directly from our store anymore. We will load events from Firestore instead
  - Remove this and the loadEvents import: `store.dispatch(loadEvents());`
- Back in EventDashboard.jsx file:
  - Import useDispatch() hook: `import { useDispatch } from 'react-redux';`
  - Import the listToEvents() action: `import { listenToEvents } from '../eventActions';`
  - Create a dispatch() method using the useDispatch() hook
    - `const dispatch = useDispatch();`
  - Now we can dispatch the listenToEvents() action to get the events from Firestore and store the events in the eventReducer. Note that the listenToEvents() action is using the FETCH_EVENTS action type and the payload of events to store the events from Firestore in Redux store
    - The listenToEvents() action takes events as an argument. And the events is the snapshot from Firestore
    ```javascript
    import {
      dataFromSnapshot,
      getEVentsFromFirestore
    } from '../../../app/firestore/firestoreService';
    import { listenToEvents } from '../eventActions';

    useEffect(() => {
      const unsubscribe = getEventsFromFirestore({
        next: (snapshot) =>
          dispatch(
            listenToEvents(
              snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
            )
          ),
        error: (error) => console.log(error)
      });
      return unsubscribe;
    });
    ```
  - Now on the EventDashboard page, we can see the event information is coming from Firestore db. And when there's an update in Firestore data, our eventDashboard component gets the updated data right away and causes the component to re-render because it is listening to the Firestore data
  - **A NOTE on the useEffect() hook:**
    - When we use useEffect(), we need to be careful of how many it's going to run. Every time this component receives properties, or the state reloads, or something is changing, the component will re-render and the code inside the useEffect() hook will run as well
    - When using useEffect() hook, we also need to provide it an array of dependencies as a 2nd argument. This ensures that the component only re-renders when there's a change in the listed dependencies
    - We only want to listen to the Firestore data when the component mounts and unlisten when the component unmounts. We don't want to call this action every time the component re-renders
    - In our case, the dependency is the dispatch() method. We can list dispatch as a dependency in the dependency array
      - `useEffect(callback, [dispatch])`

### [5. Restoring the loading indicator]()
- What happens when we listen to data from Firestore is we don't get a promise from Firestore. We're observing the data
- There's actually three parts to the `observer` response we get from Firestore:
  - `next` - we get to say what happens next, i.e we can dispatch an action to update the events in Redux store
  - `error` - we may get an error and we can do whatever we want with this
  - `complete` - when we're listening to the data, we actually will never get to this point. When we're listening to the data, we're either listening or we're unsubscribing
- Let's turn on our loading indicator when we're getting data from Firestore and turn off the loading indicator when we're done
- In EventDashboard.jsx file:
  - Import async actions: `import { asyncActionError, asyncActionFinish, asyncActionStart } from '../../../app/async/asyncReducer';`
  - Inside useEffect() hook:
    - Before we start listening to Firestore data, we can turn on the loading indicator by dispatching the asyncActionStart() action
    - Once we have the data, we can turn off the loading indicator by dispatching the asyncActionFinish() action
    - Also if there's an error returned, dispatch the asyncActionError() action to store the error in Redux store
    ```javascript
    useEffect(() => {
      // turn on loading indicator
      dispatch(asyncActionStart());
      const unsubscribe = getEVentsFromFirestore({
        // what to do next with the data
        next: (snapshot) => {
          dispatch(
            listenToEvents(
              snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
            )
          );
          // turn off loading indicator
          dispatch(asyncActionFinish());
        },
        // store the error message in Redux store
        error: (error) => dispatch(asyncActionError(error)),
        // when listening to the data, we'll never get to this point
        complete: () => console.log('you will never see this message')
      });
      return unsubscribe;
    }, [dispatch]);
    ```

### [6. Creating a custom hook: useFirestoreCollection() hook]()
- Up until now we've been using other people's hooks to write our application. Our useEffect() hook inside our EventDashboard component is getting long with more actions being dispatched. We can write our own custom hook so it can be reusable
- Our current useEffect() hook when EventDashboard component mounts:
  ```js
	useEffect(() => {
		// turn on loading indicator
		dispatch(asyncActionStart());
		const unsubscribe = getEVentsFromFirestore({
			// what to do next with the data
			next: (snapshot) => {
				dispatch(
					listenToEvents(
						snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
					)
				);
				// turn off loading indicator
				dispatch(asyncActionFinish());
			},
			// store the error message in Redux store
			error: (error) => dispatch(asyncActionError(error)),
			// when listening to the data, we'll never get to this point
			complete: () => console.log('you will never see this message')
		});
		return unsubscribe;
	}, [dispatch]);
  ```
- In src/app/hooks folder, create a file called useFirestoreCollection.js
  - By convention, whenever creating a hook, start with 'use'
- In useFirestoreCollection.js file:
  - Import dispatch() hook: `import { useDispatch } from "react-redux";`
  - Import useEffect() hook: `import { useEffect } from "react";`
  - Import async actions: `import { asyncActionError, asyncActionFinish, asyncActionStart } from "../async/asyncReducer";`
  - Import the dataFromSnapshot function: `import { dataFromSnapshot } from "../firestore/firestoreService";`
  - Write a useFirestoreCollection custom hook
    - This hook takes query, data, and deps as parameters in an object. The nice thing about setting the parameter as an object (annotated with `{}`) is that later on when we use this custom hook we can write the arguments in any order we like
      - `export default function useFirestoreCollection({ query, data, deps }) {..}`
      - The query: the Firestore query we want to use
      - The data: what to do when we receive the data back from the query
      - The deps: any dependencies that the useEffect() hook need
    - We can use hooks inside a hook
    - Create a dispatch method using useDispatch() hook
      - `const dispatch = useDispatch();`
    - Call the useEffect() hook:
      - This hook takes a callback function as 1st arg and an array of dependencies as 2nd arg
      - Inside the callback function:
        - Dispatch the asyncActionStart() action
        - Then create an unsubscribe function that queries the Firestore db to get the data in snapshot using query().onSnapshot() methods
        - The .onSnapshot() takes an observer as an argument
        - Once the snapshot comes back,
          - transform the snapshot into a usable format using the dataFromSnapshot() method and assign the result to docs variable
          - set the data property and pass in the docs
          - dispatch the asyncActionFinish() action
        - If there's an error, dispatch the asyncActionError() action to store the error in Redux store
      - The useEffect() hook returns a callback function and call the unsubscribe() function inside the callback. This will unsubscribe to Firestore when the component unmounts
      - Lastly, pass in the dependencies this useEffect() hook needs. Now, we're not going to pass the deps inside an array here, but we're going to pass it from the component that uses this custom hook
        - eslint will throw a warning about this and we can disable the warning
    ```javascript
    import { useEffect } from 'react';
    import { useDispatch } from 'react-redux';
    import {
      asyncActionError,
      asyncActionFinish,
      asyncActionStart
    } from '../async/asyncReducer';
    import { dataFromSnapshot } from '../firestore/firestoreService';

    export default function useFirestoreCollection({ query, data, deps }) {
      const dispatch = useDispatch();

      useEffect(() => {
        dispatch(asyncActionStart())
        // query the Firestore db
        // once the data comes back in snapshot, map over it, format the data, and store it in 'data'
        // store any error in Redux store
        // lastly, the component that uses this hook will provide the dependency array
        const unsubscribe = query().onSnapshot(
          snapshot => {
            const docs = snapshot.docs.map(doc => dataFromSnapshot(doc))
            data(docs)
            dispatch(asyncActionFinish())
          },
          error => dispatch(asyncActionError(error))
        )
        // once completed, unsubscribe to Firestore
        return () => {
          unsubscribe()
        }
      }, deps) //eslint-disable-line react-hooks/exhaustive-deps
    }
    ```
- In firestoreService.js file:
  - We're going to change the functioning and the name of the getEventsFromFirestore function. This function will be listening to events from Firestore and returns the events collection. It'll no longer getting the snapshot as the useFirestoreCollection custom hook will handle that
    ```javascript
    // A query function
    export function listenToEventsFromFirestore() {
      return db.collection('events');
    }
    ```
- **Using the custom useEffect() hook:**
- In EventDashboard.jsx file:
  - Import the useFirestoreCollection() custom hook: `import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';`
  - Import the listenToEvents() action: `import { listenToEvents } from '../eventActions';`
  - Import the listenToEventsFromFirestore query function: `import { listenToEventsFromFirestore } from '../../../app/firestore/firestoreService';`
  - Instead of using useEffect() hook in this component, we're going to use the custom firestoreService() hook
    - This custom hook takes query, data, and deps parameters as an object
    - For query param, it's going to call the listenToEventsFromFirestore() method
    - For data param, the arrow function will take events that we got back from the query as an argument and then dispatches the listenToEvents() action that takes the events as an argument
    - For deps param, list dispatch as a dependency in the dependencies array
    ```javascript
    useFirestoreCollection({
      // get events collection from Firestore db
      query: () => listenToEventsFromFirestore(),
      // store events in eventReducer store by dispatching listenToEvents action creator
      data: (events) => dispatch(listenToEvents(events)),
      // provide any dependencies in an array
      deps: [dispatch]
    });
    ```

### [7. Adding a useFirestoreDoc() hook]()
- We want to get individual documents rather than a collection from Firestore. We need to create another custom hook and a query function to get a document from Firestore
- In src/app/hooks folder, create a file called useFirestoreDoc.js
- In useFirestoreDoc.js file:
  - Import the following:
    ```javascript
    import { useEffect } from "react";
    import { useDispatch } from "react-redux";
    import { asyncActionError, asyncActionFinish, asyncActionStart } from "../async/asyncReducer";
    import { dataFromSnapshot } from "../firestore/firestoreService";
    ```
  - Write a useFirestoreDoc custom hook that listens to Firestore when component mounts and unsubscribe when the component unmounts
    - The snapshot that it comes back is a document based on the eventId
    ```javascript
    export default function useFirestoreDoc({ query, data, deps }) {
      const dispatch = useDispatch();

      useEffect(() => {
        dispatch(asyncActionStart())
        const unsubscribe = query().onSnapshot(
          snapshot => {
            data(dataFromSnapshot(snapshot))
            dispatch(asyncActionFinish())
          },
          error => dispatch(asyncActionError(error))
        )
        return () => {
          unsubscribe()
        }
      }, deps) //eslint-disable-line react-hooks/exhaustive-deps
    }
    ```
- In firestoreService.js file:
  - Create a listenToEventFromFirestore function that queries the events collection in Firestore db and returns an event document based on the event id
    - This function take an eventId as an argument
    ```javascript
    export function listenToEventFromFirestore(eventId) {
      return db.collection('events').doc(eventId);
    }
    ```
- **Using the custom hook:**
- In EventDetailedPage.jsx file:
  - Import the following:
    ```javascript
    import { useDispatch, useSelector } from 'react-redux';
    import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
    import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
    import { listenToEvents } from '../eventActions';
    import LoadingComponent from '../../../app/layout/LoadingComponent';
    ```
  - Create a dispatch method using useDispatch hook
    - `const dispatch = useDispatch();`
  - Use the custom useFirestoreDoc() hook
    - This custom hook takes query, data, and deps parameters as an object
    - If there's a change in eventId in the URL params, the component will re-render and what's inside the custom hook will run
    ```javascript
    useFirestoreDoc({
      // query an event doc in the events collection in Firestore db
      query: () => listenToEventFromFirestore(match.params.id),
      // store the event in Redux store
      data: (event) => dispatch(listenToEvents([event])),
      deps: [match.params.id, dispatch]
    });
    ```
  - Because we're going to wait for the event to come back from Firestore (async operation), we're going to add the loading indicator as well
  - Extract the loading property from the asyncReducer using useSelector() hook
    - `const { loading } = useSelector((state) => state.async);`
  - Check to see if loading state is true or if there's no event in the store. If one of these cases is true, return the `<LoadingComponent />` component instead of JSX
    - `if (loading || !event) return <LoadingComponent content='Loading event...' />;`

### [8. Handling not found documents]()
- When we try to fetch an event from Redux store or from Firestore, we use the event id from the URL params of the EventDetailedPage. When we try to get a document in Firestore based on the event id and it can't find it, Firestore will not return an error. However, it will still return a snapshot object and in the snapshot, there's an `exists` property that's set to `false`
- We can use this `exists` property to check if a document data is found in Firestore. If this `exists` property is false, we can dispatch an asyncActionError() action and provide a custom code and message about the error
- In useFirestoreDoc.js file:
  - Write a condition to check if snapshot.exists property is false
  - If it is, dispatch the asyncActionError() action and provide a custom error code and message
  - And then return. This means the function will stop executing any code after this
    ```javascript
    useEffect(() => {
      dispatch(asyncActionStart());
      const unsubscribe = query().onSnapshot(
        (snapshot) => {
          // check to see what we're getting back in snapshot object
          console.log(snapshot)
          // if the exists property in snapshot is set to false
          // dispatch the error action and give a custom error message and code
          if (!snapshot.exists) {
            dispatch(
              asyncActionError({
                code: 'not-found',
                message: 'Could not find document'
              })
            );
            // stop any code after this from running
            return;
          }
          // shaping the data in snapshot and pass it to data function
          data(dataFromSnapshot(snapshot));
          dispatch(asyncActionFinish());
        },
        (error) => dispatch(asyncActionError(error))
      );
      return () => {
        unsubscribe();
      };
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
    ```
- So in the event that we don't get back an event doc from Firestore (event doesn't exist), we're rendering the `<LoadingComponent />` component. However, the loading indicator keeps running and we're not turning it off as long as we don't have an event doc for the EventDetailedPage

### [9. Adding an error component: ErrorComponent]()
- The current problem we're having is if no event document is found, the `<LoadingComponent />` is continuously running. Also, we're not letting our user know what's going on or why we're not able to display the event detail on the page. So we're going to create an error component to handle errors and redirect user
- In src/app/common/errors folder, create a component/file called ErrorComponent.jsx
- In ErrorComponent.jsx file:
  - Import the following:
    ```javascript
    import React from 'react';
    import { useSelector } from 'react-redux';
    import { Button, Header, Segment } from 'semantic-ui-react';
    import { Link } from 'react-router-dom';
    ```
  - Write an ErrorComponent functional component that displays an error message and a button that directs the user to the events page
    - Extract the error property from asyncReducer using useSelector() hook
      - `const { error } = useSelector((state) => state.async);`
    ```javascript
    export default function ErrorComponent() {
      const { error } = useSelector((state) => state.async);

      return (
        <Segment placeholder>
          <Header
            textAlign='center'
            content={error?.message || 'Oops - we have an error'}
          />
          <Button
            as={Link}
            to='/events'
            primary
            style={{ marginTop: 20 }}
            content='Return to events page'
          />
        </Segment>
      );
    }
    ```
- In App.jsx file:
  - Import the ErrorComponent: `import ErrorComponent from '../common/errors/ErrorComponent';`
  - Create a route for the ErrorComponent
    - `<Route path='/error' component={ErrorComponent} />`
    - When we redirect user to '/error', the ErrorComponent will render
- In EventDetailedPage.jsx file:
  - Import the Redirect component: `import { Redirect } from 'react-router-dom';`
  - Extract the error property from asyncReducer using useSelector() hook
    - `const { loading, error } = useSelector((state) => state.async);`
  - If loading is true OR if there's no event AND no error, render the LoadingComponent
    - `if (loading || (!event && !error)) return <LoadingComponent content='Loading event...' />;`
  - Write a condition that checks for the error state. If there's an error, render the `<Redirect />` component (from react-router-dom) and set the path to '/error'. The route of this '/error' path will render the ErrorComponent on the error page
    - `if (error) return <Redirect to='/error' />;`

### [10. Creating and updating events in Firestore]()
- At the moment, when we go to manage our event (the EventForm) the data will populate in the EventForm, but when we refresh the page the data will disappear. So we need to go to Firestore to retrieve the event when we refresh the page
- In EventForm.jsx file:
  - Import the following:
    ```javascript
    import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
    import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
    import { listenToEvents } from '../eventActions';
    import LoadingComponent from '../../../app/layout/LoadingComponent';
    import { Redirect } from 'react-router-dom';
    import { useSelector, useDispatch } from 'react-redux';
    ```
  - Extract the loading and error properties from asyncReducer using useSelect() hook
    - `const { error, loading } = useSelector((state) => state.async);`
  - When we want to update an event by clicking on the 'Manage Event' button, it'll route to the update event form and the event information is populated in the input fields. However, when we refresh the page, the event information is no longer there. The data doesn't persist. We need to load the event info from Firestore when the component mounts
  - Use the useFirestoreDoc() custom hook we wrote for the EventDetailedPage component
  - Also the conditional logic to display the loading indicator
  - Also the conditional logic to display the error page
    ```javascript
    const selectedEvent = useSelector((state) =>
      state.event.events.find((e) => e.id === match.params.id)
    );
    const { loading, error } = useSelector((state) => state.async);

    useFirestoreDoc({
      query: () => listenToEventFromFirestore(match.params.id),
      data: (event) => dispatch(listenToEvents([event])),
      deps: [match.params.id, dispatch]
    });

    if (loading || (!selectedEvent && !error))
      return <LoadingComponent content='Loading event...' />;

    if (error) return <Redirect to='/error' />;
    ```
  - Now the event data persists when we refresh the page
- Next is we need to create two functions that will allow us to add an event and update an event in Firestore when we are submitting the EventForm
- In firestoreService.js file:
  - Import cuid library: `import cuid from 'cuid';`
  - Write an addEventToFirestore function that adds an event to the 'events' collection in Firestore
    - This function takes an event as an argument
    - It will first query the 'events' collection and then call the .add() method
    - The add() method adds a new document to the collection and automatically assigns a document ID. It returns a Promise resolved with a DocumentReference pointing to the newly created document after it has been written to the backend
    - To add an array, use the `firebase.firestore.FieldValue.arrayUnion()` method
    - Since we don't have any users at the moment, we're going to add the data manually
    ```javascript
    import cuid from 'cuid';

    export function addEventToFirestore(event) {
      return db.collection('events').add({
        ...event,
        hostedBy: 'Diana',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/28.jpg',
        attendees: firebase.firestore.FieldValue.arrayUnion({
          id: cuid(),
          displayName: 'Diana',
          photoURL: 'https://randomuser.me/api/portraits/men/28.jpg'
        })
      });
    }
    ```
  - Write an updateEventInFirestore query function that updates an event in the 'events' collection in Firestore
    - This function takes an event as an argument
    - It will first query the events collection, then the event document by its id, and then call the .update() method to update the event data
    ```javascript
    export function updateEventInFirestore(event) {
      return db.collection('events').doc(event.id).update(event);
    }
    ```
- In EventForm.jsx file:
  - Import toast method: `import { toast } from 'react-toastify';`
  - Import addEventToFirestore and updateEventInFirestore functions: `import { addEventToFirestore, updateEventInFirestore } from '../../../app/firestore/firestoreService';`
  - In handling the onSubmit form event:
    - First extract the setSubmitting method from Formik
    - We'll submit the form in an try/catch block since this is an asynchronous action. This way, we can catch the error if we can't add or update an event in Firestore
    - If error, call toast.error() method to display a notification with the error message and setSubmitting() to false. When isSubmitting is true, the loading indicator is on and we don't want it to be on forever
    - Next, instead of dispatching the updateEvent() and the createEvent() actions, we'll use the updateEventInFirestore() and addEventToFirestore() query functions and pass in the values as argument. This will take the values from the EventForm and update or add the event in Firestore
    - Since this is an async operation, we'll need to turn the arrow function into an async/await function. Add the async keyword in front of the arrow function and add the await keyword in front of the updateEventInFirestore() function and also in front of the addEventToFirestore() function
    - After adding or updating an event, setSubmitting() back to false. And then direct user to the events page
    ```javascript
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
    ```

### [11. Fix an issue with create event, sort events by date]()
- We're running into a problem when we click on the 'Create Event' button to create a new event. The useFirestoreDoc() hook runs and tries to find an event document id in Firestore. Obviously when we first try to create a new event, there isn't an event id. When we're creating a new event, we don't want to run the useEffect()/useFirestoreDoc() hook which trigger the query in Firestore. However, we cannot stop running a useEffect() hook and that's the rule
- To work around this issue, we can write a condition to exit out of the useFirestoreDoc() hook and thus listening to Firestore doesn't start when we're creating a new event
- In useFirestoreDoc.js file:
  - Add another parameter `shouldExecute` and set it to true by default
    - `export default function useFirestoreDoc({ query, data, deps, shouldExecute = true }) {..}`
  - Then inside the useEffect() hook, add the conditional logic to exit out of the hook if shouldExecute is false
    ```javascript
    useEffect(() => {
      // if there's no event id, return early
      // this will prevent this useEffect hook from querying firestore
      if (!shouldExecute) return;
      // rest of code
    }
    ```
- In EventForm.jsx file:
  - Pass in the shouldExecute parameter to the useFirestoreDoc() hook
    - And cast the `match.params.id` into a boolean value. If there isn't an event id (match.params.id is false), shouldExecute will be set to false. And this will exit out of the useEffect()/useFirestoreDoc() hook and effectively stop listening to firestore
    ```javascript
    useFirestoreDoc({
      // cast the match.params.id into a boolean
      // by default, shouldExecute is set to true
      // if no event id (shouldExecute is false), return early
      // this stops from listening to firestore
      shouldExecute: !!match.params.id,
      query: () => listenToEventFromFirestore(match.params.id),
      data: (event) => dispatch(listenToEvents([event])),
      deps: [match.params.id, dispatch]
    });
    ```
- **Sort events by date:**
- When listing the events on the events page, we can sort the order of listing by date
- In firestoreService.js file:
  - Add the .orderBy() method and pass in date
  ```javascript
  export function listenToEventsFromFirestore() {
    return db.collection('events').orderBy('date');
  }
  ```

### [12. Deleting an event]()
- In firestoreService.js file:
  - Write a deleteEventInFirestore function to delete an event in Firestore
    - This function takes an eventId as an argument
    ```javascript
    export function deleteEventInFirestore(eventId) {
      return db.collection('events').doc(eventId).delete();
    }
    ```
- In EventListItem.jsx file:
  - Import the deleteEventInFirestore function: `import { deleteEventInFirestore } from '../../../app/firestore/firestoreService';`
  - In the 'Delete' Button element:
    - Replace the dispatch deleteEvent() action with the deleteEventInFirestore() function and pass in the event.id
    - This will remove an event in Firestore
    ```javascript
    import { deleteEventInFirestore } from '../../../app/firestore/firestoreService';

    <Button
      onClick={() => deleteEventInFirestore(event.id)}
      color='red'
      floated='right'
      content='Delete'
    />
    ```
- NOTE: In our application, however, a user won't be able to delete an event. They can cancel an event instead. While we are developing our application we want to be able to delete an event in Firestore








## LIBRARIES AND PACKAGES USED IN THIS PROJECT
- Semantic UI React and Semantic UI CSS
  - Website: www.react.semantic-ui.com
  - Install: `npm i semantic-ui-react semantic-ui-css`
  - Import in index.js file. Above the styles.css, import: `import 'semantic-ui-css/semantic.min.css';`
- cuid, a unique identifier
  - Install: `npm i cuid`
  - Import in EventForm.jsx file: `import cuid from 'cuid';`
- React Router 5
  - Docs: https://reactrouter.com/web/guides/quick-start
  - Install: `npm i react-router-dom`
  - Import in App.jsx file: `import { Route, useLocation } from 'react-router-dom';`
- Redux and React-Redux
  - A state management tool
  - Install: `npm i redux react-redux`
- Redux DevTools
  - Install: `npm i redux-devtools-extension --save-dev`
  - Gives us the ability to time-travel debugging
- Formik
  - Docs: https://formik.org/docs/api/formik
  - Install package: `npm i formik`
- Yup - form validation with Formik
  - Docs: https://formik.org/docs/guides/validation
  - Install Yup: `npm i yup`
- React Datepicker
  - Install: `npm i react-datepicker`
- Date-fns library to work with react-datepicker
  - date-fns docs: date-fns.org
  - Run: `npm ls date-fns` to see the version that react-datepicker is using
  - Install: `npm i date-fns@2.25.0`
- React Places Autocomplete
  - Docs: https://github.com/hibiken/react-places-autocomplete
  - Install: `npm i react-places-autocomplete`
- Google Map React - display google map
  - Docs: https://www.npmjs.com/package/google-map-react
  - Install: `npm i google-map-react`
- Redux Thunk - a middleware that allows us to write async code to Redux store
  - Install: `npm i redux-thunk`
- React Toastify - notifications to users
  - Install: `npm i react-toastify`
- React Calendar widget
  - Install: `npm i react-calendar`
- Firebase Javascript SDK
  -Install: `npm i firebase`
 

## VSCode extensions used:
- Auto Import - steoates
  - Configure the setting by going to preferences -> settings
  - Type in the search bar, "autoimport". Under `File to Scan` section, also add `js` and `jsx` to the list
- Auto Rename Tag - Jun Han
  - Renaming opening and closing tag to be the same
- Bracket Pair Colorizer 2 - CoenraadS
  - Add matching color to the opening and closing brackets
- ESLint - Dirk Baeumer
  - Highlights any syntax problems, adds extra checking for best practices and standards
- Javascript Debugger (Nightly) - Microsoft
- Material Icon Theme - Philipp Kief
- npm Intellisense - Christian Kohler
- Path Intellisense - Christian Kohler
  - Local file helper when we're writing path to file, autocomplete
- Prettier - Code formatter - Esben Petersen
  - An opinionated code formatter
- Live Server - Ritwick Dey


## REACT CONCEPTS
- Components
- Virtual DOM
- One way binding
- JSX

**Components**
- Traditional web page: HTML, JS, and CSS files
- React: components which made up of JS, HTML, and CSS. Multiple components make up a web page

**React uses a Virtual DOM**
- React -> Virtual DOM -> Actual DOM
- Any updates we make are going to be stored inside a virtual representation of Document Object Model, and only those changes are going to be applied to the actual DOM
- This makes React pretty fast

**What is a Virtual DOM**
- Tree of JS Objects that represent the actual DOM itself
- We write the code as if we are recreating the entire DOM on every update and we rely on React to make the changes on our behalf
- Developer returns the DOM they wish to see
- React takes care of the transformation behind the scenes

**One way binding**
- Other libraries use 2 way bindings
  - Model updated in the DOM updates the component
- React bindings only go from component to Virtual DOM which updates the actual DOM
- This makes the code predictable and easy to debug

**Performance**
- The Virtual DOM:
  - Efficient diffing algorithms. React is going to take care of deciding what's necessary to update in the DOM
  - Update subtrees, the different parts of the DOM simultaneously 
  - Batch updates to the DOM
- Result = easy to use and optimized way to build web apps

**JSX**
- When we're writing code of React, what we're effectively doing is just creating Javascript functions that return JSX
- JSX adds an XML Syntax to Javascript, which makes React more elegant
- JSX tags have a tag name, attributes and children. Whilst it looks very similar to HTML, there are a few slight differences
- Note that we're not allowed to use the word 'class' inside JSX because the word 'class' is a reserved word in Javascript. Instead we use className to style our component


## REDUX CONCEPTS

### [Intro to Redux]()
**What is Redux?**
- Predictable State Container for Javascript apps. This allows us to store our applications states centrally in a Redux store 
- Not specific to React
  - Can be use with other view libraries and JS frameworks (Angular, Vue)
- It's small - 2kb (including dependencies)
- It's like having a local database in the client
- Gives us access to time travel debugging

**Redux Trade Offs - it asks us to:**
- Describe application state as plain objects and arrays. We can add complex objects to our store. It's not relational database on the client-side. It's a simple state management system
- Describe changes in the system as plain objects. So when we want to make a change to our store, then we send Redux, a plain object with the information inside it, that we want it to change
- Describe the logic for handling changes as *pure functions*. This will keep our code clean!

**Pure Functions**
- Given the same input, will always return the same output
- Produces no side effects


### Redux Terminology
- **Actions:** are simple objects. Typically when we create an action, we create a constant and this constant is going to describe what the action is going to do
  ```javascript
  const ADD_TODO = 'ADD_TODO'

  {
    type: ADD_TODO,
    text: 'build my first Redux app'
  }
  ```
- **Action Creators:** a function that returns an action. We wrap an action inside an action creator
  ```javascript
  function addTodo(text) {
    return {
      type: ADD_TODO,
      text
    }
  }
  ```
- **Reducers:** specifies how the application state changes in response to actions sent to the store. We send our action to the reducer. Actions, themselves, they only describe what's happen, but don't describe how the application state changes
  - Reducers usually uses a switch statement to change the store state
  ```javascript
  function todoApp(state = initialState, action) {
    switch(action.type) {
      case SET_VISIBILITY_FILTER:
        return Object.assign({}, state, {
          visibilityFilter: action.filter
        })
      default:
        return state
    }
  }
  ```

- **Store:**
  - Holds application state
  - Allows access to state via getState()
  - Allows state to be updated via actions. Dispatch an action using the dispatch() method
  - One store per application

**React-Redux**
- Redux on its own has no relation to React
- Redux can be used with Angular, Ember, jQuery or plain JS
- React-Redux library provides bindings for use with React
  - Provider, which provides a store to a React application
- It also provides React-Redux hooks:
  - useSelector() - listening to changes in the store and notifies the React component
  - useDispatch() - dispatches an action to the reducer


### Setting up Redux Store
1. Configure the Store
2. Create a root reducer
3. Add the store to the index.js file. Then we pass the store via the Provider to our application

**Install Redux and React-Redux**
- Run: `npm i redux react-redux`

**1. Create and configure Redux Store**
- Inside the app directory, create a new folder called store
- In app/store/configureStore.js file:
  - Import the createStore method: `import {createStore} from 'redux';`
  ```js
  import { createStore } from 'redux';
  import testReducer from '../../features/sandbox/testReducer';

  export function configureStore() {
    return createStore(testReducer);
  }
  ```

**2. Create a root reducer**
- Inside the features directory, create a folder called sandbox
- In features/sandbox/testReducer.js file:
  ```js
  const initialState = {
    data: 42
  };

  function testReducer(state = initialState) {
    return state;
  }

  export default testReducer;
  ```

**3. Add the store to the index.js file**
- We want to wrap our entire application inside the Provider component provided by Redux. This way our application will have access to the Redux store
- In the main index.js file:
  - Import the Provider component from react-redux
  - Import the configureStore function that we wrote earlier
  - Right after the imports, execute the `configureStore()` function and store the result in a variable called `store`. This store object is the store of our application
  - Finally, wrap the `BrowserRouter` and the `App` components inside the `Provider` component. The Provider has a store attribute and we pass our `store` object to the Provider
  ```js
  import { Provider } from 'react-redux';
  import { configureStore } from './app/store/configureStore';

  const store = configureStore();

  function render() {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      rootEl
    );
  }
  ```

### [Installing Redux DevTools]()
- Install: `npm i redux-devtools-extension --save-dev`
**Add the DevTools to Redux store**
- In app/store/configureStore.js file:
  - Import the devToolsEnhancer method: `import { devToolsEnhancer } from 'redux-devtools-extension';`
  - Pass in the devToolsEnhancer to the createStore() method as 2nd arg
  ```javascript
  import { devToolsEnhancer } from 'redux-devtools-extension';

  export function configureStore() {
    return createStore(testReducer, devToolsEnhancer());
  }
  ```
- Go the the Chrome browser and install the Redux DevTools Chrome extension
- Now whenever a React application uses Redux, you can see the store state changes based on the actions being dispatched using in this Redux DevTools


------------------------------------------------------------------------

## A TASTE OF REDUX

### [Playing with Redux in a Sandbox component]()
**The Reducer Function**
- The reducer function takes two arguments:
  - 1st arg is the initial state in the store
  - Note that a state can be an object or an array. Our `initialState` is an object. Hence, the initial state that we pass in to the reducer function is a state object
  - 2nd arg is the `action`
  - An `action` is an object and it has a `type` and a `payload` properties
  - We can destructure the type and payload properties from the action in the 2nd arg
- The reducer function usually uses a switch statement to check for the action type. It tries to find that particular action type and returns with the updated state
  - Now, we never want to mutate the state itself. Instead, we return the initial state and only update a property in the state. In this case, we want to increase or decrease the data state based on the type of action we send to the reducer
- Also in a reducer function, we always want to return a default state, because we might not find an action type we're looking for
- In features/sandbox/testReducer.jsx file:
  ```javascript
  // Initial state in the store
  const initialState = {
    data: 42
  };

  export default function testReducer(state = initialState, {type, payload}) {
    switch (type) {
      case INCREMENT_COUNTER:
        return {
          ...state,
          data: state.data + payload
        };
      case DECREMENT_COUNTER:
        return {
          ...state,
          data: state.data - payload
        };
      default:
        return state;
    }
  }
  ```

**Action Creator**
- Is a function that takes in a payload data as an argument and returns the action object
- In features/sandbox/testReducer.jsx file:
  ```javascript
  // Action constant
  const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
  const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

  // Action creator
  export function increment(amount) {
    return {
      type: INCREMENT_COUNTER,
      payload: amount
    };
  }

  export function decrement(amount) {
    return {
      type: DECREMENT_COUNTER,
      payload: amount
    };
  }
  ```
- In our React component, when we dispatch an action by calling the dispatch() method, we can pass in this action creator function to the dispatch() method and provide the payload data

**In testReducer.jsx file:**
  ```javascript
  // Action constant
  const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
  const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

  // Action creator
  export function increment(amount) {
    return {
      type: INCREMENT_COUNTER,
      payload: amount
    };
  }

  // Action creator
  export function decrement(amount) {
    return {
      type: DECREMENT_COUNTER,
      payload: amount
    };
  }

  // Initial State
  const initialState = {
    data: 42
  };

  // Reducer function
  // 1st arg is initial state
  // 2nd arg is the action object, which consists of action.type and action.payload properties
  // Always returning a default state
  function testReducer(state = initialState, action) {
    switch (action.type) {
      case INCREMENT_COUNTER:
        return {
          ...state,
          data: state.data + action.payload
        };
      case DECREMENT_COUNTER:
        return {
          ...state,
          data: state.data - action.payload
        };
      default:
        return state;
    }
  }

  export default testReducer;
  ```

**React component**
- Use the **useSelector()** hook to get a state from the redux store
  - The hook takes a selector function as an argument
  - The selector function is called with the store state and returns a particular state. In our case, we want the data state
  - `const data = useSelector((state) => state.data);`
  - Data is a property of the state object. We access the data state using the `state.data` notation. When we initialize the state in the reducer function, we initialized the state as an object. State can also be an array
- Use the **useDispatch()** hook to create a dispatch function. We can then use this dispatch() function to dispatch an action object or an action creator to the reducer
  - `const dispatch = useDispatch();`
- When the 'Increment' button is clicked, the dispatch() function is executed, sending an action to the reducer
  - The dispatch() function takes an action creator function as an argument
  - The action creator function is called with the payload data being passed in
  - `onClick={() => dispatch(increment(10))}` 
- Inside features/sandbox directory, create a file/component called Sandbox.jsx
- In features/sandbox/Sandbox.jsx file:
  ```javascript
  import React from 'react';
  import { useSelector, useDispatch } from 'react-redux';
  import { Button } from 'semantic-ui-react';
  import { decrement, increment } from './testReducer';

  export default function SandBox() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);

    return (
      <>
        <h1>Testing</h1>
        <h3>The data is: {data}</h3>
        <Button
          onClick={() => dispatch(increment(10))}
          content='Increment'
          color='green'
        />
        <Button
          onClick={() => dispatch(decrement(20))}
          content='Decrement'
          color='red'
        />
      </>
    );
  }
  ```
------------------------------------------------------------------------------


## REDUX THUNK CONCEPTS

- We need a way to handle asynchronous operations, such as retrieving and storing data in the cloud, in our Redux store. It takes time to read and write data which is stored at some distance away from the client's computer. Redux Thunk is a popular solution for Redux

**Redux Thunk**
- A thunk is a function that wraps an expression to delay its evaluation
- Allows Action Creators to return a function instead of a plain object. Up to this point our action creators have been returning an object which contains a TYPE and a PAYLOAD optionally
- Receives the store's dispatch method which is used to dispatch regular synchronous action when the asynchronous operations have completed. What we want is have our action creator to return the store's dispatch method. This allows us to dispatch actions, wait for something to happen, and then dispatch other actions as well. We use async/await to achieve this
- Acts as middleware that we add to our Redux store. This middleware allows us to use the store's dispatch function inside our Action Creators

**Async/Await**
- ES2017 feature
- Built on top of promises Javascript - cannot be used with plain callbacks
- Makes async code look and behave more like non async code
- Cleaner code than using the .then() method from promises JS

**Install Redux Thunk**
- Install: `npm i redux-thunk`

### [1. Setting up Redux Thunk, create an asyncReducer]()
- In configureStore.js file:
  - The createStore() method takes 3 params: a reducer, a preloadedState(optional), and an enhancer
  - An example of an enhancer is the Redux devTool that we have installed and use earlier. The only store enhancer that ships with Redux is applyMiddleware(). The middleware that we're going to apply is the Redux thunk, but we've also got a devToolEnhancer(). So in order to use both of the devToolEnhancer() and Redux thunk, we're going to bring in the composeWithDevTools() method from redux-devtools-extension. The composeWithDevTools() is already come with the devToolEnhancer()
    - `import { composeWithDevTools } from 'redux-devtools-extension';`
  - Import Redux thunk: `import thunk from 'redux-thunk';`
  - Also import the applyMiddleware method: `import { createStore, applyMiddleware } from 'redux';`
  - In the createStore() method, we're going to pass in the composeWithDevTools() method as a 2nd param. Then call the applyMiddleware() method and pass in thunk
    - `return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));`
  - Now we have both the devToolEnhancer() and applyMiddleware(thunk) enhancers
  ```js
  import { createStore, applyMiddleware } from 'redux';
  import { composeWithDevTools } from 'redux-devtools-extension';
  import rootReducer from './rootReducer';
  import thunk from 'redux-thunk';

  export function configureStore() {
    // 1st arg is a reducer
    // 2nd arg is an enhancer
    // We have 2 enhancers: redux thunk and redux devTool
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
  }
  ```
- Next is we want to create a reducer (controlling a state in the store) for async functions. This particular reducer is going to control the loading state of what's going on in our application. This asyncReducer also controls the error state that we may get back from the async operations.
- In src/app/async folder, create a file called asyncReducer.js
- In asyncReducer.js file:
  - We'll create the async constants, action creators, and reducer in one file
  ```javascript
  // Constants
  const ASYNC_ACTION_START = 'ASYNC_ACTION_START';
  const ASYNC_ACTION_FINISH = 'ASYNC_ACTION_FINISH';
  const ASYNC_ACTION_ERROR = 'ASYNC_ACTION_ERROR';

  // Async action creator functions
  export function asyncActionStart() {
    return {
      type: ASYNC_ACTION_START
    };
  }

  export function asyncActionFinish() {
    return {
      type: ASYNC_ACTION_FINISH
    };
  }

  export function asyncActionError(error) {
    return {
      type: ASYNC_ACTION_ERROR,
      payload: error
    };
  }

  // Initial state
  const initialState = {
    loading: false,
    error: null
  };

  // Async reducer
  export default function asyncReducer(state = initialState, { type, payload }) {
    switch (type) {
      // Turns the loading indicator on
      case ASYNC_ACTION_START:
        return {
          ...state,
          loading: true,
          error: null
        };
      // Turns the loading indicator off
      case ASYNC_ACTION_FINISH:
        return {
          ...state,
          loading: false
        };
      // Stores error message getting back from async operation
      case ASYNC_ACTION_ERROR:
        return {
          ...state,
          loading: false,
          error: payload
        };
      default:
        return state;
    }
  }
  ```

### [2. Returning async functions in action creators]()
- In src/app/common/util folder, create a file called util.js. Any functions that don't belong anywhere else that we can apply anywhere in our application go in this folder
- In util.js file:
  - Write a delay function that delays for a certain amount of time in millisecond (ms)
    - In order for something to be able to wait for this particular function to finish, what we need do is to return a `new Promise()`
    - The promise will end in either resolve or reject
    - In this case, we're going to resolve and we're going to call the `setTimeout()` function, which allows us to add a delay
    - In the setTimeout() function, we pass in the `resolve` and the `ms` (millisecond) that we get from the delay function as an argument
    ```javascript
    export function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    ```

**Testing out async action creators in counter Sandbox:**
- When we installed redux-thunk, it allows us to return a function inside another function. In our action creator function, instead of returning a simple object, we can return an asynchronous function. This allows us to dispatch multiple actions inside an action creator function
- An asynchronous function has the `async` keyword in front of it: `async function () {...}`
- This async function can take, as a parameter, a dispatch method that we get from react-redux store. We use this dispatch method to dispatch multiple actions
- In testReducer.js file:
  - Import the async action creators from the asyncReducer.js file: `import { asyncActionStart, asyncActionError, asyncActionFinish } from '../../app/async/asyncReducer';`
  - Import the delay function: `import { delay } from '../../app/common/util/util';`
  - Inside the increment action creator function:
    - We can return an asynchronous function. This will allow us to dispatch multiple actions inside the increment action creator function
    - To mark a function as an async function, add the `async` keyword in front of it
    - This async function takes a dispatch as an argument. It is a dispatch() method coming from react-redux to dispatch actions
    - Then in this return async function,
      - first, dispatch the asyncActionStart() action. This will turn the loading state to true
      - since we're using an async function, use the `await` keyword and call the delay() function to delay the request for 1 second. The await keyword will wait for the delay() function to finish before performing the next task
      - after that, we want to dispatch another action with the type of INCREMENT_COUNTER and the payload is the amount
      - lastly, dispatch the asyncActionFinish() action. This will turn the loading state back to false
      - note that we want to call the delay() function and dispatch the INCREMENT_COUNTER and asyncActionFinish() actions inside a try/catch block. This way, if there's any problem with this asynchronous action, it's going to be caught by whatever is inside the catch block
      - if an error occurs during the async operation, we catch the error inside the `catch` block. Then we dispatch the asyncActionError() action to send this error to the Redux store in the async reducer. We can do whatever we want with that error in the future
    ```javascript
    import {
      asyncActionError,
      asyncActionFinish,
      asyncActionStart
    } from '../../app/async/asyncReducer';
    import { delay } from '../../app/common/util/utils';

    // Action constant
    const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
    const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

    // Action creator
    export function increment(amount) {
      // We can return an async function because of redux-thunk
      // We get the dispatch method from react-redux
      // This allows us to dispatch multiple actions
      return async function (dispatch) {
        // This will turn the loading indicator from false to true
        dispatch(asyncActionStart());
        try {
          // Delay for 1 second before dispatching the next action
          await delay(1000);
          dispatch({ type: INCREMENT_COUNTER, payload: amount });
          // Turn the loading indicator off - from true to false
          dispatch(asyncActionFinish());
        } catch (error) {
          // If there's an error, send the error to the store
          dispatch(asyncActionError(error));
        }
      };
    }
    ```
  - Do the same thing for the decrement action creator function
  - So now when the 'Increment' or 'Decrement' button is clicked, it'll delay for the amount of time set before it will increment or decrement the counter
- We can use the loading state by displaying a loading icon to the user that something is happening
- In Sandbox.jsx file:
  - Extract and destructure the loading state property from the async reducer using the useSelector() hook
    - `const { loading } = useSelector((state) => state.async);`
  - Then in the 'Increment' Button element, specify the loading property and set its value to the loading state. Do the same thing for the 'Decrement' Button
    ```javascript
    <Button
      loading={loading}
      onClick={() => dispatch(increment(10))}
      content='Increment'
      color='green'
    />
    ```
