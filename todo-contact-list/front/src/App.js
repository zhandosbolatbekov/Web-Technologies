import React, { Component } from 'react';
import './App.css';
import MainMenu from './MainMenu';


import {
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import Home from './Home';

import Contacts from './Contacts'
import ToDoList from './ToDoList'

class App extends Component {
  render() {
    return (
            <Router>
                <div>
                    <Route path="/:id?" component={PageRoute}/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/contacts" component={ContactsRoute} />
                    <Route path="/todolist" component={ToDoListRoute}/>
                </div>
            </Router>
    );
  }
}

const ContactsRoute = () => (
    <div>
        <Contacts title="Contacts" />
    </div>
)
const ToDoListRoute = () => (
    <div>
        <ToDoList title="ToDolist" />
    </div>
)
const PageRoute = ({match}) => (
    <div>
        <MainMenu activeItem={match.params.id != null ? match.params.id : "home"}/>
    </div>
)

export default App;
