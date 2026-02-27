import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, ShieldCheck } from 'lucide-react';
import { signupUser } from '../../api/auth.api';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError('Passwords do not match');
    setLoading(true);
    setError('');
    try {
      await signupUser({ name: form.name, email: form.email, password: form.password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-orb1" />
      <div className="auth-orb2" />
      <div className="auth-box">
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <ShieldCheck size={32} />
          </div>
          <h1>Create Account</h1>
          <p>Join FixTrack for industrial-grade maintenance</p>
        </div>

        <div className="auth-card">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrap">
                <User size={16} />
                <input className="form-input has-icon" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrap">
                <Mail size={16} />
                <input className="form-input has-icon" name="email" type="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrap">
                  <Lock size={16} />
                  <input className="form-input has-icon" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Confirm</label>
                <div className="input-wrap">
                  <Lock size={16} />
                  <input className="form-input has-icon" name="confirm" type="password" placeholder="••••••••" value={form.confirm} onChange={handleChange} required />
                </div>
              </div>
            </div>

            {error && <div className="alert-error">{error}</div>}

            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
              {loading ? <span className="spinner" /> : <UserPlus size={18} />}
              {loading ? 'Creating...' : 'Get Started'}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;