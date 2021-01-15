import React from 'react';
import ContactListItem from './ContactListItem';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './Contact.module.scss';
import './Transition/ContactTransition.css';

const ContactList = ({ tasks, deleteContacts }) => {
  return (
    <TransitionGroup component="ul" className={styles.contactList}>
      {tasks.map(contact => (
        <CSSTransition
          key={contact.id}
          timeout={250}
          classNames="contact-item-fade"
          unmountOnExit
        >
          <ContactListItem
            key={contact.id}
            contact={contact}
            deleteContacts={() => deleteContacts(contact.id)}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

ContactList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deleteContacts: PropTypes.func.isRequired,
};

export default ContactList;
