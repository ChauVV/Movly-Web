import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s3 from '@assets/images/s3.jpg';
import logo from '@assets/icons/logo2.jpeg';
import './MailRequest.css';

const MailRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: '',
    attachments: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // You can use a service like EmailJS, SendGrid, or your own backend API
      const response = await fetch('https://api.youremailservice.com/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'admin@movly.run',
          from: formData.email,
          subject: formData.subject,
          text: `
            Name: ${formData.name}
            Email: ${formData.email}
            Subject: ${formData.subject}
            Description: ${formData.description}
          `
        }),
      });

      if (response.ok) {
        alert('Email sent successfully!');
        // Clear form
        setFormData({
          name: '',
          email: '',
          subject: '',
          description: '',
          attachments: []
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      alert('Failed to send email. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="mail-request-container">
      <div className="mail-request-header">
        <img src={s3} alt="Header" className="background-image" />
        <div className="mail-request-headerOverlay"></div>
        <div className="mail-request-logo-container">
          <Link to="/" className="mail-request-logo-link">
            <img src={logo} alt="Movly Logo" className="mail-request-logo" />
            <span className="mail-request-logo-text">Movly</span>
          </Link>
        </div>
      </div>

      <div className="breadcrumb">
        <Link to="/">MOVLY</Link>
        <span>/</span>
        <span>Submit a request</span>
      </div>

      <h1 className="mail-request-title">Submit a request</h1>

      <div className="mail-request-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Name
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Email
              <span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Subject
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Description
              <span className="required">*</span>
            </label>
            <div className="editor-toolbar">
              <button type="button" title="Bold">B</button>
              <button type="button" title="Italic">I</button>
              <button type="button" title="Bullet list">•</button>
              <button type="button" title="Numbered list">1.</button>
              <button type="button" title="Insert image">📷</button>
              <button type="button" title="Insert link">🔗</button>
              <button type="button" title="Insert code">{'</>'}</button>
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="8"
            />
            <p className="description-help">
              Please enter the details of your request. A member of our support staff will respond as soon as possible.
            </p>
          </div>

          <div className="form-group">
            <label>
              Attachments
              <span className="optional">(optional)</span>
            </label>
            <div className="attachment-dropzone">
              <input
                type="file"
                id="file-input"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-input" className="file-input-label">
                Add file or drop files here
              </label>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Submit Request
          </button>
        </form>
      </div>

      <div className="mail-request-footer">
        <img src={s3} alt="Footer" />
        <div className="mail-request-footerOverlay"></div>
      </div>
    </div>
  );
};

export default MailRequest; 