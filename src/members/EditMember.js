import React, { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import './member.css';

const EditMember = ({ member, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: member.name || '',
    phone: member.phone || '',
    email: member.email || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[\d\s\-()+ ]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const updatedMember = {
        ...member,
        ...formData
      };
      onSave(updatedMember);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">
          Edit Member
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`edit-member-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter member name"
            />
            {errors.name && (
              <span className="error-message">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`edit-member-input ${errors.phone ? 'error' : ''}`}
              placeholder="000-000-0000"
            />
            {errors.phone && (
              <span className="error-message">
                {errors.phone}
              </span>
            )}
          </div>

          <div className="form-field-last">
            <label className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`edit-member-input ${errors.email ? 'error' : ''}`}
              placeholder="name@email.com"
            />
            {errors.email && (
              <span className="error-message">
                {errors.email}
              </span>
            )}
          </div>

          <div className="button-container">
            <button
              type="button"
              onClick={onCancel}
              className="modal-button modal-button-cancel"
            >
              <FaTimes /> Cancel
            </button>
            <button
              type="submit"
              className="modal-button modal-button-save"
            >
              <FaSave /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMember;
