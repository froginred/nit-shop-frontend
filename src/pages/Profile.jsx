import React, { useContext, useEffect, useState } from 'react'
import '../styles/Profile.css'
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { deleteCurrentUser, updateCurrentUser } from '../services/ApiService';

const Profile = () => {
  const { currentUser, updateCurrentUserContext, isRequestToGetCurrentUserDone } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeletedAccount, setIsDeletedAccount] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormVaild) return;
    try {
      const { data } = await updateCurrentUser(formData);
      updateCurrentUserContext(data);
      setIsEditing(false);
    } catch (err) {
      if (err.status == 400 || err.status == 500) {
        setErrorFromServer(err.response.data);
      }
      if (err.code == 'ERR_NETWORK') {
        setErrorFromServer(err.message);
      }
      setTimeout(() => {
        setErrorFromServer('');
      }, 3000);
    }
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  }

  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (isConfirmed) {
      try {
        await deleteCurrentUser();
        localStorage.removeItem("token");
        updateCurrentUserContext(null);
        setIsDeletedAccount(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const [errors, setErrors] = useState({});
  const [isFormVaild, setIsFormVaild] = useState(true);
  const [errorFromServer, setErrorFromServer] = useState('');

  // Regular expressions for validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]*$/; // change: regex for phone validation (is optional & only numbers)

  const validateField = (name, value) => {
    let error = "";
    if (!value.trim() && ["first_name", "last_name", "email"].includes(name)) {
      error = `${name.replace("_", " ")} is required.`;
    } else if (name == "email" && !emailRegex.test(value)) {
      error = "Invalid email format.";
    } else if (name == "phone" && value.trim() && !phoneRegex.test(value)) {
      error = "Phone number should only contain numbers.";
    }
    setErrors({ ...errors, [name]: error });
  }

  useEffect(() => {
    setIsFormVaild(
      Object.values(errors).every(error => !error)
    )
  }, [errors]);

  return (
    <div className='profile'>
      {currentUser &&
        <div>
          {(formData && !isDeletedAccount) &&
            <div>
              <h2 className='center'>Your Profile</h2>
              <form className='profile-form' onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor="first_name" className='form-label'>
                    First Name
                  </label>
                  <input type='text' name='first_name' id='first_name' value={formData.first_name}
                    className={`form-input ${errors.first_name ? "input-error" : ""}`} onChange={handleChange} disabled={!isEditing} />
                </div>
                {errors.first_name && <p className='error-text'>{errors.first_name}</p>}
                <div className='form-group'>
                  <label htmlFor="last_name" className='form-label'>
                    Last Name
                  </label>
                  <input type='text' name='last_name' id='last_name' value={formData.last_name}
                    className={`form-input ${errors.last_name ? "input-error" : ""}`} onChange={handleChange} disabled={!isEditing} />
                </div>
                {errors.last_name && <p className='error-text'>{errors.last_name}</p>}
                <div className='form-group'>
                  <label htmlFor="email" className='form-label'>
                    Email
                  </label>
                  <input type='email' name='email' id='email' value={formData.email}
                    className={`form-input ${errors.email ? "input-error" : ""}`} onChange={handleChange} disabled={!isEditing} />
                </div>
                {errors.email && <p className='error-text'>{errors.email}</p>}
                <div className='form-group'>
                  <label htmlFor="phone" className='form-label'>
                    Phone
                  </label>
                  <input type='tel' name='phone' id='phone' value={formData.phone}
                    className={`form-input ${errors.phone ? "input-error" : ""}`} onChange={handleChange} disabled={!isEditing} />
                </div>
                {errors.phone && <p className='error-text'>{errors.phone}</p>}
                <div className='form-group'>
                  <label htmlFor="address" className='form-label'>
                    Address
                  </label>
                  <input type='text' name='address' id='address' value={formData.address}
                    className={`form-input`} onChange={handleChange} disabled={!isEditing} />
                </div>
                {errorFromServer && <p className='error-text'>{errorFromServer}</p>}
                {!isEditing && <button type='button' className='edit-btn' onClick={handleEditToggle}>Edit</button>}
                {isEditing && <button type='submit' className='save-btn'>Save</button>}
                <button type='button' className='delete-btn' onClick={handleDeleteAccount}>Delete Your Account</button>
              </form>
            </div>
          }
        </div>
      }
      {(isRequestToGetCurrentUserDone && !currentUser && !isDeletedAccount) &&
        <div>
          <h2 style={{ textAlign: "center", color: "red" }}>Unauthorized Access</h2>
          <h3>Please login to view your profile.</h3>
        </div>
      }
      {isDeletedAccount && <h2 style={{ textAlign: "center", color: "red" }}>Your account has been deleted</h2>}
    </div>
  )
}

export default Profile