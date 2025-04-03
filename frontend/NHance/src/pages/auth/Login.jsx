import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { toast } from 'react-toastify';
import { supabase } from '../../supabaseClient';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password); // Backend API

      if (res.error) return toast.error(res.error);

      const { session, user } = res;

      // ✅ Set Supabase session manually
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });

      if (sessionError) return toast.error('Session initialization failed');

      // ✅ Fetch fresh user with metadata
      const { data: userDetails, error: userError } = await supabase.auth.getUser();
      if (userError) return toast.error('Unable to fetch user metadata');

      const role = userDetails.user.user_metadata?.role || 'user';
      localStorage.setItem('token', session.access_token);
      localStorage.setItem('email', user.email);

      // ✅ Redirect based on role
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'partner') navigate('/partner/dashboard');
      else navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm bg-white">
        <h4 className="fw-bold text-primary m-0" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          NHance
        </h4>
        <input type="text" className="form-control w-50" placeholder="Search services..." />
        <div>
          <button className="btn btn-outline-primary me-2" onClick={() => navigate('/login')}>Login</button>
          <button className="btn btn-warning fw-semibold" onClick={() => navigate('/signup')}>Register</button>
        </div>
      </header>

      {/* Login Form */}
      <div className="container py-5" style={{ maxWidth: '500px' }}>
        <h3 className="text-center mb-4 text-primary">Login</h3>
        <div className="card p-4 shadow">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <div className="text-center mt-3">
            Don’t have an account?{' '}
            <button className="btn btn-link" onClick={() => navigate('/signup')}>Sign up</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white py-4 mt-5" style={{ background: '#4B0082' }}>
        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <div>
            <h5 className="fw-bold">NHance</h5>
            <p style={{ maxWidth: '300px' }}>
              NHance offers professional in-home jewellery cleaning services, bringing the sparkle back to your treasures.
            </p>
          </div>
          <div>
            <h6>Services</h6>
            <ul className="list-unstyled">
              <li>Bracelet Shine</li>
              <li>Pendant Cleaning</li>
              <li>Earring Restoration</li>
            </ul>
          </div>
          <div>
            <h6>Categories</h6>
            <ul className="list-unstyled">
              <li>Ring Cleaning</li>
              <li>Necklace Polishing</li>
              <li>Earring Restoration</li>
            </ul>
          </div>
          <div>
            <h6>Terms</h6>
            <ul className="list-unstyled">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <hr className="my-3" />
        <div className="text-center">
          © 2025 NHance. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Login;
