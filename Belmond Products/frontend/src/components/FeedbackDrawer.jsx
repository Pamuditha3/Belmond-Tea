import React, { useState } from 'react';
import axios from 'axios';
import { useFeedback } from '../context/FeedbackContext';
import API_BASE_URL from '../config/api';

const FeedbackDrawer = () => {
  const { isDrawerOpen, closeDrawer } = useFeedback();
  const [activeTab, setActiveTab] = useState('product'); // 'product' or 'inquiry'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [clientName, setClientName] = useState('');

  // Form Fields State
  const [formData, setFormData] = useState({
    product: '',
    article: '',
    dateOfManufacture: '',
    timeOfManufacture: '',
    productionLineNumber: '',
    packagingFormat: 'Packaging format',
    message: '',
    name: '',
    email: '',
    consent: true
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.match('image/jpeg') && !selectedFile.type.match('image/png')) {
        setErrorMsg('Only JPEG and PNG photos are allowed.');
        return;
      }
      setErrorMsg('');
      setFile(selectedFile);
    }
  };

  const handleClose = () => {
    closeDrawer();
    // Reset state after animation finishes
    setTimeout(() => {
      setSuccess(false);
      setErrorMsg('');
      setFile(null);
      setFormData({
        product: '',
        article: '',
        dateOfManufacture: '',
        timeOfManufacture: '',
        productionLineNumber: '',
        packagingFormat: 'Packaging format',
        message: '',
        name: '',
        email: '',
        consent: true
      });
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (!formData.consent) {
      setErrorMsg('You must consent to the processing of personal data.');
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('type', activeTab);
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);

      if (activeTab === 'product') {
        if (!file) {
          setErrorMsg('Please attach a product photo.');
          setLoading(false);
          return;
        }
        data.append('product', formData.product);
        data.append('article', formData.article);
        data.append('dateOfManufacture', formData.dateOfManufacture);
        data.append('timeOfManufacture', formData.timeOfManufacture);
        data.append('productionLineNumber', formData.productionLineNumber);
        data.append('packagingFormat', formData.packagingFormat);
        data.append('file', file);
      }

      setClientName(formData.name);

      await axios.post(`${API_BASE_URL}/feedback`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess(true);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`modal-drawer ${isDrawerOpen ? 'active' : ''}`}>
        <div className="modal-drawer__header">
          <h3 className="h3">Feedback</h3>
          <div className="modal-drawer__close" onClick={handleClose}>&times;</div>
        </div>
        
        <div className="modal-drawer__content">
          {success ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Royal Request Received</h3>
              <p>Thank you, <strong>{clientName}</strong>. Your feedback has been sent to the Richard Tea review board. Our tea experts will respond to you shortly.</p>
              <button className="btn btn-solid" onClick={handleClose}>Close Window</button>
            </div>
          ) : (
            <>
              <div className="tabs">
                <button 
                  className={`tab-btn ${activeTab === 'product' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('product'); setErrorMsg(''); }}
                >
                  Product Review
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'inquiry' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('inquiry'); setErrorMsg(''); }}
                >
                  Another Question
                </button>
              </div>

              {errorMsg && (
                <div style={{ color: '#D32F2F', backgroundColor: '#FFEBEE', padding: '10px 15px', borderRadius: '4px', marginBottom: '20px', fontSize: '0.85rem' }}>
                  {errorMsg}
                </div>
              )}

              {/* Tab 1: Product Review */}
              {activeTab === 'product' && (
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form-row-2">
                    <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        name="product" 
                        placeholder="Product name *" 
                        value={formData.product}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        name="article" 
                        placeholder="Product article *" 
                        value={formData.article}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-section-title">More about the product</div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <input 
                        type="date" 
                        className="form-control" 
                        name="dateOfManufacture" 
                        value={formData.dateOfManufacture}
                        onChange={handleInputChange}
                        placeholder="Date of manufacture *" 
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="time" 
                        className="form-control" 
                        name="timeOfManufacture" 
                        value={formData.timeOfManufacture}
                        onChange={handleInputChange}
                        placeholder="Time *" 
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        name="productionLineNumber" 
                        placeholder="Production line number *" 
                        value={formData.productionLineNumber}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <select 
                        className="form-control" 
                        name="packagingFormat"
                        value={formData.packagingFormat}
                        onChange={handleInputChange}
                      >
                        <option disabled value="Packaging format">Packaging format</option>
                        <option value="100 package">100 package</option>
                        <option value="100 sachet">100 sachet</option>
                        <option value="25 sachet">25 sachet</option>
                        <option value="20 sachet">20 sachet</option>
                        <option value="90g">90g</option>
                        <option value="180g">180g</option>
                        <option value="Gift wrapping">Gift wrapping</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-section-title">Message</div>
                  <div className="form-group">
                    <textarea 
                      className="form-control" 
                      name="message" 
                      rows="3" 
                      placeholder="What do you want to tell us? *" 
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <div className="form-group file-upload-wrapper">
                    <label className="file-upload-label">
                      <span className="file-upload-text">
                        {file ? `File Attached: ${file.name}` : 'Attach a file (JPEG/PNG photo only) *'}
                      </span>
                      <span className="plus-icon">{file ? '✓' : '+'}</span>
                      <input 
                        type="file" 
                        name="file" 
                        accept=".jpg, .jpeg, .png" 
                        onChange={handleFileChange}
                        required 
                      />
                    </label>
                  </div>

                  <div className="form-section-title">Contact details</div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        placeholder="Name *" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        placeholder="Email *" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        required 
                      />
                      <span>By clicking the button, I consent to the processing of personal data in accordance with the <a href="#" onClick={(e) => e.preventDefault()}>privacy policy</a>.</span>
                    </label>
                  </div>

                  <div className="for-but">
                    <button type="submit" className="btn btn-solid form-submit-btn" disabled={loading}>
                      {loading ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </form>
              )}

              {/* Tab 2: Another Question */}
              {activeTab === 'inquiry' && (
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form-section-title">Contact details</div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        placeholder="Name *" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        placeholder="Email *" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-section-title">Message</div>
                  <div className="form-group">
                    <textarea 
                      className="form-control" 
                      name="message" 
                      rows="3" 
                      placeholder="What do you want to tell us? *" 
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        required 
                      />
                      <span>By clicking the button, I consent to the processing of personal data in accordance with the <a href="#" onClick={(e) => e.preventDefault()}>privacy policy</a>.</span>
                    </label>
                  </div>

                  <div className="for-but">
                    <button type="submit" className="btn btn-solid form-submit-btn" disabled={loading}>
                      {loading ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>

      {/* Backdrop */}
      <div 
        className={`modal-backdrop ${isDrawerOpen ? 'active' : ''}`}
        onClick={handleClose}
      ></div>
    </>
  );
};

export default FeedbackDrawer;
