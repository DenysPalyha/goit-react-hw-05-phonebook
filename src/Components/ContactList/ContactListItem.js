import React from 'react';
import PropTypes from 'prop-types';
import styles from './Contact.module.scss';

const ContactListItem = ({ contact, deleteContacts }) => {
  return (
    <li className={styles.contactListItems}>
      <div className={styles.contactInfo}>
        <p className={styles.contactInfoParagraph}>
          {contact.name} <span className={styles.span}>{contact.number}</span>
        </p>
        <button
          type="button"
          onClick={deleteContacts}
          className={styles.contactInfoButton}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  deleteContacts: PropTypes.func.isRequired,
};

export default ContactListItem;
