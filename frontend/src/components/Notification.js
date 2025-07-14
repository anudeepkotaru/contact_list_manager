import React from "react";
import "../styles/App.css";

function Notification({ message, type }) {
  if (!message) {
    return null;
  }

  const notificationClass = `notification ${type}`;

  return <div className={notificationClass}>{message}</div>;
}

export default Notification;
