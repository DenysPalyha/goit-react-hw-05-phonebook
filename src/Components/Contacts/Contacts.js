import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import Notification from '../Notification/Notification';
import { v4 as uuidv4 } from 'uuid';
import { CSSTransition } from 'react-transition-group';
import styles from '../Contacts/Contacts.module.scss';
import './Transition/contactsTransition.css';
import '../Notification/transition/NotificationTransition.css';
import '../Filter/Transition/FilterTransition.css';
import '../ContactList/Transition/ContactTransition.css';

const getContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

const findContact = (contacts, contact) =>
  contacts.find(item => item.name.toLowerCase() === contact.name.toLowerCase());

class Contacts extends Component {
  state = {
    contacts: [],
    filter: '',
    isOpenModal: false,
  };

  componentDidMount() {
    const contsctParsed = localStorage.getItem('contacts');

    if (contsctParsed) {
      this.setState({
        contacts: JSON.parse(contsctParsed),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  changeFilter = filter => {
    this.setState({ filter });
  };

  addContacts = contact => {
    const contactFind = findContact(this.state.contacts, contact);

    const contactToAdd = {
      ...contact,
      id: uuidv4(),
    };

    if (contact.name) {
      if (contactFind) {
        this.setState({ isOpenModal: true });
        setTimeout(() => this.setState({ isOpenModal: false }), 3000);
      } else {
        this.setState(state => ({
          contacts: [...state.contacts, contactToAdd],
        }));
      }
    }
  };

  onDeleteContacts = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter, isOpenModal } = this.state;
    const visibleContacts = getContacts(contacts, filter);
    return (
      <div>
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames="titel-Logo"
          unmountOnExit
        >
          <h1 className={styles.titleH1}>Phonebook</h1>
        </CSSTransition>

        <ContactForm onContactsAdd={this.addContacts} />

        <CSSTransition
          in={contacts.length > 1}
          timeout={250}
          classNames="filter-transition"
          unmountOnExit
        >
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>

        <CSSTransition
          in={contacts.length > 0}
          timeout={250}
          classNames="contact-item-fade"
          unmountOnExit
        >
          <ContactList
            tasks={visibleContacts}
            deleteContacts={this.onDeleteContacts}
          />
        </CSSTransition>

        <CSSTransition
          in={isOpenModal}
          appear={true}
          timeout={250}
          classNames="notification-Transition"
          unmountOnExit
        >
          <Notification />
        </CSSTransition>
      </div>
    );
  }
}

export default Contacts;
