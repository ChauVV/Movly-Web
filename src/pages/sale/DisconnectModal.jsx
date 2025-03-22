import React, { memo } from 'react';

const DisconnectModal = ({ isOpen, account, onDisconnect, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container disconnect-modal">
        <div className="modal-header">
          <h3>Disconnect Wallet</h3>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to disconnect your wallet?</p>
          <div className="connected-address">
            <span className="address-label">Connected address:</span>
            <span className="address-value">{account}</span>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="cancel-button"
            onClick={onCancel}
          >
            No, Keep Connected
          </button>
          <button
            className="disconnect-button"
            onClick={onDisconnect}
          >
            Yes, Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(DisconnectModal); 