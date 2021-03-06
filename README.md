## NOTES AND STEPS TO BUILDING THIS PROJECT
The codebase for each step can be found in the commit link


## PROJECT SETUP

### [1. Create project using create-react-app](https://github.com/sungnga/revents/commit/baf0f9062088f145f0aa712f31d844e30c48dcba?ts=2)
- Run in the command line:
  - `npx create-react-app revents --use-npm`
  - The `--use-npm` flag is to ensure that we're using the npm package manager
- Once the React app is successfully created, cd into the project directory: `cd revents`
- Then run: `npm start`. This starts up the development server
- Can view the revents application in the browser: `http://localhost:3000`

### [2. Add hot module replacement](https://github.com/sungnga/revents/commit/4130f6db21ed028d52d0290bb5dac7e2724f57b5?ts=2)
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

### [3. Add folder structure to our project](https://github.com/sungnga/revents/commit/ac806009195aefaf28fca2b1be668aa6cc2a0c49?ts=2)
- We want to add a little folder structure and rearrange files of our project and also clean up any files from create-react-app that we don't 
  - All the features we will build in this project will go inside the 'features' folder
  - All the common features and components that will be used across the application will go inside the 'app' folder

### [4. Install Semantic UI CSS + Semantic UI React libraries](https://github.com/sungnga/revents/commit/11883c9a7a3f681311a0060a407614570006ded7?ts=2)
- Docs: www.react.semantic-ui.com
- Install Semantic UI React and Semantic UI CSS libraries
  - Run to install both: `npm i semantic-ui-react semantic-ui-css`
- In index.js file:
  - Import the semantic min css just above the styles.css file: `import 'semantic-ui-css/semantic.min.css';`
- When using Semantic UI React library, we can import style components inside our components to add styles to our JSX. We add component attributes to specify the style we want from that style component. An example is in App.jsx file


## EVENT DASHBOARD PAGE LAYOUTS

### [1. Create a basic EventDashboard component](https://github.com/sungnga/revents/commit/f248d85d39e7d237bdcecc0e2482f738fea01fa7?ts=2)
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

### [2. Create a NavBar component, add styling](https://github.com/sungnga/revents/commit/f8e96072e0c73c13249ef20487e5832d4302131c?ts=2)
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

### [3. Create event list items: EventList, EventListItem, and EventListAttendee components](https://github.com/sungnga/revents/commit/94ddd4493b337d1ed831be03420147210aed902e?ts=2)
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

### [4. Create an event form: EventForm component](https://github.com/sungnga/revents/commit/626ce584270ee540c09ec81c8aa02afd740d3b5b?ts=2)
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

### [5. Passing props down to child components](https://github.com/sungnga/revents/commit/8fe448d45173aa02dba82043659e971caf758258?ts=2)
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

### [6. React component state: using React useState hook](https://github.com/sungnga/revents/commit/a96266594170aa9c1ee7d04447383ab625b96b31?ts=2)
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

### [1. Basic forms in React: EventForm](https://github.com/sungnga/revents/commit/99df369c68f309fc6b67c6def67be07a78dcc4c0?ts=2)
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

### [2. Creating an event, cuid library](https://github.com/sungnga/revents/commit/ff14315f63f59350427240e96b07ac3542572f6c?ts=2)
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

### [3. Selecting an event to read](https://github.com/sungnga/revents/commit/1f673cdf38d9c3b6eae32aa10e5b29bfe82fa4b3?ts=2)
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

### [4. Controlled components with a key: EventForm](https://github.com/sungnga/revents/commit/1eb41f72fefc601fee49e695f6bc26dfacd6dcaa?ts=2)
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

### [5. Updating an event](https://github.com/sungnga/revents/commit/ba6d3ed381f106cdd039b9071e9bc01ba054553d?ts=2)
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

### [6. Deleting an event](https://github.com/sungnga/revents/commit/a6d2e58c3d475becc3eef8b4fd1f7571e7032471?ts=2)
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

### [Intro to react-router, install react-router-dom](https://github.com/sungnga/revents/commit/61fbf877750b024c82080b05e4cc1bec77b2b3c1?ts=2)
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

### [1. Adding HomePage and EventDetailedPage components](https://github.com/sungnga/revents/commit/8854e3cda592d5898622269dfaa3297369c1d580?ts=2)
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

### [2. Routing configuration](https://github.com/sungnga/revents/commit/d348332da0b52677554dd96a1a0e1956d08c462e?ts=2)
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

### [3. Using NavLinks and Links](https://github.com/sungnga/revents/commit/54355323668cf389b2e1c13a40073bce700ab29e?ts=2)
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

### [4. Styling the HomePage](https://github.com/sungnga/revents/commit/54d03dbcab5902f9f1c0ef1c07f50e74a57377bd?ts=2)
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

### [5. Adding menus for authenticated and unauthenticated users](https://github.com/sungnga/revents/commit/838d2c7ab888d5089ee098702f2835ea13576069?ts=2)
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

### [6. Adding fake authentication](https://github.com/sungnga/revents/commit/b75210f0c453b48acfd1ba67ba19105f2707b7bc?ts=2)
- For now, we'll use local states in our NavBar component to check if a user is authenticated or not. If the user is authenticated, they get to see the 'Create Event' button and the SignedInMenu appears. If not authenticated, they won't see the 'Create Event' button and the SignedOutMenu appears
- In NavBar.jsx file:
  - Create an authenticated state and set it to false as its initial value state
    - `const [authenticated, setAuthenticated] = useState(false);`
  - In JSX:
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

### [7. Using the useHistory hook](https://github.com/sungnga/revents/commit/ccad313fc714317fbdaf8c67a7308035de0e9d7d?ts=2)
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

### [8. EventDetailedPage structure: creating smaller components](https://github.com/sungnga/revents/commit/decbe22c0710485c1dd26a7286124a46658b0f49?ts=2)
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

### [9. Adding EventDetailedPage content](https://github.com/sungnga/revents/commit/f5bb4ecf530213d0be985a7af8bfa6a373e7468d?ts=2)
- Add content and styles to the following components:
  - EventDetailedHeader.jsx
  - EventDetailedInfo.jsx
  - EventDetailedChat.jsx
  - EventDetailedSidebar.jsx

### [10. Cleaning up the unused code](https://github.com/sungnga/revents/commit/8054d60a95528385367d5cd8d9fb43b9450adfeb?ts=2)
- Cleaning up our code up to this point
- Add a Link component to the 'Manage Event' button in EventDetailedHeader.jsx component, redirecting to manage event page
- Add a Link component to the 'Cancel' button in EventForm.jsx component, redirecting to events page
- We won't have the Create Event form on the right-hand column of the EventDashboard page anymore. When we click on the 'View' button of an event in the events page, it redirect to the EventDetailedPage instead


## REDUX

NOTE: Setting up and configure a Redux store is in the Redux Concepts section
### [1. Setting up Redux store](https://github.com/sungnga/revents/commit/078e9dcd259adc91e42b2882bc37313f34354132?ts=2)
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

### [2. Creating the event reducer](https://github.com/sungnga/revents/commit/0abdfe97299b6d549bada09f1c8275285fd1b0cd?ts=2)
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

### [3. Creating a root reducer](https://github.com/sungnga/revents/commit/9e5c0562eabcac2dfbc339850f02bdb7803a16f8?ts=2)
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

### [4. Getting events from the Redux store](https://github.com/sungnga/revents/commit/1ad31d16a26060299a9ae445a24d8b435f00083e?ts=2)
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

### [5. Dispatching event actions](https://github.com/sungnga/revents/commit/1415251dd6be2d87f0c467629a91503619f3937d?ts=2)
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

### [6. Clean up code, add key to EventForm, solve routing issues](https://github.com/sungnga/revents/commit/756054dd0562f8b7bbccdf452b89c61a4a8ee9d6?ts=2)
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

### [7. Scroll to top: ScrollToTop component](https://github.com/sungnga/revents/commit/c856439deaa81bdc8ca7e2867b9ca9c057279680?ts=2)
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

### [1. Setting up Formik](https://github.com/sungnga/revents/commit/fa26044d4420f71c44407d6022cb49ff9a2cbd9c?ts=2)
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

### [2. Formik with less code](https://github.com/sungnga/revents/commit/cf3a3ca1c29a383e29a93081a5e7ebe06c590f98?ts=2)
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

### [3. Form validation with Formik validationSchema](https://github.com/sungnga/revents/commit/3e54f9bccb86db1702588b1cc96b310fb801ac5a?ts=2)
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

### [4. Creating a reusable text input field: MyTextInput component](https://github.com/sungnga/revents/commit/1c69dc23e805e88f02ca718c9e67a02db94537d6?ts=2)
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

### [5. Cleaning up the event form](https://github.com/sungnga/revents/commit/ed3413e3cef9018959c54f2b1c46ebe3145e35f4?ts=2)
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

### [6. Creating a reusable textarea input field: MyTextArea component](https://github.com/sungnga/revents/commit/328b36eab6bd77b0864803affef56408eab8e202?ts=2)
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

### [7. Creating a reusable select input field: MySelectInput component](https://github.com/sungnga/revents/commit/1314e14cd2c10b0e43aebb9b3618098fc1c85f92?ts=2)
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

### [8. Creating a reusable date input field: MyDateInput component](https://github.com/sungnga/revents/commit/6332490b6e5b26e0212525cb76931863d659def0?ts=2)
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

### [9. Date-fns package: format Javascript date object into string](https://github.com/sungnga/revents/commit/4503146bc678229af0f8ff3c20e4770e1c3320da?ts=2)
- date-fns docs: date-fns.org
- We have a little issue with our current date value. Our date value is a Javascript date object, not a string. So we need to format a Javascript date object into a string that can be displayed on a page. We will use a date package to help us format dates into strings
- The react-datepicker library is already using date-fns, but we want to install a date-fns package separately. When installing date-fns, we want to install the same version as the one in react-datepicker. Run `npm ls date-fns` to see the version that react-datepicker is using. Then install date-fns of the same version. This way, we won't run into any issues
- Install date-fns: `npm i date-fns@2.25.0`
- In EventListItem.jsx, EventDetailedHeader.jsx, and EventDetailedInfo.jsx files:
  - Import date-fns: `import { format } from 'date-fns';`
  - Replace the `{event.id}` Javascript date object with the format version
    - `{format(event.date, 'MMMM d, yyyy h:mm a')}`

### [10. Formik props: control the submit and cancel buttons in event form](https://github.com/sungnga/revents/commit/d830741167b98cba8efc6d24ef65528828341950?ts=2)
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

### [11. Modals: create a modalReducer and ModalWrapper component](https://github.com/sungnga/revents/commit/84a4b83b9fb9338bd4c7589e49ae8e99ec840149?ts=2)
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

### [12. Adding a Modal Manager: ModalManager component, testing the modal in Sandbox](https://github.com/sungnga/revents/commit/5fe4ac16df0e4f61f7a4005086032dc03ba7c098?ts=2)
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

### [13. Creating the sign in form: LoginForm component](https://github.com/sungnga/revents/commit/a2cb269401075cccaaf847033343103d5897f31d?ts=2)
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

### [14. Adding an authReducer](https://github.com/sungnga/revents/commit/6765a05c97a39c309332bd89dbbedc1f1643f091?ts=2)
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

### [15. Hooking up the LoginForm](https://github.com/sungnga/revents/commit/b8cf5af66e6913f3021cc267991e53dd872c1369?ts=2)
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

### [1. Enable Google Maps APIs, generate Google API key](https://github.com/sungnga/revents/commit/824ced03d285ac4c197fc8d7b1a83234bdbffbb8?ts=2)
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

### [2. Setting up React Places Autocomplete, test Google Places in Sandbox](https://github.com/sungnga/revents/commit/ac7cce6d3e7ea1839f3b755581817efce7d9b79f?ts=2)
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

### [3. Creating a custom place input field: MyPlaceInput component](https://github.com/sungnga/revents/commit/a3426b28e196cf048d6f0774bcf814724695cd1f?ts=2)
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

### [4. Using the place input field: MyPlaceInput component](https://github.com/sungnga/revents/commit/9d666834969c3b6dcb63a02b506d011737d6b390?ts=2)
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

### [5. Narrowing the place input search results: EventForm](https://github.com/sungnga/revents/commit/8c2463e25f207a10a559a584eb23db0bd90f7bbf?ts=2)
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

### [6. google-map-react lib: displaying google maps onto a page in Sandbox](https://github.com/sungnga/revents/commit/ad092106f13a31385b90c4e7993bb629d051698c?ts=2)
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

### [7. Adding the map to the EventDetailedPage: EventDetailedMap component](https://github.com/sungnga/revents/commit/91c9eb85cb793b5cbeeabc98c6be2098cd2d2ece?ts=2)
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

### [1. Setting up Redux Thunk, create an asyncReducer](https://github.com/sungnga/revents/commit/1468870aae235aa62355ae5f661dd8ca610aa659?ts=2)
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

### [2. Returning async functions in action creators](https://github.com/sungnga/revents/commit/9f914f5a62948566731109314fd15df34dee4f8e?ts=2)
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

### [3. Isolating the loading indicators: counter Sandbox](https://github.com/sungnga/revents/commit/b15bf639f1c051e255aa7a8d83b1f88784e9cad7?ts=2)
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

### [4. Adding toast notifications: react-toastify library](https://github.com/sungnga/revents/commit/bd183f8bd75fdd7e5336af8386ebd7fd5f2fd087?ts=2)
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

### [5. Adding a mock API, create loadEvents action creator](https://github.com/sungnga/revents/commit/8052f96ab05de4170f4b0f8e8ee17884afae4b68?ts=2)
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

### [6. Adding a LoadingComponent to EventDashboard page](https://github.com/sungnga/revents/commit/acb58d076cda5befd3026330d1d5ed6ca9b7a2af?ts=2)
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

### [7. Using placeholders to improve the UI: EventListItemPlaceholder component](https://github.com/sungnga/revents/commit/1c37c96f404a3bfb7e364b0f94bd6a07ac2ce63b?ts=2)
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

### [8. Adding an event filters component: EventFilters component](https://github.com/sungnga/revents/commit/7e3f8e0c70ab351dc5853081b091a9e70c41896d?ts=2)
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

### [1. Setting up Firebase, create Firestore](https://github.com/sungnga/revents/commit/6a75a9748cfa025c5985fd52650af489feae51ec?ts=2)
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

### [2. Firestore document fields, add events Collection](https://github.com/sungnga/revents/commit/d94800a783ea9b9972c20cfd9d9b8dadcab3718e?ts=2)
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

### [3. Listening to Firestore data](https://github.com/sungnga/revents/commit/28a5ff050390a4ab56c91f6d7ccd24260da02b20?ts=2)
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

### [4. Shaping the Firestore data, getting it into Redux store](https://github.com/sungnga/revents/commit/384295c1666f59c2cbdbeddce5627a1b995cdaca?ts=2)
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

### [5. Restoring the loading indicator](https://github.com/sungnga/revents/commit/d2af604e6ce295b5c84d832315657e5828fd4580?ts=2)
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

### [6. Creating a custom hook: useFirestoreCollection() hook](https://github.com/sungnga/revents/commit/67e9a6d1f91ef93f9cd5756caeb1bbe721012c61?ts=2)
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

### [7. Adding a useFirestoreDoc() hook](https://github.com/sungnga/revents/commit/463e8bb9ec1a68e7b9700e712af4957f9be20284?ts=2)
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

### [8. Handling not found documents](https://github.com/sungnga/revents/commit/e4101d69d8a39f4f5054ed01d4f1b3ecfebc5c95?ts=2)
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

### [9. Adding an error component: ErrorComponent](https://github.com/sungnga/revents/commit/5f0bbaefa1d7d9640a41333947afbeae22add535?ts=2)
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

### [10. Creating and updating events in Firestore](https://github.com/sungnga/revents/commit/4886e602f84fd50a671b6905462ec5ecf964a23a?ts=2)
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

### [11. Fix an issue with create event, sort events by date](https://github.com/sungnga/revents/commit/cf8fc0704608c15930798893bab0a819020c5977?ts=2)
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

### [12. Deleting an event](https://github.com/sungnga/revents/commit/845b131f7ff795f0fcef5511ce4e9f998eb18eb6?ts=2)
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

### [13. Cancelling an event function](https://github.com/sungnga/revents/commit/a92b29bf3f84bdb7c20f638a84bf75c202b3aea2?ts=2)
- In firestoreService.js file:
  - Write a cancelEventToggle function that toggles the cancel state of an event
    - This function takes an event as an argument
    - We're using the .update() method to toggle the isCancelled property
    - If isCancelled property is true, then the event is cancelled
    ```javascript
    export function cancelEventToggle(event) {
      return db.collection('events').doc(event.id).update({
        isCancelled: !event.isCancelled
      });
    }
    ```
- In EventForm.jsx file:
  - Import the cancelEventToggle function: `import { cancelEventToggle } from '../../../app/firestore/firestoreService';`
  - Add a Button element that toggles between 'Reactivate event' and 'Cancel event'
    - On onClick event handling, execute the cancelEventToggle() function in an arrow function and pass in the selectedEvent
    - Also, we only want to show this button when a user is managing an event, not when creating an event. We need to write a condition to only show this button when an event is selected (`selectedEvent`)
    ```javascript
    {selectedEvent && (
      <Button
        type='button'
        floated='left'
        color={selectedEvent.isCancelled ? 'green' : 'red'}
        content={
          selectedEvent.isCancelled
            ? 'Reactivate Event'
            : 'Cancel Event'
        }
        onClick={() => cancelEventToggle(selectedEvent)}
      />
    )}
    ```
- Next is, if an event is cancelled, we want to add a label to that event saying that this event has been cancelled. We will be able to see this label attached to a cancelled event on the EventDashboard page
- In EventListItem.jsx file:
  - Right after the Item.Description tag, write a condition to see if the event isCancelled. If it is, add a Label element with the content saying 'This event has been cancelled'
    ```javascript
    {event.isCancelled && (
      <Label
        style={{ top: '-40px' }}
        ribbon='right'
        color='red'
        content='This event has been cancelled'
      />
    )}
    ```

### [14. Adding a confirmation prompt](https://github.com/sungnga/revents/commit/2f18507b7f849496c951f08222946f344579d419?ts=2)
- When the user clicks on the 'Cancel Event' or 'Reactivate Event' button, we want to display a confirmation dialog box for them to confirm. Semantic UI has a Confirm component that we can use to achieve this
- In EventForm.jsx file:
  - Import the cancelEventToggle function: `import { cancelEventToggle } from '../../../app/firestore/firestoreService';`
  - Import Semantic Confirm component: `import { Confirm } from 'semantic-ui-react';`
  - Create a loadingCancel state using useState() hook and initialize its value to false
    - `const [loadingCancel, setLoadingCancel] = useState(false);`
  - Create a confirmOpen state using useState() hook and initialize its value to false
    - `const [confirmOpen, setConfirmOpen] = useState(false);`
  - Write an async handleCancelToggle function to handle the onConfirm event from the Confirm component. onConfirm, this function executes the cancelEventToggle() function to toggle the isCancelled property in Firestore
    - This function takes an event as an argument
    - Toggle the isCancelled property in a try/catch block
    - Since this is an async operation where it takes sometime to complete, we want to indicate the loading state as well
    - If there's an error, use toast.error() method to send a notification that an error has occurred
    ```javascript
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

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
    ```
  - In the 'Cancel Event' or 'Reactivate Event' Button element:
    - Add a loading property and set it to loadingCancel state
    - On the onClick event handling, call the setConfirmOpen() and set it to true. So when the button is clicked, the Confirm dialog box will open
    ```javascript
    {selectedEvent && (
      <Button
        loading={loadingCancel}
        type='button'
        floated='left'
        color={selectedEvent.isCancelled ? 'green' : 'red'}
        content={
          selectedEvent.isCancelled
            ? 'Reactivate Event'
            : 'Cancel Event'
        }
        onClick={() => setConfirmOpen(true)}
      />
    )}
    ```
  - Right after the `<Formik />` component, instantiate the Semantic UI `<Confirm />` component
    - If the 'Cancel' button is clicked, the Confirm dialog box will close
    - If the 'Confirm' button is clicked, the handleCancelToggle() function is executed
    - Depending on the isCancelled state, one of the two messages will display
    - NOTE: add a `?` after the `selectedEvent` to indicate that selectedEvent is optional
    ```javascript
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
    ```


## AUTHENTICATION

**Firebase Authentication**
- Tightly integrated with Firebase services. We use this to secure our application when we create some security rules
- Token based (JWT). Uses Jason Web Token to pass with every request that goes to Firebase and Firestore. And it is stored in the client's browser for persistence
- Email and password. We can use email and password for authentication
- Social logins. Can also utilize social logins like Facebook and Google
- We will look into 3 options: email/password, Facebook, and Google

**Users**
- Firestore User properties
  - Unique ID (uid)
  - Email address
  - Name
  - PhotoURL
- Cannot add additional properties to the User object directly
- We're going store user profile which have more flexibility. Can store additional properties in Firestore

### [1. Logging in with email and password](https://github.com/sungnga/revents/commit/c3b383276c5b8c91b919c0170be8fb29076f486c?ts=2)
- We want a user to login to our application with their email and password. To enable this functionality, we first need to enable email and password sign-in method in Firebase authentication. Then the Firebase SDK comes with a handle of auth methods that we can use to authenticate a user
- **Enable email and password sign-in method in Firebase:**
- Go to Google Firebase console: https://console.firebase.google.com/
- Click on Authentication in main menu. Then in Authentication page, select 'Sign-in method' at the top menu bar
  - It'll list all the different options
  - Enable Email/Password, the first item on the list
- Let's create a user manually with email/password
- Select 'Users' at the top menu bar
  - Click on 'Add user' button to add a user
  - Fill in the Email and Password for the user
  - Once a user has been created, a user UID is created for this user
  - All the users are listed in this 'Users' tab
- **Add the functionality of sign in user with email and password:**
  - Firebase has a method that we can use to sign in a user with the email and password they provide from the login form
- In src/app/firestore folder, create a file called firebaseService.js
- In firebaseService.js file:
  - Import firebase from config folder to get access to Firebase SDK: `import firebase from '../config/firebase';`
  - Write a signInWithEmail function that signs in a user in Firebase with email and password
    - This function accepts `creds` (user's email and password from LoginForm) as an argument
    - Call the firebase.auth().signInWithEmailAndPassword() method and pass in the email and password
    - Once this is submitted to Firebase auth, the result returned is information about this user. The result of this user will be used as a payload when dispatching the signInUser() action creator
    ```javascript
    import firebase from '../config/firebase';

    // The creds is user's email and password coming from LoginForm
    // The result returned from firebase is an auth user object
    // The user object contains data about this user
    export function signInWithEmail(creds) {
      return firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
    }
    ```
- In authActions.js file:
  - Update the signInUser action function:
    - This function accepts user as an argument
    - This function returns an action object
      - with action type of SIGN_IN_USER
      - and payload of user. This user object contains information about this particular user when they signed in to Firebase. Now we're storing it in the authReducer
    ```javascript
    export function signInUser(user) {
      return {
        type: SIGN_IN_USER,
        payload: user
      };
    }
    ```
- In authReducer.jsx file:
  - Let's also update the `initialState` object where by default a user is not authenticated and we have no current user
    ```javascript
    const initialState = {
      authenticated: false,
      currentUser: null
    };
    ```

### [2. Persisting the login](https://github.com/sungnga/revents/commit/00d9d88e3dd658cef62fed9ccbedb19752cdeb19?ts=2)
- What Firebase and Firestore uses to retain information inside the browser to persist things like user login is inside the Application/Storage/IndexedDB/firebaseLocalStorageDb
- When we login with a user or do anything with authentication, then Firebase gives us a listener for when the authentication state is changed. The `firebase.auth().onAuthStateChanged()` method adds an observer for changes to the user's sign-in state. So when a user logs in or a user logs out, then this particular method is going to listen for that particular status. And then we can dispatch actions when the authentication state is changed
- We'll use this method and what it returns is a Firebase user object. So we're going to check to see if we have a user. If a user is authenticated, then we have a user object
- In authActions.js file:
  - Import firebase from config folder to get access to Firebase SDK: `import firebase from '../../app/config/firebase';`
  - Write a verifyAuth action function that listens to the firebase authentication state change
    - This function returns a regular function that takes in a dispatch as an argument
    - Inside this return function, we're going to call the firebase.auth().onAuthStateChange() method. This method will return a user object
    - Write an if statement to check if there's a user
    - If there is a user, dispatch the signInUser() action and pass in the user object
    - If there isn't a user, dispatch the signOutUser() action. This function sets the authenticated property to false and the currentUser property to null in authReducer
    ```javascript
    import firebase from '../../app/config/firebase';

    export function verifyAuth() {
      return function (dispatch) {
        return firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            dispatch(signInUser(user));
          } else {
            dispatch(signOutUser());
          }
        });
      };
    }
    ```
- We can dispatch this verifyAuth() action directly in our store configuration. So when we initialize our store, we dispatch this action and we're going to be continuously listening to the authentication state
- In configureStore.js file:
  - Import the verifyAuth() action function: `import { verifyAuth } from '../../features/auth/authActions';`
  - We're going to make an adjustment to the store object. We don't want to return the store directly. We want to do something to the store and then return the store
  - First, create a `store` variable to store the store object when we call the createStore() method
  - Then call the dispatch function on the store to dispatch the verifyAuth() action to the store
  - Then return the store
    ```javascript
    import { verifyAuth } from '../../features/auth/authActions';

    export function configureStore() {
      // The createStore method takes a reducer and an enhancer as arguments
      const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
      );

      // Continuously listening to user auth state change
      store.dispatch(verifyAuth());

      return store;
    }
    ```
- Next is we want to display a loading indicator while the user authentication process is taking place on Firebase
- In LoginForm.jsx file:
  - Import the signInWithEmail function: `import { signInWithEmail } from '../../app/firestore/firebaseService';`
  - Since the signInWithEmail() function is an async function, we need to turn the arrow function that handles the onSubmit event into an async/await function by adding the `async` keyword in front of it
  - Also, we need to run the code inside a try/catch block. This way, if an error occurs during the request we can catch it
  - Call the signInWithEmail() method and pass in the values. Add the 'await' keyword in front of this function because we're waiting for this function to complete
    ```javascript
    onSubmit={async (values, { setSubmitting }) => {
      try {
        await signInWithEmail(values);
        setSubmitting(false);
        dispatch(closeModal());
      } catch (error) {
        setSubmitting(false);
        console.log(error);
      }
    }}
    ```

### [3. Signing out the user in Firebase](https://github.com/sungnga/revents/commit/a0029b859103eff1da4720ea7692767103a3213c?ts=2)
- When a user clicks on the 'Sign out' button, we want the user sign out in Firebase. Firebase auth has a .signOut() method that we can use to achieve this
- In firebaseService.js file:
  - Write a signOutFirebase function that signs out user in Firebase
    - This function doesn't take any arguments
    - Call the firebase.auth().signOut() method to sign out the user in Firebase auth
    ```javascript
    export function signOutFirebase() {
      return firebase.auth().signOut();
    }
    ```
- In SignedInMenu.jsx file:
  - Import the signOutFirebase method: `import { signOutFirebase } from '../../app/firestore/firebaseService';`
  - Import toast: `import { toast } from 'react-toastify';`
  - Write an async handleSignOut function to handle signing out a user in Firebase when the 'Sign out' button is clicked
    - Since this is an async function we'll run the code inside a try/catch block
    - If there's any problems with signing out, call the toast.error() method to display a notification of the error
    - Call the signOutFirebase() method and add the 'await' keyword in front of it
    - We want to wait for the signOutFirebase() function to complete, signed out in Firebase, before pushing the user to homepage.
    ```javascript
    import { signOutFirebase } from '../../app/firestore/firebaseService';
    import { toast } from 'react-toastify';

    async function handleSignOut() {
      try {
        await signOutFirebase();
        history.push('/');
      } catch (error) {
        toast.error(error.message);
      }
    }
    ```
  - On the onClick event handler for 'Sign out' Dropdown, call the handleSignOut method
    - `<Dropdown.Item onClick={handleSignOut} text='Sign out' icon='power' />`
- By signing out a user, the auth state in Firebase is changed. Our verifyAuth action creator is continuously listening to the user auth state change. So if there's a change in auth state, the verifyAuth function will execute. The verifyAuth function will dispatch the signInUser action creator if there's a user or dispatch the signOutUser action creator if there's no user. This updates the authReducer in Redux store

### [4. Registering new users in Firebase: RegisterForm component](https://github.com/sungnga/revents/commit/817be9f820b0d7db151954bb9a4e177a0d4cf1f8?ts=2)
- In src/features/auth folder, create a component/file called RegisterForm.jsx
- In RegisterForm.jsx file:
  - The RegisterForm is very similar to the the LoginForm. Copy and paste the code as starter code
    - In the Form, add another MyTextInput component for displayName text input field
    - Add validation to displayName field in the validationSchema as well
    - Change the Button element to 'Register'
    - Add the header to say 'Register to Re-vents'
  ```javascript
  export default function RegisterForm() {
    const dispatch = useDispatch();

    return (
      <ModalWrapper size='mini' header='Register to Re-vents'>
        <Formik
          initialValues={{ displayName: '', email: '', password: '' }}
          validationSchema={Yup.object({
            displayName: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required()
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await registerInFirebase(values);
              setSubmitting(false);
              dispatch(closeModal());
            } catch (error) {
              setSubmitting(false);
              console.log(error);
            }
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className='ui form'>
              <MyTextInput name='displayName' placeholder='displayName' />
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
                content='Register'
              />
            </Form>
          )}
        </Formik>
      </ModalWrapper>
    );
  }
  ```
- Since this RegisterForm is a modal, we need to add this component to the modalLookup
- In ModalManager.jsx file:
  - Import the RegisterForm component: `import RegisterForm from '../../../features/auth/RegisterForm';`
  - Add the RegisterForm to the modalLookup object
    - `const modalLookup = { TestModal, LoginForm, RegisterForm };`
- In the SignedOutMenu.jsx file:
  - In the 'Register' Button element:
    - Add the onClick event handler where the openModal() function is going to dispatch and pass in the modalType of RegisterForm
    ```javascript
    <Button
      onClick={() => dispatch(openModal({ modalType: 'RegisterForm' }))}
      basic
      inverted
      content='Register'
      style={{ marginLeft: '0.5em' }}
    />
    ```
- In firebaseService.js file:
  - Write an async registerInFirebase function that registers a new user in Firebase
    - Make this function an async function because we'er performing multiple operations. After registering a user in firebase is completed, we want to set additional properties onto the user object
    - This function takes creds as an argument
    - Since this is an async function, we'll run our code in a try/catch block
    - If there's an error, we'll throw the error back to the register form
    - Call the firebase.auth().createUserWithEmailAndPassword() method and provide the user's email and password that we got from RegisterForm. The result we get back from this method is the user credentials
    - After this is done, we want to set a displayName property on the user object using the .updateProfile() method. We want to return this as well because we want to make use of the loading indicator while we're waiting for this operation to complete
    ```javascript
    // Register new user in firebase
    // After registering a user is completed, add the displayName property to the user object
    export async function registerInFirebase(creds) {
      try {
        const result = await firebase
          .auth()
          .createUserWithEmailAndPassword(creds.email, creds.password);
        return await result.user.updateProfile({
          displayName: creds.displayName
        });
      } catch (error) {
        throw error;
      }
    }
    ```
- In RegisterForm.jsx file:
  - Import the registerInFirebase method: `import { registerInFirebase } from '../../app/firestore/firebaseService';`
  - On the onSubmit event handler, call the registerInFirebase() method inside the try block and pass in the values as an argument. Add the 'await' keyword in front of it since this is an async operation
    - `await registerInFirebase(values);`

### [5. Handling auth errors in LoginForm and RegisterForm](https://github.com/sungnga/revents/commit/3b84f8be3ec17dfcda5495d25f0efb7154b0f04e?ts=2)
- Let's handle errors with user authentication - something went wrong when they attempt to login or register as a new user
In the LoginForm, we want to display an error message to the user if they aren't able to login
- In LoginForm.jsx file:
  - Import Semantic Label component: `import { Label } from 'semantic-ui-react';`
  - In the onSubmit event handler:
    - Extract the setErrors props from Formik
    - Inside the catch block:
      - Call the setErrors() method and we can add an additional `auth` key to the `errors` object. Also, we can set our own custom error message to the user rather than using the error message we got from firebase. We can set an error message like 'Problem with username or password'
    ```javascript
    onSubmit={async (values, { setSubmitting, setErrors }) => {
      try {
        await signInWithEmail(values);
        setSubmitting(false);
        dispatch(closeModal());
      } catch (error) {
        // Setting a custom error message rather than error message from firebase
        setErrors({ auth: 'Problem with username or password' });
        setSubmitting(false);
      }
    }}
    ```
  - Then in the render props:
    - Extract the `errors` object props
      - `{({ isSubmitting, isValid, dirty, errors }) => ( .. )`
    - Just above the Button element, check to see if there's an error in `errors.auth`
    - If there is, render a Label with the error message displayed
    ```javascript
    {errors.auth && (
      <Label
        basic
        color='red'
        style={{ marginBottom: 10 }}
        content={errors.auth}
      />
    )}
    ```
- In the RegisterForm.jsx file:
  - Do the exact same thing as the LoginForm. But for the RegisterForm, we want to display the error.message coming from Firebase
    ```javascript
    onSubmit={async (values, { setSubmitting, setErrors }) => {
      try {
        await registerInFirebase(values);
        setSubmitting(false);
        dispatch(closeModal());
      } catch (error) {
        setErrors({ auth: error.message });
        setSubmitting(false);
      }
    }}
    ```
  - Render the error message just above the button element on the RegisterForm
    ```js
    {errors.auth && (
      <Label
        basic
        color='red'
        style={{ marginBottom: 10 }}
        content={errors.auth}
      />
    )}
    ```

### [6. Setting user profile data in Firestore and Firebase](https://github.com/sungnga/revents/commit/2e6574b14826b68c2736cdcf8a28e44a07051d07?ts=2)
- After we registered a new user in Firebase we want to add the user profile data into Firestore database as well. And we want to do this all in one function. By storing user profile in Firestore db, we get live updates when they make changes to their profile information. So we're going to add users profile data into Firestore db. Right now we have events collection in Firestore. We're going to have a collection of document for each user that registers to our application
- In firestoreService file:
  - Write a setUserProfileData function that creates a 'users' collection in Firestore db that contains a collection of user profile documents
    - This function takes user as an argument
    - Call the db.collection('users').doc(user.uid).set() method to create and set a document in a collection
      - We don't need to have a collection already in place. If the specified collection doesn't exist, it will create one
      - A .set() method allows us to specify a document reference (user.uid) ourselves even though we're creating this document at the same time
      - Specify the document, the document's Fields, inside the .set() method
      - For each user document, create the 'displayName', 'email', and 'createdAt' fields
    ```javascript
    // Set user profile data in users collection
    export function setUserProfileData(user) {
      return db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    ```
- The Firebase's registerInFirebase() function performs three operations in sequential order:
  - Registers a new user with their email and password in Firebase auth
  - Adds the displayName property to the user object
  - Attempts to set the user profile data in Firestore db and returns this user document
- In firebaseService file:
  - Import the setUserProfileData function: `import { setUserProfileData } from './firestoreService';`
  - In the registerInFirebase function:
    - Call the setUserProfileData() method and pass in result.user as an argument. Add the 'await' keyword in front of it because we need to wait for this function to complete. Also add 'return' in front of it, so that we can use the returned result in our application
    ```javascript
    import { setUserProfileData } from './firestoreService';

    // Register new user in firebase
    // After registering a user is completed, add the displayName property to the user object
    // After register a user in firebase, set the user profile data in firestore db
    export async function registerInFirebase(creds) {
      try {
        const result = await firebase
          .auth()
          .createUserWithEmailAndPassword(creds.email, creds.password);
        await result.user.updateProfile({
          displayName: creds.displayName
        });
        return await setUserProfileData(result.user);
      } catch (error) {
        throw error;
      }
    }
    ```

### [7. Creating a social login component: SocialLogin component](https://github.com/sungnga/revents/commit/67f6356ab921af7124d5773476f256ab298ee73b?ts=2)
- In src/features/auth folder, create a component/file called SocialLogin.jsx
- In SocialLogin.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic Button component: `import { Button } from 'semantic-ui-react';`
  - Write a SocialLogin functional component that renders a Facebook and Google login buttons 
    ```javascript
    import React from 'react';
    import { Button } from 'semantic-ui-react';
    
    export default function SocialLogin() {
      return (
        <>
          <Button icon='facebook' fluid color='facebook' style={{ marginBottom: 10 }} content='Login with Facebook' />
          <Button icon='google' fluid color='google plus' content='Login with Google' />
        </>
      );
    }
    ```
- In LoginForm.jsx and RegisterForm.jsx files:
  - Import Semantic Button component: `import { Divider } from 'semantic-ui-react';`
  - Import the SocialLogin component: `import SocialLogin from './SocialLogin';`
  - Inside the Form component:
    - Right after the Button element, add a horizontal Semantic Divider component with the text Or
    - Underneath that, render the SocialLogin component
    ```javascript
    <Divider horizontal>Or</Divider>
    <SocialLogin />
    ```

### [8. Facebook login setup](https://github.com/sungnga/revents/commit/c4cc0f2a1254ffe9fa1fc1f748049acdee278ef6?ts=2)
- Go to Facebook developers website: https://developers.facebook.com/
- Once logged in with Facebook account, click on the 'Add a New project' button
- Select the 'For Everything Else' option. Give the project a name
- In Facebook developers dashboard
  - Click on Facebook Login -> Set Up button. Then select for the Web
- In the Settings menu on the left, click on Basic tab
  - Copy the App ID and copy the App Secret
- Go to Firebase Authentication page and under the 'Sign-in method' tab
  - Enable Facebook Sign-in
  - Paste in the App ID and App Secret
  - Copy the OAuth redirect URI underneath it
- In the Facebook Login menu on the left, click on Settings tab
  - We need to provide info for: Valid OAuth Redirect URIs
  - Paste in the OAuth Redirect URI
- In the Roles menu on the left, click on Test Users tab
  - Click on the 'Add' button
  - Add 2 Number of Test Users to Create
  - Once the Test Users are listed, change their names and give new passwords

### [9. Adding the Facebook login method](https://github.com/sungnga/revents/commit/e79d857d0a1ae034f0fbe6345e96c39df4127510?ts=2)
- In firebaseService.jsx file:
  - Import the setUserProfileData function : `import { setUserProfileData } from './firestoreService';`
  - Import toast: `import { toast } from 'react-toastify';`
  - Write an async socialLogin function that logs in a user with Facebook or Google. If this user logs in for the first time, create a user profile for them in Firestore and Firebase. This function is going to be called in SocialLogin component
    - This function takes a selectedProvider as an argument. The provider is going to be either Facebook or Google depending on the button they choose to login
    - First, add a `provider` variable
    - Then write an if statement to check if the `selectedProivder` is equal to 'facebook' or 'google'
      - If it is, set the provider variable to the new firebase facebook or google auth provider. The Firebase Auth provides these functions to set the providers
    - After that, use a try/catch block to run the code
    - If there's an error, use toast.error() method to display the error.message
    - Inside the try block:
      - Call the firebase.auth().signInWithPopup() method and pass in the provider. Add an 'await' keyword in front of it since this is an async function. Assign the returned result to a result variable
      - Then write an if statement flag to check if this user is a new user. If it is, execute the setUserProfileData() method and pass in result.user as an argument. If this facebook user is a new user logging into our application, the setUserProfileData() method will create a user profile for them in Firestore and Firebase
    ```javascript
    export async function socialLogin(selectedProvider) {
      let provider;
      if (selectedProvider === 'facebook') {
        provider = new firebase.auth.FacebookAuthProvider();
      }
      if (selectedProvider === 'google') {
        provider = new firebase.auth.GoogleAuthProvider();
      }
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        console.log(result);
        if (result.additionalUserInfo.isNewUser) {
          await setUserProfileData(result.user);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    ```
- In SocialLogin.jsx file:
  - Import useDispatch() hook: `import { useDispatch } from 'react-redux';`
  - Import closeModal() action: `import {closeModal} from '../../app/common/modals/modalReducer'`
  - Import socialLogin function: `import { socialLogin } from '../../app/firestore/firebaseService';`
  - Create a dispatch method using useDispatch() hook
  - Write a handleSocialLogin function handler
    - This function takes a provider as an argument
    - Dispatch a closeModal() action
    - Call the socialLogin() function and pass in the provider
    ```javascript
    function handleSocialLogin(provider) {
      dispatch(closeModal());
      socialLogin(provider);
    }
    ```
  - In the 'Login with Google' and 'Login with Facebook' Button elements:
    - Add an onClick event handler and call the handleSocialLogin() function and pass in 'facebook' for Facebook login and 'google' for Google login as a provider argument
    ```javascript
    <Button
      onClick={() => handleSocialLogin('facebook')}
      icon='facebook'
      fluid
      color='facebook'
      style={{ marginBottom: 10 }}
      content='Login with Facebook'
    />
    <Button
      onClick={() => handleSocialLogin('google')}
      icon='google'
      fluid
      color='google plus'
      style={{ marginBottom: 10 }}
      content='Login with Google'
    />
    ```
- To test the Facebook login functionality:
  - Go to Facebook developers dashboard and get one of the Test Users email and password
  - When log in with Facebook, type in the user email and password
  - Once the user is logged in,
    - This user is created and listed in the Firebase Authentication Users list
    - The user profile is also created for this user in Cloud Firestore db in 'users' collection
  - When they log in for the very first time, the isNewUser property is set to true. When they log in again after that, the isNewUser property is set to false
- We can also display the user's profile picture once they're logged in
- In firestoreService.js file:
  - In the setUserProfileData function:
    - Add a photoURL property and set it to user.photoURL or null
    - This adds the photoURL property to the user document in Firestore db
    ```javascript
    export function setUserProfileData(user) {
      return db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    ```
- In authReducer.js file:
  - For SIGN_IN_USER switch statement, instead of displaying a default user profile picture, display the photoURL from payload
  ```js
  case SIGN_IN_USER:
    return {
      ...state,
      authenticated: true,
      currentUser: {
        email: payload.email,
        photoURL: payload.photoURL
      }
    };
  ```
- NOTE: if there's a problem logging in with Facebook with error messages such as this URL is not available and try later or privacy issues, wait for a little while (4 hours) and try to login again with the Test User email and password

### [10. Google login setup](https://github.com/sungnga/revents/commit/48606256b00bda9f043efcb1197300b3d56e23e2?ts=2)
- Go to Google Firebase console: https://console.firebase.google.com/
- Click on Authentication in main menu. Then in Authentication page, select 'Sign-in method' at the top menu bar
- Enable Google Sign-in. Provide Project support email and click Save. Easy peasy
- Now when a user logs in with Google, if they're a new user to our application, a user object will be created in Firebase Auth and a user document created in Firestore db

### [11. Adding an account page: AccountPage component](https://github.com/sungnga/revents/commit/de6e4468e2f775842c2b35983ab7d330a00e0468?ts=2)
- Create an account page that allows users to change their password. We will use Formik form validation before submitting the new password. If they logged in with Facebook or Google we provide a link to Facebook or Google to change their password there
- In src/features/auth folder, create a component/file called AccountPage.jsx
- In AccountPage.jsx file:
  - Import the following:
    ```javascript
    import React from 'react';
    import { Form, Formik } from 'formik';
    import { Link } from 'react-router-dom';
    import { Button, Header, Label, Segment } from 'semantic-ui-react';
    import * as Yup from 'yup';
    import MyTextInput from '../../app/common/form/MyTextInput';
    ```
  - Write a AccountPage functional component that renders the user account page using Formik and Semantic UI
    - This account page allows user to change their password
    - If they signed in with Facebook or Google, buttons that take them to Facebook or Google website to update their account there
    ```javascript
    export default function AccountPage() {
      return (
        <Segment>
          <Header dividing size='large' content='Account' />
          <div>
            <Header color='teal' sub content='Change Password' />
            <p>Use this form to change your password</p>
            <Formik
              initialValues={{ newPassword1: '', newPassword2: '' }}
              validationSchema={Yup.object({
                newPassword1: Yup.string().required('Password is required'),
                newPassword2: Yup.string().oneOf(
                  [Yup.ref('newPassword1'), null],
                  'Passwords do not match'
                )
              })}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ errors, isSubmitting, isValid, dirty }) => (
                <Form className='ui form'>
                  <MyTextInput
                    name='newPassword1'
                    type='password'
                    placeholder='New Password'
                  />
                  <MyTextInput
                    name='newPassword2'
                    type='password'
                    placeholder='Confirm Password'
                  />
                  {errors.auth && (
                    <Label
                      basic
                      color='red'
                      style={{ marginBottom: 10 }}
                      content={errors.auth}
                    />
                  )}
                  <Button
                    type='submit'
                    disabled={!isValid || !dirty || isSubmitting}
                    size='large'
                    positive
                    content='Update password'
                  />
                </Form>
              )}
            </Formik>
          </div>
          <div>
            <Header color='teal' sub content='Facebook account' />
            <p>Please visit Facebook to update your account</p>
            <Button
              icon='facebook'
              color='facebook'
              as={Link}
              to='https://facebook.com'
              content='Go to Facebook'
            />
          </div>
          <div>
            <Header color='teal' sub content='Google account' />
            <p>Please visit Google to update your account</p>
            <Button
              icon='google'
              color='google plus'
              as={Link}
              to='https://google.com'
              content='Go to Google'
            />
          </div>
        </Segment>
      );
    }
    ```
- In App.jsx file:
  - Import the AccountPage component: `import AccountPage from '../../features/auth/AccountPage';`
  - Create a route for the AccountPage component. Set the path to '/account'
    - `<Route path='/account' component={AccountPage} />`
- In SignedInMenu.jsx file:
  - Right after the 'My profile' Dropdown.Item, add a 'My account' Dropdown.Item
  - Make this dropdown as a link and set the pathname to '/account'
  - `<Dropdown.Item as={Link} to='/account' text='My account' icon='settings' />`

### [12. Adding additional user info into the authReducer](https://github.com/sungnga/revents/commit/c11b7d4e54d92cecc92671d43c1d24f80827c0f9?ts=2)
- Once a user is successfully logged into our app, either through email/password, Facebook, or Google, Firebase Auth returns the user data from the provider. One of the properties called `providerData` contains the property `providerId` that tells the method which the user used to sign into the application. We can display different content on the page based on how they signed in
- In authReducer.js file:
  - In the SIGN_IN_USER case, add additional properties to the currentUser object
  ```javascript
  // the provider is the method the user signed into the app
  // email/password = password, fb = facebook.com, google = google.com
  case SIGN_IN_USER:
    return {
      ...state,
      authenticated: true,
      currentUser: {
        email: payload.email,
        photoURL: payload.photoURL,
        uid: payload.uid,
        displayName: payload.displayName,
        providerId: payload.providerData[0].providerId
      }
    };
  ```
- In SignedInMenu.jsx file:
  - Once the user is logged in, we want to display their displayName instead of their email address at the top NavBar
  - In the Dropdown component, change the text property to currentUser.displayName
    - `<Dropdown pointing='top left' text={currentUser.displayName}>`
- In AccountPage.jsx file:
  - Import useSelector() hook: `import { useSelector } from 'react-redux';`
  - Extract the currentUser property from authReducer using useSelector() hook
    - `const { currentUser } = useSelector((state) => state.auth);`
  - The currentUser.providerId property will tell which provider the user used to log into our application. It's either password, facebook, or google. We only want to display the relevant content based on the provider they used to login
  - In the render section:
    - Add conditional logic to display the proper content based on the provider the user used to login. Do this for all three providers
    - `{currentUser.providerId === 'password' && ( ... )`
    - `{currentUser.providerId === 'facebook.com' && ( ... )`
    - `{currentUser.providerId === 'google.com' && ( ... )`

### [13. Adding a password change function](https://github.com/sungnga/revents/commit/ea4658b38ed463c9a7200b2b36b09c682d1cb3cb?ts=2)
- In firebaseService.js file:
  - Write an updateUserPassword function that updates user password
    - This function takes creds as an argument. creds is the newPassword1 and newPassword2 values
    - First, we need to get a reference to our existing user. Assign it to a `user` variable. This code runs synchronously because currentUser is stored in local state
      - `const user = firebase.auth().currentUser;`
    - Then call the .updatePassword() on the user and pass in creds.newPassword1 as an argument. This returns a promise, so we need to use a loading indicator for this function
    ```javascript
    export function updateUserPassword(creds) {
      const user = firebase.auth().currentUser;
      return user.updatePassword(creds.newPassword1);
    }
    ```
- In AccountPage.jsx file:
  - Import the updateUserPassword function: `import { updateUserPassword } from '../../app/firestore/firebaseService';`
  - In the onSubmit event handler:
    - Make the arrow function handler an async function by adding the 'async' keyword in front of it
    - As a 2nd arg, extract the setSubmitting and setErrors props, as an object, from Formik
    - Since this is an async function, run the code in a try/catch block
    - If there's an error, call the setErrors() method and set the auth property to error.message
    - In the try block:
      - Call the updateUserPassword() method and pass in values as an argument. Add the 'await' in front of it since we need to wait for this function to complete
    - In the finally block:
      - Call setSubmitting() and set it to false. This will trigger the loading indicator
    ```javascript
    import { updateUserPassword } from '../../app/firestore/firebaseService';

    const [updateSuccess, setUpdateSuccess] = useState(false);

    onSubmit={async (values, { setSubmitting, setErrors }) => {
      try {
        await updateUserPassword(values);
        setUpdateSuccess(true);
      } catch (error) {
        setErrors({ auth: error.message });
      } finally {
        // run this code no matter what
        setSubmitting(false);
      }
    }}
    ```
  - In the 'Update password' Button element:
    - Add the loading property and make this button a block element so it'll take up the entire row
    ```javascript
    {updateSuccess && (
      <Label
        basic
        color='green'
        style={{ marginBottom: 10 }}
        content='Update password success'
      />
    )}
    <Button
      style={{ display: 'block' }}
      loading={isSubmitting}
      type='submit'
      disabled={!isValid || !dirty || isSubmitting}
      size='large'
      positive
      content='Update password'
    />
    ```
- NOTE: At current state of our application we're running into one problem. When we're on the account page and we refresh the page, our application crashes saying that providerId is null. This is because when the application initializes itself and tries to load the AccountPage component, the currentUser is null (providerId property is inside the currentUser object). Only after the SIGN_IN_USER action creator runs do we get the currentUser object. 

### [14. Fixing our issue with app initialization](https://github.com/sungnga/revents/commit/c8277072a01efa362d8b05069c03728a73b57dee?ts=2)
- When a user is signed in and then visits the My Account page and then refreshes the page, we will run into an error that says Cannot read property 'providerId' of null. That is because we've initialized our app and the auth state is currently null and there's no user object. Certain page or component requires the user visiting the page be authenticated and we wrote a conditional somewhere in the component that is looking for the user object. ProviderId is one of the properties of the user object. When the Account page refreshes, it causes the component to re-render. And in the application initialization stage, it's looking for the providerId property but the currentUser object is currently null (no user object), so the application crashed
- So what we need to take a look at is our application initialization. Our components are going to attempt to display as soon as possible and we need to add some control into that and wait until certain things have loaded in our application before we attempt to display the components. At the moment, whether we're authenticated or not, there may be other information that we want to load in when we initialize our application before anything else loads up
- In our case, we're going to do this in the asyncReducer. We want to add an initialized flag into our asyncReducer and anything else that we need to do before our component renders
- In asyncReducer.js file:
  - Add another constant
    - `export const APP_LOADED = 'APP_LOADED';`
  - Add an additional initialState property of initialized and set it to false:
    ```javascript
    const initialState = {
      loading: false,
      error: null,
      initialized: false
    };
    ```
  - Add another case to the asyncReducer function at the bottom
    - This function will return as an object, the existing state and set the initialized property to true
    ```javascript
    case APP_LOADED:
      return {
        ...state,
        initialized: true
      };
    ```
- All of our initialization is taken place in the verifyAuth() action. We want to wait until we've got our current user before we can say our app is now loaded
- Go to authActions.js file:
  - Import the APP_LOADED constant: `import { APP_LOADED } from '../../app/async/asyncReducer';`
  - In the verifyAuth() function:
    - In this function, we're observing, listening for auth state to change. And we're going to get a user object back or not. If we do get a user, we dispatch the signInUser() action with the user object. This will set the state with the currentUser object
    - After this is done, we want to dispatch the APP_LOADED action. This is a flag. It's either true or false. When APP_LOADED is called, initialized state property is set to true
    - If there is no user, dispatch the signOutUser() action and then dispatch the APP_LOADED action. The initialized state property is not set to true after we signed out user
    ```javascript
    export function verifyAuth() {
      return function (dispatch) {
        return firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // Update the state with currentUser object
            dispatch(signInUser(user));
            dispatch({ type: APP_LOADED });
          } else {
            dispatch(signOutUser());
            dispatch({ type: APP_LOADED });
          }
        });
      };
    }
    ```
- Next is, we want to prevent our application component from loading until the APP_LOADED flag is set to true. And we'll do this at the root of our component
- In App.jsx file:
  - Import useSelector() hook: `import { useSelector } from 'react-redux';`
  - Import LoadingComponent component: `import LoadingComponent from './LoadingComponent';`
  - Get the initialized property from the asyncReducer using useSelector() hook
    - `const { initialized } = useSelector((state) => state.async);`
  - Write an if statement to see if initialized property is false. If it is, return the LoadingComponent component. What this means is, we don't attempt to load any of our application until the initialized flag is set to true and by that point, we should have our currentUser object
    - `if (!initialized) return <LoadingComponent content='Loading app...' />;`
- In SignedInMenu.jsx file:
  - When the user clicks the 'Sign out' Dropdown.Item, the handleSignOut() method is executed. We want to push the user to the homepage first, then call the signOutFirebase() method to sign them out in Firebase
    ```javascript
    async function handleSignOut() {
      try {
        history.push('/');
        await signOutFirebase();
      } catch (error) {
        toast.error(error.message);
      }
    }
    ```


## USER PROFILES

### [1. Adding a profile page: ProfilePage and ProfileHeader components](https://github.com/sungnga/revents/commit/f508f521006151bde533f6371e0056249bed3c9f?ts=2)
- Let's start creating the user profile page. This page contains the profile header and profile content
- The profile header contains:
  - user profile image
  - user display name
  - the number of followers
  - the number of following
  - a button that displays whether the authenticated user is following this user or not. This button can toggle between following and unfollow
- In src/features/profiles/profilePage folder, create a component/file called ProfilePage.jsx
- In ProfilePage.jsx file:
  - Import the following:
    ```js
    import React from 'react';
    import { Grid } from 'semantic-ui-react';
    import ProfileHeader from './ProfileHeader';
    ```
  - Write a ProfilePage functional component that renders the ProfileHeader and ProfileContent components using Semantic UI
    - Render the ProfileHeader component and Profile content inside a 16-width grid column
    ```javascript
    export default function ProfilePage() {
      return (
        <Grid>
          <Grid.Column width={16}>
            <ProfileHeader />
            <h1>Profile content</h1>
          </Grid.Column>
        </Grid>
      );
    }
    ```
- In features/profiles/profilePage folder, create a component/file called ProfileHeader.jsx
- In ProfileHeader.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic components: `import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from 'semantic-ui-react';`
  - Write a ProfileHeader functional component that renders 
    - a 12-width column grid of the user profile picture and display name
    - a 4-width column grid of the user's statistics of number of following and followers
    ```javascript
    export default function ProfileHeader() {
      return (
        <Segment>
          <Grid>
            <Grid.Column width={12}>
              <Item.Group>
                <Item>
                  <Item.Image avatar size='small' src='/assets/user.png' />
                  <Item.Content verticalAlign='middle'>
                    <Header
                      as='h1'
                      style={{ display: 'block', marginBottom: 10 }}
                      content='Display name'
                    />
                  </Item.Content>
                </Item>
              </Item.Group>
            </Grid.Column>
            <Grid.Column width={4}>
              <Statistic.Group>
                <Statistic label='Followers' value={10} />
                <Statistic label='Following' value={5} />
              </Statistic.Group>
              <Divider />
              <Reveal animated='move'>
                <Reveal.Content visible style={{ width: '100%' }}>
                  <Button fluid color='teal' content='Following' />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: '100%' }}>
                  <Button basic fluid color='red' content='Unfollow' />
                </Reveal.Content>
              </Reveal>
            </Grid.Column>
          </Grid>
        </Segment>
      );
    }
    ```
- Setup a link so that we can visit the ProfilePage
- In App.jsx file:
  - Import the ProfilePage component: `import ProfilePage from '../../features/profiles/profilePage/ProfilePage';`
  - Create a route for the ProfilePage component right after the route for AccountPage
    - The path contains the user id
    - `<Route path='/profile/:id' component={ProfilePage} />`
- In SignedInMenu.jsx file:
  - In the jsx section:
    - Make the 'My profile' Dropdown.Item component as a Link and specify the pathname
    ```javascript
    <Dropdown.Item
      as={Link}
      to={`/profile/${currentUser?.uid}`}
      text='My profile'
      icon='user'
    />
    ```

### [2. Adding the profile content: ProfileContent component](https://github.com/sungnga/revents/commit/5c01f21f400c7598fe06349a7596452cef153c8e?ts=2)
- The layout of the ProfileContent component is we have two columns. On the right column is a vertical menu tab which contains various information about the user. On the left column is the detail content of each menu item
- In features/profiles/profilePage folder, create a component/file called ProfileContent.jsx
- In ProfileContent.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic Tab component: `import { Tab } from 'semantic-ui-react';`
  - Write a ProfileContent functional component that renders the user profile content
    ```javascript
    export default function ProfileContent() {
      const panes = [
        { menuItem: 'About', render: () => <Tab.Pane>About User</Tab.Pane> },
        { menuItem: 'Photos', render: () => <Tab.Pane>Photos</Tab.Pane> },
        { menuItem: 'Events', render: () => <Tab.Pane>Events</Tab.Pane> },
        { menuItem: 'Followers', render: () => <Tab.Pane>Followers</Tab.Pane> },
        { menuItem: 'Following', render: () => <Tab.Pane>Following</Tab.Pane> }
      ];

      return (
        <Tab
          menu={{ fluid: true, vertical: true }}
          menuPosition='right'
          panes={panes}
        />
      );
    }
    ```
- In ProfilePage.jsx file:
  - Import the ProfileContent component: `import ProfileContent from './ProfileContent';`
    - In jsx, instantiate the ProfileContent component right after the ProfileHeader component: `<ProfileContent />`

### [3. Creating the redux actions: profileReducer](https://github.com/sungnga/revents/commit/d9cb30496962c0f575ebd021acb0e625f0a6d5b9?ts=2)
- In src/features/profiles folder, create a file called profileConstants.js
- In profileConstants.js file:
  - Add a constant LISTEN_TO_CURRENT_USER_PROFILE action
  - This is something we want to listen to, especially when we initialize our application. We want to get the currentUser profile from Firestore and populate that in our Redux store and continuously listen to the current user profile as well
    - `export const LISTEN_TO_CURRENT_USER_PROFILE = 'LISTEN_TO_CURRENT_USER_PROFILE';`
- In src/features/profiles folder, create a file called profileActions.js
- In profileActions.js file:
  - Import the constant: `import { LISTEN_TO_CURRENT_USER_PROFILE } from "./profileConstants";`
  - Write a listenToCurrentUserProfile action creator function that gets the current user profile from Firestore
    - This function takes a profile as an argument
    - This function returns as an object,
      - the action type of LISTEN_TO_CURRENT_USER_PROFILE
      - the payload of profile
    ```javascript
    export function listenToCurrentUserProfile(profile) {
      return {
        type: LISTEN_TO_CURRENT_USER_PROFILE,
        payload: profile
      };
    }
    ```
- In src/features/profiles folder, create a file called profileReducer.js
- In profileReducer.js file:
  - Import the constant: `import { LISTEN_TO_CURRENT_USER_PROFILE } from './profileConstants';`
  - Create an initialState object
    ```javascript
    const initialState = {
      currentUserProfile: null
    };
    ```
  - Write a profileReducer function
    - This function takes 2 arguments
      - 1st arg is the state and it is set to initialState as default value
      - 2nd arg is the action, destructuring the type and payload properties
    - Use a switch statement to handle different action types
    - Write a case for the LISTEN_TO_CURRENT_USER_PROFILE action type
      - This action returns as an object, the existing state and the currentUserProfile state property of payload
      - When this action is dispatched, currentUserProfile property in the profileReducer redux store will contain current user profile from Firestore
    - Write a default case that returns the state
    ```javascript
    import { LISTEN_TO_CURRENT_USER_PROFILE } from './profileConstants';

    const initialState = {
      currentUserProfile: null
    };

    export default function profileReducer(
      state = initialState,
      { type, payload }
    ) {
      switch (type) {
        case LISTEN_TO_CURRENT_USER_PROFILE:
          return {
            ...state,
            currentUserProfile: payload
          };
        default: {
          return state;
        }
      }
    }
    ```
- In rootReducer.js file:
  - Import the profileReducer: `import profileReducer from '../../features/profiles/profileReducer';`
  - Add the profileReducer as profile property to the rootReducer
    - `profile: profileReducer`
- We can go to the Redux devTools console and check out our Redux state and we should be able to find a new `profile` state with a `currentUserProfile` property in it. The currentUserProfile is currently null, but we can hook up our ProfilePage to Firestore and get the user profile data down so we can display it in the page

### [4. Connecting the ProfilePage to the store](https://github.com/sungnga/revents/commit/bd6a3d1487b31d87c8be0eb3bcbe29ea56d78392?ts=2)
- In ProfilePage.jsx file:
  - Import useDispatch() and useSelector() hooks: `import { useDispatch, useSelector } from 'react-redux';`
  - Create a dispatch() method using useDispatch() hook
    - `const dispatch = useDispatch();`
  - Extract the currentUserProfile property from profileReducer using useSelector() hook
    - `const { currentUserProfile } = useSelector((state) => state.profile);`
  - Extract the loading and error properties from asyncReducer using useSelector() hook
    - `const { loading, error } = useSelector((state) => state.async);`
- Next, we want to get the user profile document from Firestore
- In firestoreService.js file:
  - Write a getUserProfile query function that gets user profile from Firestore
    - This function takes userId as an argument
    ```javascript
    export function getUserProfile(userId) {
      return db.collection('users').doc(userId);
    }
    ```
- Back to ProfilePage.jsx file:
  - We will use the custom useFirestoreDoc() hook to get the user document from fire
  - Import the following:
    ```javascript
    import { getUserProfile } from '../../../app/firestore/firestoreService';
    import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
    import { listenToCurrentUserProfile } from '../profileActions';
    import LoadingComponent from '../../../app/layout/LoadingComponent';
    ```
  - In the ProfilePage component, destructure the match props. We want to use the match.params to get the userId from the route params
    - `export default function ProfilePage({ match }) { ... }`
  - Use the custom useFirestoreDoc() hook:
    - This hook accepts query, data, deps, and shouldExecute object as an argument
    - For query props, call the getUserProfile() method inside an arrow function and pass in the match.params.id, which is the userId
      - This will return the user data from Firestore
    - For data props: dispatch the listenToCurrentUserProfile() action inside an arrow function and pass in the profile as an argument. The arrow function receives profile as props
      - Once we have the data, we dispatch the listenToCurrentUserProfile() action to store the data/profile in Redux store
      - The data/profile is stored in the currentUserProfile property in the profileReducer
    - For deps props, which is an array: list dispatch and match.params.id as dependencies
      - This component will only re-renders when there's a change in dispatch or the userId
    ```javascript
    useFirestoreDoc({
      query: () => getUserProfile(match.params.id),
      data: (profile) => dispatch(listenToCurrentUserProfile(profile)),
      deps: [dispatch, match.params.id]
    });
    ```
  - NOTE: when we visit the user profile page (when the ProfilePage component first mounts), we don't have the currentUserProfile object yet. Only after the `userFirestoreDoc` hook runs do we get the currentUserProfile from Firestore. This doesn't stop our ProfilePage component from rendering other components such as the ProfileHeader and ProfileConent, and these components are looking for the currentUserProfile object. When they don't find it, it causes our application to crash. To resolve this issue, we can display a loading indicator while we fetch the user profile from the Firestore
  - Write an if statement to check if loading is true AND no currentUserProfile or no currentUserProfile AND no error. If the condition is true, then return the LoadingComponent component
    ```javascript
    if ((loading && !currentUserProfile) || (!currentUserProfile && !error))
      return <LoadingComponent content='Loading profile...' />;
    ```
  - Pass down the currentUserProfile object as profile props to both ProfileHeader and ProfileContent child components
    ```javascript
    <ProfileHeader profile={currentUserProfile} />
    <ProfileContent profile={currentUserProfile} />
    ```
- In ProfileHeader.jsx file:
  - Accept profile as props from ProfilePage parent component and destructure it
    - `export default function ProfileHeader({ profile }) { ... }`
  - Then set the source image to display the profile photoURL or a static profile image if they don't have one
    - `src={profile.photoURL || '/assets/user.png'}`
  - Set the Header content to display the profile displayName
    - `content={profile.displayName}`

### [5. Adding an about page: AboutTab component](https://github.com/sungnga/revents/commit/0c8a28458aa3c8a69e0b4601d14dcdbb77d56533?ts=2)
- The About tab displays information about the user. If this profile belongs to the currentUser, the 'Edit' button is available for them to edit their profile information
- In features/profiles/profilePage folder, create a component/file called AboutTab.jsx
- In AboutTab.jsx file:
  - Import the following:
    ```javascript
    import React, { useState } from 'react';
    import { Button, Grid, Header, Tab } from 'semantic-ui-react';
    import { format } from 'date-fns';
    ```
  - Write an AboutTab functional component that renders the user about tab
    - Receives profile as props from ProfileContent parent component
    - Create an editMode state using useState() hook and set its initial value to false
      - The reason why we have the editMode state is the user could edit this page if they like. If it's in editMode, we want to display a form to the user. Else, we want to display the about content
      - `const [editMode, setEditMode] = useState(false);`
    - There's a button that toggles between 'Cancel' or 'Edit', depending on the editMode state
    - The content is wrapped in a `<Tab.Pane />` component. So when a user clicks on the About tab on the right column, the About content is displayed in a pane on the left column
    ```javascript
    export default function AboutTab({ profile }) {
      const [editMode, setEditMode] = useState(false);

      return (
        <Tab.Pane>
          <Grid>
            <Grid.Column width={16}>
              <Header
                floated='left'
                icon='user'
                content={`About ${profile.displayName}`}
              />
              <Button
                onClick={() => setEditMode(!editMode)}
                floated='right'
                basic
                content={editMode ? 'Cancel' : 'Edit'}
              />
            </Grid.Column>
            <Grid.Column width={16}>
              {editMode ? (
                <p>Profile form</p>
              ) : (
                <>
                  <div style={{ marginBottom: 10 }}>
                    <strong>
                      Member since: {format(profile.createdAt, 'dd MMM yyyy')}
                    </strong>
                    <div>{profile.description || null}</div>
                  </div>
                </>
              )}
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      );
    }
    ```
- In ProfileContent.jsx file:
  - Import the AboutTab component: `import AboutTab from './AboutTab';`
  - The ProfileContent component receives profile as props from ProfilePage parent component. Destructure profile
    - `export default function ProfileContent({ profile }) { ... }`
  - Inside the 'About' menuItem:
    - Render the AboutTab component inside the arrow function
    - Then pass down the profile props to the AboutTab child component
    - `{ menuItem: 'About', render: () => <AboutTab profile={profile} /> }`

### [6. Adding the profile form: ProfileForm component](https://github.com/sungnga/revents/commit/1cd7c678b2288537686eacaf7178a2b2495832f9?ts=2)
- The ProfileForm allows the user to edit and update their profile displayName and profile description. This form has form validation (using Formik) where they must provide a displayName. There's also a Cancel button to exit out of ProfileForm
- In features/profiles/profilePage folder, create a component/file called ProfileForm.jsx
- In ProfileForm.jsx file:
  - Import the following:
    ```javascript
    import React from 'react';
    import { Form, Formik } from 'formik';
    import MyTextInput from '../../../app/common/form/MyTextInput';
    import MyTextArea from '../../../app/common/form/MyTextArea';
    import { Button } from 'semantic-ui-react';
    import * as Yup from 'yup';
    ```
  - Write a ProfileForm functional component that renders a profile form using Formik
    - This component receives profile props from AboutTab parent component
    - Use Formik to create the form
      - Provide the initialValues object
      - Add validationSchema property to validate the input field
      - Console log the values for onSubmit event handler for now
    - Render the Form component inside the render props
      - Extracts the isSubmitting, isValid, and dirty props as an argument
    ```javascript
    export default function ProfileForm({ profile }) {
      return (
        <Formik
          initialValues={{
            displayName: profile.displayName,
            description: profile.description || ''
          }}
          validationSchema={Yup.object({
            displayName: Yup.string().required()
          })}
          onSubmit={(values) => console.log(values)}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className='ui form'>
              <MyTextInput name='displayName' placeholder='Display Name' />
              <MyTextArea name='description' placeholder='Description' />
              <Button
                loading={isSubmitting}
                disabled={isSubmitting || !isValid || !dirty}
                floated='right'
                type='submit'
                size='large'
                positive
                content='Update profile'
              />
            </Form>
          )}
        </Formik>
      );
    }
    ```
- In AboutTab.jsx file:
  - Import the ProfileForm component: `import ProfileForm from './ProfileForm';`
  - In the editMode conditional logic, render the ProfileForm component if editMode state is true
    - Pass down the profile props to the ProfileForm child component
    - `{editMode ? ( <ProfileForm profile={profile} /> ) : ( ... )}`
					
### [7. Adding the update user actions: updateUserProfile](https://github.com/sungnga/revents/commit/3a58aea685a8baf6bfcb5363a1ca7281b3d8af68?ts=2)
- When the 'Update profile' button is clicked, we want to update the user profile in Firebase Auth and in the user document in Firestore users collection. And since we're listening to Firebase user profile, the profileReducer in Redux store will receive the update and then the update is display in the page
- To get this done, we want to check if the currentUser object in the authReducer has a differently displayName. If it does, then we want to update the firebase.auth().currentUser profile in the Firebase using the .updateProfile() method. We also want to update the user profile document in Firestore users collection
- In firestoreService.js file:
  - Write an async updateUserProfile function that updates the user profile in Firebase auth and Firestore user document
    - This function accepts profile as an argument
    - First, get the currentUser from firebase.auth() and assign it to a user variable
    - Then use a try/catch block to write the conditional
    - If there's an error, throw the error back to the form
    - In the try block:
      - Write an if statement to check if the user's displayName in Firebase Auth is different from the submitted profile's displayName
        - If it is, call the .updateProfile() method on the `user` variable and we want to set the displayName property to the displayName of the submitted profile. This is an async operation, so add the 'await' keyword in front of it
        - This will update the displayName property of the currentUser in Firebase Auth
      - Once the above is completed, we want to make another async operation to update the user document in Firestore db in the users collection by using the .update() method and pass in profile as an argument
        - Do this outside of the if statement
        - Add the 'await' keyword in front of it since we need to wait for this to complete
        - Lastly, add the return to this operation because we want to use this data that is returned later
    ```javascript
    export async function updateUserProfile(profile) {
      //get the currentUser object from firebase auth
      const user = firebase.auth().currentUser;
      
      // if the displayName in firebase auth is different from the submitted profile displayName
      // update the firebase displayName with the submitted displayName
      // then update the user profile in firestore based on the user uid
      // if an error occurs, throw the error back to the form
      try {
        if (user.displayName !== profile.displayName) {
          await user.updateProfile({
            displayName: profile.displayName
          });
        }
        return await db.collection('users').doc(user.uid).update(profile);
      } catch (error) {
        throw error;
      }
    }
    ```
- In ProfileForm.jsx file:
  - When the 'Update profile' button is clicked, the onSubmit event handler will call the updateUserProfile() function asynchronously and takes in the given values to update the user profile 
  - Import the updateUserProfile function: `import { updateUserProfile } from '../../../app/firestore/firestoreService';`
  - Import toast: `import { toast } from 'react-toastify';`
  - In the onSubmit event handler:
    - Turn the arrow function event handler into an async/await function since the function it's going to call we must wait for it to complete. Add the 'async' keyword in front of the arrow function
    - This arrow function receives the values and the setSubmitting props as arguments
    - Inside the arrow function, use a try/catch block to run the async code
    - If there's an error, call the toast.error() method to display a notification of the error.message from Firestore
    - In the try block:
      - Call the updateUserProfile() method and pass in the values as an argument. Add an 'await' in front of it as we must wait for this operation to complete
    - Finally, use the setSubmitting() method and set it to false. This will turn off the loading indicator
    ```javascript
    onSubmit={async (values, { setSubmitting }) => {
      try {
        await updateUserProfile(values);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setSubmitting(false);
      }
    }}
    ```
- NOTE: even though the user profile data is updated in both Firebase Auth and Firestore db, the user displayName in the Navbar does not automatically update unless the user refreshes the page. This is because this displayName in NavBar is listening to Firebase Auth state change from authReducer and not listening to user profile data

### [8. Initializing the app with the current user profile](https://github.com/sungnga/revents/commit/622dba55e539692d3006eb4c1ba8e19372a325f1?ts=2)
- Once a user is successfully logged in, the user displayName is displayed in the NavBar on the right hand side is currently populated from the authReducer. It's listening to state change in Firebase Auth. If the user updates their displayName, they would have to refresh the ProfilePage to see the updated change. Instead, we want this to listen to the currentUserProfile from profileReducer in Firestore and update the change from there. Another thing we want to do is to initialize our app with the current user profile data. We want to get the currentUserProfile data from Firestore and store it in the profileReducer and continuously listening to it. This way we get live updates. We do this in the verifyAuth action creator because the `store` object dispatches this action creator the moment the `store` object is initialized
- We will need to create another action and another state for the profileReducer
- In profileConstants.js file:
  - Create another constant for LISTEN_TO_SELECTED_USER_PROFILE
  - `export const LISTEN_TO_SELECTED_USER_PROFILE = 'LISTEN_TO_SELECTED_USER_PROFILE';`
- In profileActions.js file:
  - Import the constant: `import { LISTEN_TO_SELECTED_USER_PROFILE } from "./profileConstants";`
  - Write a listenToSelectedUserProfile action creator function that gets the selected user profile from Firestore
    - This function takes a profile as an argument
    - This function returns as an object,
      - the action type of LISTEN_TO_SELECTED_USER_PROFILE
      - the payload of profile
    ```javascript
    export function listenToSelectedUserProfile(profile) {
      return {
        type: LISTEN_TO_SELECTED_USER_PROFILE,
        payload: profile
      };
    }
    ```
- In profileReducer.js file:
  - Import the constant: `import { LISTEN_TO_SELECTED_USER_PROFILE } from './profileConstants';`
  - In the initialState object, add a selectedUserProfile property and set it to null
    ```javascript
    const initialState = {
      currentUserProfile: null,
      selectedUserProfile: null
    };
    ```
  - In the profileReducer function:
    - Add another case in the switch statement for LISTEN_TO_SELECTED_USER_PROFILE action type
      - This action returns as an object, the existing state and the selectedUserProfile state property of payload
      - When this action is dispatched, selectedUserProfile property in the profileReducer redux store will contain the selected user profile from Firestore
    ```javascript
    case LISTEN_TO_SELECTED_USER_PROFILE:
      return {
        ...state,
        selectedUserProfile: payload
      };
    ```
- In the SignedInMenu.jsx file:
  - What we currently are doing to display the current user in the NavBar is we're getting this from the authReducer `(state => state.auth)`. Instead, we want to get the currentUserProfile property from the profileReducer
    - `const { currentUserProfile } = useSelector((state) => state.profile);`
  - Then in JSX, we want to get the user profile image from currentUserProfile property state
    ```javascript
    <Image
      avatar
      spaced='right'
      src={currentUserProfile?.photoURL || '/assets/user.png'}
    />
    ```
  - Also the user profile displayName from currentUserProfile property state
    - `<Dropdown pointing='top left' text={currentUserProfile.displayName}>`
  - And the Link path to 'My Profile' page
    ```javascript
    <Dropdown.Item
      as={Link}
      to={`/profile/${currentUserProfile?.id}`}
      text='My profile'
      icon='user'
    />
    ```
- Now our code is broken. Before we display anything to the user, we need to verify whether they're logged in or not and respond accordingly
- In authActions.js file:
  - Import the following:
    ```javascript
    import { dataFromSnapshot, getUserProfile } from '../../app/firestore/firestoreService';
    import { listenToCurrentUserProfile } from '../../features/profiles/profileActions';
    ```
  - Inside the verifyAuth() function:
    - After we dispatched the signInUser() action, we want to call the getUserProfile() function from firestoreService and pass in the user.uid to get the user document in Firestore users collection. Assign the returned user document to profileRef variable
    - Then call the .onSnapshot() method on profileRef to get the snapshot, which contains the user profile data
    - Once we have the snapshot, use a callback function to 
      - dispatch the listenToCurrentUserProfile() action and pass in the dataFromSnapshot() method with the snapshot as an argument. The dataFromSnapshot() method shapes the snapshot into a usable format before handing the profile data to the listenToCurrentUserProfile() action. The listenToCurrentUserProfile() action will take this profile data and store it in the currentUserProfile property in profileReducer store
      - After we received the snapshot, we know that our app is safe to be loaded. So inside the callback function, dispatch the APP_LOADED action. This essentially turns on initialized flag to true in asyncReducer, turns off the loading indicator, and the application can proceed
    ```javascript
    // This action creator verifies whether the user is authenticated or not
    // Once the store object is created, it dispatches this action creator
    export function verifyAuth() {
      return function (dispatch) {
        // Listening to auth state change of firebase auth
        return firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // Update currentUser object in authReducer
            dispatch(signInUser(user));
            // Get user profile in Firestore db
            const profileRef = getUserProfile(user.uid);
            // The user profile data is stored in the snapshot
            // dataFromSnapshot function shapes the data to usable format
            // listenToCurrentUserProfile action stores the data in profileReducer
            // APP_LOADED action sets the initialized flag to true in asyncReducer
            // When initialized flag is set to false, the LoadingComponent renders
            profileRef.onSnapshot((snapshot) => {
              dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
              dispatch({ type: APP_LOADED });
            });
          } else {
            dispatch(signOutUser());
            dispatch({ type: APP_LOADED });
          }
        });
      };
    }
    ```
- Now when the user updates their displayName in the 'Update profile' form, it'll update the current user displayName in the NavBar as well

### [9. Selecting other user profiles](https://github.com/sungnga/revents/commit/ce34c06981042faf9fc602c2327e2d1bb1fd6291?ts=2)
- When a user visits another user's profile page we want to show or hide certain data depending on whether they are the current login user. For example, we don't want a user have access to the 'Edit/Cancel' button to edit a profile if they're are not the current user of this profile page. Or make the 'Follow' button available if the current login user visits their own profile page. We can find out the current login user with their uid in the currentUser property in the authReducer
- In ProfilePage.jsx file:
  - Import the listenToSelectedUserProfile() action: `import { listenToSelectedUserProfile } from '../profileActions';`
  - Extract the selectedUserProfile property from profileReducer using useSelector() hook
    - `const { selectedUserProfile } = useSelector((state) => state.profile);`
  - Extract the currentUser property from authReducer using useSelector() hook
    - `const { currentUser } = useSelector((state) => state.auth);`
  - In the useFirestoreDoc() custom hook:
    - Instead of listening to the listenToCurrentUserProfile() action, we want to listen to the listenToSelectionUserProfile() action. This will store the profile data in the selectedUserProfile property of the profileReducer state
    ```javascript
    useFirestoreDoc({
      query: () => getUserProfile(match.params.id),
      data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
      deps: [dispatch, match.params.id]
    });
    ```
  - Then swap all of the currentUserProfile properties to use selectedUserProfile properties instead
  - Pass down the selectedUserProfile as profile props to both ProfileHeader and ProfileContent child components
    ```javascript
    <ProfileHeader profile={selectedUserProfile} />
    <ProfileContent profile={selectedUserProfile} />
    ```
  - Next thing is we want to check if the profile we're looking at is the currentUser. Write a condition that checks that the currentUser.uid is equal to the selectedUserProfile.id. If it is, assign it to isCurrentUser props that's being passed down to the ProfileHeader and ProfileContent child components
    ```javascript
    <ProfileHeader
      profile={selectedUserProfile}
      isCurrentUser={currentUser.uid === selectedUserProfile.id}
    />
    <ProfileContent
      profile={selectedUserProfile}
      isCurrentUser={currentUser.uid === selectedUserProfile.id}
    />
    ```
- In ProfileHeader.jsx file:
  - Receive the isCurrentUser props from the ProfilePage parent component and destructure it
  - In JSX, we only want to display/reveal the 'Following' button in the ProfileHeader section if the user is NOT the currentUser. This prevents them from following themselves. If they're visiting someone else ProfilePage, then they're not the isCurrentUser of this page and they would see the 'Following' button and they can follow this particular user
    ```javascript
    {!isCurrentUser && (
      <>
        <Divider />
        <Reveal animated='move'>
          <Reveal.Content visible style={{ width: '100%' }}>
            <Button fluid color='teal' content='Following' />
          </Reveal.Content>
          <Reveal.Content hidden style={{ width: '100%' }}>
            <Button basic fluid color='red' content='Unfollow' />
          </Reveal.Content>
        </Reveal>
      </>
    )}
    ```
- In ProfileContent.jsx file:
  - Receive the isCurrentUser props from the ProfilePage parent component and destructure it
  - Pass down the isCurrentUser props to the AboutTab child component
  ```javascript
  {
    menuItem: 'About',
    render: () => <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
  },
  ```
- In AboutTab.jsx file:
  - Receive the isCurrentUser props from the ProfileContent parent component and destructure it
  - In JSX, we only want the isCurrentUser to be able to edit their own profile. Write a condition to check if the user is a current user. If they are, then display the 'Cancel/Edit' button
  ```javascript
  {isCurrentUser && (
    <Button
      onClick={() => setEditMode(!editMode)}
      floated='right'
      basic
      content={editMode ? 'Cancel' : 'Edit'}
    />
  )}
  ```


## IMAGE UPLOAD
- Storage with Firebase Storage
- Adding images with Dropzone JS library
- Image resizing with Cropper.js library
- Allowing users to update their main photo
- Users should be able to:
  - Upload new photos
  - Set a photo as their main photo
  - Delete a photo

### [1. Adding a profile photos page: PhotosTab component](https://github.com/sungnga/revents/commit/92d20eca57aa440e95f96aa3b840492dde78b29a?ts=2)
- Let's create a place where a user can view their photos, upload new images, set an image as their main photo, and delete a photo
- In src/features/profiles/profilePage folder, create a component/file called PhotosTab.jsx
- In PhotosTab.jsx file:
  - Import React: `import React, { useState } from 'react';`
  - Import Semantic UI components: `import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';`
  - This component has very similar page layout and functionalities as the AboutTab component. Copy and paste the code as a starter
  - Write a PhotosTab functional component that renders a profile photos tab using Semantic UI
    - This PhotosTab allows the user to add a photo, set a photo as their main profile image, and delete a photo
    - This component receives the profile and isCurrentUser props from the ProfileContent parent component 
  ```javascript
  export default function PhotosTab({ profile, isCurrentUser }) {
    const [editMode, setEditMode] = useState(false);

    return (
      <Tab.Pane>
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
              <p>Photo widget will go here</p>
            ) : (
              <Card.Group itemsPerRow={5}>
                <Card>
                  <Image src='/assets/user.png' />
                  <Button.Group fluid width={2}>
                    <Button basic color='green' content='Main' />
                    <Button basic color='red' icon='trash' />
                  </Button.Group>
                </Card>
              </Card.Group>
            )}
          </Grid.Column>
        </Grid>
      </Tab.Pane>
    );
  }
  ```
- In ProfileContent.jsx file:
  - Import the PhotosTab component: `import PhotosTab from './PhotosTab';`
  - Inside the 'Photos' menuItem panes:
    - Render the PhotosTab component inside the arrow function of the render property
    - Then pass down the profile and isCurrentUser props to the PhotosTab child component
    ```javascript
    {
      menuItem: 'Photos',
      render: () => <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
    },
    ```

### [2. Adding a photo upload widget: PhotoUploadWidget component](https://github.com/sungnga/revents/commit/d44fe69743bcd0a184768669e55c218024e05705?ts=2)
- In the PhotosTab, when a user clicks on the 'Add Photo' button, it'll take them to the photo upload widget. The PhotoUploadWidget component takes the user step by step to add a photo, resize the photo, and preview and upload the photo
- In src/app/common/photos folder, create a component/file called PhotoUploadWidget.jsx
- In PhotoUploadWidget.jsx file:
  - Import React: `import React from 'react';`
  - Import Semantic UI components: `import { Grid, Header } from 'semantic-ui-react';`
  - Write a PhotoUploadWidget functional component creates a structure for the photo upload widget using Semantic UI
    ```javascript
    export default function PhotoUploadWidget() {
      return (
        <Grid>
          <Grid.Column width={4}>
            <Header color='teal' sub content='Step 1 - Add Photo' />
          </Grid.Column>
          <Grid.Column width={1} />

          <Grid.Column width={4}>
            <Header color='teal' sub content='Step 2 - Resize' />
          </Grid.Column>
          <Grid.Column width={1} />

          <Grid.Column width={4}>
            <Header color='teal' sub content='Step 3 - Preview & Upload' />
          </Grid.Column>
        </Grid>
      );
    }
    ```
- In PhotosTab.jsx file:
  - Import the PhotoUploadWidget component: `import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';`
  - In JSX, right where the editMode state is true, render the PhotoUploadWidget component
    - `{editMode ? ( <PhotoUploadWidget /> ) : ( ... )}`
- In ProfileContent.jsx file:
  - By default, whenever we finished performing a task on the active tab, Semantic UI routes the user to the first tab which is the About tab. We want to change this behavior so that it'll always stay on the current active tab
  - In Semantic UI Tab component, add an activeIndex property and set it to the value 1
  ```js
  <Tab
    menu={{ fluid: true, vertical: true }}
    menuPosition='right'
    panes={panes}
    activeIndex={1}
  />
  ```

### [3. React-dropzone library: PhotoWidgetDropzone component](https://github.com/sungnga/revents/commit/0a2598a3fff46fcf3272f879fcf5f2e16be6b4a1?ts=2)
- We're going to use the react-dropzone library to help us upload a file from the computer. This the 'Step 1' of the PhotoUploadWidget component
- React-dropzone docs: https://www.npmjs.com/package/react-dropzone
- Install react-dropzone library: `npm i react-dropzone`
- In src/app/common/photos folder, create a component/file called PhotoWidgetDropzone.jsx
- In PhotoWidgetDropzone.jsx file:
  - Copy and paste the example demo code from the react-dropzone docs website
  - Console log the `acceptedFiles` to see what we get when we drag and drop a file
  ```javascript
  import React, { useCallback } from 'react';
  import { useDropzone } from 'react-dropzone';

  export default function PhotoWidgetDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      console.log(acceptedFiles)
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    );
  }
  ```
- In PhotoUploadWidget.jsx file:
  - Import the PhotoWidgetDropzone component: `import PhotoWidgetDropzone from './PhotoWidgetDropzone';`
  - Right after the Header component, instantiate the PhotoWidgetDropzone component
    - `<PhotoWidgetDropzone />`
- We should now be able to click on the widget to add a file or drag-n-drop a file to the widget. In the console, we can see the file being uploaded. Next thing we want to do is add styling to the dropzone photo widget
- In PhotoWidgetDropzone.jsx file:
  - Create a dropzoneStyles object and specify the style in there
    ```javascript
    const dropzoneStyles = {
      border: 'dashed 3px #eee',
      borderRadius: '5%',
      paddingTop: '30px',
      textAlign: 'center'
    };
    ```
  - Create a dropzoneActive object to add styles when the dropzone is active
    ```javascript
    const dropzoneActive = {
      border: 'dashed 3px green'
    };
    ```
- In PhotoUploadWidget.jsx file:
  - Import useState() hook: `import React, { useState } from 'react';`
  - Create a files state using useState() hook and initialize its value to an empty array
    - `const [files, setFiles] = useState([]);`
  - Pass down the setFiles method as props to the PhotoWidgetDropzone child component
    - `<PhotoWidgetDropzone setFiles={setFiles} />`
- In PhotoWidgetDropzone.jsx file:
  - Receive the setFiles props from the PhotoUploadWidget parent component and destructure it
  - Once we have the files/acceptedFiles array, we want to map over the array to get each file image and call setFiles() method to set the file in files state. We also want to set a `preview` property on the file so we can see a preview of the image
  - Inside the useCallback() hook:
    - This hook takes an arrow function as 1st arg and a dependencies array as 2nd arg
    - In the arrow function:
      - It accepts the acceptedFiles as an argument
      - Call the setFiles() method and pass in the acceptFiles
      - Map over the acceptedFiles array to access the individual file using .map() method
      - For each file, call the Object.assign() method and pass in the file as the 1st argument. The 2nd argument is an object to set a `preview` property of `URL.createObjectURL(file)`. This will give us the ability to preview the image
    - As for the 2nd arg, list setFiles as a dependency in the dependencies array. Whenever there's a change in setFiles, it causes the PhotoWidgetDropzone component to re-render
    ```javascript
    const onDrop = useCallback(
      (acceptedFiles) => {
        // console.log(acceptedFiles);
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        );
      },
      [setFiles]
    );
    ```
  - Then in JSX:
    - Apply the styles objects to the dropzone widget depending on the isDragActive
    - Also add an upload icon and a Header text
    ```javascript
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
      <div {...getRootProps()} style={isDragActive ? {...dropzoneStyles, ...dropzoneActive} : dropzoneStyles}>
        <input {...getInputProps()} />
        <Icon name='upload' size='huge' />
        <Header content='Drop image here' />
      </div>
    );
    ```
- Now when we drag an image file to the dropzone widget, the border should turn green. When it's not active, it should have a grey dashed border. Also, the `files` state of the PhotoUploadWidget component should contain the image file we just uploaded

### [4. Crop and resize image with react-cropper lib: PhotoWidgetCropper component](https://github.com/sungnga/revents/commit/d99dc69abb83f63976bed5a1e6304647fef14557?ts=2)
- After the user uploaded an image, we want them to be able to crop and resize the image with the help of the react-cropper library. This the 'Step 2' and 'Step 3' of the PhotoUploadWidget component
- React-cropper docs: https://github.com/react-cropper/react-cropper
- Install react-cropper library: `npm i react-cropper`
- In src/app/common/photos folder, create a component/file called PhotoWidgetCropper.jsx
- In PhotoWidgetCropper.jsx file:
  - Import the following:
    ```javascript
    import React, { useRef } from "react";
    import Cropper from "react-cropper";
    import "cropperjs/dist/cropper.css";
    ```
  - Create a PhotoWidgetCropper functional component
    - Copy and paste the example demo code from the github website as a starter
    - Create a cropperRef using the useRef() hook and initialize its value to null. cropperRef is now a ref to an element on our page
      - `const cropperRef = useRef(null);`
      - `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component
    - Write a cropImage function
      - First, check to see if there is a cropper element that we can call the .getCroppedCanvas() method on. If there isn't (undefined), return early
      - If there is a cropper element, we want to call a setImage() function, but we need to create this function in the parent component, which is the PhotoUploadWidget component
    ```javascript
    export default function PhotoWidgetCropper() {
      const cropperRef = useRef(null);

      function cropImage() {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;

        if (typeof cropper.getCroppedCanvas() === 'undefined') {
          return;
        }
        cropper.getCroppedCanvas().toBlob((blob) => {
          // setImage() function goes here
        });
      }

      return (
        <Cropper
          src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
          style={{ height: 400, width: "100%" }}
          // Cropper.js options
          initialAspectRatio={16 / 9}
          guides={false}
          crop={onCrop}
          ref={cropper}
        />
      );
    };
    ```
- In PhotoUploadWidget.jsx file:
  - Import the PhotoWidgetCropper component: `import PhotoWidgetCropper from './PhotoWidgetCropper';`
  - Create an image state using useState() hook and initialize its value to null
    - `const [image, setImage] = useState(null);`
  - In JSX:
    - Inside the 2nd Grid.Column and after the Header element, instantiate the PhotoWidgetCropper component
      - Then pass down the setImage method as props to the PhotoWidgetCropper child component
      - Also pass down the imagePreview props to the PhotoWidgetCropper child component. This props is the files state of the first element of the files array and the preview property that we created in the PhotoWidgetDropzone component
      - `<PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview} />`
    - We also want to write a condition to make sure that there is at least one file in the files state array before we display the PhotoWidgetCropper component
    ```javascript
    <Grid.Column width={4}>
      <Header color='teal' sub content='Step 2 - Resize' />
      {files.length > 0 && (
        <PhotoWidgetCropper
          setImage={setImage}
          imagePreview={files[0].preview}
        />
      )}
    </Grid.Column>
    ```
- In PhotoWidgetCropper.jsx file:
  - Receive the setImage and imagePreview props from the PhotoUploadWidget parent component and destructure them
  - In the cropImage() function:
    - Inside the .toBlob() callback function, call the setImage() method to set the blob
    - Then as a 2nd arg of the .toBlob() method, we need specify the type of blob it's going to be. In this case, it's an image/jpeg type
  - After that we need to specify the properties for the Cropper wrapper component in JSX
    - Note that the preview property is set a className. We will use this className in a div tag in the PhotoUploadWidget component to display the image preview
    - The initialAspectRatio property is set to 1. This will crop a square image
    - The src property is set to imagePreview, which is a props from the parent component. imagePreview is the file in the files state
  - Final code for the component:
    ```javascript
    export default function PhotoWidgetCropper({ setImage, imagePreview }) {
      const cropperRef = useRef(null);

      function cropImage() {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;

        if (typeof cropper.getCroppedCanvas() === 'undefined') {
          return;
        }
        cropper.getCroppedCanvas().toBlob((blob) => {
          setImage(blob);
        }, 'image/jpeg');
      }

      return (
        <Cropper
          ref={cropperRef}
          src={imagePreview}
          style={{ height: 200, width: '100%' }}
          // Cropper.js options
          initialAspectRatio={1}
          preview='.img-preview'
          guides={false}
          viewMode={1}
          dragMode='move'
          scalable={true}
          cropBoxMovable={true}
          cropBoxResizable={true}
          crop={cropImage}
        />
      );
    }
    ```
- In PhotoUploadWidget.jsx file:
  - In JSX, inside the 3rd Grid.Column: 
    - We first want to check if there exists at least one file in the files state. If there is, we want to display the image preview and two buttons underneath it
    - Wrap the two Buttons in a Button.Group wrapper. This way, the buttons will be next to each other
    ```javascript
    <Grid.Column width={4}>
      <Header color='teal' sub content='Step 3 - Preview & Upload' />
      {files.length > 0 && (
        <>
          <div
            className='img-preview'
            style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }}
          />
          <Button.Group>
            <Button style={{ width: 100 }} positive icon='check' />
            <Button style={{ width: 100 }} icon='close' />
          </Button.Group>
        </>
      )}
    </Grid.Column>
    ```

### [5. Adding an upload image method: upload to FirebaseStorage, Firebase.auth, and Firestore](https://github.com/sungnga/revents/commit/5292c98f06cf922d96ad1e8c058906f0c6bd6ccd?ts=2)
- Now that we have the image upload widget working, we want to upload to FirebaseStorage. We also want to update the photoURL in the Firebase.auth, so that if we do need to use the currentUser anywhere in our app, we have the updated user profile. We also want to update the user's main profile photo if this is the first image they uploaded. We need to create two methods. One is for FirebaseStorage to upload the file and the second is for firestoreService
- In firebaseService.js file:
  - Write an uploadToFirebaseStorage method that uploads a file to FirebaseStorage
    - This function takes file and filename as arguments
    - First, get the user reference, the currently logged in user, from firebase.auth().currentUser and assign it to a user variable
    - Then get the storage ref from firebase.storage().ref() and assign to a storageRef variable
    - Then return storageRef.child(`${user.uid}/user_images/${filename}`) containing the reference pathname, then .put(filename) method to upload data/file to the reference location. The .child() method returns a reference to a relative path from this reference
    - The directory created in firebaseStorage is: user.uid -> user_images -> filename
    - What we get back from this function is an UploadTask, firebase.storage.UploadTask. This UploadTask will allow us to get the download URL
    ```javascript
    // Upload an image to FirebaseStorage
    export function uploadToFirebaseStorage(file, filename) {
      const user = firebase.auth().currentUser;
      const storageRef = firebase.storage().ref();
      return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
    }
    ```
- In firestoreService.js file:
  - Write an async updateUserProfilePhoto method to update the user profile photo in Firebase.auth and Firestore, and create a photos collection inside Firestore user document
    - This method takes a downloadURL and filename as arguments
    - First, get a reference to the current user from `firebase.auth().currentUser` and assign it to a user variable
    - Then get a reference to this user document from Firestore `db.collection('users').doc(user.uid)`. The reason why we want a ref of this user doc is we want to check to see if there's a photo is already inside there. If there is, we don't want to update the profile. If there isn't, we want to update the main profile photo
    - In this function, we also want to take the opportunity to update the photoURL of the currentUser inside the firebase.auth
    - Use the try/catch block
    - If there's an error, throw the error. We'll deal with the error in the component
    - In the try block:
      - First, call the userDocRef.get() method to get the user document and assign the returned data to userDoc variable. This is equivalent to making an api call and it's an async operation. Add 'await' keyword in front of it
      - Second, write an if statement to check the user document to see if they do not have a photo in there
        - If they don't, then we want to update the user document photoURL property with the downloadURL using the .update() method. This is an async operation, so add 'await' keyword in front of it
        - Then also update the user photoURL property in firebase.auth by calling the .updateProfile() method on user. Remember that `const user = firebase.auth().currentUser;`. This is also an async operation, so add the 'await' keyword in front of it
      - Lastly, we want to add the photo to the 'photos' collection inside the user document in Firestore users collection. This is an async operation, so add the 'await' keyword. We also want to add a return so that we can use this data later
        - So first, we want to access the user document with `db.collection('users').doc(user.uid)`
        - To add a new collection inside the user document, add the `.collection('photos')` method after it and pass in the name of the collection. If there's a photos collection for this user already, it simply adds the photo to this existing collection
        - Then to add a document inside this new 'photos' collection, add the `.add()` method after it and specify the properties inside this document
    ```javascript
    // update user profile photo in firebase.auth and firestore if there isn't a photoURL
    // create a photos collection inside of the firestore user document
    export async function updateUserProfilePhoto(downloadURL, filename) {
      const user = firebase.auth().currentUser;
      const userDocRef = db.collection('users').doc(user.uid);
      
      try {
        // Get user document data in firestore
        // This is getting the data only once. Not listening to the data
        const userDoc = await userDocRef.get();
        // If there isn't a photoURL, perform these 2 operations
        // Update the photoURL in firestore user document to the provided downloadURL
        // Update the photoURL in firebase.auth currentUser to the provided downloadURL
        if (!userDoc.data().photoURL) {
          await db.collection('users').doc(user.uid).update({
            photoURL: downloadURL
          });
          await user.updateProfile({
            photoURL: downloadURL
          });
        }
        // Inside the user document object, add a photos collection
        return await db.collection('users').doc(user.uid).collection('photos').add({
          name: filename,
          url: downloadURL
        });
      } catch (error) {
        throw error;
      }
    }
    ```

### [6. Using the upload method in the photo widget](https://github.com/sungnga/revents/commit/14ea23dd45a91b7170891952b723eb0548421f09?ts=2)
- In src/app/common/util/util.js file:
  - Write a getFileExtension util function to get a file extension
    ```javascript
    export function getFileExtension(filename) {
      return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
    }
    ```
- In PhotoUploadWidget.jsx file:
  - Import the following:
    ```javascript
    import cuid from 'cuid';
    import { toast } from 'react-toastify';
    import { getFileExtension } from '../util/util';
    import { uploadToFirebaseStorage } from '../../firestore/firebaseService'
    import { updateUserProfilePhoto } from '../../firestore/firestoreService';
    ```
  - Create a loading state to handle the loading indicator. Use useState() hook and initialize its value to false
    - `const [loading, setLoading] = useState(false);`
  - Write a handleUploadImage function that uploads the photo to FirebaseStorage, updates the photoURL property in Firestore user doc and in user profile firebase.auth, and adds the photo to the Firestore photos collection. It's done by executing the uploadToFirebaseStorage() and updateUserProfilePhoto() methods
    - First thing is call the setLoading() method to set the loading indicator to true
    - Second, we want to give each of the image we upload a unique name. To do that we'll make use of the cuid library to give us a unique id and a utility function to give us the file extension
    - Third, create an uploadTask by calling the uploadToFirebaseStorage() method with the image and filename to upload to FirebaseStorage
      - The uploadTask will return a snapshot or we can get a snapshot from the uploadTask
    - Fourth, use uploadTask.on() method to listen to state-changes. This allows us to track the progress of how much of the file is being uploaded in the snapshot
      - 1st arg is set to 'state_changed'
      - 2nd arg is a function that takes snapshot as an argument. This function tracks the file upload progress
      - 3rd arg is a function that takes error as an argument and handles the error with toast.error() method to display the error.message
      - 4th arg is a callback function, what to do when this file upload is complete. In this callback:
        - First, we want to get the downloadURL from the snapshot by calling the `uploadTask.snapshot.ref.getDownloadURL()` method. This method will return a promise, so we can use the .then() operator and pass in a callback function to handle the downloadURL that we get back
        - Second, once we have the downloadURL, inside this promise callback function, we call the updateUserProfileProfile() and pass in the downloadURL and filename as arguments. This will update the user photo in Firebase and Firestore. This method is also an async operation and it returns a promise. Use the .then() operator and pass in a callback function to handle success. And use the .catch() operator and pass in a callback function to handle the error
        - If this is completed successfully, inside this promise callback function,
          - Call setLoading() method and set it to false
          - Call the handleCancelCrop() method. This will remove the image from the photo widget and returns to how they were originally
          - Call setEditMode() method and set it to false
        - If there's an error being returned, in the callback function,
          - take the error as an argument
          - call the toast.error() method to display the error.message
          - call setLoading() method and set it to false to turn off the loading indicator
    ```javascript
    function handleUploadImage() {
      setLoading(true);
      const filename = cuid() + '.' + getFileExtension(files[0].name);
      const uploadTask = uploadToFirebaseStorage(image, filename);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            updateUserProfilePhoto(downloadURL, filename)
              .then(() => {
                setLoading(false);
                handleCancelCrop();
                setEditMode(false);
              })
              .catch((error) => {
                toast.error(error.message);
                setLoading(false);
              });
          });
        }
      );
    }
    ```
  - Write a handleCancelCrop function that resets the files and image states to empty
    ```javascript
    function handleCancelCrop() {
      setFiles([]);
      setImage(null);
    }
    ```
- In PhotosTab.jsx file:
  - Pass down the setEditMode method as props to the PhotoUploadWidget child component
    - `<PhotoUploadWidget setEditMode={setEditMode} />`
- Back to the PhotoUploadWidget.jsx file:
  - Receive the setEditMode props from the PhotosTab parent component
  - In JSX:
    - In the 'check' Button element:
      - Call the handleUploadImage method to handle the onClick event
      - Set the loading property to loading state
      ```javascript
      <Button
        onClick={handleUploadImage}
        loading={loading}
        style={{ width: 100 }}
        positive
        icon='check'
      />
      ```
    - In the 'close' Button element:
      - Call the handleCancelCrop method to handle the onClick event
      - Set the disabled property to loading state
      ```javascript
      <Button
        onClick={handleCancelCrop}
        disabled={loading}
        style={{ width: 100 }}
        icon='close'
      />
      ```
- Go to Firebase console website: https://console.firebase.google.com/
  - Select Storage from the main menu
  - Click on the 'Get Started' button and accept the default bucket rules
  - This will create a storage for our application
- To test our upload image functionality:
  - Signin as one of the users we created
  - Click on the My Profile from the dropdown menu of currentUser
  - Go through the process of uploading an image
  - If the user doesn't have a photoURL it'll use the uploaded image as the main profile photo. We should be able to see it displayed on the user profile page and also being used as the avatar image from the navbar
  - Next go to the Firebase dashboard and click on the 'Storage' icon from the main menu. Here, we should see a folder (folder name is the user.uid) that contains the uploaded image. Any future image upload by this particular user will be stored in this folder
  - Then click on the 'Firestore Database' icon from the main menu. If this user document didn't have a photoURL, the photoURL property will be updated. Then inside this user document, a 'photos' collection folder has also been created. This folder contains the uploaded image

### [7. Displaying the images in PhotosTab](https://github.com/sungnga/revents/commit/4b6ca5d566df3e2c0d7eb28b85deb92fd3c62857?ts=2)
- Now that we're able to upload photos to firebaseStorage, firebase.auth, and Firestore, we want to create a new constant, a new action, and new reducer to store photos in Redux store. We can listen to the 'photos' collection and update the photos property in profileReducer when there's a change. After that we can display the user photos collection (getting them from the profileReducer) in the PhotosTab
- In profileConstants.js file:
  - Create a new constant for LISTEN_TO_USER_PHOTOS
  - `export const LISTEN_TO_USER_PHOTOS = 'LISTEN_TO_USER_PHOTOS';`
- In profileActions.js file:
  - Import the constant: `import { LISTEN_TO_USER_PHOTOS } from "./profileConstants";`
  - Write a listenToUserPhotos action creator function that listens to user photos in Firestore
    - This function takes photos as an argument
    - This function returns as an object,
      - the action type of LISTEN_TO_USER_PHOTOS
      - the payload of photos
    ```javascript
    export function listenToUserPhotos(photos) {
      return {
        type: LISTEN_TO_USER_PHOTOS,
        payload: photos
      };
    }
    ```
- In profileReducer.js file:
  - Import the constant: `import { LISTEN_TO_USER_PHOTOS } from './profileConstants';`
  - In the initialState object, add a photos property and initialize it to an empty array
    ```javascript
    const initialState = {
      currentUserProfile: null,
      selectedUserProfile: null,
      photos: []
    };
    ```
  - In the profileReducer function:
    - Add a new case in the switch statement for LISTEN_TO_USER_PHOTOS action type
      - This action returns as an object, the existing state and the photos property of payload
      - When this action is dispatched, photos property in the profileReducer redux store will contain an array of photos from Firestore photos collection
    ```javascript
    case LISTEN_TO_USER_PHOTOS:
      return {
        ...state,
        photos: payload
      };
    ```
- In firestoreService.js file:
  - Write a query getUserPhotos function that gets user photos from Firestore photos collection
    - This function takes userUid as an argument
    - It returns the photos from Firestore photos collection
    ```javascript
    export function getUserPhotos(userUid) {
      return db.collection('users').doc(userUid).collection('photos');
    }
    ```
- In PhotosTab.jsx file:
  - Import the useFirestoreCollection() hook: `import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';`
  - Import the getUserPhotos method: `import { getUserPhotos } from '../../../app/firestore/firestoreService';`
  - Import the listenToUserPhotos() action: `import { listenToUserPhotos } from '../profileActions';`
  - Create a dispatch method using useDispatch() hook
    - `const dispatch = useDispatch();`
  - Extract the loading property from asyncReducer using useSelector() hook
    - `const { loading } = useSelector((state) => state.async); `
  - Extract the photos property from profileReducer using useSelector() hook
    - `const { photos } = useSelector((state) => state.profile);`
  - Use the custom useFirestoreCollection() hook:
    - This custom hook takes query, data, and deps parameters as an object
    - For query param, the arrow function is going to call the query getUserPhotos() method and pass in profile.id as an argument
    - For data param, the arrow function takes photos that we got back from the query as an argument and then dispatches the listenToUserPhotos() action that takes the photos as an argument
    - For deps param, list profile.id and dispatch as two dependencies in the dependencies array. Any changes to these dependencies will cause the component to re-render
    ```javascript
    // When the PhotosTab component loads, this hook runs
    // Get user photos from firestore photos collection
    // Store the photos in photos property in profileReducer
    useFirestoreCollection({
      query: () => getUserPhotos(profile.id),
      data: (photos) => dispatch(listenToUserPhotos(photos)),
      deps: [profile.id, dispatch]
    });
    ```
  - In JSX:
    - The `<Tab.Pane>` component can take loading property and set it to loading state: `<Tab.Pane loading={loading}>`
    - Then we're going to map over the photos array and display each photo in a Card component
      - Since this is an array of photos, the Card component will need to be given a key and set it to photo.id
      - The Image src set to photo.url
      ```javascript
      <Card.Group itemsPerRow={5}>
        {photos.map((photo) => (
          <Card key={photo.id}>
            <Image src={photo.url} />
            <Button.Group fluid width={2}>
              <Button basic color='green' content='Main' />
              <Button basic color='red' icon='trash' />
            </Button.Group>
          </Card>
        ))}
      </Card.Group>
      ```
- Now we should be able to see the user photos collection in the PhotosTab

### [8. Setting the main profile photo functionality](https://github.com/sungnga/revents/commit/f6c65e7b5c9c84d3d9fec79ccce4c731d27b131d?ts=2)
- In firestoreService.js file:
  - Write an async setMainPhoto function that updates the photoURL property in Firestore user document and updates the user profile photoURL property in firebase.auth
    - This function takes photo as an argument
    - First, get the currently logged in user from firebase.auth and assign it to user variable
    - Use a try/catch block
    - If there's an error, throw the error back to the component
    - In the try block:
      - First, we want to update the photoURL property in Firestore users collection user doc. Call the .update() method on user doc and set the photoURL property to photo.url. This is an async operation, so add the 'await' keyword in front of it
      - Second, we want to update the user profile photoURL property in firebase.auth. Call the .updateProfile() method on user variable and set the photoURL property to photo.url. This is also an async operation, so add the 'await' keyword in front of it. We also want to return from this because we want to turn off the loading indicator after this operation is done
    ```javascript
    // set user main photo
    // 1. update the firestore photos collection
    // 2. update user photoURL in firebase.auth
    export async function setMainPhoto(photo) {
      const user = firebase.auth().currentUser;
      try {
        await db.collection('users').doc(user.uid).update({
          photoURL: photo.url
        });
        return await user.updateProfile({
          photoURL: photo.url
        });
      } catch (error) {
        throw error;
      }
    }
    ```
- In PhotosTab.jsx file:
  - Import the setMainPhoto function: `import { setMainPhoto } from '../../../app/firestore/firestoreService';`
  - Create an updating state using useState() hook and initialize its value to false
    - `const [updating, setUpdating] = useState(false);`
  - Write an async handleSetMainPhoto function that executes the setMainPhoto function. This will update the photoURL property with the new photo.url in Firestore user doc and user profile firebase.auth
    - This function takes photo as an argument
    - First, call the setUpdating() method and set it to true
    - Then use the try/catch block
    - If there's an error, call the toast.error() method and display the error.message
    - In the try block:
      - Call the setMainPhoto() method and pass in photo as an argument. This is an async operation, so add the 'await' keyword in front of it
    - Finally, call the setUpdating() method again and set it back to false to turn off the loading indicator
    ```javascript
    async function handleSetMainPhoto(photo) {
      setUpdating(true);
      try {
        await setMainPhoto(photo);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setUpdating(false);
      }
    }
    ```
  - In the 'Main' Button element:
    - To handle the onClick event, call the handleSetMainPhoto() method inside a callback function because we need to pass the photo as an argument to handleSetMainPhoto
    - Also add the loading property and set it to updating state
    ```javascript
    <Button
      loading={updating}
      onClick={() => handleSetMainPhoto(photo)}
      basic
      color='green'
      content='Main'
    />
    ```
- Now when the user clicks on the 'Main' button of a particular photo to set it as their main profile photo, it should update in both the ProfilePage and the currently logged in user profile picture in NavBar
- However, the problem we're running into now is the loading indicator for the 'Main' button is running for all photos, not just the photo we want to set. To fix this problem, we need to make some adjustments to the updating state
- In PhotosTab.jsx file:
  - For the updating state, we want to initialize the state as an object instead of a simple boolean value
    - Initialize the isUpdating property to false
    - Initialize the target property to null
    - `const [updating, setUpdating] = useState({ isUpdating: false, target: null });`
  - Then in handleSetMainPhoto() function:
    - This function takes target as a 2nd arg
    - Call the setUpdating() method to set the isUpdating property to true and set target to target
    - And in finally, call the setUpdating() method to set the isUpdating property back to false and target back to null
    ```javascript
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
    ```
  - In the 'Main' Button element:
    - Add a name property and set it to photo.id
    - For the loading property, set it to `updating.isUpdating && updating.target === photo.id`. The loading indicator will only run if isUpdating is true AND the updating target is equal to photo.id, which is the name of the Button element
    - Add a disabled property and set it to `photo.url === profile.photoURL`. This prevents the user from setting this photo as the main photo again if this photo is already the profile photo
    - For onClick event handler,
      - call the handleSetMainPhoto method inside the callback function since we need to pass in parameters to the method
      - the callback takes the e/events as an argument
      - the handleSetMainPhoto method takes photo and e.target.name as arguments
    ```javascript
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
    ```

### [9. Deleting a photo](https://github.com/sungnga/revents/commit/acbf2c2e724f52aefd02dda9f39a702cee90668a?ts=2)
- When deleting a photo, we want to remove it from firebaseStorage and from Firestore db 'photos' collection. However, if the photo is set as their main profile photo, we want to prevent them from deleting it
- In firebaseService.js file:
  - Write a deleteFromFirebaseStorage function that deletes a photo from firebaseStorage
    - This function takes filename as an argument
    - First, get the current user uid from firebase.auth and assign it to userUid variable
    - Then get a reference to storage from firebase and assign it to storageRef variable
    - Then we need to get a reference to the individual image itself. The .child() method returns a reference to photo based on the given reference pathname. Assign this reference to photoRef variable
    - Lastly, call the .delete() method on photoRef to delete the image from firebaseStorage
    ```javascript
    export function deleteFromFirebaseStorage(filename) {
      const userUid = firebase.auth().currentUser.uid;
      const storageRef = firebase.storage().ref();
      const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);
      return photoRef.delete();
    }
    ```
- In firestoreService.js file:
  - Write a deletePhotoFromCollection function that deletes an image from Firestore photos collection based on the given photoId
    - This function takes photoId as an argument
    - First, get the current user uid from firebase.auth and assign it to userUid variable
    - Call the .delete() method on the photos collection document of the given photoId
    ```javascript
    export function deletePhotoFromCollection(photoId) {
      const userUid = firebase.auth().currentUser.uid;
      return db
        .collection('users')
        .doc(userUid)
        .collection('photos')
        .doc(photoId)
        .delete();
    }
    ```
- In PhotosTab.jsx file:
  - Import the following:
    ```javascript
    import { deleteFromFirebaseStorage } from '../../../app/firestore/firebaseService';
    import { deletePhotoFromCollection } from '../../../app/firestore/firestoreService';
    ```
  - Create a deleting state using useState() hook and set the initial state as an object
    - `const [deleting, setDeleting] = useState({ isDeleting: false, target: null });`
  - Write an async handleDeletePhoto function that deletes a photo from firebaseStorage and from Firestore photos collection. This function executes the deleteFromFirebaseStorage and deletePhotoFromCollection functions to get this done
    - This function takes photo and target as arguments
    - First, call the setUpdating() method to set the isDeleting property to true and set target to target
    - Then use the try/catch block
    - If there's an error, call the toast.error() method and display the error.message
    - In the try block:
      - Call the deleteFromFirebaseStorage() method and pass in photo.name as an argument. This is an async operation, so add the 'await' keyword in front of it
      - Then call the deletePhotoFromCollection() method and pass in photo.id as an argument. This is an async operation, so add the 'await' keyword in front of it
    - Finally, call the setDeleting() method again to set the isDeleting property to back to false and target back to null. This will turn off the loading indicator when delete is done
    ```javascript
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
    ```
  - In the 'trash' icon Button element:
    - Add a name property and set it to photo.id
    - Add a loading property and set it to `deleting.isDeleting && deleting.target === photo.id`. The loading indicator will only run if isDeleting is true AND the deleting target is equal to photo.id, which is the name attribute of the Button element
    - Add a disabled property and set it to `photo.url === profile.photoURL`. This prevents the user from deleting the photo if this photo is the profile photo. They would need to swap another photo for the profile photo first before deleting this particular photo
    - For the onClick event handler, 
      - call the handleDeletePhoto() method inside a callback function since we need to pass in parameters to the method 
      - the callback takes the e/event as an argument
      - The handleDeletePhoto() method takes photo and e.target.name as arguments
    ```javascript
    <Button
      name={photo.id}
      onClick={(e) => handleDeletePhoto(photo, e.target.name)}
      loading={
        deleting.isDeleting && deleting.target === photo.id
      }
      disabled={photo.url === profile.photoURL}
      basic
      color='red'
      icon='trash'
    />
    ```
- Lastly, when the profile page refreshes we want the AboutTab to be the default active tab. Remove the `activeIndex` attribute
  ```js
  <Tab
    menu={{ fluid: true, vertical: true }}
    menuPosition='right'
    panes={panes}
    // activeIndex={1}
  />
  ```


## FIRESTORE RELATIONSHIPS
- Firestore Database design
  - Adding users to the events
  - Firestore queries - how we're going to query the data
    - where
    - array-contain
- Adding user sign up to events functionality:
  - Join event
  - Cancel attendance
- Firestore "Relationships"
- Compound queries and indexes

### Firestore Database design
- Firestore is a no SQL database. That means there's no relationship - no join tables. There is no such a thing as join query
- Firestore design - design by the queries
  - We want to know which events the currently logged in user is going to, so that we can display those events
  - We want to know which events the currently logged in user is hosting, so that we can display those events
  - Query by attendees
- In Firestore, we're being billed by the number of queries we make
- We're going to design our Firestore Database based on the queries we know we're going to be making
- Firestore rules:
  - Can only query simple arrays of strings. Cannot query an array that contains an object or an array of objects
  - Each document can be a maximum size of 1MB
  - An array can be a maximum of 20,000 rows
  - Firestore is designed to scale with millions of documents inside a collection

### [1. Adding attendances to an event](https://github.com/sungnga/revents/commit/92ed9758cb90c83a090a8ce326680e64d53d29c2?ts=2)
- Let's update the addEventToFirestore function so the fields populate the data dynamically when we create an event and we want to add additional fields to the event object
- In firestoreService.js file:
  - In addEventToFirestore() function:
    - What we have going on at the moment when we're creating an event is we're manually adding static data to the fields. Now that we have the information we need to dynamically populate these fields when we create an event, we're going to update this function
    - First, we're going to get a reference to the currently logged in user from firebase.auth and assign it to a user variable
    - Then we're going to modify the properties that we pass to the .add() method
      - hostedBy, set it to user.displayName
      - hostPhotoURL, set it to user.photoURL or null, if the user doesn't have a photo
      - id of attendees, set to user.uid
      - displayName of attendees, set to user.displayName
      - photoURL of attendees, set to user.photoURL or null
      - Add hostUid property and set it to user.uid
      - NOTE that we cannot make a query of an array of objects. This means that we cannot query the attendees data of an event. To resolve this issue, we're going to create a separate attendeeIds array which contains simple string elements and we can use this to query attendees data
      - Add an attendeeIds property and set it to `firebase.firestore.FieldValue.arrayUnion(user.uid)`. This will create an array of user.uids for the attendeeIds property. This list Field we're going to query, so we can find out which events a user with that specific uid is attending. With Firestore arrays, we can query simple string-based arrays. Our user.uids are going to be strings
    ```javascript
    export function addEventToFirestore(event) {
      const user = firebase.auth().currentUser;
      return db.collection('events').add({
        ...event,
        hostUid: user.uid,
        hostedBy: user.displayName,
        hostPhotoURL: user.photoURL || null,
        // attendees is an array of objects
        // NOTE: we cannot query an array of objects
        attendees: firebase.firestore.FieldValue.arrayUnion({
          id: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL || null
        }),
        // create an array containing user uids. user.uid is a string
        // we can query this instead
        attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
      });
    }
    ```

### [2. Setting up the event detailed header](https://github.com/sungnga/revents/commit/29221630f548586033a2cb21f5d023998a94fd47?ts=2)
- We want to configure the EventDetailedHeader component so that only certain buttons show depending on the user's status to that event. Are they the host? Are they the attendee or are they not an attendee? If the currentUser is the host of the event, show the 'Manage Event' button in the EventDetailHeader. If the currentUser is an attendee, show the 'Cancel' button. If the user isn't an attendee of the event, show the 'Join this Event' button
- In EventDetailedPage.jsx file:
  - First, we want to get the currentUser property from authReducer using useSelector() hook
    - `const { currentUser } = useSelector((state) => state.auth);`
  - Create an isHost variable that returns a boolean if the event host is the current user. 
    - `const isHost = event.hostUid === currentUser.uid;`
    - Now, we need to be careful when accessing properties where we don't know they exist when isHost is called. We can use the optional chaining operator aka `?` to check and see if the event exists first before accessing the .hostUid property. This way, if event doesn't exist, then it'll be undefined and undefined is going to set to false
    - `const isHost = event?.hostUid === currentUser.uid;`
  - Next is we want establish if the user is going to the event. We want to know if the currentUser is in the attendees list
    - `const isGoing = event?.attendees?.some((a) => a.id === currentUser.uid);`
  - Then we want to pass down these two items as props to the EventDetailedHeader child component
    - `<EventDetailedHeader event={event} isGoing={isGoing} isHost={isHost} />`
- In EventDetailedHeader.jsx file:
  - Receive the isHost and isGoing props from the EventDetailedPage parent component and destructure them
  - In JSX, now we can add conditional logic to show or hide buttons
    - If a user is hosting the event, then they see the 'Manage Event' button
      ```javascript
      {isHost && 
        <Button as={Link} to={`/manage/${event.id}`} color='orange' floated='right'>
          Manage Event
        </Button>
      }
      ```
    - If the user is not the host of the event, then they see the 'Join this event' button to join the event. If the user is not the host and is going to the event, then they see the 'Cancel My Place' button to be able to cancel 
      ```javascript
      {!isHost && (
        <>
          {isGoing ? (
            <Button>Cancel My Place</Button>
          ) : (
            <Button color='teal'>JOIN THIS EVENT</Button>
          )}
        </>
      )}
      ```

### [3. Adding the join event handler](https://github.com/sungnga/revents/commit/26bafdb0a1dcac1c3ed56a7b9bf3c8f19275c623?ts=2)
- In firestoreService.js file:
  - Write a addUserAttendance function that adds the currentUser to an event attendance
    - This function takes an event as an argument
    - First, get a reference to the current user from firebase.auth and assign it to a user variable
    - Then use the .update() method on `db.collection('events').doc(event.id)` to add the currentUser to the attendees array property and to the attendeeIds array property of the event document
    ```javascript
    export function addUserAttendance(event) {
      const user = firebase.auth().currentUser;
      return db.collection('events').doc(event.id).update({
        attendees: firebase.firestore.FieldValue.arrayUnion({
          id: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL || null
        }),
        attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
      });
    }
    ```
- In EventDetailedHeader.jsx file:
  - Import the following:
    ```javascript
    import React, { useState } from 'react';
    import { toast } from 'react-toastify';
    import { addUserAttendance } from '../../../app/firestore/firestoreService';
    ```
  - Create a loading state using useState() hook and initialize its value to false
    - `const [loading, setLoading] = useState(false);`
  - Write an async handleUserJoinEvent function that adds a user to an event as an attendee. This function executes the addUserAttendance method which adds the user in Firestore 'events' collection
    - First, call the setLoading() method to set loading to true. The loading indicator turns on while we perform this async operation
    - Use a try/catch block to run the code since this is an async function
    - If there's an error, call the toast.error() method to display the error.message
    - In the try block, call the addUserAttendance() function and pass in the event as an argument. Since this is an async operation, add the 'await' keyword in front of it
    - Finally, call the setLoading() method again to set the loading state back to false
    ```javascript
    async function handleUserJoinEvent() {
      setLoading(true);
      try {
        await addUserAttendance(event);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    ```
  - In the 'Join this event' Button element:
    - Add an onClick event handler and call the handleUserJoinEvent method
    - Add the loading attribute and set it to the loading state
    ```javascript
    <Button
      onClick={handleUserJoinEvent}
      loading={loading}
      color='teal'
    >
      JOIN THIS EVENT
    </Button>
    ```
- Now when a currentUser joins an event it'll display their profile picture and displayName in the list of attendees on the EventDetailPage. Also, on the events page, it'll show profile icons of the list of attendees for each event

### [4. Cancelling a user attendance](https://github.com/sungnga/revents/commit/571a97e0adc1e9da8c5ac51d72328fb2a7d67ef9?ts=2)
- When a user cancels their attendance to an event, on the backend, it removes the user object from the `attendees` array property of the event document in Firestore. It also removes the user.uid element from the `attendeeIds` array property. On the frontend, their name will be removed from the attendees list on the EventDetailedPage. On the events page, their profile icon will be removed from the attendees list from that particular event
- When it comes to removing objects from Firestore arrays it can be a bit of a challenge. We can't use Firestore's arrayRemove() method to remove an object from an array. In our case, it's removing a user from an event's attendees list. The attendees array contains the user objects. To get this done, first, we need to get the events collection and then use a normal JS array filter method to update the array and remove the currentUser from the array
- In firestoreService.js file:
  - Write an async cancelUserAttendance function that gets the event doc to remove the currentUser from the attendees array property and from the attendeeIds array property of an event. This is an async function since we need to get the events collection doc
    - First, get a reference to the currentUser from firebase.auth and assign it to a user variable
    - Then use a try/catch block to run the code
    - If there's an error, throw the error back to the component
    - In the try block:
      - Use the .get() method to get the event doc from events collection of a given event.id. Add the 'await' keyword in front of it for we need to wait for this operation to complete. Assign it to an eventDoc variable
      - Then use the .update() method to update the attendeeIds and attendees properties in the event doc
        - For the attendeeIds property, use the .arrayRemove() method to remove the user.uid from the array
        - For the attendees property, first, access the data of the eventDoc that we got back `eventDoc.data()`. Then call the .filter() method on the attendees array to update the array and remove the attendee.id that matches with the user.uid
    ```javascript
    export async function cancelUserAttendance(event) {
      const user = firebase.auth().currentUser;

      try {
        const eventDoc = await db.collection('events').doc(event.id).get();
        return db
          .collection('events')
          .doc(event.id)
          .update({
            // attendeeIds is an array of string
            // we can use firestore's arrayRemove method
            attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
            // attendees is an array of objects. Cannot use arrayRemove method
            // using a normal JS filter method instead. Filter method returns a new array of attendees
            attendees: eventDoc
              .data()
              .attendees.filter((attendee) => attendee.id !== user.uid)
          });
      } catch (error) {
        throw error;
      }
    }
    ```
- In EventDetailedHeader.jsx file:
  - Import the cancelUserAttendance function: `import { cancelUserAttendance } from '../../../app/firestore/firestoreService';`
  - Write an async handleUserLeaveEvent function that removes a user from an event as an attendee. This function executes the cancelUserAttendance method which removes the user in Firestore events collection document
    - First, call the setLoading() method to set loading to true
    - Use a try/catch block to run the code since this is an async function
    - If there's an error, call the toast.error() method to display the error.message
    - In the try block, call the cancelUserAttendance() function and pass in the event as an argument. Since this is an async operation, add the 'await' keyword in front of it
    - Finally, call the setLoading() method again to set the loading state back to false
    ```javascript
    async function handleUserLeaveEvent() {
      setLoading(true);
      try {
        await cancelUserAttendance(event);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    ```
  - In the 'Cancel My Place' Button element:
    - For onClick event handler, call the handleUserLeaveEvent method and it doesn't take any arguments
    - Add the loading property and set it to loading state
    ```javascript
    <Button onClick={handleUserLeaveEvent} loading={loading}>
      Cancel My Place
    </Button>
    ```

### [5. Adding the user nav links](https://github.com/sungnga/revents/commit/66494a702d2d480a306a26d0757b961ede6a2054?ts=2)
- In the EventDetailedPage, we want to add a ribbon label to the user that hosts the event. We also want to add nav links for the attendees and hosts throughout the event page. This way, when other users visiting the event page, they can easily go to others profile pages
- In EventDetailedPage.jsx file:
  - Pass down the event.hostUid as hostUid props to the EventDetailedSidebar child component
    - `<EventDetailedSidebar attendees={event?.attendees} hostUid={event.hostUid} />`
- In EventDetailedSidebar.jsx file:
  - Import the Link component: `import { Link } from 'react-router-dom';`
  - Import Semantic Label component: `import { Label } from 'semantic-ui-react';`
  - Receive the hostUid props from the EventDetailedPage parent component and destructure it
  - In JSX:
    - Just above the Item.Image element, write a condition to check if the hostUid is equal to the attendee.id. If it is, render the Semantic UI Label component and set the content to Host
      ```javascript
      {hostUid === attendee.id && (
        <Label
          style={{ position: 'absolute' }}
          color='orange'
          ribbon='right'
          content='Host'
        />
      )}
      ```
    - Now, add a profile link for the attendee. Turn the Item element into a link and specify the pathname
      ```javascript
      <Item
        as={Link}
        to={`/profile/${attendee.id}`}
        key={attendee.id}
        style={{ position: 'relative' }}
      >
      ```
- In EventDetailedHeader.jsx file:
  - Make the name of the host a link
    ```javascript
    <p>
      Hosted by <strong><Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link></strong>
    </p>
    ```
- In the EventListAttendee.jsx file:
  - Import the Link component: `import { Link } from 'react-router-dom';`
  - Turn the List.Item element into a link and specify the pathname
    - `<List.Item as={Link} to={`/profile/${attendee.id}`}>`
- In EventListItem.jsx file:
  - In the Item.Description element, make the name of the host a link and specify the pathname
    ```javascript
    <Item.Description>
      Hosted by <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
    </Item.Description>
    ```

### [6. Adding the filter functionality](https://github.com/sungnga/revents/commit/f1ab94817235d2c06fadc031254ba1cb510a1739?ts=2)
- In EventDashboard.jsx file:
  - Create a predicate state using useState() hook
    - What we're going to use to initialize the state is a Javascript map. This is a Javascript object that allows us to use certain methods and we can get and set different elements in this map easily. This is a sufficient way for users to set a particular filter
    - To create a map, call `new Map()`. And inside this map is going to be an array and inside this array are going to be keys and values. So each element inside the map is going to have a key and a value and we can set these different keys and values
    ```javascript
    const [predicate, setPredicate] = useState(
      new Map([
        ['startDate', new Date()],
        ['filter', 'all']
      ])
    );
    ```
  - Write a handleSetPredicate function to set the predicate
    - This function takes a key and value as arguments
    - Call the setPredicate() method to set the predicate. In order for our component to re-render when we update this state, we need to specify a new map inside this method. Inside the new Map(), call the .set() method on the predicate state and pass in the key and value as arguments. The .set() method comes with the map object. This will set the predicate state with the specified key and value element
    ```javascript
    function handleSetPredicate(key, value) {
      setPredicate(new Map(predicate.set(key, value)));
    }
    ```
  - Then pass down the predicate state and the handleSetPredicate function as props to the EventFilters child component
    ```javascript
    <EventFilters
      predicate={predicate}
      setPredicate={handleSetPredicate}
      loading={loading}
    />
    ```
- In EventFilters.jsx file:
  - Destructure the predicate, setPredicate, and loading props received from the EventDashboard parent component
  - In JSX:
    - Inside each of the Menu.Item element:
      - Add a loading property and set it to loading state. We want to disable the filter button while the app is fetching and loading the data
      - Add an active property and set it to predicate state. Since the predicate is a map object, we can call the .get() method on predicate and pass in a key to it
      - For the onClick event handler, call the setPredicate() method inside a callback function and pass in the key and value as arguments
    - Inside the Calendar component:
      - For the onChange event handler, the callback function takes the date value as an argument. Then call the setPredicate() method in the callback and pass in startDate as the key and the date value as the value
      - Add a value property and set it to the predicate state. We can use the .get() method on predicate and pass in 'startDate' or `new Date()` as the key. The `new Date()` is today's date
      - Add a tileDisabled property and this takes a callback. Set loading in the callback
    ```javascript
    export default function EventFilters({ predicate, setPredicate, loading }) {
      return (
        <>
          <Menu vertical size='large' style={{ width: '100%' }}>
            <Header icon='filter' attached color='teal' content='Filters' />
            <Menu.Item
              content='All Events'
              active={predicate.get('filter') === 'all'}
              onClick={() => setPredicate('filter', 'all')}
              disabled={loading}
            />
            <Menu.Item
              content="I'm going"
              active={predicate.get('filter') === 'isGoing'}
              onClick={() => setPredicate('filter', 'isGoing')}
              disabled={loading}
            />
            <Menu.Item
              content="I'm hosting"
              active={predicate.get('filter') === 'isHost'}
              onClick={() => setPredicate('filter', 'isHost')}
              disabled={loading}
            />
          </Menu>
          <Header icon='calendar' attached color='teal' content='Select date' />
          <Calendar
            onChange={(date) => setPredicate('startDate', date)}
            value={predicate.get('startDate' || new Date())}
            tileDisabled={() => loading}
          />
        </>
      );
    }
    ```

### [7. Getting the filtered data](https://github.com/sungnga/revents/commit/47881689e1efc000f92296916ec2bb3d078227d0?ts=2)
- Now we're going to hook up the filter functionality to listen to events from the Firestore listenToEventsFromFirestore() method in firestoreService. So we can go out and listen to the new data we're going to get returned from Firestore based on the filter value that we set
- In firestoreService.js file:
  - Let's modify the listenToEventsFromFirestore() function that we wrote earlier:
    - This function accepts the predicate as a parameter
    - First, get a reference to the currently logged in user from firebase.auth and assign it to a user variable
    - Add an eventsRef variable and set it equal to `db.collection('events').orderBy('date')`. This will get the events collection in the order by date
    - Then use a switch statement to handle different filters
      - The switch we're looking for is the 'filter' keyword. Call the predicate.get() method and pass in the word 'filter' to get it
      - Then we specify our cases
      - The 1st case is isGoing:
        - Return the eventsRef and in here, we can specify our queries using the `.where()` method
        - The way Firestore queries work is: specify the `.where()` clause and then in it, we can specify the Fields that we want to query on. `.where('Field_name', 'query_type', 'what_we_are_looking_for_in_the_Field')` We can specify as many queries as we want by using the `.where()` clauses
      - 2nd case is isHost:
        - Return the eventsRef with the specified queries
      - The default case:
        - Return the eventsRef with the date greater or equal to the startDate
    ```javascript
    export function listenToEventsFromFirestore(predicate) {
      const user = firebase.auth().currentUser;
      const eventsRef = db.collection('events').orderBy('date');
      // filter events based on the predicate
      // get the events based on the key/value of the predicate set in EventFilters component
      // use the firestore's .where() method to query the events
      switch (predicate.get('filter')) {
        case 'isGoing':
          return eventsRef
            .where('attendeeIds', 'array-contains', user.uid)
            .where('date', '>=', predicate.get('startDate'));
        case 'isHost':
          return eventsRef
            .where('hostUid', '==', user.uid)
            .where('date', '>=', predicate.get('startDate'));
        default:
          return eventsRef.where('date', '>=', predicate.get('startDate'));
      }
    }
    ```
- In EventDashboard.jsx file:
  - Inside the useFirestoreCollection() hook:
    - Pass in the predicate to the listenToEventsFromFirestore() method as an argument
    - Also list the predicate state as dependency to the custom hook
    ```javascript
    useFirestoreCollection({
      query: () => listenToEventsFromFirestore(predicate),
      data: (events) => dispatch(listenToEvents(events)),
      deps: [dispatch, predicate]
    });
    ```
- At this point, the events filter functionality is not filtering as we expected. When we click on the 'I'm going' or 'I'm hosting' filter tab all the events still display. And we would not be able to see the error that's causing this problem from the Redux devTools. We need to console log the error manually from the asyncActionError() action function in the asyncReducer.js file to see what's causing the problem
  ```javascript
  export function asyncActionError(error) {
    console.log(error)
    return {
      type: ASYNC_ACTION_ERROR,
      payload: error
    };
  }
  ```
  - The problem showing in the console is: `FirebaseError: The query requires an index` and a link to the Firebase console is listed to fix this particular problem
  - The problem we're running into is when we're filtering more than one Fields in Firestore, we need to create a composite index in Firestore. Every time we're querying multiple Fields we will run into this issue. Firestore will generate the index for us, but we need to go to the Firebase website to create the index
  - In Firebase Firestore webpage, the composite indexes are enabled and listed in the 'Indexes' menu tab. We should see two indexes listed for our application

### [8. Adding the user event filters: EventsTab component](https://github.com/sungnga/revents/commit/ae1215921e7bdc3ceeb9f096cb34c9c2675f7527?ts=2)
- The EventsTab component displays in the Events menu tab on the user profile page. This component displays another tab menu of 'Future Events', 'Past Events', and 'Hosting'. A user can click on these tabs to see different events. Each event is in a card form and it'll direct user to that event page
- In src/features/profiles/profilePage folder, create a component/file called EventsTab.jsx
- In EventsTab.jsx file:
  - Use the code from the AboutTab component as a starter, because the page layout is going to be similar
  - Import the following:
    ```javascript
    import React, { useState } from 'react';
    import { Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
    import { Link } from 'react-router-dom';
    ```
  - Write an EventsTab functional component that displays the user's events in the events tab
    - We're going to have multiple tabs inside this EventsTab so the user can click on the tab to show that type of events
    - Create an activeTab state using useState() hook and initialize its value to 0
      - `const [activeTab, setActiveTab] = useState(0);`
    - Create a panes array that has 3 menuItems in it
      ```javascript
      const panes = [
        { menuItem: 'Future Events', pane: { key: 'future' } },
        { menuItem: 'Past Events', pane: { key: 'past' } },
        { menuItem: 'Hosting', pane: { key: 'hosting' } }
      ];
      ```
    - In JSX:
      - Use Semantic UI Tab component to create the inner tabs
        - Call the setActiveTab() method for onTabChange event handler
        - Set panes property to the panes array
        - Specify the menu property
      - The list of events will be displayed underneath each tab in a Card component that the user can click on, and it will take them to the EventDetailedPage
    ```javascript
    export default function EventsTab() {
      const [activeTab, setActiveTab] = useState(0);
      const panes = [
        { menuItem: 'Future Events', pane: { key: 'future' } },
        { menuItem: 'Past Events', pane: { key: 'past' } },
        { menuItem: 'Hosting', pane: { key: 'hosting' } }
      ];

      return (
        <Tab.Pane>
          <Grid>
            <Grid.Column width={16}>
              <Header floated='left' icon='calendar' content='Events' />
            </Grid.Column>
            <Grid.Column width={16}>
              <Tab
                onTabChange={(e, data) => setActiveTab(data.activeIndex)}
                panes={panes}
                menu={{ secondary: true, pointing: true }}
              />
              <Card.Group itemsPerRow={5} style={{ marginTop: 10 }}>
                <Card as={Link} to={`/events`}>
                  <Image
                    src='/assets/categoryImages/drinks.jpg'
                    style={{ minHeight: 100, objectFit: 'cover' }}
                  />
                  <Card.Content>
                    <Card.Header content='Title' textAlign='center' />
                    <Card.Meta textAlign='center'>
                      <div>Date</div>
                      <div>Time</div>
                    </Card.Meta>
                  </Card.Content>
                </Card>
              </Card.Group>
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      );
    }
    ```
- In ProfileContent.jsx file:
  - Import the EventsTab component: `import EventsTab from './EventsTab';`
  - In the 'Events' menuItem, render the EventsTab component
    - `{ menuItem: 'Events', render: () => <EventsTab /> },`

### [9. Adding the user event query](https://github.com/sungnga/revents/commit/966b4c9c3c0166abd2ee64f8197639363e7b5df1?ts=2)
- In firestoreService.js file:
  - Write an getUserEventsQuery function that gets the user events in Firestore events collection based on the specified query clauses
    - This function takes activeTab and userUid as parameters
    - First, get a reference to the events collection and assign it to an eventsRef variable
    - Also get a reference to today's date using `new Date()`. Assign it to a today variable
    - Then use a switch statement to handle the filters for different activeTab
      - The switch we're looking for is activeTab that we receive
      - Then we specify our cases
      - The 1st case is for past events:
        - Return the eventsRef with the specified queries and order the events by date in descending order. That means, the latest past event goes on top
      - 2nd case is for events the user hosting:
        - Return the eventsRef with one specified query and order the events by date
      - The default case is for future events:
        - Return the eventsRef with two queries where the attendeeIds contains the userUid and list only events that are greater than today, meaning, future events. Order the events by date
    ```javascript
    export function getUserEventsQuery(activeTab, userUid) {
      let eventsRef = db.collection('events');
      const today = new Date();

      switch (activeTab) {
        case 1: // past events
          return eventsRef
            .where('attendeeIds', 'array-contains', userUid)
            .where('date', '<=', today)
            .orderBy('date', 'desc');
        case 2: // hosting
          return eventsRef.where('hostUid', '==', userUid).orderBy('date');
        default: // future events
          return eventsRef
            .where('attendeeIds', 'array-contains', userUid)
            .where('date', '>=', today)
            .orderBy('date');
      }
    }
    ```

### [10. Adding profile actions for user events](https://github.com/sungnga/revents/commit/5568291d97ce3ab197c94db445e1badbb7e8d77e?ts=2)
- Next is we're going to create a LISTEN_TO_USER_EVENTS action creator to listen to user events in Firestore and store the events data in profileEvents property in profileReducer
- What is taking place in the backend when a user clicks on the Events tab on a user profile page is:
  - the EventsTab component mounts
  - this triggers the useFirestoreCollection hook to run (inside the EventsTab component)
  - this hook makes a query to firestore by call the getUserEventsQuery function
  - once the events data comes back from firestore it calls the listenToUserEvents action creator to store the data in profileEvents property of profileReducer
  - then the events information is displayed on the EventsTab
- In profileConstants.js file:
  - Add another constant for LISTEN_TO_USER_EVENTS. We're creating this action in profile actions because this action is part of the profile page, even though we're listening for events
    - `export const LISTEN_TO_USER_EVENTS = 'LISTEN_TO_USER_EVENTS';`
- In profileActions.js file:
  - Import the constant: `import { LISTEN_TO_USER_EVENTS } from './profileConstants';`
  - Write a listenToUserEvents action function that listens to user events in Firestore
    - This function takes events as a parameter
    - This function returns as an object,
      - the action type of LISTEN_TO_USER_EVENTS
      - the payload of events
    ```javascript
    export function listenToUserEvents(events) {
      return {
        type: LISTEN_TO_USER_EVENTS,
        payload: events
      };
    }
    ```
- In profileReducer.js file:
  - Import the constant: `import { LISTEN_TO_USER_EVENTS } from './profileConstants';`
  - In the initialState object, add a profileEvents property and initialize it to an empty array
    ```javascript
    const initialState = {
      currentUserProfile: null,
      selectedUserProfile: null,
      photos: [],
      profileEvents: []
    };
    ```
  - In the profileReducer function:
    - Add a new case in the switch statement for LISTEN_TO_USER_EVENTS action type
      - This action returns as an object, the existing state and the profileEvents property of payload
      - When this action is dispatched, profileEvents property in profileReducer redux store will contain an array of filtered events from Firestore events collection
    ```javascript
    case LISTEN_TO_USER_EVENTS:
      return {
        ...state,
        profileEvents: payload
      };
    ```
- In the ProfileContent.jsx file:
  - Pass down the profile as props to the EventsTab child component
    - `{ menuItem: 'Events', render: () => <EventsTab profile={profile} /> },`
- In EventsTab.jsx file:
  - Destructure the profile props received from the ProfileContent parent component
  - Import the following:
    ```javascript
    import { useDispatch, useSelector } from 'react-redux';
    import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
    import { getUserEventsQuery } from '../../../app/firestore/firestoreService';
    import { listenToUserEvents } from '../profileActions';
    import { format } from 'date-fns';
    ```
  - Extract the profileEvents property from profileReducer using useSelector() hook
    - `const { profileEvents } = useSelector((state) => state.profile);`
  - Extract the loading property from asyncReducer using useSelector() hook
    - `const { loading } = useSelector((state) => state.async);`
  - Create a dispatch method using useDispatch() hook
    - `const dispatch = useDispatch();`
  - Use the custom useFirestoreCollection() hook:
    - This custom hook takes query, data, and deps parameters as an object
    - For query param, the arrow function is going to call the query getUserEventsQuery() method and pass in activeTab and profile.id as arguments
    - For data param, the arrow function takes events that we got back from the query as an argument and then dispatches the listenToUserEvents() action that takes the events as an argument
    - For deps param, list dispatch, activeTab, and profile.id as three dependencies in the dependencies array. Any changes to these dependencies will cause the component to re-render
    ```javascript
    useFirestoreCollection({
      query: () => getUserEventsQuery(activeTab, profile.id),
      data: (events) => (listenToUserEvents(events)),
      deps: [dispatch, activeTab, profile.id]
    });
    ```
  - In JSX:
    - In the Tab.Pane element, add a loading property and set it to loading state
      - `<Tab.Pane loading={loading}>`
    - Now we can map over the profileEvents array and display each event in a Semantic UI Card component. Map the profileEvents array inside the Card.Group element
      - The Card component will need a key property and set it to event.id. Also set the Link pathname to go to the EventDetailedPage
      - Set the category Image src to event.category
      - In the Card.Header element, set the content to event.title
      - To format the event date and time, use format() method from date-fns to display the date and time the way we want
    ```javascript
    <Card.Group itemsPerRow={5} style={{ marginTop: 10 }}>
      {profileEvents.map((event) => (
        <Card key={event.id} as={Link} to={`/events/${event.id}`}>
          <Image
            src={`/assets/categoryImages/${event.category}.jpg`}
            style={{ minHeight: 100, objectFit: 'cover' }}
          />
          <Card.Content>
            <Card.Header content={event.title} textAlign='center' />
            <Card.Meta textAlign='center'>
              <div>{format(event.date, 'dd MMM yyyy')}</div>
              <div>{format(event.date, 'hh:mm a')}</div>
            </Card.Meta>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
    ```
- In this particular query we need to 'Create Index' in Firestore console once again because we're requesting more than one field at a time. If we click on the 'Past Events' tab, this error message is displayed in the devTools console along with the Firebase link to resolve this issue


## ADDING CHAT WITH FIREBASE
- We will use Firebase Realtime Database to store the database of the chat functionality of our application
- Firebase Realtime Database
  - Stores data in a JSON Tree
  - Key/value pairs
  - Auto generated ID is actually a timestamp
  - Firebase original purpose was for chat apps
  - Realtime
- Realtime Database vs. Firestore Database
  - Realtime Database: Store and sync data in realtime across all connected clients
  - Firestore Database: Realtime updates, powerful queries, and automatic scaling

### [1. Setting up Firebase Realtime Database](https://github.com/sungnga/revents/commit/23f37e3288d2fe8e1da26bccbcc15f48410591b1?ts=2)
- Go to Firebase dashboard: https://console.firebase.google.com/
- Select Realtime Database from the main menu
- Click on the Rules tab at the top and edit the rules
  - This will allow the authenticated user to read and write the chat comments
  ```js
  {
    "rules": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
  ```
- In firebaseService.js file:
  - Write an addEventChatComment function that adds a currentUser's comment to the Firebase Realtime Database
    - This function takes eventId and comment as parameters
    - First, get a reference to the currently logged in user from firebase.auth and assign it to a user variable
    - Create a newComment object that has the displayName, photoURL, uid, text, and date properties
    - Then use the .push() method to add the newComment object to Firebase Realtime Database
    - Use `firebase.database()` to access the firebase database rather than the Firestore database
    - Use the `.ref(relative_pathname)` and specify the pathname to get a reference of the location where a piece of data is stored or going to store in Realtime Database
    - Use the .push() method to add data to a location in Realtime Database
    ```javascript
    // add event chat to firebase database
    export function addEventChatComment(eventId, comment) {
      const user = firebase.auth().currentUser;
      const newComment = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        text: comment,
        date: Date.now()
      };
      return firebase.database().ref(`chat/${eventId}`).push(newComment);
    }
    ```

### [2. Setting up the chat form: EventDetailedChatForm component](https://github.com/sungnga/revents/commit/21b54c7a56547a31939697a7b2a8f52c7b79a81b?ts=2)
- Let's create an EventDetailedChatForm component that has a comment text input field and a submit button. When submitting the chat form, we can hook it up to the firebaseDatabase's addEventChatComment function to add the chat comment to the Realtime Database
- In EventDetailedPage.jsx file:
  - Pass down the eventId as props to the EventDetailedChat child component
    - `<EventDetailedChat eventId={event.id} />`
- In EventDetailedChat.jsx file:
  - Destructure the eventId props received from the EventDetailedPage parent component
  - Import the EventDetailedChatForm component: `import EventDetailedChatForm from './EventDetailedChatForm';`
  - In JSX and at the very bottom of Comment.Group element, instantiate the EventDetailedChatForm component
    - Pass down the eventId props to the EventDetailedChatForm child component
    - `<EventDetailedChatForm eventId={eventId} />`
- In src/features/events/eventDetailed folder, create a component/file called EventDetailedChatForm.jsx
- In EventDetailedChatForm.jsx file:
  - Import the following
    ```javascript
    import React from 'react';
    import { Form, Formik } from 'formik';
    import { toast } from 'react-toastify';
    import { addEventChatComment } from '../../../app/firestore/firebaseService';
    import MyTextArea from '../../../app/common/form/MyTextArea';
    import { Button } from 'semantic-ui-react';
    ```
  - Write an EventDetailedChatForm functional component that displays the chat form
    - This component receives the eventId props from the EventDetailedChat parent component
    - Use the Formik component to create the chat form
      - Specify the initialValues and onSubmit properties for Formik component
    - Then inside the Formik component:
      - Use render props to destructure the isSubmitting props from Formik
      - Then inside the render props function, render the Formik Form component
      - Inside the Form component, instantiate the MyTextArea component and add a 'Add reply' Button after that
    ```javascript
    export default function EventDetailedChatForm({ eventId }) {
      return (
        <Formik
          initialValues={{ comment: '' }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await addEventChatComment(eventId, values.comment);
              resetForm();
            } catch (error) {
              toast.error(error.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className='ui form'>
              <MyTextArea
                name='comment'
                placeholder='Please enter your comment here'
                rows={2}
              />
              <Button
                loading={isSubmitting}
                content='Add reply'
                icon='edit'
                primary
                type='submit'
              />
            </Form>
          )}
        </Formik>
      );
    }
    ```
- Now when a currentUser adds a comment in the event chat form, the chat comment is added to the Realtime Database under: chat -> eventId -> commentId -> comment detailed info

### [3. Listening to the chat data](https://github.com/sungnga/revents/commit/31004c3c8c9e83135aaa9ece773eb3d99ae21b7a?ts=2)
- Now that we have some comments in firebase Realtime Database to listen to, we're going to add them to Redux store and use that to display on the EventDetailedChat
- In eventConstants.js file:
  - Create another constant for LISTEN_TO_EVENT_CHAT
  - `export const LISTEN_TO_EVENT_CHAT = 'LISTEN_TO_EVENT_CHAT';`
- In eventActions.js file:
  - Import the constant: `import { LISTEN_TO_EVENT_CHAT } from './eventConstants';`
  - Write a listenToEventChat action creator function that listens to an event chat in firebase database
    - This function takes a comments as a parameter
    - This function returns as an object,
      - the action type of LISTEN_TO_EVENT_CHAT
      - the payload of comments
    ```javascript
    export function listenToEventChat(comments) {
      return {
        type: LISTEN_TO_EVENT_CHAT,
        payload: comments
      };
    }
    ```
- In eventReducer.js file:
  - Import the constant: `import { LISTEN_TO_EVENT_CHAT } from './eventConstants';`
  - In the initialState object, add a comments property and initialized to an empty array
    ```javascript
    const initialState = {
      events: [],
      comments: []
    };
    ```
  - In the profileReducer function:
    - Add another case in the switch statement for LISTEN_TO_EVENT_CHAT action type
      - This action returns as an object, the existing state and the comments state property of payload
      - When this action is dispatched, comments property in the eventReducer redux store will contain an array of comments from firebase database of an event chat
    ```javascript
    case LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: payload
      };
    ```
- In firebaseService.js file:
  - Write a getEventChatRef function that gets an event chat reference from Realtime Database
    - This function takes an eventId as a parameter
    - Then return the event chat reference in .orderByKey()
      - First get access to the firebase database using `firebase.database()`
      - Then get a reference on firebase database using `.ref()` and specify the pathname. In our case, we want to get to chat directory and then a specific event by its id
      - Then use .orderByKey() method to be explicit that the comments being returned will be in timestamp order
    ```javascript
    export function getEventChatRef(eventId) {
      return firebase.database().ref(`chat/${eventId}`).orderByKey();
    }
    ```
- In EventDetailedChat.jsx file:
  - Import the following:
    ```javascript
    import React, { useEffect } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { getEventChatRef } from '../../../app/firestore/firebaseService';
    import EventDetailedChatForm from './EventDetailedChatForm';
    ```
  - Create a dispatch method using useDispatch() hook
    - `const dispatch = useDispatch();`
  - Extract the comments property from eventReducer using useSelector() hook
    - `const { comments } = useSelector((state) => state.event);`
  - Use useEffect() hook
    - This hook takes a function as 1st arg and a dependency array as 2nd arg
    - List the eventId and dispatch as two dependencies in the dependency array
    - Inside the function, call the getEventChatRef() method and pass in the eventId as an argument
    - Next thing is, in order to listen to the data from firebase database, we use the .on() method. The .on() function listens for data change at a particular location
      - Call the .on() method on getEventChatRef()
    - Inside the .on() method:
      - The 1st arg is what we want to listen to. In our case, we want to listen to value
      - The 2nd arg is a callback function. The .on() method returns a snapshot. And the callback is what do we want to do once we have the snapshot. Inside the callback:
        - First, check to see if the snapshot exists. If it doesn't, return early
        - If it does exist, console log the snapshot to see what we're getting back
    ```javascript
    useEffect(() => {
      getEventChatRef(eventId).on('value', (snapshot) => {
        if (!snapshot.exists()) return;
        console.log(snapshot.val());
      });
    }, [eventId, dispatch]);
    ```
- In the console, what we currently get back in snapshot is a list of comments in an object. We want the list of comments in an array. Another thing is the key inside this object is the comment id. We want to have this comment id populated inside the data so we can use it in our application. So we need to write a helper method to shape the data that we got back first before we can use it
- In firebaseService.js file:
  - Write a firebaseObjectToArray helper function that shapes the snapshot data into an array that we can use
    - This function takes snapshot as a parameter
    - First, check to see if there's a snapshot. If there is, run the following code
    - To convert the snapshot object into an array, use Object.entries() method and pass in the snapshot as an argument. This will return an array
      - For example, if we have 2 comment objects inside the snapshot object, the Object.entries() methods will return an array that has 2 array items in it. The 1st array item is the first comment and the 2nd array item is the second comment. In each array item, the 1st index is the comment id key in string and the 2nd index is the comment data in object. The 2nd array item is the same structure but for the second comment
      - `[[comment1], [comment2]] -> [["comment1_key", {comment1_value_dataObject}], ["comment2_key", {comment2_value_dataObject}]]`
    - Then to convert each array item into an object, we first use .map() method on the array to get each array item and then use the Object.assign() method to create a new object
      - What we specify first is the target object and we can let it as an empty object
      - The second thing we specify is the properties of the object itself. And we know that data object is the array element at index of 1
      - And then we want to populate the comment id (at index of 0) in the new object as well. So the third thing we specify is a new id property and set it to the array element at index of 0
    ```javascript
    // convert a firebase object data to an array
    // firebase data returns as a snapshot object
    export function firebaseObjectToArray(snapshot) {
      if (snapshot) {
        return Object.entries(snapshot).map((e) =>
          Object.assign({}, e[1], { id: e[0] })
        );
      }
    }
    ```
- In EventDetailedChat.jsx file:
  - Import the firebaseObjectToArray function: `import { firebaseObjectToArray } from '../../../app/firestore/firebaseService';`
  - Import the listenToEventChat() action: `import { listenToEventChat } from '../eventActions';`
  - Call the firebaseObjectToArray() function and pass in snapshot.val(). Console log it to see what we get. What we get back is an array of comment objects. The comment object contains all of the properties about the comment, including the id property
    - `console.log(firebaseObjectToArray(snapshot.val()));`
  - Now that we have the chat comments in the form that we can use, the next thing is dispatch the listenToEventChat() action and pass in the new version of snapshot
  - We can check in Redux store and see the comments data is populated in the comments array property in the eventReducer
    ```javascript
    useEffect(() => {
      // get event chat data from firebase RealTime Database
      // it returns as a snapshot object
      getEventChatRef(eventId).on('value', (snapshot) => {
        if (!snapshot.exists()) return;
        // console.log(firebaseObjectToArray(snapshot.val()));
        // first, convert firebase object to an array
        // store the array in comments property in eventReducer
        dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val())));
      });
    }, [eventId, dispatch]);
    ```

### [4. Displaying the chat comments](https://github.com/sungnga/revents/commit/870dd88792c6c95a02ee9809d069cb1a6d926d66?ts=2)
- Now that we have the comments array in eventReducer we can display them on the event page
- In EventDetailedChat.jsx file:
  - Import the Link component: `import { Link } from 'react-router-dom';`
  - Import formatDistance: `import { formatDistance } from 'date-fns';`
  - In JSX:
    - We can map over the comments array and display each comment in a Semantic UI Comment component. Map the comments array inside the Comment.Group element
      - The Comment component will need a key property and set it to comment.id
      - For the Comment.Avatar element, set the src to comment.photoURL or the static user image
      - Make the Comment.Author element into a Link and set the link path to comment.uid, which is this user's profile page and set the author's display name to comment.displayName
      - To format the time, use formatDistance() method from date-fns. The 1st arg we specify is comment.date and 2nd arg is today's date `new Date()`. This will display the time since this comment was created from today's time
      - Set Comment.Text element to comment.text
    ```javascript
    const { comments } = useSelector((state) => state.event);

    <Comment.Group>
      {comments.map((comment) => (
        <Comment key={comment.id}>
          <Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
          <Comment.Content>
            <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
              {comment.displayName}
            </Comment.Author>
            <Comment.Metadata>
              <div>{formatDistance(comment.date, new Date())}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.text}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
    ```

### [5. Improving the chat UI](https://github.com/sungnga/revents/commit/e00f78ca7d95b457152a7968bc51ef3f7c05df2a?ts=2)
- In EventDetailedChat.jsx file:
  - Right now the chat displays the last comment at the bottom. We have no way to change the order in firebase db, but we can reverse the order on the client side
    - Inside useEffect() hook, use the .reverse() method on firebaseObjectToArray() to reverse the snapshot array
    - `dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse()));`
  - Move the EventDetailedChatForm component to outside and above the Comment.Group element. This way, the chat form is above the chat comments
- We want users to be able to type in their comment and just hit the 'Enter' key to submit the comment. We will remove the 'Add reply' button altogether. With that, we need to change we way we submit the textArea input field
- In EventDetailedChatForm.jsx file:
  - Remove the current MyTextArea component and the Button element
  - Import the Field component: `import { Field, Form, Formik } from 'formik';`
  - Import Loader component: `import { Loader } from 'semantic-ui-react';`
  - Inside the Form wrapper component, we're going to use the Formik Field component to render the textArea input field
  - Inside the Field component:
    - Use render props to extract the field props. Destructure it in the render props function
    - Then inside the render props function,
      - render a Loader component and set active property to isSubmitting
      - render the textarea element
        - set the rows property to 2
        - write an instruction for the user in placeholder property
        - for onKeyPress event handler, we first want to check how the user presses the keys. If they press the Enter key AND the Shift key, then we're just going to return because we want a normal behavior of someone presses a key, like Enter key. If they press the Enter key AND NOT the Shift key at the same time, then we want to call the handleSubmit() method
  - We also want to pass down the handleSubmit props from Formik as well
    ```javascript
    {({ isSubmitting, handleSubmit }) => (
      <Form className='ui form'>
        <Field name='comment'>
          {({ field }) => (
            <div style={{ position: 'relative' }}>
              <Loader active={isSubmitting} />
              <textarea
                rows='2'
                {...field}
                placeholder='Enter your comment (Enter to submit, SHIFT + Enter for new line)'
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.shiftKey) {
                    return;
                  }
                  if (e.key === 'Enter' && !e.shiftKey) {
                    handleSubmit();
                  }
                }}
              ></textarea>
            </div>
          )}
        </Field>
      </Form>
    )}
    ```
- At the moment, even though we're able to add a new line in the textArea input field, however, it does not display the new line in the chat comment after we submitted the comment. To fix this problem, we need to split the comment text in the Comment.Text element in EventDetailedChat.jsx file
- In EventDetailedChat.jsx file:
  - In the Comment.Text element:
    - Use the .split() method on comment.text and pass in \n to split the comment text at \n. `\n` means new line. The .split() method returns an array, containing the split values
    - Then use .map() method on the text array and display each text element followed by a break in a span element. This will add a new line after each text element. The span element will need a key and set to the array index
    ```javascript
    <Comment.Text>
      {comment.text.split('\n').map((text, i) => (
        <span key={i}>
          {text}
          <br />
        </span>
      ))}
    </Comment.Text>
    ```
  - Note that in firebase database, the text property of a comment will still have the '\n' included in the text string. What we did in the Comment.Text element is how we want to display the text on the page. The .split() method did not change the original text string

### [6. Clearing the chat comments and chat form validation](https://github.com/sungnga/revents/commit/206feff4131ffd7f84512d5bdfe68df89ec71f83?ts=2)
- Right now when we go visit another event page, the current chat comments array that's in the redux store is displaying on every event page. We should not be able to see some other event's chat comments when we visit an event page. What we need to do is clear the comments property in eventReducer redux state when the EventDetailedPage dismounts. We need to create an action to clear the redux store
- In eventConstants.js file:
  - Create another constant for CLEAR_COMMENTS action
    - `export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';`
- In eventReducer.js file:
  - Import the constant: `import { CLEAR_COMMENTS } from './eventConstants';`
  - In the profileReducer function:
    - Add another case in the switch statement for CLEAR_COMMENTS action type
      - This action returns as an object, the existing state and set the comments property back to an empty array
      - When this action is dispatched, comments property in the eventReducer redux store will reset back to an empty array
    ```javascript
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: []
      };
    ```
- In the EventDetailedChat.jsx file:
  - Import the constant: `import { CLEAR_COMMENTS } from '../eventConstants';`
  - When we're using an useEffect() hook, after a component is unmounted (as in when we move away from this event to somewhere else), then we can use a return function inside the useEffect() to do something else, like cleanup
  - Inside the useEffect() hook:
    - Use a return callback function to dispatch the action type of CLEAR_COMMENTS. This will call out the eventReducer function to clear out the comments array
    - What we can also do is turn off the listener for the event chat in firebase db when a component is unmounted. In the return callback, call the getEventChatRef() method and then call the .off() method on it
    ```javascript
    useEffect(() => {
      // get event chat data from firebase RealTime Database
		  // it returns as a snapshot object
      getEventChatRef(eventId).on('value', (snapshot) => {
        if (!snapshot.exists()) return;
        // console.log(firebaseObjectToArray(snapshot.val()));
        // first, convert firebase object to an array
        // store the array in comments property in eventReducer
        dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse()));
      });
      // use the return function when the component unmounts
      // clear the comments in eventReducer
      // turn off the listener for the event chat in firebase realtime db
      return () => {
        dispatch({ type: CLEAR_COMMENTS });
        getEventChatRef().off();
      };
    }, [eventId, dispatch]);
    ```
- Right now we're not validating the textarea input field for chat form. If the user doesn't have anything in the field they can still submit it
- In EventDetailedChatForm.jsx file:
  - Import Yup: `import * as Yup from 'yup';`
  - Add validationSchema in Formik component and validate the comment property that the text input field is required
    ```javascript
    validationSchema={Yup.object({
      comment: Yup.string().required()
    })}
    ```
  - Then we need to pass down the isValid props in render props to the Form component
    - `{({ isSubmitting, handleSubmit, isValid }) => ( ... )`
  - In the `if (e.key === 'Enter' && !e.shiftKey)` condition:
    - We want to prevent users from submitting when they just press the 'Enter' key alone
    - Add the .preventDefault() method. This will prevent the default behavior of form submission
    - Then add `isValid && handleSubmit()`. If the form is not valid, then this prevents the submission from taking place. If the form is valid, then handleSubmit() is called
    ```javascript
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      isValid && handleSubmit();
    }
    ```

### [7. Adding the reply functionality](https://github.com/sungnga/revents/commit/077b7c06abdccca6c844a51c2051fb1b3e40c22c?ts=2)
- Enable a user to reply to a chat comment and we'll only make it one level deep. When the user hits the 'Reply' to a comment, we want to display the EventDetailedChatForm component. And after they submitted the reply, we want to close the reply form automatically. Another thing we want to do is add a parentId property to the comment data object. If it's the original comment, then the parentId is set to 0. But if it's a reply comment, then the parentId is set to its parent comment id
- In firebaseService.js file:
  - Lets modify the addEventChatComment function:
    - Instead of accepting comment as a parameter, we accept values that's coming from the form instead
    - Set the value for text property to values.comment
    - Add parentId property and set it to values.parentId
    ```javascript
    export function addEventChatComment(eventId, values) {
      const user = firebase.auth().currentUser;
      const newComment = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        text: values.comment,
        date: Date.now(),
        parentId: values.parentId
      };
      return firebase.database().ref(`chat/${eventId}`).push(newComment);
    }
    ```
- In EventDetailedChat.jsx file:
  - We want to track whether the reply form is open or not. So we'll create a state for this
  - Create a showReplyForm state using useState() hook. This state is an object with open and commentId properties
    ```javascript
    const [showReplyForm, setShowReplyForm] = useState({
      open: false,
      commentId: null
    });
    ```
  - Write a handleCloseReplyForm function to close the reply form
    - This function calls the setShowReplyForm() method to set the open property to false and commentId property back to null
    ```javascript
    function handleCloseReplyForm() {
      setShowReplyForm({ open: false, commentId: null });
    }
    ```
  - In JSX:
    - In the 'Reply' Comment.Action element, add the onClick event handler and call the setShowReplyForm() to change the showReplyForm state when this button is clicked
    - Underneath the Comment.Action element, write a condition to check if showReplyForm.open state is true AND if showReplyForm.commendId in the state is equal to comment.id. If both condition are true, then display the EventDetailedChatForm component as a reply chat form
    - Inside the EventDetailedChatForm component that we use to render the original chat form, we want to pass down 3 props:
      - The eventId props is set to eventId
      - The parentId props is set to value of 0
      - The closeForm props is set to setShowReplyForm function
      - `<EventDetailedChatForm eventId={eventId} parentId={0} closeForm={setShowReplyForm} />`
    - Then inside the EventDetailedChatForm component that we use to render the reply chat form, we want to pass down 3 props:
      - The eventId props is set to eventId
      - The parentId props is set to comment.id
      - The closeForm props is set to handleCloseReplyForm function
    ```javascript
    <Comment.Actions>
      <Comment.Action
        onClick={() =>
          setShowReplyForm({ open: true, commendId: comment.id })
        }
      >
        Reply
      </Comment.Action>
      {showReplyForm.open &&
        showReplyForm.commendId === comment.id && (
          <EventDetailedChatForm
            eventId={eventId}
            parentId={comment.id}
            closeForm={handleCloseReplyForm}
          />
        )}
    </Comment.Actions>
    ```
- In EventDetailedChatForm.jsx file:
  - Destructure the 3 props received from the EventDetailedChat parent component
    - `export default function EventDetailedChatForm({ eventId, parentId, closeForm }) { //code }`
  - In the addEventChatComment() function, instead of sending eventId and values.comment as arguments, we're going to send the eventId and an object. This object contains all the existing values and we also want to append the parentId property
    - `await addEventChatComment(eventId, {...values, parentId});`
  - Once the reply chat form is submitted we want to close the form. Still inside the onSubmit event handler and inside the finally block, call the closeForm() function and set open property to false and commentId property to null
    ```javascript
    onSubmit={async (values, { setSubmitting, resetForm }) => {
      try {
        await addEventChatComment(eventId, {...values, parentId});
        resetForm();
      } catch (error) {
        toast.error(error.message);
      } finally {
        setSubmitting(false);
        closeForm({ open: false, commentId: null });
      }
    }}
    ```

### [8. Displaying the replies](https://github.com/sungnga/revents/commit/7bca46c71611908f48ad5042f0ad843f38435842?ts=2)
- Right now all of our original comments and reply comments are in one array in firebase database and we have no way to organize the comments in a tree structure (i.e. a reply to a comment). However, we can organize the display of it on the client side. We need to create a utility function to organize our dataset
- In src/app/common/util/util.js file:
  - Write a createDataTree utility function to create a data tree based on a given array/dataset
    - This function takes `dataset` as a parameter. The dataset is an array of comments coming from firebase realtime db
    - First, create an empty object using Object.create() method and assign it to a hashtable variable
      - `let hashtable = Object.create(null);`
    - Then loop over each element in dataset array using the .forEach() method. For each element, set the hashtable object key to the element id and set the hashtable object value to an object that has all the properties of the array element and also add a childNodes property of an empty array
      - `dataset.forEach((a) => (hashtable[a.id] = { ...a, childNodes: [] }));`
    - Create a dataTree variable and set it to an empty array
      - `let dataTree = [];`
    - Then loop over each element in dataset array using the .forEach() method again. For each element, 
      - if parentId property is true (original comment parentId is set to 0. 0 means false), add the hashtable object (which contains this element data) using the .push() method to the childNodes array property of a hashtable object of that parentId. Remember that childNodes is a property of hashtable object. To access childNodes of a specific hashtable object, use `hashtable[specify_the_hash].childNodes`. And then call a method on childNodes
      - if parentId property is false or doesn't exist (meaning, this is the original comment), add the hashtable object, which contains this element data, to the dataTree array using the .push() method
    - Return the dataTree array
    - The dataTree array contains an array of hashtable objects, which are the original comment objects. If there are reply comments to the original comment, they live in the childNodes array property of the original comment object. Each reply comment is also an object and it contains a childNodes array property as well and it has a parentId of its parent comment id
    ```javascript
    // create a data tree of comments array (dataset)
    // the dataset we get from firebase realtime db
    export function createDataTree(dataset) {
      let hashtable = Object.create(null);
      dataset.forEach((a) => (hashtable[a.id] = { ...a, childNodes: [] }));
      let dataTree = [];
      dataset.forEach((a) => {
        if (a.parentId) hashtable[a.parentId].childNodes.push(hashtable[a.id]);
        else dataTree.push(hashtable[a.id]);
      });
      return dataTree;
    }
     ```
- In EventDetailedChat.jsx file:
  - Import the utility function: `import { createDataTree } from '../../../app/common/util/util';`
  - In JSX:
    - Before we map over the comments array, we want to pass this comments array to the createDataTree utility function to create a comments data tree. And then map over the comments data tree
      - `{createDataTree(comments).map((comment) => ( //rest of the code )`
    - While mapping over the comments, for each comment element:
      - Inside the Comment wrapper component and at the end of it, write a condition to check if comment.childNodes.length is greater than 0. If it is, that means this comment has a reply comment and we'll render the Comment.Group element inside this condition. If there's no childNode, we won't render this element
      - Inside the Comment.Group element, map over each element of the comment.childNodes array. For each child element, render the Comment component and give it a key of child.id
        ```javascript
        {comment.childNodes.length > 0 && (
          <Comment.Group>
            {comment.childNodes.map((child) => (
              <Comment key={child.id}>
                // Paste the code of everything inside the prev Comment component here..
              </Comment>
            ))}
          </Comment.Group>
        )}
        ```
      - Then inside this Comment component, copy and paste the code of everything that is inside the previous Comment component we wrote earlier. Go through this new code and swap the comment element to child element
      - For the childNodes array, we want to display the reverse order of reply comments. Use the .reverse() method on the comment.childNodes array
        - `{comment.childNodes.reverse().map((child) => (...)`
      ```javascript
      {comment.childNodes.length > 0 && (
        <Comment.Group>
          {comment.childNodes.reverse().map((child) => (
            <Comment key={child.id}>
              <Comment.Avatar
                src={child.photoURL || '/assets/user.png'}
              />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${child.uid}`}>
                  {child.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(child.date, new Date())}</div>
                </Comment.Metadata>
                <Comment.Text>
                  {child.text.split('\n').map((text, i) => (
                    <span key={i}>
                      {text}
                      <br />
                    </span>
                  ))}
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action
                    onClick={() =>
                      setShowReplyForm({
                        open: true,
                        commendId: child.id
                      })
                    }
                  >
                    Reply
                  </Comment.Action>
                  {showReplyForm.open &&
                    showReplyForm.commendId === child.id && (
                      <EventDetailedChatForm
                        eventId={eventId}
                        parentId={child.parentId}
                        closeForm={handleCloseReplyForm}
                      />
                    )}
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      )}
      ```


## ADDING A FOLLOWING/FOLLOWERS FEATURE
- Follower/following feature
- Intro to security rules
- Intro to cloud functions

### [1. Adding the Firestore functions: follow a user functionality](https://github.com/sungnga/revents/commit/924ec65f079eb2df209b3ce44d637a48d47c7e55?ts=2)
- A few things take place in the backend when a currently login user follows another user profile. We're going to create a 'following' collection at the root of our Firestore db. Then in the 'users' collection, when a user has a follower and/or following, we're going to add the followingCount and followerCount properties to the user document as well
- In firestoreService.js file:
  - Write an async followUser function for following a user
  - This function takes a profile as an argument. The profile object is the user profile that the currentUser is about to follow
  - First, get the currentUser from firebase.auth
  - This function performs four async operations:
    - First, it creates a 'following' collection at the root of Firestore database -> a user.uid (currentUser id) document -> a 'userFollowing' collection (a collection of profiles that the currentUser is following) -> a document of profile.id (the profile user that the currentUser is following). Use the .set() method to create a new profile.id document object
    - Second, inside the 'following' collection -> creates a profile.id document -> a 'userFollowers' collection -> a user.uid document
    - Third, in the 'users' collection -> adds a followingCount field to the user.uid document. Use the .update() method to add a new field to the document
    - Fourth, in the 'users' collection -> adds a followerCount field to the profile.id document
    ```js
    // follow a user functionality
    // add a following collection at the root of firestore db
    // add followingCount and followerCount properties to user doc
    export async function followUser(profile) {
      const user = firebase.auth().currentUser;
      try {
        await db
          .collection('following')
          .doc(user.uid)
          .collection('userFollowing')
          .doc('profile.id')
          .set({
            displayName: profile.displayName,
            photoURL: profile.photoURL,
            uid: profile.id
          });
        await db
          .collection('following')
          .doc(profile.id)
          .collection('userFollowers')
          .doc('user.uid')
          .set({
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid
          });
        await db
          .collection('users')
          .doc(user.uid)
          .update({
            followingCount: firebase.firestore.FieldValue.increment(1)
          });
        return await db
          .collection('users')
          .doc(profile.id)
          .update({
            followerCount: firebase.firestore.FieldValue.increment(1)
          });
      } catch (error) {
        throw error;
      }
    }
    ```
- In ProfileHeader.jsx file:
  - Import the following:
    ```js
    import React, { useState } from 'react';
    import { toast } from 'react-toastify';
    import { followUser } from '../../../app/firestore/firestoreService';
    ```
  - Add a loading state using the useState hook and initialize it to false
    - `const [loading, setLoading] = useState(false);`
  - Write an async handleFollowUser function that handles when a user clicks on the 'Follow' button
    - Set the loading state to true to turn on the loading indicator while this function is executed
    - In the try/catch block, execute the followUser() method and pass in the profile as an argument
    ```js
    async function handleFollowUser() {
      setLoading(true);
      try {
        await followUser(profile);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    ```
  - In JSX and in the 'Follow' Button element:
    - Add an onClick event handler and set it to the handleFollowUser function
    - Add a loading attribute and set it to the loading state
    ```js
    <Button
      onClick={handleFollowUser}
      loading={loading}
      basic
      fluid
      color='green'
      content='Follow'
    />
    ```

### [2. Unfollow a user functionality](https://github.com/sungnga/revents/commit/c83daa9e2d9f1efb5f4b657106d65fa545f89f13?ts=2)
- The functionality of unfollowing a user is very similar to the functionality of following a user. We delete the profile.id document in the 'userFollowing' collection of user.uid doc and delete the user.uid document in the 'userFollowers' collection of profile.id doc. And we decrement the followingCount and followerCount fields in the 'users' collection
- In firestoreService.js file:
  - Write an async unfollowUser function for unfollowing a user
  - This function takes a profile as an argument. The profile object is the profile user that the currentUser wants to unfollow
  - Use the firebase .delete() method to delete a document
  - To decrement the followingCount and followerCount, use the .increment() method and pass in a `-1` value instead
  ```js
  export async function unfollowUser(profile) {
    const user = firebase.auth().currentUser;
    try {
      await db
        .collection('following')
        .doc(user.uid)
        .collection('userFollowing')
        .doc(profile.id)
        .delete();
      await db
        .collection('following')
        .doc(profile.id)
        .collection('userFollowers')
        .doc(user.uid)
        .delete();
      await db
        .collection('users')
        .doc(user.uid)
        .update({
          followingCount: firebase.firestore.FieldValue.increment(-1)
        });
      return await db
        .collection('users')
        .doc(profile.id)
        .update({
          followerCount: firebase.firestore.FieldValue.increment(-1)
        });
    } catch (error) {
      throw error;
    }
  }
  ```
- In ProfileHeader.jsx file:
  - Import the unfollowUser function: `import { unfollowUser } from '../../../app/firestore/firestoreService';`
  - Write an async handleUnfollowUser function that handles when a user clicks on the 'Unfollow' button
    - This is an async operation so we want to turn on the loading indicator while this function is being executed
    - Use the try/catch block and call the unfollowUser() method and pass in the profile as an argument
    ```js
    async function handleUnfollowUser() {
      setLoading(true);
      try {
        await unfollowUser(profile);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    ```
  - In JSX:
    - For the time being just to make sure that the functionality of unfollowing a user is working (the firestore database is updated), create an 'Unfollow' Button element
    - Then add an onClick event handler and assign it to the handleUnfollowUser function
    ```js
    <Button
      onClick={handleUnfollowUser}
      loading={loading}
      basic
      fluid
      color='red'
      content='Unfollow'
    />
    ```

### [3. Listening to the following data](https://github.com/sungnga/revents/commit/fa80f29616508fc80f9277b31df8da367cdb2c74?ts=2)
- To retrieve data of following and followers from the Redux store and display them onto the page, we're going to write action creators for the profileReducer
- In profileConstants.js file:
  - Create and export the LISTEN_TO_FOLLOWERS and the LISTEN_TO_FOLLOWINGS constants
  - `export const LISTEN_TO_FOLLOWERS = 'LISTEN_TO_FOLLOWERS';`
  - `export const LISTEN_TO_FOLLOWINGS = 'LISTEN_TO_FOLLOWINGS';`
- In profileActions.js file:
  - Import the LISTEN_TO_FOLLOWERS and the LISTEN_TO_FOLLOWINGS constants
  - Create and export the listenToFollowers and listenToFollowings action creators
    ```js
    import { LISTEN_TO_FOLLOWERS, LISTEN_TO_FOLLOWINGS } from './profileConstants';

    export function listenToFollowers(followers) {
      return {
        type: LISTEN_TO_FOLLOWERS,
        payload: followers
      };
    }

    export function listenToFollowings(followings) {
      return {
        type: LISTEN_TO_FOLLOWINGS,
        payload: followings
      };
    }
    ```
- In profileReducer.js file:
  - Import the LISTEN_TO_FOLLOWERS and the LISTEN_TO_FOLLOWINGS constants
    - `import { LISTEN_TO_FOLLOWERS, LISTEN_TO_FOLLOWINGS } from './profileConstants';`
  - In the `initialState` object, add two more properties of `followers` and `followings` and initialize both to empty arrays
    ```js
    const initialState = {
      currentUserProfile: null,
      selectedUserProfile: null,
      photos: [],
      profileEvents: [],
      followers: [],
      followings: []
    };
    ```
  - In the profileReducer function, add two more cases for LISTEN_TO_FOLLOWERS and LISTEN_TO_FOLLOWINGS
    ```js
    case LISTEN_TO_FOLLOWERS:
      return {
        ...state,
        followers: payload
      };
    case LISTEN_TO_FOLLOWINGS:
      return {
        ...state,
        followings: payload
      };
    ```

### [4. Adding the following components: ProfileCard and FollowingTab components](https://github.com/sungnga/revents/commit/8ec1a53dd619dacd577630b66b032b1b4a02977d?ts=2)
- In src/features/profiles/profilePage folder, create a component called ProfileCard.jsx
- In ProfileCard.jsx file:
  - Import the following:
    ```js
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Card, Image } from 'semantic-ui-react';
    ```
  - Write a functional ProfileCard component that displays the user profile info in a Card format
    - This component takes profile as an argument
    - Use Semantic UI Card element to display the profile info
    - The Card element is a link that directs user to this particular user profile page. The Card displays the profile photo and the displayName
    ```js
    function ProfileCard({ profile }) {
      return (
        <Card as={Link} to={`/profile/${profile.id}`}>
          <Image src={profile.photoURL || '/assets/user.png'} />
          <Card.Content>
            <Card.Header content={profile.displayName} />
          </Card.Content>
        </Card>
      );
    }

    export default ProfileCard;
    ```
- In src/features/profiles/profilePage folder, create a component called FollowingTab.jsx
- In FollowingTab.jsx file:
  - Import the ProfileCard component
  - Write a functional FollowingTab component that displays the ProfileCard component in a grid layout
    - This component takes profile as an argument
    - Instantiate the ProfileCard component and pass down the profile as props
    ```js
    import React from 'react';
    import { Card, Grid, Header, Tab } from 'semantic-ui-react';
    import ProfileCard from './ProfileCard';

    function FollowingTab({ profile }) {
      return (
        <Tab.Pane>
          <Grid>
            <Grid.Column width={16}>
              <Header floated='left' icon='user' content={`Followers`} />
            </Grid.Column>
            <Grid.Column width={16}>
              <Card.Group itemsPerRow={5}>
                <ProfileCard profile={profile} />
                <ProfileCard profile={profile} />
                <ProfileCard profile={profile} />
              </Card.Group>
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      );
    }

    export default FollowingTab;
    ```
- Inside the user profile page and under the 'Followers' and 'Following' tab menu we're going to display the list of followers and following in the FollowingTab component
- In ProfileContent.jsx file:
  - Import the FollowingTab component: `import FollowingTab from './FollowingTab';`
  - For the 'Followers' and 'Following' tab pane menu items, render the FollowingTab component and pass down the profile as props
  ```js
  { menuItem: 'Followers', render: () => <FollowingTab profile={profile} /> },
  { menuItem: 'Following', render: () => <FollowingTab profile={profile} /> }
  ```

### [5. Listening to the followers data](https://github.com/sungnga/revents/commit/19b63831daefbfd647665b888a438356efa38098?ts=2)
- In firestoreService.js file:
  - Write and export a getFollowersCollection function to get userFollowers collection from profileId doc in firestore db
  - Write and export a getFollowingCollection function to get userFollowering collection from profileId doc
  ```js
  // get userFollowers collection from profileId doc
  export function getFollowersCollection(profileId) {
    return db.collection('following').doc(profileId).collection('userFollowers');
  }

  // get userFollowering collection from profileId doc
  export function getFollowingCollection(profileId) {
    return db.collection('following').doc(profileId).collection('userFollowing');
  }
  ```
- In ProfileContent.jsx file:
  - In the user profile page we want to know and keep track of which tab the user clicks on. If the user clicks on the 'Followers' tab, we want to listen to the userFollowers data collection from firestore and display it. If the user clicks on the 'Following' tab, then we get the userFollowing data collect from firestore
  - Create an activeTab state using useState hook and initialize it to 0. This state keeps track of which tab is being clicked on
    - `const [activeTab, setActiveTab] = useState(0);` 
  - In JSX and in the Tab element, add the onTabChange attribute and set it to a callback function that executes the setActiveTab() method to set the activeTab state to active tab (data.activeIndex)
    - `onTabChange={(e, data) => setActiveTab(data.activeIndex)}`
  - Lastly, pass down the activeTab state as props to the FollowingTab component. Do this for both the 'Follower' and 'Followings' menuItems
    ```js
    menuItem: 'Followers',
      render: () => <FollowingTab profile={profile} activeTab={activeTab} />
    },
    {
      menuItem: 'Following',
      render: () => <FollowingTab profile={profile} activeTab={activeTab} />
    }
    ```
- In FollowingTab.jsx file:
  - Import the following:
    ```js
    import { useSelector, useDispatch } from 'react-redux';
    import {
      getFollowersCollection,
      getFollowingCollection
    } from '../../../app/firestore/firestoreService';
    import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
    import { listenToFollowers, listenToFollowings } from '../profileActions';
    ```
  - Receive the activeTab props from the ProfileContent parent component
  - Get the dispatch method by executing the useDispatch hook
    - `const dispatch = useDispatch();`
  - Destructure the `followings` and `followers` properties from the profileReducer store
    - `const { followings, followers } = useSelector((state) => state.profile);`
  - Use the `useFirestoreCollection` custom hook to get the data collection from firestore
    - In our menu tab pane, the 'Followers' tab is at index 3 and the 'Following' tab is at index 4. We make the query with the `getFollowersCollection()` or the `getFollowingCollection()` method depending on the activeTab index value stored in the activeTab state.
    - To store the data that we got back from firestore db in Redux store, we dispatch one of the two methods depending on the activeTab index value. Dispatch either the `listenToFollowers()` method or the `listenToFollowings()` method and pass in the data as an argument
    - List `activeTab` and `dispatch` as the dependencies array
    ```js
    useFirestoreCollection({
      // Followers tab is at activeTab index 3
		  // Following tab is at activeTab index 4
      query:
        activeTab === 3
          ? () => getFollowersCollection(profile.id)
          : () => getFollowingCollection(profile.id),
      data: (data) =>
        activeTab === 3
          ? dispatch(listenToFollowers(data))
          : dispatch(listenToFollowings(data)),
      deps: [activeTab, dispatch]
    });
    ```
  - Now that we have the list of followers and followings data stored in Redux store (profileReducer), we want to display the appropriate list of following or follower users depending on the tab that's being clicked on
  - In JSX and inside of the Card.Group element:
    - Write a condition that if the activeTab state is equal to tab index of 3, then map over the `followers` array and display each follower profile in a ProfileCard component. Pass down the profile and key as props to the ProfileCard component. We need to provide a key because we're mapping over an array
    - Write another condition that if the activeTab state is equal to tab index of 4, then map over the `followings` array and display each following profile in a ProfileCard component. Pass down the profile and key as props to the ProfileCard component
      ```js
      {activeTab === 3 &&
        followers.map((profile) => (
          <ProfileCard profile={profile} key={profile.id} />
        ))}
      {activeTab === 4 &&
        followers.map((profile) => (
          <ProfileCard profile={profile} key={profile.id} />
        ))}
      ```
    - For the tab Grid Header, we want to display the header text as either 'Followers' or 'Following' depending on the activeTab being clicked on. Write a conditional to display one or the other
      ```js
      <Grid.Column width={16}>
        <Header
          floated='left'
          icon='user'
          content={activeTab === 3 ? 'Followers' : 'Following'}
        />
      </Grid.Column>
      ```

### [6. Updating the following count](https://github.com/sungnga/revents/commit/5207c21f888383ede4ec27cfc7f357624d2a8a56?ts=2)
- The next step we want to do is when a currently login user (currentUser) visits another user profile page, we want to see if the currentUser has already followed this user profile. If they have, display the 'Following' button on the user profile page. If not, display the 'Not following' button. When a user profile page loads/mounts, we want to listen in firestore for the currentUser's 'userFollowing' collection and see if the user profileId  doc is in this collection. If there is, that means the currentUser is following the user profile. We'r going to write a function to get the user following doc from firestore
- The second thing we want to do is create a `followingUser` state in profileReducer store to keep track of whether the currentUser is following the user profile. We will create actions to toggle the `followingUser` state. We show the 'Following' or the 'Not following' button based on this state
- In ProfileHeader.jsx file:
  - Display the followerCount and followingCount in the ProfileHeader section of the user profile page
  ```js
  <Statistic.Group>
    <Statistic label='Followers' value={profile.followerCount || 0} />
    <Statistic label='Following' value={profile.followingCount || 0} />
  </Statistic.Group>
  ```
- In firestoreService.js file:
  - Write and export a getFollowingDoc function that gets a following doc from firestore based on the given profileId
  ```js
  // get following doc
  export function getFollowingDoc(profileId) {
    const userUid = firebase.auth().currentUser.uid;
    return db
      .collection('following')
      .doc(userUid)
      .collection('userFollowing')
      .doc(profileId)
      .get();
  }
  ```
- In profileConstants.js file:
  - Create and export SET_FOLLOW_USER and SET_UNFOLLOW_USER constants
    ```js
    export const SET_FOLLOW_USER = 'SET_FOLLOW_USER';
    export const SET_UNFOLLOW_USER = 'SET_UNFOLLOW_USER';
    ```
- In profileActions.js file:
  - Import the SET_FOLLOW_USER and the SET_UNFOLLOW_USER constants
  - Write a setFollowUser function that returns the action type of SET_FOLLOW_USER
  - Write a setUnfollowUser function that returns the action type of SET_UNFOLLOW_USER
    ```js
    import { SET_FOLLOW_USER, SET_UNFOLLOW_USER } from './profileConstants';

    export function setFollowUser() {
      return {
        type: SET_FOLLOW_USER
      };
    }

    export function setUnfollowUser() {
      return {
        type: SET_UNFOLLOW_USER
      };
    }
    ```
- In profileReducer.js file:
  - Import the SET_FOLLOW_USER and the SET_UNFOLLOW_USER constants
    - `import { SET_FOLLOW_USER, SET_UNFOLLOW_USER } from './profileConstants';`
  - In the initialState object, add a followingUser property and initialize it to false
    ```js
    const initialState = {
      currentUserProfile: null,
      selectedUserProfile: null,
      photos: [],
      profileEvents: [],
      followers: [],
      followings: [],
      followingUser: false
    };
    ```
  - Add a case for the SET_FOLLOW_USER action creator. When this action creator is invoked the followingUser property is set to true
  - Add a case for the SET_UNFOLLOW_USER action creator. When this action creator is invoked the followingUser property is set to false
    ```js
    case SET_FOLLOW_USER:
      return {
        ...state,
        followingUser: true
      };
    case SET_UNFOLLOW_USER:
      return {
        ...state,
        followingUser: false
      };
    ```

### [7. Updating the following user status functionality](https://github.com/sungnga/revents/commit/a6158054283980f6c7fbbea106a2a9b473cf01d1?ts=2)
- In ProfileHeader.jsx file:
  - Import the following:
    ```js
    import React, { useEffect, useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { toast } from 'react-toastify';
    import { getFollowingDoc } from '../../../app/firestore/firestoreService';
    import { setFollowUser, setUnfollowUser } from '../../../features/profiles/profileActions';
    ```
  - Get the dispatch method by calling the useDispatch() hook
  - Destructure the followingUser property from profileReducer store using the useSelector hook
  - Use the useEffect() hook to get the following doc in firestore. The useEffect() hook function will run when the ProfileHeader component loads/mounts. Now, getting the following doc from firestore is an async operation and we cannot write an asynchronous function directly in a useEffect() hook. However, we can create an async function INSIDE of the useEffect function
  - In the useEffect() hook:
    - First check if isCurrentUser is true. If it is, return early. This means that this profile page belongs to the currentUser
    - Turn on the loading indicator by calling the setLoading() method and pass in true
    - Write an async fetchFollowingDoc function to:
      - call the getFollowingDoc() method to get the following doc from firestore. Pass in the profile.id as an argument
      - if we successfully get back a followingDoc and if there exists a followingDoc, then dispatch the setFollowingUser() method. This will set the followingUser property to true in profileReducer store
      - if an error occurs, use toast to display the error message to the user
    - Lastly, use the .then() method on the fetchFollowingDoc() method and call the setLoading() method as a callback and pass in false to turn off the loading indicator when this async operation is finished
    ```js
    function ProfileHeader({ profile, isCurrentUser }) {
      const dispatch = useDispatch();
      const [loading, setLoading] = useState(false);
      const { followingUser } = useSelector((state) => state.profile);

      // get following doc from firestore (async operation)
      // cannot use async function directly in useEffect hook
      // but can create an async function inside the useEffect function
      useEffect(() => {
        if (isCurrentUser) return;
        setLoading(true);
        async function fetchFollowingDoc() {
          try {
            const followingDoc = getFollowingDoc(profile.id);
            if (followingDoc && followingDoc.exists) {
              dispatch(setFollowUser());
            }
          } catch (error) {
            toast.error(error.message);
          }
        }
        fetchFollowingDoc().then(() => setLoading(false));
      }, [dispatch, profile.id, isCurrentUser]);
    }
    ```
  - In JSX:
    - Now we'r going to display information and action buttons on the user profile page that depend on the `followingUser` state in Redux store
    - If `followingUser` state is true, display the 'Following' button. Else display 'Not following' button
    - The next Button element we want to do is toggle between 'Follow' and 'Unfollow'. If `followingUser` state is true, display the 'Unfollow' button that allows the currentUser to unfollow. Else display 'Follow'. The 'Unfollow' button color is red and the 'Follow' button is green. Add an onClick event handle to this button as well. To unfollow, call the handleUnfollowUser() method. To follow, call the handleFollowUser() method
    ```js
    <Reveal animated='move'>
      <Reveal.Content visible style={{ width: '100%' }}>
        <Button
          fluid
          color='teal'
          content={followingUser ? 'Following' : 'Not following'}
        />
      </Reveal.Content>
      <Reveal.Content hidden style={{ width: '100%' }}>
        <Button
          onClick={
            followingUser
              ? () => handleUnfollowUser()
              : () => handleFollowUser()
          }
          loading={loading}
          basic
          fluid
          color={followingUser ? 'red' : 'green'}
          content={followingUser ? 'Unfollow' : 'Follow'}
        />
      </Reveal.Content>
    </Reveal>
    ```
  - Lastly, when we handle follow and unfollow user (with handleFollowUser() and handleUnfollowUser() methods), we need to update the `followingUser` state in Redux store as well. Dispatch the setFollowUser() method to update the store in both event handler methods. While these two handle methods do update the firestore database (with followUser and unfollowUser methods) when the 'Follow' or 'Unfollow' button is clicked, they don't automatically update the `followingUser` state in Redux. We only listen to the data once when the component mounts
    ```js
    async function handleFollowUser() {
      setLoading(true);
      try {
        // updating firestore db
        await followUser(profile);
        // updating followingUser state in Redux
        dispatch(setFollowUser());
      } catch (error) {
        // console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    async function handleUnfollowUser() {
      setLoading(true);
      try {
        // updating firestore db
        await unfollowUser(profile);
        // updating followingUser state in Redux
        dispatch(setUnfollowUser());
      } catch (error) {
        // console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    ```

### [8. Clearing the followings](https://github.com/sungnga/revents/commit/bb9577fadda60a40ca568f22a5dd3cc222278ae6?ts=2)
- When we go from one user profile page to another user profile page, let's say we're looking at the 'Followers' tab, we will see the same data going from one profile page to the next profile page. This is because we haven't done any data cleanup (clear the data) in the useEffect() hook after the ProfileHeader component has unmounted
- In profileConstants.js file:
  - Create and export a CLEAR_FOLLOWINGS constant
  - `export const CLEAR_FOLLOWINGS = 'CLEAR_FOLLOWINGS';`
- In profileReducer.js file:
  - We don't need to create an action creator function for this
  - Import the CLEAR_FOLLOWINGS constant: `import { CLEAR_FOLLOWINGS } from './profileConstants';`
  - Add a case for the CLEAR_FOLLOWINGS action. This action sets the `followers` and `followings` properties back to empty arrays in profileReducer
    ```js
    case CLEAR_FOLLOWINGS:
      return {
        ...state,
        followers: [],
        followings: []
      };
    ```
-  In ProfileHeader.jsx file:
  - Import the CLEAR_FOLLOWINGS constant: `import { CLEAR_FOLLOWINGS } from '../../../features/profiles/profileReducer';`
  - Whenever we want to cleanup after ourselves in useEffect() hook we `return` a function
  - In useEffect() hook, add a return function and in it, call the dispatch() method to dispatch the action type of CLEAR_FOLLOWINGS
- Our problem is still not resolved. Even though we're switching between components but we haven't forced the useEffect() hook in ProfileHeader to re-render. To do this, we need to give the 'Followers' tab component and the 'Following' tab component a `key` property
- In ProfileContent.jsx file:
  - In the FollowingTab components for both the 'Followers' and 'Following' menuItems, add a key property and set it to profile.id
  ```js
  {
    menuItem: 'Followers',
    render: () => (
      <FollowingTab
        key={profile.id}
        profile={profile}
        activeTab={activeTab}
      />
    )
  },
  {
    menuItem: 'Following',
    render: () => (
      <FollowingTab
        key={profile.id}
        profile={profile}
        activeTab={activeTab}
      />
    )
  }
  ```

### [9. Firestore batches and setting security rules](https://github.com/sungnga/revents/commit/51fe57ca93b002fd22d0c31fa6339ad2f4614df9?ts=2)
- Up until this point we've only looked at the the happy path of following and unfollowing a user. When we follow or unfollow a user we perform several async operations to update the 'following' collection as well as updating the 'users' collection of following count in Firestore db. Each of the async operation is somewhat related to the other. So if one of the operations fails we're going to have inconsistency in our database. Firestore has security rules section that we can make use of to set some rules on how to read and write to our database. We're going to set a few simple rules for Firestore security
- In Firestore dashboard page, click on the 'Rules' tab at the top of the page. Here is where we can specify Firestore security rules telling what a user is allowed to do based on a condition. Some rules we're going to set are:
  - Only authenticated user can read other users' documents
  - Only authenticated user that matches with a particular userId is allowed to update and create a document
  - All users are allowed to read photos in all documents
  - Authenticated user is allowed to write (update, create, read, delete) their own photos
  - All users can read all documents in the 'following' collection
  - Only authenticated user can write their own documents in 'following' collection
  - All users can read all documents in the 'events' collection
  - All authenticated users can write documents in 'events' collection
  ```js
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{userId} {
        allow read: if request.auth.uid != null;
        allow update, create: if request.auth.uid == userId;
        match /photos/{document=**} {
          allow read: if request.auth.uid != null;
          allow write: if request.auth.uid == userId;
        }
      }
      match /following/{userId}/{document=**} {
        allow read: if request.auth.uid != null;
        allow write: if request.auth.uid == userId;
      }
      match /events/{document=**} {
        allow read, list;
        allow write: if request.auth.uid != null;
      }
    }
  }
  ```
- The next thing we can do to help prevent inconsistency in our database is to make use of the firestore `.batch()` method. Firestore has a `.batch()` method that can batch our functions together in one operation. Right now the way our `followUser` and `unfollowUser` functions work is they perform several async operations and if one of them fails we have no way of preventing the previous operation from writing to our database and we will have inconsistency in our database. By using the firestore .batch() method, if one of the operations fails, everything inside of the .batch() method will not go through
- The way the `.batch()` function works is it can contain up to 500 different writes transactions to the database. Anything that we can write to db we can put inside a batch. Functions such as `.set()`, `.update()`, and `.delete()` we can use inside of a batch
- In firestoreService.js file:
  - Inside the `followUser` function:
    - First create a batch: `const batch = db.batch();`
    - Then inside the try block, call either `batch.set()` or `batch.update()` method depending on what we want to do. The first arg we pass in is the reference to the database and the second arg is what we want to write to it. Batch each write transaction and remove the `await` keyword because we're going to `await` just once at the end
    - Lastly, return: `return await batch.commit();`
    ```js
    export async function followUser(profile) {
      const user = firebase.auth().currentUser;
      const batch = db.batch();

      try {
        batch.set(
          db
            .collection('following')
            .doc(user.uid)
            .collection('userFollowing')
            .doc(profile.id),
          {
            displayName: profile.displayName,
            photoURL: profile.photoURL,
            uid: profile.id
          }
        );
        batch.set(
          db
            .collection('following')
            .doc(profile.id)
            .collection('userFollowers')
            .doc(user.uid),
          {
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid
          }
        );
        batch.update(db.collection('users').doc(user.uid), {
          followingCount: firebase.firestore.FieldValue.increment(1)
        });
        batch.update(db.collection('users').doc(profile.id), {
          followerCount: firebase.firestore.FieldValue.increment(1)
        });
        return await batch.commit();
      } catch (error) {
        throw error;
      }
    }
    ```
  - Inside the `unfollowUser` function:
    - Follow the same process as the above function and batch this function
    ```js
    export async function unfollowUser(profile) {
      const user = firebase.auth().currentUser;
      const batch = db.batch();

      try {
        batch.delete(
          db
            .collection('following')
            .doc(user.uid)
            .collection('userFollowing')
            .doc(profile.id)
        );
        batch.delete(
          db
            .collection('following')
            .doc(profile.id)
            .collection('userFollowers')
            .doc(user.uid)
        );
        batch.update(db.collection('users').doc(user.uid), {
          followingCount: firebase.firestore.FieldValue.increment(-1)
        });
        batch.update(db.collection('users').doc(profile.id), {
          followerCount: firebase.firestore.FieldValue.increment(-1)
        });
        return await batch.commit();
      } catch (error) {
        throw error;
      }
    }
    ```

### Cloud Functions
- What are they
  - Run code in the cloud
  - Auto scale, highly available and fault tolerant
  - No servers to provision, manage, patch or update
  - First 2 million invocations free ($.40 per million after)
- Security
  - Cloud Functions can write to any part of the app with full permissions
- Performance
  - Cloud Functions take the burden away from the client
  - Possible use cases:
    - User setting the main photo, this might need to be updated in many places
- On a schedule
  - Cron jobs can be used to schedule when cloud functions happen
- Firestore triggers
  - onCreate
  - onUpdate
  - onDelete
  - onWrite
- Usage
  - Install Firebase CLI
  - Login to Firebase via the CLI
  - Initialize the app
- Setup
  - `npm install -g firebase-tools`
  - `firebase login`
  - `firebase init`

### [10. Setting up Cloud Functions](https://github.com/sungnga/revents/commit/9831503148037a7d7e582628ce64142dfb851283?ts=2)
- **Firebase initialization via the CLI**
  - In the command line, run: `npm install -g firebase-tools`
  - Then run: `firebase login`. Login with an email account
  - To logout, run: `firebase logout`
  - Run `firebase -h` to see all the available commands we can use in CLI
  - Run the firebase init function: `firebase init`
  - Use the arrow key to select this option: `Functions: Configure and deploy Cloud Functions`
  - Next use the arrow key to select the `Use an existing project` option
  - Select the existing project name: `re-vents`
  - Select `Javascript`
  - Select Yes to `use ESLint to catch probable bugs and enforce style`
  - Select Yes to `install dependencies with npm now`
- Once the Firebase initialization is completed, we should see a new folder called "functions" created in the project directory. This folder contains:
  - a separate node_modules folder
  - a package.json file
  - the index.js file is where we write our own Cloud Functions
- **Deploy a Cloud Function to Firebase**
  - To test that we're able to deploy Cloud Functions to Firebase and the Cloud Functions are working, deploy the example `helloWorld` cloud function in index.js file
  - To deploy the cloud function via CLI, run: `firebase deploy --only functions`
  - If successful, a Function URL link is provided. Paste this link into the browser and you should see a "hello from firebase" message
  - NOTE: Whenever we make changes to the cloud functions we need to redeploy to Firebase

### [11. Creating our own cloud functions](https://github.com/sungnga/revents/commit/60c77d72078cfd090a852d3a10b1e0e01114cf14?ts=2)
- The issue we're trying to resolve at the moment is if a user decides to follow or unfollow another user, based on the firestore security rules we've setup, this user does not have permission to update another user's following collection and we will get an error
- We're going to use Cloud Functions to give us full permission in Firebase admin to our database regardless of what security rules are in place
- In /functions/index.js file:
  - Write an addFollowing cloud function that adds a following user to the profile user's 'userFollowers' collection and also increments the followerCount for the profile user
    - Use the `.onCreate()` method to add documents to Firestore
    - Use a try/catch block as these are async operations
    - We can use the batch method to batch our transactions in cloud functions just as we do on client side
    - In the firestoreService.js file and in the followUser function, cut out the 2nd and 4th batch operations and paste them inside the try/catch block
    - Note that to access a field in db, use `admin.firestore` instead of `firebase.firestore`
    - Lastly, return with the `await` keyword and call `batch.commit()`
  - Write a removeFollowing cloud function that removes a following user from the profile user's 'userFollowers' collection and also decrements the followerCount for the profile user
    - Use the `.onDelete()` method to remove documents to Firestore
    - In the firestoreService.js file and in the unfollowUser function, cut out the 2nd and 4th batch operations and paste them inside the try/catch block
    - Lastly, return with the `await` keyword and call `batch.commit()`
    ```js
    const functions = require('firebase-functions');
    // gives full permission to db
    const admin = require('firebase-admin');
    // use admin to initialize the app for the purpose of cloud functions
    admin.initializeApp(functions.config().firebase);

    // reference to the firestore db
    const db = admin.firestore();

    // addFollowing cloud function
    exports.addFollowing = functions.firestore
      // listening to a document
      .document('following/{userUid}/userFollowing/{profileId}')
      // to reference a collection or document, use context.params
      .onCreate(async (snapshot, context) => {
        const following = snapshot.data();
        console.log({ following });
        try {
          // get the currentUser doc
          const userDoc = await db
            .collection('users')
            .doc(context.params.userUid)
            .get();
          const batch = db.batch();
          batch.set(
            db
              .collection('following')
              .doc(context.params.profileId)
              .collection('userFollowers')
              .doc(context.params.userUid),
            {
              displayName: userDoc.data().displayName,
              photoURL: userDoc.data().photoURL,
              uid: userDoc.id
            }
          );
          batch.update(db.collection('users').doc(context.params.profileId), {
            // must use admin.firestore instead of firebase.firestore
            followerCount: admin.firestore.FieldValue.increment(1)
          });
          return await batch.commit();
        } catch (error) {
          // because cloud functions are on server side,
          // if an error occurs, it will not get to the client side
          return console.log(error);
        }
      });

    // removeFollowing cloud function
    exports.removeFollowing = functions.firestore
      // listening to a document
      .document('following/{userUid}/userFollowing/{profileId}')
      .onDelete(async (snapshot, context) => {
        const batch = db.batch();
        batch.delete(
          db
            .collection('following')
            .doc(context.params.profileId)
            .collection('userFollowers')
            .doc(context.params.userUid)
        );
        batch.update(db.collection('users').doc(context.params.profileId), {
          // must use admin.firestore instead of firebase.firestore
          followerCount: admin.firestore.FieldValue.increment(-1)
        });
        try {
          return await batch.commit();
        } catch (error) {
          return console.log(error);
        }
      });
    ```
- Lastly, deploy both of these two cloud functions to Firebase via CLI: `firebase deploy --only functions`

### [12. Creating a personalized news feed: EventsFeed component](https://github.com/sungnga/revents/commit/e1849dc6713a5b42c0ba24a3144d21217a9be5e9?ts=2)
- We're going to create a news feed in the events dashboard page. This feed only shows up if the user is currently logged in (authenticated user)
- In /src/features/events/eventDashboard folder, create a component called EventsFeed.jsx
- In EventsFeed.jsx file:
  - Write a functional EventsFeed component that displays a news feed of the activities of the users that the currentUser is following. Use Semantic UI to build the structure and layout. For now we're just displaying static data
  ```js
  import { Header, Segment, Feed } from 'semantic-ui-react';

  function EventsFeed() {
    const image = '/assets/user.png';
    const date = '3 days ago';
    const summary = 'Diana joined an event';

    return (
      <>
        <Header attached color='teal' icon='newspaper' content='News feed' />
        <Segment attached='bottom'>
          <Feed>
            <Feed.Event image={image} date={date} summary={summary} />
            <Feed.Event image={image} date={date} summary={summary} />
            <Feed.Event image={image} date={date} summary={summary} />
            <Feed.Event image={image} date={date} summary={summary} />
          </Feed>
        </Segment>
      </>
    );
  }

  export default EventsFeed;
  ```
- In EventDashboard.jsx file:
  - Import the EventsFeed component: `import EventsFeed from './EventsFeed';`
  - Destructure the `authenticated` property from the authReducer using useSelector() hook
    - `const { authenticated } = useSelector((state) => state.auth);`
  - In JSX, write a condition that if authenticated state is true, then display the EventsFeed component
    - Display the EventsFeed component at the top of the second column of the EventDashboard page
    - `{authenticated && <EventsFeed />}`

### [13. Adding functions for the feed](https://github.com/sungnga/revents/commit/e1f697ad69b4b7d7d79fe716ec6d30b7d07ab1cc?ts=2)
- The way the news feed functionality works is we're going to check for updates in an event doc in Firestore db, specifically the length of the attendees array of the event. If the after attendees array has increased, that means a user has joined the event. If that is the case, we're going to create a new post with the code 'joined-event' in Firebase Realtime Database. Similarly, if the after attendees array is less than the before attendees array, that means a user has left the event. In this case, we're going to create a new post with the code 'left-event' in Realtime Database
- On the client side, we then create action creators to listen for these posts in Firebase Realtime and display them in a currentUser's news feed. So the currentUser will be able to see the events of the users they are following when they joined or left an event
- In /functions/index.js file:
  - Write a eventUpdated cloud function that checks if an event in Firestore db has been updated (specifically the attendees array) it will create a new post in Firebase Realtime Database
    - Use the `.onUpdate()` method on an event doc, so that this cloud function triggers when there's an update to the event doc
    - We have access to the before and after of the snapshot and we can use this to compare the before and after lengths of the attendees array
    - If the before array length is less than the after array length, that means a user has joined the event. And the case is true for the opposite
    - When there is a change, create a `newPost()` function to create a new post in Firebase Realtime Database
    - Use a try/catch block since creating a new post in Firebase is an async operation
    - To access Firebase Realtime DB, use `admin.database().ref(PATHNAME)`
  - Write a newPost function that returns an object containing information about the new post. The information includes the user's (who joined or left the event) displayName, the date/timestamp the post was created, the code either 'joined-event' or 'left-event', photoURL, the event id and user id
    - This info will be displayed in the news feed on the client side
    - This function takes 3 args: user, code, and eventId
    ```js
    // event updated: when a user(attendee) joined or left an event
    exports.eventUpdated = functions.firestore
      .document('events/{eventId}')
      // this cloud function is triggered when an event is updated
      .onUpdate(async (snapshot, context) => {
        const before = snapshot.before.data();
        const after = snapshot.after.data();

        // we are only interested of the change in attendees array
        // attendee joined an event
        if (before.attendees.length < after.attendees.length) {
          let attendeeJoined = after.attendees.filter(
            (item1) => !before.attendees.some((item2) => item2.id === item1.id)
          )[0];
          console.log({ attendeeJoined });
          try {
            const followerDocs = await db
              .collection('following')
              .doc(attendeeJoined.id)
              .collection('userFollowers')
              .get();
            followerDocs.forEach((doc) => {
              admin
                .database()
                .ref(`/posts/${doc.id}`)
                .push(
                  newPost(attendeeJoined, 'joined-event', context.params.eventId)
                );
            });
          } catch (error) {
            console.log(error);
          }
        }

        // attendee left an event
        if (before.attendees.length > after.attendees.length) {
          let attendeeLeft = before.attendees.filter(
            (item1) => !after.attendees.some((item2) => item2.id === item1.id)
          )[0];
          console.log({ attendeeLeft });
          try {
            const followerDocs = await db
              .collection('following')
              .doc(attendeeLeft.id)
              .collection('userFollowers')
              .get();
            followerDocs.forEach((doc) => {
              admin
                .database()
                .ref(`/posts/${doc.id}`)
                .push(newPost(attendeeLeft, 'left-event', context.params.eventId));
            });
          } catch (error) {
            console.log(error);
          }
        }

        return console.log('finished');
      });

    function newPost(user, code, eventId) {
      return {
        photoURL: user.photoURL,
        date: admin.database.ServerValue.TIMESTAMP,
        code,
        displayName: user.displayName,
        eventId,
        userUid: user.id
      };
    }
    ```

### [14. Listening to the news feed](https://github.com/sungnga/revents/commit/f4d65f756b2250b1ce2e406bc8258bd2da86fa46?ts=2)
- Let's setup the functionality to listen for news feed in Firebase Realtime DB on the client side
- In firebaseService.js file
  - Write a getUserFeedRef function that gets the currentUser's latest 5 feed posts from Firebase Realtime database
    ```js
    export function getUserFeedRef() {
      const user = firebase.auth().currentUser;
      return firebase
        .database()
        .ref(`posts/${user.uid}`)
        .orderByKey()
        .limitToLast(5);
    }
    ```
- In profileConstants.js file:
  - Create and export a LISTEN_TO_FEED constant
  - `export const LISTEN_TO_FEED = 'LISTEN_TO_FEED';`
- In profileActions.js file:
  - Import the LISTEN_TO_FEED constant: ` import { LISTEN_TO_FEED } from './profileConstants';`
  - Create and export a listenToFeed action creator that takes a feed as an argument and returns, as an object, the action type of LISTEN_TO_FEED and payload of feed
    ```js
    export function listenToFeed(feed) {
      return {
        type: LISTEN_TO_FEED,
        payload: feed
      };
    }
    ```
- In profileReducer.js file:
  - Import the LISTEN_TO_FEED constant: ` import { LISTEN_TO_FEED } from './profileConstants';`
  - In the `initialState` object, add a `feed` property and set it to an empty array
    ```js
    const initialState = {
      currentUserProfile: null,
      selectedUserProfile: null,
      photos: [],
      profileEvents: [],
      followers: [],
      followings: [],
      followingUser: false,
      feed: []
    };
    ```
  - Then in the `profileReducer` function, add a switch case for the LISTEN_TO_FEED action. It returns all the existing states and the `feed` property is set to payload
    ```js
    case LISTEN_TO_FEED:
      return {
        ...state,
        feed: payload
      };
    ```
- In EventsFeed.jsx file:
  - Import the following:
    ```js
    import { useEffect } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { firebaseObjectToArray, getUserFeedRef } from '../../../app/firestore/firebaseService';
    import { listenToFeed } from '../../profiles/profileActions';
    ```
  - Get the dispatch function by calling the useDispatch() hook
  - Destructure the `feed` property from the profileReducer using the useSelector() hook
  - Use the useEffect() hook to listen to the feed posts data in Firebase when the EventsFeed component mounts
    - Call the getUserFeedRef() function followed by the .on() method to subscribe to the Realtime DB
    - The .on() method takes 2 args: the first is the string `value`, and the second is a callback function
    - In this callback, what we get back is a snapshot
      - First, check to see if the snapshot exists. If it doesn't, return early
      - Call the firebaseObjectToArray() function and pass in the snapshot as an argument. This converts the snapshot object into an array. Assign the result to a `feed` variable
      - Lastly, dispatch the `listenToFeed` action and pass in the `feed` as an argument. This stores the `feed` array in the `feed` state in profileReducer
    - To unsubscribe from the Firebase feed data when this component unmounts, add a `return` statement and a callback function in the useEffect() hook. Inside the callback, call `getUserFeedRef().off()`
    - Lastly, add `dispatch` to the dependencies array
    ```js
    const dispatch = useDispatch();
    const { feed } = useSelector((state) => state.profile);

    useEffect(() => {
      getUserFeedRef().on('value', (snapshot) => {
        if (!snapshot.exists()) {
          return;
        }
        const feed = firebaseObjectToArray(snapshot.val()).reverse();
        dispatch(listenToFeed(feed));
      });

      return () => {
        getUserFeedRef().off();
      };
    }, [dispatch]);
    ```

### [15. Displaying the news feed events](https://github.com/sungnga/revents/commit/464a389fc81f717c3de727184a1941bcff140568?ts=2)
- First, we need to add one additional property to the feed post object when creating a feed post
- In functions/index.js file:
  - We need to add the event title to the post object. We can get this event title from the `before` snapshot data in the eventUpdated function
  - In the eventUpdated function and in the .push() method, when calling the newPost() function, add `before` as the fourth argument
    - `.push(newPost(attendeeLeft, 'left-event', context.params.eventId, before));`
  - In the newPost function, add `event` as the fourth parameter. In the return object, add `title` property and set it to `event.title`
    ```js
    function newPost(user, code, eventId, event) {
      return {
        photoURL: user.photoURL,
        date: admin.database.ServerValue.TIMESTAMP,
        code,
        displayName: user.displayName,
        eventId,
        userUid: user.id,
        title: event.title
      };
    }
    ```
- In /features/events/eventDashboard folder, create a component called EventFeedItem.jsx
- In EventFeedItem.jsx file:
  - Import the following:
    ```js
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Feed } from 'semantic-ui-react';
    import { formatDistance } from 'date-fns';
    ```
  - Write a EventFeedItem component that displays a list of feed posts in the 'News feed' section in a currentUser's EventDashboard page
    - This component is rendered in the EventsFeed parent component
    - This component receives the `post` props from the parent component
    - Use a switch statement to display the post summary depending on what the post.code is. Each summary contains a link to that user's profile page and a link to that event page
    - Also use the `formatDistance()` method from date-fns library to how long ago has the user joined or left the event
    ```js
    function EventFeedItem({ post }) {
      let summary;

      switch (post.code) {
        case 'joined-event':
          summary = (
            <>
              <Link to={`/profile/${post.userUid}`}>{post.displayName}</Link> has
              signed up to <Link to={`/events/${post.eventId}`}>{post.title}</Link>
            </>
          );
          break;
        case 'left-event':
          summary = (
            <>
              <Link to={`/profile/${post.userUid}`}>{post.displayName}</Link> has
              cancelled their place on <Link to={`/events/${post.eventId}`}>{post.title}</Link>
            </>
          );
          break;
        default:
          summary = 'Something happened';
          break;
      }

      return (
        <Feed.Event>
          <Feed.Label image={post.photoURL} />
          <Feed.Content>
            <Feed.Date>
              {formatDistance(new Date(post.date), new Date())} ago
            </Feed.Date>
            <Feed.Summary>{summary}</Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      );
    }

    export default EventFeedItem;
    ```
- In EventsFeed.jsx file:
  - Import the EventFeedItem component: `import EventFeedItem from './EventFeedItem';`
  - In JSX, map over the `feed` posts array and display each post in the EventFeedItem component. Pass down the `post` object to the child EventFeedItem component and give it a `key` attribute
    ```js
    <Feed>
      {feed.map((post) => (
        <EventFeedItem post={post} key={post.id} />
      ))}
    </Feed>
    ```


## PAGINATION AND DATA CONSISTENCY

### [1. Implementing pagination](https://github.com/sungnga/revents/commit/43cd31297e0177649f39320b84f11235dfa7964a?ts=2)
- To implement the page pagination functionality for our events on the EventDashboard page, we need to make a change to we way we are getting the events from Firestore db. Right now we are listening to live events data in Firestore and this essentially means that we are reading the entire the documents in the 'events' collection. This is not a good idea if we have millions of docs in a collection and we only want a few. An alternative solution to listening to live data is by making a normal query request just like we would with a normal API request
- In firestoreService.js file:
  - In the listenToEventsFromFirestore function:
    - Change the name of the `listenToEventsFromFirestore` function to `fetchEventsFromFirestore` just to clarify that we are fetching events rather than listening to events
    - Add `limit` and `lastDocSnapshot` as the 2nd and 3rd parameters. Set the `lastDocSnapshot` parameter to null initially
    - Then when we are getting events in db from the 'events' collection, we want to get the number of events based on the number we set in `limit` param and also get the events after the last doc snapshot. For example, when the EventDashboard page loads, we may want to limit the number of events to two on the first request. And then when we want to get the next set of events when the user scrolls down the page, we want to start on the third event in the collection by calling the `.startAfter(lastDocSnapshot)` method and pass in the `lastDocSnapshot` as an argument
    ```js
    // querying the events collection
    export function fetchEventsFromFirestore(
      predicate,
      limit,
      lastDocSnapshot = null
    ) {
      const user = firebase.auth().currentUser;
      const eventRef = db
        .collection('events')
        .orderBy('date')
        .startAfter(lastDocSnapshot)
        .limit(limit);
      // the rest of the code
    }
    ```
- In eventAction.js file:
  - Import the following:
    ```js
    import { FETCH_EVENTS } from './eventConstants';
    import { asyncActionFinish } from '../../app/async/asyncReducer';
    import { fetchEventsFromFirestore, dataFromSnapshot } from '../../app/firestore/firestoreService';
    ```
  - First, change the name of the `loadEvents` function to `fetchEvents` instead. Then pass in these three parameters to the function: predicate, limit, lastDocSnapshot
  - In the try block:
    - Get the events snapshot by calling the .get() method on the fetchEventsFromFirestore() method. This is an async operation, so add the `await` keyword in front of it. Pass these three params to the fetchEventsFromFirestore() method: predicate, limit, lastDocSnapshot. Assign the snapshot result that we get back to a `snapshot` variable
    - Get the last visible document that's been retrieved and store it in a `lastVisible` variable. We do this by getting the length of the document in `snapshot.docs`
    - Then we want to check to see if there are more events than the number of events we set in `limit`. If `snapshot.docs.length` is greater than the `limit`, then we have more events. Assign the result to a `moreEvents` variable
    - We need to shape events data from snapshot by mapping over the `snapshot.docs` and pass each event doc to the dataFromSnapshot() function. Assign the results to an `events` variable
    - Once we have the events data from Firestore, dispatch the FETCH_EVENTS action and pass the `events` and `moreEvents` data to payload
    - Also dispatch the asyncActionFinish() method
    - Lastly, return the `lastVisible` result. This way the EventDashboard component can use this result in the next request to get the next batch of events
    ```js
    export function fetchEvents(predicate, limit, lastDocSnapshot) {
      return async function (dispatch) {
        dispatch(asyncActionStart());
        try {
          const snapshot = await fetchEventsFromFirestore(
            predicate,
            limit,
            lastDocSnapshot
          ).get();
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          const moreEvents = snapshot.docs.length >= limit;
          const events = snapshot.docs.map((doc) => dataFromSnapshot(doc));
          dispatch({ type: FETCH_EVENTS, payload: { events, moreEvents } });
          dispatch(asyncActionFinish());
          return lastVisible;
        } catch (error) {
          dispatch(asyncActionError(error));
        }
      };
    }
    ```
- In eventReducer.js file:
  - Since we've added another data `moreEvents` to the FETCH_EVENTS action payload, we need to update this in the eventReducer as well
  - In the `initialState` object, add a moreEvents property and initialize it to false
    ```js
    const initialState = {
      events: [],
      comments: [],
      moreEvents: false
    };
    ```
  - Then in the FETCH_EVENTS action, set the `events` property to payload.events and add the `moreEvents` property and set it to payload.moreEvents
    ```js
    case FETCH_EVENTS:
      return {
        ...state,
        events: payload.events,
        moreEvents: payload.moreEvents
      };
    ```
- In EventDashboard.jsx file:
  - Import the fetchEvents function: `import { fetchEvents } from '../eventActions';`
  - Create a `limit` constant and set it to 2. This is the number of events we want per request
    - `const limit = 2;`
  - Create a local state called `lastDocSnapshot` and initialize it to null
    - `const [lastDocSnapshot, setLastDocSnapshot] = useState(null);`
  - Remove the `useFirestoreCollection` custom useEffect hook. We're going to use a normal useEffect() hook instead to make our query
  - In the useEffect() hook:
    - Dispatch the fetchEvents() method and pass in the predicate and limit as the 2 args. What we get back from this async method is a promise, which is the `lastVisible`. In the promise callback function, call the setLastDocSnapshot() method and pass in lastVisible as an argument. This sets the local `lastDocSnapshot` state to lastVisible
    - List dispatch and predicate as the two dependencies in the dependency array
      ```js
      useEffect(() => {
        // fetchEvents is an async function, so it returns a promise
        // what's returned in the promise is lastVisible
        // set this lastVisible in the lastDocSnapshot local state
        dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
          setLastDocSnapshot(lastVisible);
        });
      }, [dispatch, predicate]);
      ```
  - Write a handleFetchNextEvents function that fetches the next batch of events from Firestore
    ```js
    function handleFetchNextEvents() {
      dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then(
        (lastVisible) => {
          setLastDocSnapshot(lastVisible);
        }
      );
    }
    ```
  - In JSX:
    - For now, create a More button just so that we can see what happens when we click on it
    - Add an onClick event handler and set it to the handleFetchNextEvents function
      ```js
      <Button
        onClick={handleFetchNextEvents}
        color='green'
        content='More...'
        floated='right'
      />
      ```
    - When we click on the More button, we should be able to see the next batch of events listed on the page

### [2. Improving the paging UI](https://github.com/sungnga/revents/commit/6b42e80919941a59f0380dbb3049a6ab04cb10c5?ts=2)
- The first improvement we want to make is when we fetch more events, we don't want to do a full page refresh. Meaning that we don't need to load the events placeholder when we load more events
- In EventDashboard.jsx file:
  - Create a local state called `loadingInitial` and initialize it to false
    - `const [loadingInitial, setLoadingInitial] = useState(false);`
  - Destructure the `moreEvents` property as well from the eventReducer
    - `const { events, moreEvents } = useSelector((state) => state.event);`
  - In the useEffect() hook:
    - First thing we want to do is call the setLoadingInitial() function to set the loadingInitial state to true
    - Then once we got the events back from Firestore, call the setLoadingInitial() function again to set the loadingInitial state back to false
      ```js
      useEffect(() => {
        setLoadingInitial(true);
        // fetchEvents is an async function, so it returns a promise
        // what's returned in the promise is lastVisible
        // set this lastVisible in the lastDocSnapshot local state
        dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
          setLastDocSnapshot(lastVisible);
          setLoadingInitial(false);
        });
      }, [dispatch, predicate]);
      ```
  - In JSX:
    - Swap the `loading` condition to `loadingInitial` when we attempt to display the `EventListItemPlaceholder` component
      ```js
      {loadingInitial && (
        <>
          <EventListItemPlaceholder />
          <EventListItemPlaceholder />
        </>
      )}
      ```
    - For the 'More' button, first add a `loading` attribute and set it to `loading` state. We want to show the button loading indicator when we are loading more events. Then add a `disabled` attribute and set it to `!moreEvents`. We want to disable this button when we don't have anymore events
      ```js
      <Button
        loading={loading}
        disabled={!moreEvents}
        onClick={handleFetchNextEvents}
        color='green'
        content='More...'
        floated='right'
      />
      ```
- The second improvement we want to make is when we fetch more events, we want to keep the existing list of events in place and display more events underneath it. Right now our functionality removes the existing events when we display more events
- In eventReducer.js file:
  - In the case for FETCH_EVENTS action, we want to retain the existing state.events and payload.events in the events property and accumulate new events by using the spread operator
  ```js
  case FETCH_EVENTS:
    return {
      ...state,
      events: [...state.events, ...payload.events],
      moreEvents: payload.moreEvents
    };
  ```

### [3. Implementing infinite scroll](https://github.com/sungnga/revents/commit/85c486bc7a41cfab50ea97d1e9a3ef4504ea31e8?ts=2)
- Install the react-infinite-scroller library
  - `npm i --legacy-peer-deps --save react-infinite-scroller`
- The next improvement we're going to make is instead of having the user clicking on the More button to load more events, we're going to implement infinite scrolling to load more events when the user reaches the bottom of the events list. We're also going to show a loading spinner at the bottom while we're loading more events
- In EventDashboard.jsx file:
  - Import the Loader component from semantic-ui-react: `import { Grid, Loader } from 'semantic-ui-react';`
  - In JSX:
    - Delete the existing More button element. We won't be using this button. We are going to add the infinite scrolling to the EventList component
    - In the EventList component, also pass down the getNextEvents, loading, and moreEvent props
      ```js
      <EventList
        events={events}
        getNextEvents={handleFetchNextEvents}
        loading={loading}
        moreEvents={moreEvents}
      />
      ```
    - Add another Grid.Column at the bottom of EventList that will display the `Loader` component (display a loading spinner) if `loading` state is true
      ```js
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
      ```
- In EventList.jsx file:
  - Import the InfiniteScroll component from the react-infinite-scroller library
  - Receive and destructure the events, getNextEvents, loading, and moreEvent props from the EventDashboard parent component
  - In JSX:
    - Write a condition to check that events.length is not equal to 0. If it isn't, then instantiate the InfiniteScroll component. This component takes a child. So cut and past the events.map() and the EventListItem component into this InfiniteScroll component
    - Also add the necessary attributes to the InfiniteScroll component for the infinite scroll functionality to work
    ```js
    import EventListItem from './EventListItem';
    import InfiniteScroll from 'react-infinite-scroller';

    function EventList({ events, getNextEvents, loading, moreEvents }) {
      return (
        <>
          {events.length !== 0 && (
            <InfiniteScroll
              pageStart={0}
              loadMore={getNextEvents}
              hasMore={!loading && moreEvents}
              initialLoad={false}
            >
              {events.map((event) => (
                <EventListItem key={event.id} event={event} />
              ))}
            </InfiniteScroll>
          )}
        </>
      );
    }

    export default EventList;
    ```
- Now when we are scrolling to the bottom of the events page, the InfiniteScroll component will fetch and display more events if moreEvents is true

### [4. Fixing the EventDetailedPage](https://github.com/sungnga/revents/commit/5f992710b73f23e22bd9894eaadceeb058d37f75?ts=2)
- Now that we are fetching events data for the EventDashboard page from Firestore via a normal query rather than listening to live data, we broke the functionality to view an event detailed page. We still want to listen to live data for the EventDetailedPage, so when someone decides to join the event we can see the update in real time. This means we need to modify the way we get and store the selected event in Redux store
- In eventConstants.js file:
  - Create and export a LISTEN_TO_SELECTED_EVENT constant
  - `export const LISTEN_TO_SELECTED_EVENT = 'LISTEN_TO_SELECTED_EVENT';`
- In eventActions.js file:
  - Import the LISTEN_TO_SELECTED_EVENT constant: `import { LISTEN_TO_SELECTED_EVENT } from './eventConstants';`
  - First, delete the listenToEvents action function because we are no longer using it
  - Create a listenToSelectedEvent action function. It takes a single event as an argument and set the payload to this event
    ```js
    export function listenToSelectedEvent(event) {
      return {
        type: LISTEN_TO_SELECTED_EVENT,
        payload: event
      };
    }
    ```
- In eventReducer.js file:
  - Import the LISTEN_TO_SELECTED_EVENT constant: `import { LISTEN_TO_SELECTED_EVENT } from './eventConstants';`
  - In the `initialState` object, add a selectedEvent property and set it to null
    ```js
    const initialState = {
      events: [],
      comments: [],
      moreEvents: false,
      selectedEvent: null
    };
    ```
  - Add a case for the LISTEN_TO_SELECTED_EVENT action. It returns, as an object, all the existing states and set the selectedEvent property to payload
    ```js
    case LISTEN_TO_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: payload
      };
    ```
- In EventDetailedPage.jsx file:
  - When this component loads, we want to listen to the event doc in Firestore and dispatch the listenToSelectedEvent() action to store the event in the selectedEvent property in the eventReducer
  - Import the listenToSelectedEvent action: `import { listenToSelectedEvent } from '../eventActions';`
  - Get the selected event from eventReducer using the useSelector() hook. Assign the result to an `event` constant
    - `const event = useSelector((state) => state.event.selectedEvent);`
  - In the useFirestoreDoc() hook:
    - Instead of dispatching the listenToEvents() action, dispatch the listenToSelectedEvent() action. Then pass the `event` object that we get back from Firestore to this action as an argument
    - Everything else in this hook stays the same
    ```js
    useFirestoreDoc({
      // query an event doc in the events collection in Firestore db
      query: () => listenToEventFromFirestore(match.params.id),
      // store the event in Redux store
      data: (event) => dispatch(listenToSelectedEvent(event)),
      deps: [match.params.id, dispatch]
    });
    ```
- In EventForm.jsx file:
  - We need to make the same changes in the EventForm component
  - Import the listenToSelectedEvent action: `import { listenToSelectedEvent } from '../eventActions';`
  - Destructure the `selectedEvent` property from the eventReducer
    - `const { selectedEvent } = useSelector((state) => state.event);`
  - In the useFirestoreDoc() hook:
    - Instead of dispatching the listenToEvents() action, dispatch the listenToSelectedEvent() action. Then pass the `event` object that we get back from Firestore to this action as an argument
    - Everything else in this hook stays the same
    ```js
    useFirestoreDoc({
      // cast the match.params.id into a boolean
      // by default, shouldExecute is set to true
      // if no event id (shouldExecute is false), return early
      // this stops from listening to firestore
      shouldExecute: !!match.params.id,
      // query an event doc in the events collection in Firestore db
      query: () => listenToEventFromFirestore(match.params.id),
      // store the event in Redux store
      data: (event) => dispatch(listenToSelectedEvent(event)),
      deps: [match.params.id, dispatch]
    });
    ```

### [5. Fixing the event filters](https://github.com/sungnga/revents/commit/fd1d85f63e4def39627ec03830c0e7e50d10d375?ts=2)
- What we have going on right now is when we click on the 'I'm going' or 'I'm hosting' filter on the EventDashboard page, it displays the existing events and the filtered events after it. This is because we have not cleared out any events currently in Redux store. So we need to create an action creator to clear the events in the store and go get the events that match the specified filter. We also need to clear the events and reset it to its initial state when we unmount the EventDashboard component
- In eventConstants.js file:
  - Create and export a CLEAR_EVENTS constant
  - `export const CLEAR_EVENTS = 'CLEAR_EVENTS';`
- In eventActions.js file:
  - Import the CLEAR_EVENTS constant: `import { CLEAR_EVENTS } from './eventConstants';`
  - Create and export a clearEvents action creator
    ```js
    export function clearEvents() {
      return {
        type: CLEAR_EVENTS
      };
    }
    ```
- In eventReducer.js file:
  - Import the CLEAR_EVENTS constant: `import { CLEAR_EVENTS } from './eventConstants';`
  - In the `initialState` object, set the `moreEvents` property to true
    ```js
    const initialState = {
      events: [],
      comments: [],
      moreEvents: true,
      selectedEvent: null
    };
    ```
  - Add a case for the CLEAR_EVENTS action. It returns, as an object, all the existing states, set the events state to an empty array, and set the moreEvents state to true just to be explicit
    ```js
    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
        moreEvents: true
      };
    ```
- In EventDashboard.jsx file:
  - Import the clearEvents action: `import { clearEvents } from '../eventActions';`
  - In the handleSetPredicate() function, before we set the predicate, dispatch the clearEvents() action and set the lastDocSnapshot local state to null. This ensures that we clear all the current events in the store
    ```js
    function handleSetPredicate(key, value) {
      dispatch(clearEvents());
      setLastDocSnapshot(null);
      setPredicate(new Map(predicate.set(key, value)));
    }
    ```
  - We also need to clear out the events when we unmount the EventDashboard component. This way when the component is unmounted, we reset the events to its initial state. For example, if we're on the EventDashboard page and decide to visit some other page and come back to the EventDashboard page, we would get an error in the console
  - In the useEffect() hook, add a return statement and a callback function and in it, dispatch the clearEvents() action
    ```js
    useEffect(() => {
      setLoadingInitial(true);

      // fetchEvents is an async function, so it returns a promise
      // what's returned in the promise is lastVisible
      // set this lastVisible in the lastDocSnapshot local state
      dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
        setLastDocSnapshot(lastVisible);
        setLoadingInitial(false);
      });

      // reset the events to its initial state when the component unmounts
      return () => {
        dispatch(clearEvents());
      };
    }, [dispatch, predicate]);
    ```

### [6. Implementing data consistency: updating photoURL](https://github.com/sungnga/revents/commit/4288ba236e425fed330341715d6edb012e448b20?ts=2)
- One area in our app where we experience data inconsistency is when a user updates their main profile photo, their profile photo isn't updated in the event's hostPhotoURL or in an event's attendees array or in a userFollowers collection. This is because we don't have relational database between the 'users' collection, the 'events' collection, and the 'following' collection
- The setMainPhoto function (firestoreService.js) updates a user photoURL in five different areas:
  - The currentUser doc in 'users' collection
  - The hostPhotoURL of an event in 'events' collection
  - The photoURL of an attendee in the attendees array of an event
  - The currentUser photoURL in the 'userFollowers' collection that's inside the 'following' collection
  - The authenticated user profile photo in firebase.auth
- In firestoreService.js file and in the setMainPhoto function:
  - We're going to modify this function a little bit to update the user photoURL in other areas in the Firestore DB. We're going to use the batch method for this to maintain data consistency. If one of the operations inside the batch fails, all the other operations will roll back and will not update our database
  - We're going to update the user photoURL of today's and future events only. We're not going to update things that are in the past
  - First, get today's date by calling `new Date()`. Assign it to a `today` constant
    - `const today = new Date();`
  - Get a ref to all of the events where the currentUser is attending and are greater than today's date
    ```js
    const eventDocQuery = db
      .collection('events')
      .where('attendeeIds', 'array-contains', user.uid)
      .where('date', '>=', today);
    ```
  - Get a ref to the userFollowing collection
    ```js
    const userFollowingRef = db
      .collection('following')
      .doc(user.uid)
      .collection('userFollowing');
    ```
  - Then we're going to update the user photoURL in the 'users' collection in Firestore using the `batch.update()` method. Using the batch method allows us to have data consistency. Now, we're not going to be able to batch the photoURL update in firebase.auth. We do this in the try/catch block instead
    ```js
    const batch = db.batch();

    batch.update(db.collection('users').doc(user.uid), { photoURL: photo.url });
    ```
  - Inside the try/catch block:
    - In the try block, we will attempt to update the user photoURL in four different places
      - The hostPhotoURL of an event
      - The photoURL of an attendee in the attendees array of an event
      - The currentUser photoURL in the 'userFollowers' collection that's inside the 'following' collection
      - The authenticated user profile photo in firebase.auth
    - Get the event docs query by calling the `.get()` method on the eventDocQuery ref. This is an async operation, so add the `await` keyword in front of it. Assign the result to `eventsQuerySnap` variable. This is an array of event docs based on the eventDocQuery ref
    - Loop over this eventsQuerySnap.docs array and for each event doc, 
      - check to see if the eventDoc hostUid is equal to the user.uid. If it is, update the hostPhotoURL using the `batch.update()` method
      - then go to the attendees array in each event doc, check to see if an attendee.id is equal to the user.uid using the .filter() method. If it is, update the attendee.photoURL using the `batch.update()` method
    - Next, we want to update the currentUser photo in the 'userFollowers' collection that is inside the 'following' collection
    - First, get the userFollowing docs data by calling the `.get()` method on the userFollowingRef. This is an async operation, so add an `await` keyword in front of it. Assign the result to a `userFollowingSnap` variable
    - Loop over the userFollowingSnap.docs array using the `.forEach()` method. For each docRef,
      - first, get a ref to the currentUser doc in 'userFollowers' collection
      - then update the photoURL of this ref using the `batch.update()` method
    - We need to commit the batch by calling `batch.commit()`. This is an async operation, so add the `await` keyword in front of it
    - Lastly, we want to update the authenticated user profile photo in firebase.auth. This operation is separate from the batch we use to update in Firestore
      - In the return statement of the try block, call the `user.updateProfile()` to update the photoURL property in Firebase
      - This is an async operation, so add the `await` keyword in front of it
    - If the `batch.commit()` operation fails or if updating the user profile photo in firebase.auth fails, it'll go to the catch block and throw an error
    ```js
    try {
      // get the events from Firestore based on eventDocQuery ref
      const eventsQuerySnap = await eventDocQuery.get();
      // for each event in eventsQuerySnap.docs array,
      // update the hostPhotoURL, if the hostUid matches the user.uid
      // update the attendee.photoURL in attendees array, if attendee.id matches the user.uid
      for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
        let eventDoc = eventsQuerySnap.docs[i];
        if (eventDoc.data().hostUid === user.uid) {
          batch.update(eventsQuerySnap.docs[i].ref, {
            hostPhotoURL: photo.url
          });
        }
        // attendees is an array, so we need to use the filter method to update an element
        batch.update(eventsQuerySnap.docs[i].ref, {
          attendees: eventDoc.data().attendees.filter((attendee) => {
            if (attendee.id === user.uid) {
              attendee.photoURL = photo.url;
            }
            return attendee;
          })
        });
      }

      // get the userFollowing docs data from Firestore
      const userFollowingSnap = await userFollowingRef.get();
      // for each doc in userFollowingSnap.docs array,
      // get a ref to currentUser doc in userFollowers collection
      // update the photoURL of this ref using the batch method
      userFollowingSnap.docs.forEach((docRef) => {
        let followingDocRef = db
          .collection('following')
          .doc(docRef.id)
          .collection('userFollowers')
          .doc(user.uid);
        batch.update(followingDocRef, {
          photoURL: photo.url
        });
      });

      await batch.commit();

      // updating photoURL in Firebase.auth
      // this operation is separate from the batch
      return await user.updateProfile({
        photoURL: photo.url
      });
    } catch (error) {
      throw error;
    }
    ```

### [7. Updating Firestore security rules](https://github.com/sungnga/revents/commit/ca3c4a3319971cd85fb8df8bf26b09252a43da04?ts=2)
- We need to update our security rules in Firestore DB to allow a user to update a document that matches their own id even if it is inside someone else's collection. They won't have permission to create or delete a document in another person's collection
- Go to the Cloud Firestore Database dashboard page and click in the Rules tab at the top of the screen
  - Add another rule that allows a user to update a document that's inside another user's 'following' collection if the document id matches that user uid
    ```js
    match /following/{userId}/{document=**} {
      allow read: if request.auth.uid != null;
      allow write: if request.auth.uid == userId;
      allow update: if resource.id == request.auth.uid;
    }
    ```
  - Click on the Publish button to update the rules


## SECURING THE APPLICATION

### [1. Checking anonymous access](https://github.com/sungnga/revents/commit/52d9a6f802fb187fa4e3574567c435fdae583ee8?ts=2)
- Let's take a look at what happens when an anonymous user (unauthenticated user) interacts our application
- In EventDetailedPage.jsx file:
  - We should allow an anonymous user to see the EventDetailedPage
  - Add an optional chaining operator `?` next to the currentUser to indicate that currentUser is optional for `isHosting` and `isGoing`
    ```js
    const isHost = event?.hostUid === currentUser?.uid;
    const isGoing = event?.attendees?.some((a) => a.id === currentUser?.uid);
    ```
- In EventDetailedChat.jsx file:
  - We don't want to show the chat functionality in the EventDetailedPage to anonymous users
  - Destructure the `authenticated` property from the authReducer using useSelector() hook
    - `const { authenticated } = useSelector((state) => state.auth);`
  - In JSX:
    - For the Header element, write a condition that checks if `authenticated` is true. If it is, show the "Chat about this event" text, else show the "Sign in to view and comment" text
      ```js
      <Header>
        {authenticated
          ? 'Chat about this event'
          : 'Sign in to view and comment'}
      </Header>
      ```
    - Then use the `&&` to show the chat functionality only if `authenticated` is true
      - `{authenticated && (<chat segment>)}`

### [2. Creating a modal to prompt login: UnauthModal component](https://github.com/sungnga/revents/commit/5babcc15ce13119ce1d0c6a5cbcc1148d7dc1752?ts=2)
- If an anonymous user wants to join an event or view another user profile, for example, we want to display a modal to prompt them to login or register
- In /features/auth folder, create a component called UnauthModal.jsx
- In UnauthModal.jsx file:
  - Write a functional UnauthModal component that displays a modal for a user either login or register in order to interact with certain parts of the application
    - When a user clicks on the Login button, dispatch the openModal() action with the modalType of 'LoginForm'
    - The Register button dispatches the openModal() action with the modalType of 'RegisterForm'
    - The Cancel button closes the modal
    ```js
    import React from 'react';
    import { useDispatch } from 'react-redux';
    import { Button, Divider, Modal } from 'semantic-ui-react';
    import { openModal } from '../../app/common/modals/modalReducer';

    function UnauthModal() {
      const [open, setOpen] = React.useState(true);
      const dispatch = useDispatch();

      function handleClose() {
        setOpen(false);
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
                onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))}
              />
              <Button.Or />
              <Button
                fluid
                color='green'
                content='Register'
                onClick={() => dispatch(openModal({ modalType: 'RegisterForm' }))}
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
    ```

### [3. Creating a private route: PrivateRoute component](https://github.com/sungnga/revents/commit/6c79e7007a07c15d586df28dd98d7d12cf278a63?ts=2)
- Some of the pages we want to limit access and set them to private routes. If an anonymous user visits one of these pages we want to prompt the user to either login or register or continue as a guest
- In /src/app/layout folder, create a component called PrivateRoute.jsx
- In PrivateRoute.jsx file:
  - This component takes three args: Component, prevLocation, and ...rest
  - Destructure the `authenticated` state from the authReducer using the useSelector() hook
  - In JSX:
    - Instantiate the Route component provided by react-router-dom
    - In it, spread in the rest of the properties that's coming from the parent component
    - In the render attribute, check to see if `authenticated` state is true. If it is, render the `Component` component, else render the `UnauthModal` component. Spread in the props to each one of these components
    ```js
    import React from 'react';
    import { useSelector } from 'react-redux';
    import { Route } from 'react-router-dom';
    import UnauthModal from '../../features/auth/UnauthModal';

    // ...rest takes in the rest of the properties using the spread operator
    // properties such as history or location objects that we get from react-router-dom
    function PrivateRoute({ component: Component, prevLocation, ...rest }) {
      const { authenticated } = useSelector((state) => state.auth);

      // if not authenticated, the route will activate the UnauthModal
      return (
        <Route
          {...rest}
          render={(props) =>
            authenticated ? <Component {...props} /> : <UnauthModal {...props} />
          }
        />
      );
    }

    export default PrivateRoute;
    ```
- In App.jsx file:
  - Import the PrivateRoute component: `import PrivateRoute from './PrivateRoute';`
  - How it works is we're going to use the PrivateRoute component instead of Route component on pages that we want to set the route to private. The PrivateRoute component will first check the `authenticated` state in authReducer whether the user is authenticated or not. It will either display the Component or the UnauthModal component for user to sign in
  - Use the PrivateRoute component on the create event page, the account page, and the user profile page. Just replace the `Route` component with the `PrivateRoute` component
    ```js
    <Container className='main'>
      <Route exact path='/events' component={EventDashboard} />
      <Route exact path='/sandbox' component={Sandbox} />
      <Route path='/events/:id' component={EventDetailedPage} />
      <PrivateRoute
        path={['/createEvent', '/manage/:id']}
        component={EventForm}
        key={key}
      />
      <PrivateRoute path='/account' component={AccountPage} />
      <PrivateRoute path='/profile/:id' component={ProfilePage} />
      <Route path='/error' component={ErrorComponent} />
    </Container>
    ```

### [4. Connecting the router to the store](https://github.com/sungnga/revents/commit/6e1f96222cc363b7349fc33cbb49c62a68c084eb?ts=2)
- At the moment, if a user decides not to sign in by hitting the Cancel button in the UnauthModal prompt, we have no way of redirecting them back to the page where they came from. And react-router-dom does not have a previous location in the `history` prop for us to go back
- To make this work, we're going to use a library called connected-react-router
  - Install: `npm i connected-react-router`
- In rootReducer.js file:
  - Import connectRouter: `import { connectRouter } from 'connected-react-router';`
  - We need to pass down the `history` object as an argument to the combineReducer() function so that we can use it in the connectRouter
  - In the combineReducer() function, add another `router` property and set it to `connectRouter(history)`
    ```js
    import { connectRouter } from 'connected-react-router';

    const rootReducer = (history) =>
      combineReducers({
        router: connectRouter(history),
        test: testReducer,
        event: eventReducer,
        modals: modalReducer,
        auth: authReducer,
        async: asyncReducer,
        profile: profileReducer
      });
    ```
- In configureStore.js file:
  - Import the createBrowserHistory from history package: `import { createBrowserHistory } from 'history';` 
  - NOTE that the history package comes with react-router-dom, but it isn't directly installed inside our packages (package.json). So to make sure that we have access to the history package, we're going to directly install it and we need to install the same history version that react-router-dom uses
    - In the terminal, run `npm ls history` to see what version of history is being used by react-router-dom
    - Then install history of that version: `npm install history@4.10.1`
  - Outside of the configureStore function, create a history object by invoking the createBrowserHistory() function. Assign the result to a `history` variable and export it
    - `export const history = createBrowserHistory();`
  - Then inside the configureStore function, pass down this `history` object to the rootReducer() function
  - Final code:
    ```js
    import { createBrowserHistory } from 'history';

    export const history = createBrowserHistory();

    export function configureStore() {
      // 1st arg is a reducer
      // 2nd arg is an enhancer
      // We have 2 enhancers: redux thunk and redux devTool
      const store = createStore(
        rootReducer(history),
        composeWithDevTools(applyMiddleware(thunk))
      );

      // The store continuously listening to user auth state change
      store.dispatch(verifyAuth());

      return store;
    }
    ```
- In index.js file:
  - Import the history object from configureStore: `import { configureStore, history } from './app/store/configureStore';`
  - Import the ConnectedRouter component: `import { ConnectedRouter } from 'connected-react-router';`
  - Instead of using the `<BrowserRouter />`, we're going to use the `<ConnectedRouter />` component. Then pass down the `history` as props to the ConnectedRouter component
    ```js
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ScrollToTop />
        <App />
      </ConnectedRouter>
    </Provider>
    ```
- Now what happens is whenever we change route/page, we're given a LOCATION_CHANGE action in Redux store and we have a `location` property that has the pathname in payload. We can make use of this information to store it in Redux store

### [5. Redirecting the user with connected router](https://github.com/sungnga/revents/commit/f14e7d6fd24c6bb803d116c8cc2f1560cee7c5d5?ts=2)
- We want to store the previous location that a user has visited and the current location that the user is on in the authReducer in Redux store. This way when an unauthenticated user visits a PrivateRoute page and chooses not to sign in, we can redirect them back to the previous page where they came from
- In authReducer.js file:
  - Import the LOCATION_CHANGE action: `import { LOCATION_CHANGE } from 'connected-react-router';`
  - In the `initialState` object, add a prevLocation and a currentLocation properties and initialize both to null
    ```js
    const initialState = {
      authenticated: false,
      currentUser: null,
      prevLocation: null,
      currentLocation: null
    };
    ```
  - Add a case for the LOCATION_CHANGE action where it returns 
    - all of the existing states
    - the prevLocation property is set to `state.currentLocation`
    - the currentLocation property is set to `payload.location`
    ```js
    case LOCATION_CHANGE:
      return {
        ...state,
        prevLocation: state.currentLocation,
        currentLocation: payload.location
      };
    ```
- In UnauthModal.jsx file:
  - In the UnauthModal component, receive and destructure the `history` object from the PrivateRoute parent component
  - Destructure the prevLocation property from authReducer using the useSelector() hook
    - `const { prevLocation } = useSelector((state) => state.auth);`
  - In the handleClose() function, write an if statement to check if both the history object AND the prevLocation state exist. If both do, call the history.push() method to redirect to prevLocation.pathname page. If not, call the history.push() method to redirect to '/events' EventDashboard page
    ```js
    function handleClose() {
      if (history && prevLocation) {
        history.push(prevLocation.pathname);
      } else {
        history.push('/events');
      }
      setOpen(false);
    }
    ```
- So when an unauthenticated user visits a PrivateRoute page, the UnauthModal prompt window pops up and ask them to sign in. If they choose not to sign in, we redirect them to the previous page where they came from. If they happen to visit a PrivateRoute page from somewhere else and decide not to sign in, we redirect them to the EventDashboard page upon the UnauthModal window closes

### [6. Showing the modal on click](https://github.com/sungnga/revents/commit/399e205f61d3179266b506bafe393a7c5d984830?ts=2)
- If an anonymous user visits the event detailed page and wants to join the event by clicking on the 'Join this event' button, we would get an error. What we want is to show the sign in modal to ask the user to log in
- In EventDetailedHeader.jsx file:
  - The 'Join this event' button lives in this component. What we want to do here is display the UnauthModal component if this button is clicked by an unauthenticated user
  - Import the following:
    ```js
    import React, { useState } from 'react';
    import { useSelector } from 'react-redux';
    import UnauthModal from '../../auth/UnauthModal';
    ```
  - Destructure the `authenticated` property from authReducer using useSelector() hook
    - `const { authenticated } = useSelector((state) => state.auth);`
  - Create a `modalOpen` local state and initialize it to false
    - `const [modalOpen, setModalOpen] = useState(false);`
  - In JSX:
    - At the very top of JSX, write a condition that if the local state `modalOpen` is true, render the `<UnauthModal />` component. Pass down the setModalOpen function as props to this component. This way we can close the modal when we're done
      - `{modalOpen && <UnauthModal setModalOpen={setModalOpen} />}`
    - In the onClick event handler for the 'JOIN THIS EVENT' button element, write a condition that checks if the `authenticated` state is true. If it is, we call the handleUserJoinEvent function. If not, we call the setModalOpen() function in a callback and set it to true. This means that if authenticated state is false, the modalOpen local state will be set to true which triggers the UnauthModal component to open
      ```js
      <Button
        onClick={authenticated ? handleUserJoinEvent : () => setModalOpen(true)}
        loading={loading}
        color='teal'
      >
        JOIN THIS EVENT
      </Button>
      ```
- Now, when we close the modal for this particular scenario, we don't want to redirect the user to the previous page. We want to keep the user on the same page (on event detailed page)
- In UnauthModal.jsx file:
  - Receive and destructure the `setModalOpen` function from the EventDetailedHeader parent component
  - First, we want to check if the UnauthModal component has the `history` object. If we are accessing this component via a route, then we will have the history object. If we are accessing this component by clicking a button, then it won't have the history inside this object. If it's the button, we simply close the modal and don't redirect the user
  - In the handleClose function:
    - Write an if statement that if the history object doesn't exist, call the setOpen() method and set it to false and call the setModalOpen() method and set it to false. And lastly, add a `return` statement so that we won't do anything else when we close the modal
    ```js
    // if no history object, simply close the modal and the user stays on the same page
    if (!history) {
      setOpen(false);
      setModalOpen(false);
      return; //don't do anything else after the modal is closed
    }
    ```
  - The next thing we need to handle is once the unauthenticated user successfully logged in or registered in our application via the UnauthModal prompt, we need to close this modal and the user stays on the same page. More specifially, once the user clicked on the 'Login' or 'Register' button, we need to close the UnauthModal. At the moment we haven't handled that yet
  - Write a handleOpenLoginModal function that dispatches the openModal() action to either open the LoginForm modal or the RegisterForm modal and then closes the UnauthModal
    ```js
    // close the UnauthModal once the user clicked on either Login or Register button
    function handleOpenLoginModal(modalType) {
      // NOTE: The modalType is pass an an object
      dispatch(openModal({ modalType }));
      setOpen(false);
      if (setModalOpen !== undefined) {
        setModalOpen(false);
      }
    }
    ```
  - In JSX, in the onClick event handlers for the Login and Register buttons, call the handleOpenLoginModal() function and pass in `'LoginForm'` as an argument for the Login button and pass in `'RegisterForm'` for the Register button
    ```js
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
    ```

### [7. More on Firestore security rules](https://github.com/sungnga/revents/commit/542724b67071a71cffb5fb3d56e43edd3d11abfd?ts=2)
- Up until this point we've only been writing simple security rules in Firestore and hiding specific features from users when we don't wnat them to have access to on the client side. We're going to further lock down our application on the server side by creating and refining more rules in Firestore security rules
- In the Firestore Database dashboard, click on the Rules tab at the top to see our existing rules
  - Instead of writing the same logic and using them line by line inside the security rules, we can make it easier to read and use the logic by writing custom functions
  - Write an isSignedIn custom function that checks whether the requested user has signed in
  - Write an isHost custom function that allows only the host of the event to update the event
  - If we want to update only a certain field inside of a document, we need to compare the incoming data with the existing data. In our case, we only want to update the attendeeIds and the attendees fields in a document
  - Write an updateAttendeeFieldsOnly custom function that only updates the attendeeIds and the attendees fields in a document
  - Update the Firestore security rules by clicking on the 'Publish' button
    ```js
    service cloud.firestore {
      match /databases/{database}/documents {
        match /users/{userId} {
          allow read: if isSignedIn();
          allow update, create: if request.auth.uid == userId;
          match /photos/{document=**} {
            allow read: if isSignedIn();
            allow write: if request.auth.uid == userId;
          }
        }
        match /following/{userId}/{document=**} {
          allow read: if isSignedIn();
          allow write: if request.auth.uid == userId;
          allow update: if resource.id == request.auth.uid;
        }
        match /events/{document=**} {
          allow read, list;
          allow update: if isHost();
          allow update: if isSignedIn() && updateAttendeeFieldsOnly();
        }
      }
    }

    // CUSTOM FUNCTIONS
    // check whether the requested user has signed in
    function isSignedIn() {
      return request.auth.uid != null;
    }

    // only the host of the event can update the event
    // resource.data is the existing data
    // request is the incoming data
    function isHost() {
      return isSignedIn() && resource.data.hostUid == request.auth.uid;
    }

    // update only a certain field by comparing incoming data with existing data
    // update the attendeeIds and attendees fields only in a document
    function updateAttendeeFieldsOnly() {
      return incomingData().diff(existingData()).changedKeys().hasOnly(['attendeeIds', 'attendees']);
    }

    // resource.data is the existing data
    function existingData() {
      return resource.data;
    }

    // request.resource.data is the incoming data
    function incomingData() {
      return request.resource.data;
    }
    ```

### [8. Restricting API key usage](https://github.com/sungnga/revents/commit/7c92fbda39f30b98d6025390a681ab5cc0fc2f02?ts=2)
- When we created our 'revents' project in Google Firebase, it automatically created an `authDomain` URL for us. We use this URL when we publish our application. We also use this URL to restrict our API key usage so that only authenticated users of our application can read/write to our database
- **Restrict API Key:**
  - Go to google developers console https://console.cloud.google.com/ and select 'revents' project
  - Then select 'Credentials' from the menu on the left
    - Currently our API key is unrestricted. We're going to restrict our API key now
    - Click on the link of the API Keys name
    - On this page, 
      - click on the 'REGENERATE KEY' button to regenerate a new API key. The old API key will be disabled within 24 hours
      - Give this API key a name: ProductionKey
      - in the 'Application restrictions' section, select the HTTP referers (web sites) option
      - in the 'Website restrictions' section, click on the ADD AN ITEM button. Go back to Firebase dashboard page and select the 'Project settings' from the menu, go to the firebaseConfig section and find the `authDomain` property, copy this URL. Paste this URL AND followed by `/*` into the ADD AN ITEM input field and click Done
      - in the 'API restrictions' section, select Don't restrict key option
      - Click on SAVE button
  - Do the exact same thing of restricting API key for the 'revents-app' project
- Now that we've restricted our API key usage, nobody (current authenticated users or new users) has permission to modify our application. What we want to do, however, is to create another API key that is unrestricted during development mode. So we should have two API keys: one restricted key for production mode and one unrestricted key for development mode
- **Create an unrestricted API key:**
  - Still in the 'Credentials' dashboard page for both the 'revents-app' and the 'revents' projects:
    - Add a new API key by clicking on the CREATE CREDENTIALS button at the top and select 'API key' option
    - Give this key a name: DevKey
    - Select 'None' option for Application restrictions
    - Select 'Dont restrict key' option for API restrictions
    - Click SAVE button
- **Create env files:**
  - At the root of project directory, create two new files: .env.production and .env.development
  - Add these two files to the .gitignore file
  - In .env.development file:
    - Go to the google developers console and copy the API key for DevKey (unrestricted API key). Do this for both revents-app and revents-maps projects
    ```js
    REACT_APP_API_KEY=<paste app unrestricted api key here>
    REACT_APP_MAPS_KEY=<paste maps unrestricted api key here>
    ```
  - In .env.production file:
    - Go to the google developers console and copy the API key for ProductionKey (restricted API key). Do this for both revents-app and revents-maps projects
    ```js
    REACT_APP_API_KEY=<paste app restricted api key here>
    REACT_APP_MAPS_KEY=<paste maps restricted api key  here>
    ```
- **Replace API keys with env variables:**
  - We're going to replace the API keys with the env variables in three different places
  - In firebase.js file:
    - Inside the firebaseConfig object, replace the API key value for the `apiKey` property
    - `apiKey: process.env.REACT_APP_API_KEY,`
  - In public/index.html file:
    - Replace the google maps api key with the env variable in between two `%paste_env_here%`
    - `<script src="https://maps.googleapis.com/maps/api/js?key=%REACT_APP_MAPS_KEY%&libraries=places"></script>`
  - In EventDetailedMap.jsx file:
    - Replace the google maps api key with the env variable for maps
    - `bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}`
- We need to restart our application dev server
- **Hiding the event filter menu from unauthenticated users:**
  - When an anonymous user visits the EventDashboard we don't want to show the filter events menu
  - In EventFilters.jsx file:
    - Import useSelector hook: `import { useSelector } from 'react-redux';`
    - Destructure the `authenticated` property from the authReducer using useSelector() hook
    - In JSX, write a condition to only display the filters Menu element if `authenticated` state is true
    - `{authenticated && (<Menu></Menu>)}`


## OPTIMIZING AND PUBLISHING THE APP

### [1. Optimizing the events](https://github.com/sungnga/revents/commit/18e168612dd90bbc37a8bf36c2baff0485a3cc32?ts=2)
- The first time when we load the EventDashboard page, we fetch the events data from Firestore and we have this data stored in memory. As our users move around in our application going from one page to another and back to the EventDashboard page again, we don't need to make another request to query for the data again. We also want to retain the filtered events and the events based on the calendar date picker in memory as well. Since we are using Redux we can keep this data in our central store instead of in local states in the components
- In eventReducer.js file:
  - In the initialState object, 
    - add a `lastVisible` property and set it to null
    - add a `filter` property and set it to string all
    - add a `startData` property and set it to today's date `new Date()`
    - add a `retainState` property and set it to false
    ```js
    const initialState = {
      events: [],
      comments: [],
      moreEvents: true,
      selectedEvent: null,
      lastVisible: null,
      filter: 'all',
      startDate: new Date(),
      retainState: false
    };
    ```
- In eventConstants.js file:
  - Create and export three new constants
    ```js
    export const SET_FILTER = 'SET_FILTER';
    export const SET_START_DATE = 'SET_START_DATE';
    export const RETAIN_STATE = 'RETAIN_STATE';
    ```
- In eventActions.js file:
  - Import the SET_FILTER and the SET_START_DATE constants
  - Write and export a setFilter action creator function that first dispatches the clearEvents() function to clear the events in eventReducer store and then dispatches the SET_FILTER action with the provided value
    - This action function returns a function because we want to perform multiple actions within this function
    ```js
    export function setFilter(value) {
      return function (dispatch) {
        dispatch(clearEvents());
        dispatch({ type: SET_FILTER, payload: value });
      };
    }
    ```
  - Write and export a setStartDate action creator function that first dispatches the clearEvents() function to clear the events in eventReducer store and then dispatches the SET_START_DATE action with the provided date
    - This action function returns a function because we want to perform multiple actions within this function
    ```js
    export function setStartDate(date) {
      return function (dispatch) {
        dispatch(clearEvents());
        dispatch({ type: SET_START_DATE, payload: date });
      };
    }
    ```
  - In the fetchEvents() action creator function, we're going to make a few changes
    - it no longer receives the `predicate` as an argument. Instead, it receives a `filter` and a `startDate` as two additional arguments
    - in the try block, pass down the `filter` and `startDate` as arguments to the fetchEventsFromFirestore() function
    - when we dispatch the FETCH_EVENTS action, we're also going to pass down the `lastVisible` value to payload. We want to store this value in Redux store
    - it no longer returns the `lastVisible` value
    ```js
    export function fetchEvents(filter, startDate, limit, lastDocSnapshot) {
      return async function (dispatch) {
        dispatch(asyncActionStart());
        try {
          const snapshot = await fetchEventsFromFirestore(
            filter,
            startDate,
            limit,
            lastDocSnapshot
          ).get();
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          const moreEvents = snapshot.docs.length >= limit;
          const events = snapshot.docs.map((doc) => dataFromSnapshot(doc));
          dispatch({ type: FETCH_EVENTS, payload: { events, moreEvents, lastVisible } });
          dispatch(asyncActionFinish());
        } catch (error) {
          dispatch(asyncActionError(error));
        }
      };
    }
    ```
- In firestoreService.js file:
  - In the fetchEventsFromFirestore() function,
    - remove the `predicate` argument and add the `filter` and `startDate` as arguments to this function
    - in the switch statement, instead of passing in the `predicate`, pass in the `filter` as an argument. Then for each of the three queries we make here, replace the `predicate` with the `startDate` 
    ```js
    export function fetchEventsFromFirestore(
      filter,
      startDate,
      limit,
      lastDocSnapshot = null
    ) {
      const user = firebase.auth().currentUser;
      const eventRef = db
        .collection('events')
        .orderBy('date')
        .startAfter(lastDocSnapshot)
        .limit(limit);
      // filter events based on the predicate
      // get the events based on the key/value of the predicate set in EventFilters component
      // use the firestore's .where() method to query the events
      switch (filter) {
        case 'isGoing':
          return eventRef
            .where('attendeeIds', 'array-contains', user.uid)
            .where('date', '>', startDate);
        case 'isHost':
          return eventRef
            .where('hostUid', '==', user.uid)
            .where('date', '>=', startDate);
        default:
          return eventRef.where('date', '>=', startDate);
      }
    }
    ```
- In eventReducer.js file:
  - Import the SET_FILTER, SET_START_DATE, and RETAIN_STATE constants
    - `import { SET_START_DATE, RETAIN_STATE } from './eventConstants';`
  - For the FETCH_EVENTS case, add a `lastVisible` property and set it to `payload.lastVisible`
    ```js
    case FETCH_EVENTS:
      return {
        ...state,
        events: [...state.events, ...payload.events],
        moreEvents: payload.moreEvents,
        lastVisible: payload.lastVisible
      };
    ```
  - Add another case for SET_FILTER action
    ```js
    case SET_FILTER:
      return {
        ...state,
        retainState: false,
        moreEvents: true,
        filter: payload
      };
    ```
  - Add another case for SET_START_DATE action
    ```js
    case SET_START_DATE:
      return {
        ...state,
        retainState: false,
        moreEvents: true,
        startDate: payload
      };
    ```
  - Add another case for SET_START_DATE action
    ```js
    case RETAIN_STATE:
      return {
        ...state,
        retainState: true
      };
    ```
  - For the CLEAR_EVENTS case, add a `lastVisible` property and set it to `null`
    ```js
    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
        moreEvents: true,
        lastVisible: null
      };
    ```
- In EventDashboard.jsx file
  - Import the RETAIN_STATE constant: `import { RETAIN_STATE } from '../eventConstants';`
  - Destructure the filter, startDate, lastVisible, and retainState properties from eventReducer
    - `const { events, moreEvents, filter, startDate, lastVisible, retainState } = useSelector((state) => state.event);`
  - Remove the `predicate` and `lastDocSnapshot` local states
  - Remove the handleSetPredicate function
  - In the useEffect() hook:
    - Write an if statement to check if retainState is true. If it is, return early
    - In the fetchEvents() function, remove the `predicate` argument and pass in the `filter` and `startDate` as two additional arguments. Also, we no longer return `lastVisible` from this function, so remove the lastVisible from the .then() method. Remove the `setLastDocSnapshot(lastVisible);` method from the .then() method
    - Add these three dependencies to the dependencies array: filter, startDate, retainState
    ```js
    useEffect(() => {
      if (retainState) return;
      setLoadingInitial(true);

      // fetchEvents is an async function, so it returns a promise
      // what's returned in the promise is lastVisible
      // set this lastVisible in the lastDocSnapshot local state
      dispatch(fetchEvents(filter, startDate, limit)).then(() => {
        setLoadingInitial(false);
      });

      // reset the events to its initial state when the component unmounts
      return () => {
        dispatch({ type: RETAIN_STATE });
      };
    }, [dispatch, filter, startDate, retainState]);
    ```
  - In the handleFetchNextEvents function:
    - Remove the `predicate` argument and pass in the `filter` and `startDate` as two additional arguments
    - We no longer need to call the `setLastDocSnapshot(lastVisible);` method and we can remove the .then() method entirely
    ```js
    function handleFetchNextEvents() {
      dispatch(fetchEvents(filter, startDate, limit, lastVisible));
    }
    ```
  - In JSX and in the EventFilters component, we no longer passing down the `predicate` state and the `setPredicate` function
    - `<EventFilters loading={loading} />` 
- In EventFilters.jsx file:
  - Import the setFilter and setStartDate action creators: `import { setFilter, setStartDate } from '../eventActions';`
  - Remove the predicate and setPredicate properties as arguments
  - Get the dispatch function by calling the useDispatch() hook
    - `const dispatch = useDispatch();`
  - Destructure the filter and startDate properties from the eventReducer
    - `const { filter, startDate } = useSelector((state) => state.event);`
  - In JSX:
    - For each of 'All Events', 'isGoing', and 'isHosting' filter Menu.Item,
      - for the active attribute, instead of calling the predicate.get() method, we're just going to set `filter === 'NAME_OF_FILTER_HERE'`
      - for the onClick event handler, instead of calling the setPredicate() method, we're going to dispatch the setFilter() method and pass in the name of the filter
      ```js
      {authenticated && (
        <Menu vertical size='large' style={{ width: '100%' }}>
          <Header icon='filter' attached color='teal' content='Filters' />
          <Menu.Item
            content='All Events'
            active={filter === 'all'}
            onClick={() => dispatch(setFilter('all'))}
            disabled={loading}
          />
          <Menu.Item
            content="I'm going"
            active={filter === 'isGoing'}
            onClick={() => dispatch(setFilter('isGoing'))}
            disabled={loading}
          />
          <Menu.Item
            content="I'm hosting"
            active={filter === 'isHost'}
            onClick={() => dispatch(setFilter('isHost'))}
            disabled={loading}
          />
        </Menu>
      )}
      ```
    - For the Calendar datepicker component,
      - for the onChange attribute, instead of calling the setPredicate() method, dispatch the setStartDate() method and pass in date as an argument
      - for the value attribute, instead of calling the predicate.get() method, just set the startDate property or today's date
      ```js
      <Calendar
        onChange={(date) => dispatch(setStartDate(date))}
        value={startDate || new Date()}
        tileDisabled={() => loading}
      />
      ```

### [2. Optimizing the profiles](https://github.com/sungnga/revents/commit/580204963ceedf584d1e37461b6c6a0bdf18cc57?ts=2)
- The next small optimization we want to make is if we already have the currentUserProfile data then we don't need to listenToSelectedUserProfile. For example, if the currentUser is browsing on the EventDashboard page and clicks on a link to go to their profile page, we don't need to fetch the selectedUserProfile data
- In ProfilePage.jsx file:
  - Destructure the `currentUserProfile` property from profileReducer
    - `const { selectedUserProfile, currentUserProfile } = useSelector((state) => state.profile);`
  - In the custom useFirestoreDoc hook:
    - Add a `shouldExecute` property and set it to `match.params.id !== currentUser.uid`
    - That way, this custom hook runs to fetch the selectedUserProfile data only if the URL params id does not match the currently login user id
  - At the top of the component, add a `let profile`
  - Write an if statement that checks if match.params.id is equal to currentUser.uid. If it is, set the `profile` variable to currentUserprofile. If it isn't, set the `profile` variable to selectedUserProfile
    ```js
    if (match.params.id === currentUser.uid) {
      profile = currentUserProfile;
    } else {
      profile = selectedUserProfile;
    }
    ```
  - Then instead of checking for selectedUserProfile, we're going to check for profile everywhere in this component
    ```js
    if ((loading && !profile) || (!profile && !error))
      return <LoadingComponent content='Loading profile...' />;

    return (
      <Grid>
        <Grid.Column width={16}>
          <ProfileHeader
            profile={profile}
            isCurrentUser={currentUser.uid === profile.id}
          />
          <ProfileContent
            profile={profile}
            isCurrentUser={currentUser.uid === profile.id}
          />
        </Grid.Column>
      </Grid>
    );
    ```

### [3. Building the application for production](https://github.com/sungnga/revents/commit/76acb62632c514a64d16e29f3cd4bd44edfdcfa4?ts=2)
- Create-react-app gives us a tool to create a production build of our application
- To create a production build, run: `npm run build`
- This creates a `build` folder that contains all the asset files, Javascript code that has been optimized, minimized, and bundled
- Install the serve package globally, which will allow us to serve the contents from a build folder: `npm install -g serve`
- Then run: `serve -s build`. This serves our application in production mode on localhost
- Go to `http://localhost:5000` to see the application

### [4. Publishing the app to Firebase](https://github.com/sungnga/revents/commit/89519aa008bbbad0bf3d4f7a111c610e7ba7d2ce?ts=2)
- Go to Firebase console and click on the Hosting menu item on the left. Then click the Get Started button
  - We can deploy all of our code to be hosted by Firebase
  - **Set up Firebase Hosting**
    - Step 1: Install Firebase CLI: `npm install -g firebase-tools`. We already installed this. Click on Next
    - Step 2: Initialize your project
      - Sign in to Google: `firebase login`. We already logged in
      - Initiate your project: `firebase init`. We already initiated our project
      - Click on Next
    - Step 3: Deploy to Firebase Hosting
      - When you're ready to deploy your web app: `firebase deploy`. We don't do this
      - Click on Continue to console
  - It should now take us to the Hosting dashboard page
- In package.json file:
  - Add deploy to the scripts tag
  - We want to build it first and then deploy
    ```js
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject",
      "deploy": "npm run build && firebase deploy"
    },
    ```
- In the terminal, stop the running server and run: `firebase init`
  - Then the arrow key to select the 'Hosting: Configure and deploy Firebase Hosting sites' option and press return
  - 'What do you want to use as your public directory?': type `build`. This is the folder we want to use
  - 'Configure as a single-page app (rewrite all urls to /index.html)?': type `N`
  - 'File build/index.html already exists. OverWrite?': type `N`. When we deploy, we're going to rebuild the build folder anyway
  - Run: `npm run deploy`. We deploy our functions and hosting
- Go back to the Firebase console and to the Hosting dashboard page. Here it should give us the hosting URL that we specified in the firebase config file. We should be able to see our deployed application using this URL

### [5. Resolving issues with the app and redeploying](https://github.com/sungnga/revents/commit/4ad6bcf0dfaf08bcc24b06bcac6e2127515df939?ts=2)
- Let's remove the Delete event button, because the host of the event can only cancel the event but cannot delete an event
- In EventListItem.jsx file:
  - In JSX, remove the Delete button element
- Next issue is if we're on an EventDetailedPage and we click on the Create Event button, the event form is still populated with the event data coming from the `selectedEvent` property in the eventReducer. We want to clear the Create Event form. So we want to check if we are on the create root path (create event), we need to clear the `selectedEvent` property in the eventReducer. But we want to keep the `selectedEvent` property if we are on the EventDetailedPage and going into the event form
- In eventConstants.js file:
  - Create and export a CLEAR_SELECTED_EVENT constant
  - `export const CLEAR_SELECTED_EVENT = 'CLEAR_SELECTED_EVENT';`
- In eventActions.js file:
  - Import the CLEAR_SELECTED_EVENT constant: `import { CLEAR_SELECTED_EVENT } from './eventConstants';`
  - Write and export a clearSelectedEvent action creator
    ```js
    export function clearSelectedEvent() {
      return {
        type: CLEAR_SELECTED_EVENT
      };
    }
    ```
- In eventReducer.js file:
  - Import the CLEAR_SELECTED_EVENT constant: `import { CLEAR_SELECTED_EVENT } from './eventConstants';`
  - Add a case for CLEAR_SELECTED_EVENT action
    - This action sets the `selectedEvent` property to null
    ```js
    case CLEAR_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: null
      };
    ```
- In EventForm.jsx file:
  - We want to use useEffect() so that when this component mounts, we want to check the pathname in the `location` property. If the path location is `/createEvent`, we want to dispatch the clearSelectedEvent action to clear the `selectedEvent` property in eventReducer. This will clear the event form
  - Import the clearSelectedEvent action: `import { clearSelectedEvent } from '../eventActions';`
  - In the EventForm component, receive and destructure the `location` property
  - Add a useEffect() hook:
    - Write an if statement to check if location.pathname is NOT equal to '/createEvent', return early. If it is, dispatch the clearSelectedEvent action
    - Add dispatch and location.pathname to the dependencies array
    ```js
    useEffect(() => {
      if (location.pathname !== '/createEvent') return;
      dispatch(clearSelectedEvent());
    }, [dispatch, location.pathname]);
    ```
  - In the useFirestoreDoc custom hook:
    - We need to be more specific when we want to go fetch the event doc in Firestore. Modify the `shouldExecute` property
    ```js
    shouldExecute:
      match.params.id !== selectedEvent?.id &&
      location.pathname !== '/createEvent',
    ```
  - In JSX and in Formik component, add the `enableReinitialize` attribute. This tells Formik to reset the form when new initialValues change
- The next issue we want to address is to turn off the autocomplete date when picking a date for an event
- In EventForm.jsx file:
  - In JSX and in the MyDateInput component, add an `autoComplete` attribute and set it to off
- Another issue we want to fix is in the user profile page in Photos tab. We only want to show the set Main photo and the Delete buttons on each photo if this profile page belongs to the currently signed in user
- In PhotosTab.jsx file:
  - In JSX, use a conditional operator to display the Main and Delete button elements if isCurrentUser is true
- The last issue we need to fix is to allow signed-in users to create events
  - Go to Cloud Firestore Rules console and add one more rule to the 'events' collection document to allow isSignedIn user create an event document
    ```js
    match /events/{document=**} {
      allow read, list;
      allow update: if isHost();
      allow update: if isSignedIn() && updateAttendeeFieldsOnly();
      allow create: if isSignedIn();
    }
    ```
  - Click the Publish button
- **Redeploy the application to Firebase**
  - In the terminal, stop the running server and run: `npm run deploy`

### [6. Updating firestore and firebase methods with Firebase v9]()
- In firebase.js file:
  - Modify the way we initialize our app in firebase with the new version of firebase
  ```js
  import { initializeApp } from 'firebase/app';

  const firebaseConfig = {
    // PASTE_FIREBASE_CONFIG_HERE
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 're-vents-bfdfa.firebaseapp.com',
    projectId: 're-vents-bfdfa',
    storageBucket: 're-vents-bfdfa.appspot.com',
    messagingSenderId: '947031853800',
    appId: '1:947031853800:web:208027c804fab5f24d975d'
  };

  export const app = initializeApp(firebaseConfig);
  ```
- In firebaseService.js file
  - Get the modular imports we need from firebase/auth, firebase/database, and firebase/storage. Then modify our firebase methods
  ```js
  import { setUserProfileData } from './firestoreService';
  import { toast } from 'react-toastify';
  import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    updateProfile,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    updatePassword
  } from 'firebase/auth';
  import {
    getDatabase,
    ref as fbRef,
    push,
    query,
    orderByKey,
    limitToLast
  } from 'firebase/database';
  import {
    getStorage,
    ref,
    uploadBytesResumable,
    deleteObject
  } from 'firebase/storage';
  import { app } from '../config/firebase';

  const auth = getAuth(app);
  const db = getDatabase(app);

  // convert a firebase object data to an array
  // firebase data returns as a snapshot object
  export function firebaseObjectToArray(snapshot) {
    if (snapshot) {
      return Object.entries(snapshot).map((e) =>
        Object.assign({}, e[1], { id: e[0] })
      );
    }
  }

  // The creds is user's email and password coming from LoginForm
  // The result returned from firebase is an auth user object
  // The user object contains data about this user
  export function signInWithEmail(creds) {
    return signInWithEmailAndPassword(auth, creds.email, creds.password);
  }

  // Sign out user in firebase
  export function signOutFirebase() {
    return signOut(auth);
  }

  // Register new user in firebase
  // After registering a user is completed, add the displayName property to the user object
  // After register a user in firebase, set the user profile data in firestore db
  export async function registerInFirebase(creds) {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        creds.email,
        creds.password
      );
      await updateProfile(result.user, {
        displayName: creds.displayName
      });
      return await setUserProfileData(result.user);
    } catch (error) {
      throw error;
    }
  }

  // Enable social login
  export async function socialLogin(selectedProvider) {
    let provider;
    if (selectedProvider === 'facebook') {
      provider = new FacebookAuthProvider();
    }
    if (selectedProvider === 'google') {
      provider = new GoogleAuthProvider();
    }
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      if (result._tokenResponse.isNewUser) {
        await setUserProfileData(result.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Update user password
  export function updateUserPassword(creds) {
    const user = auth.currentUser;
    return updatePassword(user, creds.newPassword1);
  }

  // Upload an image to FirebaseStorage
  export function uploadToFirebaseStorage(file, filename) {
    const user = auth.currentUser;
    const storage = getStorage(app);
    const storageRef = ref(storage, `${user.uid}/user_images/${filename}`);
    return uploadBytesResumable(storageRef, file);
  }

  // delete a photo from firebaseStorage
  export function deleteFromFirebaseStorage(filename) {
    const userUid = auth.currentUser.uid;
    const storage = getStorage(app);
    const storageRef = ref(storage, `${userUid}/user_images/${filename}`);
    return deleteObject(storageRef);
  }

  // add event chat to firebase database
  export function addEventChatComment(eventId, values) {
    const user = auth.currentUser;
    const newComment = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      text: values.comment,
      date: Date.now(),
      parentId: values.parentId
    };
    return push(fbRef(db, `chat/${eventId}`), newComment);
  }

  // get an event chat reference from Realtime Database
  export function getEventChatRef(eventId) {
    return query(fbRef(db, `chat/${eventId}`), orderByKey());
  }

  // get currentUser's latest 5 feed posts from Realtime Database
  export function getUserFeedRef() {
    const user = auth.currentUser;
    if (!user) return;
    return query(fbRef(db, `posts/${user.uid}`), orderByKey(), limitToLast(5));
  }
  ```
- In firestoreSerice.js file:
  ```js
  import {
    getFirestore,
    collection,
    Timestamp,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    arrayUnion,
    arrayRemove,
    updateDoc,
    query,
    orderBy,
    where,
    deleteDoc,
    serverTimestamp,
    increment,
    writeBatch,
    limit,
    startAfter
  } from 'firebase/firestore';
  import { getAuth, updateProfile } from 'firebase/auth';
  import { app } from '../config/firebase';

  const db = getFirestore(app);
  const auth = getAuth(app);

  export function dataFromSnapshot(snapshot) {
    // If snapshot doesn't exist, return undefined
    if (!snapshot.exists) return undefined;
    // If it does exist, get the data from snapshot
    const data = snapshot.data();

    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        if (data[prop] instanceof Timestamp) {
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

  // querying the events collection
  export function fetchEventsFromFirestore(
    filter,
    startDate,
    pageSize,
    lastDocSnapshot = null
  ) {
    const user = auth.currentUser;
    const q = query(
      collection(db, 'events'),
      orderBy('date'),
      startAfter(lastDocSnapshot),
      limit(pageSize)
    );
    // filter events based on the predicate
    // get the events based on the key/value of the predicate set in EventFilters component
    // use the firestore's .where() method to query the events
    switch (filter) {
      case 'isGoing':
        return query(
          q,
          where('attendeeIds', 'array-contains', user.uid),
          where('date', '>=', startDate)
        );
      case 'isHost':
        return query(
          q,
          where('hostUid', '==', user.uid),
          where('date', '>=', startDate)
        );
      default:
        return query(q, where('date', '>=', startDate));
    }
  }

  // querying an event document in events collection
  export function listenToEventFromFirestore(eventId) {
    return doc(db, 'events', eventId);
  }

  // add an event to Firestore
  export function addEventToFirestore(event) {
    const user = auth.currentUser;
    return addDoc(collection(db, 'events'), {
      ...event,
      hostUid: user.uid,
      hostedBy: user.displayName,
      hostPhotoURL: user.photoURL || null,
      // attendees is an array of objects
      // NOTE: we cannot query an array of objects
      attendees: arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || null
      }),
      // create an array containing user uids. user.uid is a string
      // we can query this instead
      attendeeIds: arrayUnion(user.uid)
    });
  }

  // update an event in Firestore
  export function updateEventInFirestore(event) {
    const eventDoc = doc(db, 'events', event.id);
    return updateDoc(eventDoc, event);
  }

  // delete an event
  export function deleteEventInFirestore(eventId) {
    return deleteDoc(doc(db, 'events', eventId));
  }

  // cancel an event
  export function cancelEventToggle(event) {
    const eventDoc = doc(db, 'events', event.id);
    return updateDoc(eventDoc, {
      isCancelled: !event.isCancelled
    });
  }

  // set user profile data in users collection
  export function setUserProfileData(user) {
    return setDoc(doc(db, 'users', user.uid), {
      displayName: user.displayName,
      email: user.email,
      createdAt: serverTimestamp()
    });
  }

  // get user profile
  export function getUserProfile(userId) {
    return doc(db, 'users', userId);
  }

  // update user profile in Firebase Auth and Firestore db
  export async function updateUserProfile(profile) {
    //get the currentUser object from firebase auth
    const user = auth.currentUser;

    // if the displayName in firebase auth is different from the submitted profile displayName
    // update the firebase displayName with the submitted displayName
    // then update the user profile in firestore based on the user uid
    // if an error occurs, throw the error back to the form
    try {
      if (user.displayName !== profile.displayName) {
        updateProfile(user, {
          displayName: profile.displayName
        });
      }
      return await updateDoc(doc(db, 'users', user.uid), profile);
    } catch (error) {
      throw error;
    }
  }

  // update user profile photo in firebase.auth and firestore if there isn't a photoURL
  // create a photos collection inside of the firestore user document
  export async function updateUserProfilePhoto(downloadURL, filename) {
    const user = auth.currentUser;
    const userDocRef = doc(db, 'users', user.uid);
    try {
      // Get user document data in firestore
      // This is getting the data only once. Not listening to the data
      const userDoc = await getDoc(userDocRef);
      // If there isn't a photoURL, perform these 2 operations
      // Update the photoURL in firestore user document to the provided downloadURL
      // Update the photoURL in firebase.auth currentUser to the provided downloadURL
      if (!userDoc.data().photoURL) {
        await updateDoc(userDocRef, {
          photoURL: downloadURL
        });
        await updateProfile(user, {
          photoURL: downloadURL
        });
      }
      // Inside the user document object, add a photos collection
      return await addDoc(collection(db, 'users', user.uid, 'photos'), {
        name: filename,
        url: downloadURL
      });
    } catch (error) {
      console.log('fserror', error);
      throw error;
    }
  }

  // get user photos in photos collection
  export function getUserPhotos(userUid) {
    return collection(db, 'users', userUid, 'photos');
  }

  // set user main photo
  // 1. update the firestore user photoURL in 'users' collection
  // 2. update the hostPhotoURL of an event in 'events' collection
  // 3. update the photoURL of an attendee in the attendees array of an event
  // 4. update the currentUser photoURL in the 'userFollowers' collection inside the 'following' collection
  // 5. update the user photoURL in firebase.auth
  export async function setMainPhoto(photo) {
    const user = auth.currentUser;
    // get today's date
    const today = new Date();
    // get a ref to all events
    // where currentUser is attending and greater than today's date
    const eventDocQuery = query(
      collection(db, 'events'),
      where('attendeeIds', 'array-contains', user.uid),
      where('date', '>=', today)
    );
    // get a ref to the userFollowing collection
    // all the users the currentUser is following
    const userFollowingRef = collection(
      db,
      'following',
      user.uid,
      'userFollowing'
    );

    // use batch so that we don't get data inconsistency if it fails
    const batch = writeBatch(db);

    // updating the currentUser photoURL in Firestore
    batch.update(doc(db, 'users', user.uid), {
      photoURL: photo.url
    });

    try {
      // get the events from Firestore based on eventDocQuery ref
      const eventsQuerySnap = await getDocs(eventDocQuery);
      // for each event in eventsQuerySnap.docs array,
      // update the hostPhotoURL, if the hostUid matches the user.uid
      // update the attendee.photoURL in attendees array, if attendee.id matches the user.uid
      for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
        let eventDoc = eventsQuerySnap.docs[i];
        if (eventDoc.data().hostUid === user.uid) {
          batch.update(eventsQuerySnap.docs[i].ref, {
            hostPhotoURL: photo.url
          });
        }
        // attendees is an array, so we need to use the filter method to update an element
        batch.update(eventsQuerySnap.docs[i].ref, {
          attendees: eventDoc.data().attendees.filter((attendee) => {
            if (attendee.id === user.uid) {
              attendee.photoURL = photo.url;
            }
            return attendee;
          })
        });
      }

      // get the userFollowing docs data from Firestore
      const userFollowingSnap = await getDocs(userFollowingRef);
      // for each doc in userFollowingSnap.docs array,
      // get a ref to currentUser doc in userFollowers collection
      // update the photoURL of this ref using the batch method
      userFollowingSnap.docs.forEach((docRef) => {
        let followingDocRef = doc(
          db,
          'following',
          docRef.id,
          'userFollowers',
          user.uid
        );

        batch.update(followingDocRef, {
          photoURL: photo.url
        });
      });

      await batch.commit();

      // updating photoURL in Firebase.auth
      // this operation is separate from the batch made to Firestore
      return await updateProfile(user, {
        photoURL: photo.url
      });
    } catch (error) {
      throw error;
    }
  }

  // delete a photo from photos collection
  export function deletePhotoFromCollection(photoId) {
    const userUid = auth.currentUser.uid;
    return deleteDoc(doc(db, 'users', userUid, 'photos', photoId));
  }

  // add a currentUser to an event attendance
  export function addUserAttendance(event) {
    const user = auth.currentUser;
    return updateDoc(doc(db, 'events', event.id), {
      attendees: arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || null
      }),
      attendeeIds: arrayUnion(user.uid)
    });
  }

  // cancel a user attendance
  export async function cancelUserAttendance(event) {
    const user = auth.currentUser;
    try {
      const eventDoc = await getDoc(doc(db, 'events', event.id));
      // attendeeIds is an array of string
      // we can use firestore's arrayRemove method
      return updateDoc(doc(db, 'events', event.id), {
        attendees: eventDoc
          .data()
          // attendees is an array of objects. Cannot use arrayRemove method
          // using a normal JS filter method instead. Filter method returns a new array of attendees
          .attendees.filter((attendee) => attendee.id !== user.uid),
        attendeeIds: arrayRemove(user.uid)
      });
    } catch (error) {
      throw error;
    }
  }

  // get user events query
  export function getUserEventsQuery(activeTab, userUid) {
    let eventsRef = collection(db, 'events');
    const today = new Date();
    switch (activeTab) {
      case 1: // past events
        return query(
          eventsRef,
          where('attendeeIds', 'array-contains', userUid),
          where('date', '<=', today),
          orderBy('date', 'desc')
        );
      case 2: // hosted
        return query(eventsRef, where('hostUid', '==', userUid), orderBy('date'));
      default:
        return query(
          eventsRef,
          where('attendeeIds', 'array-contains', userUid),
          where('date', '>=', today),
          orderBy('date')
        );
    }
  }

  // follow a user functionality
  // add a following collection at the root of firestore db
  // add followingCount and followerCount properties to user doc
  export async function followUser(profile) {
    const user = auth.currentUser;
    const batch = writeBatch(db);
    try {
      batch.set(doc(db, 'following', user.uid, 'userFollowing', profile.id), {
        displayName: profile.displayName,
        photoURL: profile.photoURL || '/assets/user.png',
        uid: profile.id
      });

      batch.update(doc(db, 'users', user.uid), {
        followingCount: increment(1)
      });
      return await batch.commit();
    } catch (e) {
      throw e;
    }
  }

  // unfollow a user
  export async function unfollowUser(profile) {
    const user = auth.currentUser;
    const batch = writeBatch(db);
    try {
      batch.delete(doc(db, 'following', user.uid, 'userFollowing', profile.id));
      batch.update(doc(db, 'users', user.uid), {
        followingCount: increment(-1)
      });
      return await batch.commit();
    } catch (e) {
      throw e;
    }
  }

  // get userFollowers collection
  export function getFollowersCollection(profileId) {
    return collection(db, 'following', profileId, 'userFollowers');
  }

  // get userFollowering collection
  export function getFollowingCollection(profileId) {
    return collection(db, 'following', profileId, 'userFollowing');
  }

  // get following doc
  export function getFollowingDoc(profileId) {
    const userUid = auth.currentUser.uid;
    return getDoc(doc(db, 'following', userUid, 'userFollowing', profileId));
  }
  ```
- In authActions.js file:
  - Import the following:
    ```js
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { app } from '../../app/config/firebase';
    import { onSnapshot } from '@firebase/firestore';
    ```
  - Update our code when using firebase and firestore
- In EventsFeeds.jsx file:
  - Import: `import { onValue, off } from '@firebase/database';`
  - Update our code when using firebase
    - Use the `onValue()` method instead of the `on()` method
    - Modify the way we use the `off()` method
- In eventActions.js file:
  - Import: `import { getDocs } from '@firebase/firestore';`
  - Use the getDocs() method to get the events docs from Firestore. Use this method when we want to get the docs once and we don't want to listen to them
- In src/app/hooks/useFirestoreCollection.js and useFirestoreDoc.js files:
  - Import: `import { onSnapshot } from '@firebase/firestore';`
  - Update our code when calling the `query()` method
- In EventDetailedChat.jsx file:
  - Import: `import { onValue, off } from '@firebase/database';`
  - Use the `onValue()` method instead of the `on()` method
  - Modify the way we use the `off()` method
- In PhotoUploadWidget.jsx file:
  - Import: `import { getDownloadURL } from 'firebase/storage';`
  - Update our code when calling the `getDownloadURL()` method
- Redeploy our source code to Firebase
  - Run: `npm run deploy`


-----------------------------------------------------------------------------------------

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
- React-dropzone - file upload widget
  - Docs: https://www.npmjs.com/package/react-dropzone
  - Install: `npm i react-dropzone`
- React-cropper - resize an image
  - Docs: https://github.com/react-cropper/react-cropper
  - Install: `npm i react-cropper`
- React infinite scroller
  - Install: `npm i --legacy-peer-deps --save react-infinite-scroller`
- connected-react-router - to go back to previous page
  - Install: `npm i connected-react-router`
- History
  - First run `npm ls history` to see what version of history is being used by react-router-dom
  - Then install history of that version: `npm i history@4.10.1`


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

-------------------------------------------------------------------


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

### [Intro to Redux](https://github.com/sungnga/revents/commit/fb67975a36ccb03789c16c803d2fa2c4ede3a52f?ts=2)
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


### [Setting up Redux Store](https://github.com/sungnga/revents/commit/fb67975a36ccb03789c16c803d2fa2c4ede3a52f?ts=2)
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

### [Installing Redux DevTools](https://github.com/sungnga/revents/commit/fcb1b42a3bb93553d21dbfa540896ca803d591f8?ts=2)
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

### [Playing with Redux in a Sandbox component](https://github.com/sungnga/revents/commit/42c3fe00ebdfb1aea2fdbe339fd775099855a762?ts=2)
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

### [1. Setting up Redux Thunk, create an asyncReducer](https://github.com/sungnga/revents/commit/1468870aae235aa62355ae5f661dd8ca610aa659?ts=2)
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

### [2. Returning async functions in action creators](https://github.com/sungnga/revents/commit/9f914f5a62948566731109314fd15df34dee4f8e?ts=2)
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
