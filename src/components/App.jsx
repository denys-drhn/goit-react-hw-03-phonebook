import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notofication/Notification';
import startContacts from '../contacts.json';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  //add contact + Alert =========================================
  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    // Check if contact with same name already exists
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }
    // Check if contact with same number already exists
    const existingNumber = contacts.find(contact => contact.number === number);

    if (existingNumber) {
      alert(`Contact with number ${number} already exists.`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  //delete contact ========================================
  deleteContact = contactid => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactid),
    }));
  };

  // contacts filter ==============================================
  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  // method filtered contacts for render + ! lowerCase x2 ========

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // componentDidMount()

  componentDidMount() {
    const contacts = window.localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    } else {
      this.setState({ contacts: startContacts });
    }
  }

  // componentDidUpdate

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      window.localStorage.setItem(
        'contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.getVisibleContacts();

    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          {contacts.length === 0 ? (
            <Notification message="No contacts found." />
          ) : (
            <>
              <Filter value={filter} onChange={this.changeFilter} />
              <ContactList
                contacts={filteredContacts}
                onDeleteContact={this.deleteContact}
              />{' '}
            </>
          )}
        </Section>
      </>
    );
  }
}
