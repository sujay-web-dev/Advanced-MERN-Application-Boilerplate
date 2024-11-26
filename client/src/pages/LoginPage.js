// client/src/pages/LoginPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '', token: '' });
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div>
      <h2>Login</h2>
      {status === 'failed' && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" onChange={handleChange} placeholder="Email" />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          name="token"
          onChange={handleChange}
          placeholder="2FA Token (if enabled)"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
