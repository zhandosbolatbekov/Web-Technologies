import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Menu,
    Container,
    Segment,
    Visibility
} from 'semantic-ui-react'
import Todolist from './ToDoList';
import Contacts from './Contacts';
class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: props.activeItem,
            open: false
        };
    }

    onMenuItemClick = (e, {name}) => {
        this.setState({activeItem: name})
    };

    render() {
        const {activeItem} = this.state;
        return (
            <Visibility>
                <Segment
                    inverted
                    textAlign='center'
                    style={{padding: '1em 0em'}}
                    vertical
                >
                    <Container>
                        <Menu inverted pointing secondary size='large'>
                            <Menu.Item as={Link} to="/" name="home" active={activeItem === "home"} onClick={this.onMenuItemClick}>Home</Menu.Item>
                            <Menu.Item as={Link} to="/todolist" name='todolist' active={activeItem === "todolist"} onClick={this.onMenuItemClick}>Todolist</Menu.Item>                        
                            <Menu.Item as={Link} to="/contacts" name='contacts' active={activeItem === "contacts"} onClick={this.onMenuItemClick}>Contacts</Menu.Item>                        
                        </Menu>
                    </Container>
                </Segment>
            </Visibility>
        );
    }
}

export default MainMenu;