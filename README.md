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






## LIBRARIES AND PACKAGES USED IN THIS PROJECT
- Semantic UI React and Semantic UI CSS
  - Website: www.react.semantic-ui.com
  - Install: `npm i semantic-ui-react semantic-ui-css`
  - Import in index.js file. Above the styles.css, import: `import 'semantic-ui-css/semantic.min.css';`


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