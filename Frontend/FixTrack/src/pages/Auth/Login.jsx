import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { loginUser, getCurrentUser } from '../../api/auth.api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginUser({ email, password });
      if (data.access_token) {
        try {
          const userData = await getCurrentUser();
          setAuth(userData, data.access_token);
        } catch {
          setAuth({ name: 'User', email, role: 'Employee' }, data.access_token);
        }
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid email or password');
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
          <h1>Welcome Back</h1>
          <p>Sign in to access FixTrack</p>
        </div>

        <div className="auth-card">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrap">
                <Mail size={16} />
                <input
                  className="form-input has-icon"
                  type="email"
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="password-row">
                <label className="form-label">Password</label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
              <div className="input-wrap">
                <Lock size={16} />
                <input
                  className="form-input has-icon"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <div className="alert-error">{error}</div>}

            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
              {loading ? <span className="spinner" /> : <LogIn size={18} />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">Create Account</Link>
          </div>
        </div>
        <p className="auth-copyright">© 2025 FixTrack · Odoo x Adani Hackathon</p>
      </div>
    </div>
  );
};

export default Login;
