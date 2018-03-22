import React, { Component } from 'react';
import './App.css';

class Contact {
    constructor(id, name, phone) {
        this.id = id;
        this.name = name;
        this.phone = phone;
    }
}

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contactList: [],
            name: '',
            phone: '',
            searchText: '',
        };
    }

    nameInputChanged(e) {
        this.setState({
            name: e.target.value
        });
    }

    phoneInputChanged(e) {
        this.setState({
            phone: e.target.value
        });
    }

    addContact() {
        if (this.state.name !== '' && this.state.phone !== '') {
            var newContactList = this.state.contactList;
            newContactList.push(new Contact(Date.now(), this.state.name, this.state.phone));
            this.setState({
                contactList: newContactList,
                name: '',
                phone: '',
            });
        }
    }

    deleteContact(id) {
        const newContactList = this.state.contactList.filter((contact) => contact.id !== id);
        console.log(newContactList);
        this.setState({
            contactList: newContactList,
        });
    }

    search(e) {
        this.setState({
            "searchText": e.target.value,
        })
    }

    render() {

        let list = null;

        if(this.state.searchText === "") {
            list = this.state.contactList.map((contact) => 
                <div key={contact.id} className="div_contact">
                    <li>
                        <p className="contact_name_field">{contact.name}</p>
                        <p className="contact_phone_field">{contact.phone}</p>
                        <button className="button_delete" onClick={() => this.deleteContact(contact.id)}>Delete</button>
                    </li>
                </div>
            );
        } else {
            let arr = this.state.contactList.filter((contact) => 
                contact.name.startsWith(this.state.searchText) 
                || contact.phone.startsWith(this.state.searchText)); 
            list = arr.map((contact) => 
                <div key={contact.id} className="div_contact">
                    <li>
                        <p className="contact_name_field">{contact.name}</p>
                        <p className="contact_phone_field">{contact.phone}</p>
                        <button className="button_delete" onClick={() => this.deleteContact(contact.id)}>Delete</button>
                    </li>
                </div>
            );
        }

        return (
            <div className="root_div">
                <input placeholder='Search' onChange={(e)=>this.search(e)}/>

                <div className="contact_form">
                    <input placeholder='Name' onChange={(e)=>this.nameInputChanged(e)} value={this.state.name}/>
                    <input placeholder='Phone number' onChange={(e)=>this.phoneInputChanged(e)} value={this.state.phone}/>
                    <br/> <br/>
                    <button onClick={()=>this.addContact()}>Add contact</button>
                </div>

                <div>
                    <ul>{list}
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
