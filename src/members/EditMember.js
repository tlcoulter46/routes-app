import React, { useState } from 'react';
import { FaBeer, FaSave, FaTimes } from 'react-icons/fa';
import './editMember.css';

const EditMember = ({ member, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: member.name || '',
    phone: member.phone || '',
    email: member.email || '',
    team: member.team || '',
    handicap: member.handicap || ''
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

    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // if (formData.handicap && !isValidHandicap(formData.handicap)) {
    //   newErrors.phone = 'Please enter a valid handicap';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[\d\s\-()+ ]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
            <div className="form-container">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="edit-member-input"
                placeholder="Enter member name"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">
              Phone
            </label>
            <div className="form-container">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="edit-member-input"
                placeholder="000-000-0000"
              />
            </div>
          </div>

          <div className="form-field-last">
            <label className="form-label">
              Email
            </label>
            <div className="form-container">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="edit-member-input"
                placeholder="name@email.com"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">
              Team
            </label>
            <div className="form-container">
              <input
                type="number"
                name="team"
                value={formData.team}
                onChange={handleChange}
                className="edit-member-input"
                placeholder="Team name"
                min="1"
                max="12"
                step="1"
              />
            </div>

            <label className="form-label">
              Handicap
            </label>
            <div className="form-container">
              <input
                type="number"
                name="handicap"
                value={formData.handicap || ''}
                onChange={handleChange}
                className="edit-member-input"
                placeholder="0"
                min="-10"
                max="54"
                step="1"
              />
            </div>
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
