import React from 'react';
import styles from './Notification.module.scss';

const Notifications = () => {
  return (
    <div className={styles.container}>
      <p className={styles.Notification}>Contact already exists!</p>
    </div>
  );
};

export default Notifications;
