import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";
import Notification from "./components/Notification";
import Pagination from "./components/Pagination";
import ConfirmDialog from "./components/ConfirmDialog";
import "./styles/App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const contactsPerPage = 10;

  const [showConfirm, setShowConfirm] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const showNotification = (message, type = "info", duration = 3000) => {
    setNotification({ message, type });
    const timer = setTimeout(() => {
      setNotification(null);
    }, duration);
    return () => clearTimeout(timer);
  };

  const fetchContacts = async (query = "", page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/contacts?q=${query}&page=${page}&per_page=${contactsPerPage}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setContacts(data.contacts);
      setTotalPages(data.total_pages);
      setCurrentPage(data.current_page);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      setError("Failed to load contacts. Please try again later.");
      showNotification("Failed to load contacts. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchContacts(searchTerm, 1);
  }, [searchTerm]);

  useEffect(() => {
    fetchContacts(searchTerm, currentPage);
  }, [currentPage]);

  const handleAddContact = async (newContact) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      });

      if (response.status === 409) {
        const errorData = await response.json();
        showNotification(errorData.error, "warning");
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const addedContact = await response.json();
      showNotification("Contact added successfully!", "success");
      setCurrentPage(1);
      fetchContacts(searchTerm, 1);
    } catch (err) {
      console.error("Failed to add contact:", err);
      showNotification("Failed to add contact. " + err.message, "error");
    }
  };

  const confirmDelete = (id) => {
    setContactToDelete(id);
    setShowConfirm(true);
  };

  const executeDelete = async () => {
    if (!contactToDelete) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/contacts/${contactToDelete}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      showNotification("Contact deleted successfully!", "success");
      fetchContacts(searchTerm, currentPage);
    } catch (err) {
      console.error("Failed to delete contact:", err);
      showNotification("Failed to delete contact. " + err.message, "error");
    } finally {
      setShowConfirm(false);
      setContactToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setContactToDelete(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this contact?"
          onConfirm={executeDelete}
          onCancel={cancelDelete}
        />
      )}

      <h1>Contact List Manager</h1>
      <ContactForm
        onAddContact={handleAddContact}
        showNotification={showNotification}
      />
      <SearchBar onSearch={setSearchTerm} />
      {loading && <p>Loading contacts...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <ContactList
            contacts={contacts}
            onDeleteContact={confirmDelete}
            searchTerm={searchTerm}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default App;
