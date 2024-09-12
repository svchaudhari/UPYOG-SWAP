import React, { useState, useEffect } from 'react';
import './notification.css';

const notifications = [
  {
    text: "Notification 1: This is the first notification",
    startDate: "25 March 2024",
    endDate: "25 March 2025",
    link: "#",
  },
  {
    text: "Notification 2: This is the second notification",
    startDate: "25 March 2024",
    endDate: "25 March 2025",
    link: "#",
  },
  {
    text: "Notification 3: This is the third notification",
    startDate: "25 March 2024",
    endDate: "25 March 2025",
    link: "#",
  },
  {
    text: "Notification 4: This is the fourth notification",
    startDate: "25 March 2024",
    endDate: "25 March 2025",
    link: "#",
  }
];

const Notifications = () => {
  const [currentNotification, setCurrentNotification] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification(prev => (prev + 1) % notifications.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="notification-container">
      {notifications.map((notification, index) => (
        <a
          key={index}
          href={notification.link}
          className="notification"
          style={{ transform: `translateY(${(index - currentNotification) * 100}%)` }}
        >
          <div className='download'>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.5 16V23C25.5 23.663 25.2366 24.2989 24.7678 24.7678C24.2989 25.2366 23.663 25.5 23 25.5H3C2.33696 25.5 1.70107 25.2366 1.23223 24.7678C0.763392 24.2989 0.5 23.663 0.5 23V16C0.5 15.6022 0.658035 15.2206 0.93934 14.9393C1.22064 14.658 1.60218 14.5 2 14.5C2.39782 14.5 2.77936 14.658 3.06066 14.9393C3.34196 15.2206 3.5 15.6022 3.5 16V22.5H22.5V16C22.5 15.6022 22.658 15.2206 22.9393 14.9393C23.2206 14.658 23.6022 14.5 24 14.5C24.3978 14.5 24.7794 14.658 25.0607 14.9393C25.342 15.2206 25.5 15.6022 25.5 16ZM11.9388 17.0613C12.0781 17.2011 12.2437 17.312 12.426 17.3878C12.6083 17.4635 12.8038 17.5024 13.0012 17.5024C13.1987 17.5024 13.3941 17.4635 13.5765 17.3878C13.7588 17.312 13.9244 17.2011 14.0637 17.0613L19.0637 12.0612C19.3455 11.7795 19.5039 11.3973 19.5039 10.9987C19.5039 10.6002 19.3455 10.218 19.0637 9.93625C18.782 9.65446 18.3998 9.49615 18.0012 9.49615C17.6027 9.49615 17.2205 9.65446 16.9387 9.93625L14.5 12.375V2C14.5 1.60218 14.342 1.22064 14.0607 0.93934C13.7794 0.658035 13.3978 0.5 13 0.5C12.6022 0.5 12.2206 0.658035 11.9393 0.93934C11.658 1.22064 11.5 1.60218 11.5 2V12.375L9.06125 9.93875C8.77946 9.65696 8.39726 9.49865 7.99875 9.49865C7.60023 9.49865 7.21804 9.65696 6.93625 9.93875C6.65446 10.2205 6.49615 10.6027 6.49615 11.0013C6.49615 11.3998 6.65446 11.782 6.93625 12.0638L11.9388 17.0613Z" fill="#343330"/>
              </svg>
          </div>
          <span>{notification.text}</span>
          <span className='notification-date'>{notification.startDate}</span>
        </a>
      ))}
    </div>
  );
};

export default Notifications;
