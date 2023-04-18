import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notofication/Notification';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
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
