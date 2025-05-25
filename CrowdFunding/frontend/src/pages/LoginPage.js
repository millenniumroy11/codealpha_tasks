import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
  const { user, login, error: authError } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If already logged in, redirect
    if (user) {
      navigate(redirectTo);
    }
  }, [user, navigate, redirectTo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
      navigate(redirectTo);
    } catch (err) {
      setError(authError || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card mx-auto shadow-sm" style={{ maxWidth: '400px' }}>
        <div className="card-header bg-primary text-white text-center">
          <h1 className="h4">Welcome Back</h1>
          <p>Sign in to continue to CrowdFunder</p>
        </div>
        <div className="card-body p-4">
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="d-flex justify-content-between">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
                <Link to="#" className="text-sm text-primary">Forgot Password?</Link>
              </div>
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-muted">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
