import React, { useState } from "react";
import "../styles/App.css";

function ContactForm({ onAddContact, showNotification }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showNotification("Name and Email cannot be empty.", "error");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }
    onAddContact({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Add New Contact</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
