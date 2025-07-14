import React from "react";
import "../styles/App.css";

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="confirm-dialog-buttons">
          <button onClick={onCancel} className="confirm-button cancel-button">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="confirm-button confirm-ok-button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
