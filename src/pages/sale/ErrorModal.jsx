import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import './ErrorModal.css';

const ErrorModal = ({ isOpen, onClose, error }) => {
  if (!isOpen) return null;

  return (
    <div className="error-modal-overlay">
      <div className="error-modal">
        <div className="error-modal-header">
          <FaExclamationTriangle className="error-icon" />
          <h3>Connection Error</h3>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="error-modal-body">
          <p className="error-message">{error?.message || "An unknown error occurred"}</p>

          {error?.code === -32002 && (
            <div className="error-steps">
              <p className="steps-title">Please follow these steps:</p>
              <ol>
                <li>Open your MetaMask extension</li>
                <li>Make sure you are logged in</li>
                <li>Check if there's a pending connection request</li>
                <li>Try connecting again after completing these steps</li>
              </ol>
            </div>
          )}

          {error?.code === 4001 && (
            <p className="user-rejected">You rejected the connection request. Please try again when you're ready to connect.</p>
          )}
        </div>
        <div className="error-modal-footer">
          <button className="primary-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;