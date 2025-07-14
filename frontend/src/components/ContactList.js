import React from "react";
import "../styles/App.css";

function ContactList({ contacts, onDeleteContact, searchTerm }) {
  const isSearchActive = searchTerm.trim().length > 0;

  let noContactsMessage = "No contacts found. Please add some contacts!";

  if (contacts.length === 0 && isSearchActive) {
    noContactsMessage =
      "No contacts found matching your search. Please adjust your search criteria.";
  }

  return (
    <div className="contact-list-container">
      <h2>Your Contacts</h2>
      {contacts.length === 0 ? (
        <p className="no-contacts-message">{noContactsMessage}</p>
      ) : (
        <ul className="contact-list">
          {contacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              <span>
                <strong>{contact.name}</strong> - {contact.email}
              </span>
              <button
                onClick={() => onDeleteContact(contact.id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;
