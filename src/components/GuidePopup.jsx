import Modal from 'react-modal';
import './GuidePopup.css';  // Đảm bảo import CSS

// Cấu hình để modal hoạt động đúng với screen readers
Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(22, 22, 21, 0.22)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px'
  },
  content: {
    position: 'relative',
    background: 'rgb(62, 62, 60)',
    padding: '12px',
    border: 'none',
    width: '100%',
    maxWidth: '400px',
    margin: 'auto',
    inset: 'auto',
    overflow: 'auto'
  }
};

const GuidePopup = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="MetaMask Guide"
      className="popup-content"
    >
      <div className="popup-header">
        <h3>Connect to MetaMask</h3>
        <button className="popup-close" onClick={onClose}>×</button>
      </div>

      <div className="guide-steps">
        <div className="step">
          <div className="step-number">1</div>
          <p>Open MetaMask app on your phone</p>
        </div>

        <div className="step">
          <div className="step-number">2</div>
          <p>Click network name at the top to switch to "BNB Smart Chain"</p>
        </div>

        <div className="step">
          <div className="step-number">3</div>
          <p>Click browser icon at the bottom menu</p>
        </div>

        <div className="step">
          <div className="step-number">4</div>
          <p>Enter website address: <br />
            <div className="url-box">
              <span className="url-text">192.168.100.247</span>
              <button
                className="copy-url"
                onClick={() => {
                  navigator.clipboard.writeText("192.168.100.247");
                  alert("Address copied!");
                }}
              >
                Copy
              </button>
            </div>
          </p>
        </div>

        <div className="step">
          <div className="step-number">5</div>
          <p>When website loads, click menu icon <span>☰</span> at top right to open header</p>
        </div>

        <div className="step">
          <div className="step-number">6</div>
          <p>In the header, click connect wallet button</p>
        </div>
      </div>
    </Modal>
  );
};

export default GuidePopup; 