import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      setLoading(true);
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-surface-container-lowest border border-surface-container-high rounded-2xl p-8 shadow-sm space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-primary-container text-white flex items-center justify-center mx-auto shadow-xs">
            <span className="material-symbols-outlined text-[28px]">lock</span>
          </div>
          <h2 className="text-headline-lg font-bold text-on-surface">Welcome Back</h2>
          <p className="text-body-sm text-outline">
            Sign in to access your orders, saved addresses, and member benefits.
          </p>
        </div>

        {/* Demo Quick-Fill Buttons (Viva Demo Lifesaver) */}
        <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-outline block">
            Academic Demonstration Logins:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('admin@shopease.com', 'admin123')}
              className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container-high text-primary hover:bg-surface-container font-label-sm font-semibold transition-colors text-left"
            >
              👑 Admin Demo
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('alex@example.com', 'customer123')}
              className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface hover:bg-surface-container font-label-sm font-semibold transition-colors text-left"
            >
              👤 Customer Demo
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-error-container/30 border border-error text-error text-body-sm font-medium">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-label-sm font-semibold text-on-surface mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full h-11 px-3.5 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-label-sm font-semibold text-on-surface">Password</label>
              <span className="text-label-sm text-primary hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 px-3.5 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg bg-primary hover:bg-secondary text-white font-label-lg font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">
              {loading ? 'hourglass_top' : 'login'}
            </span>
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
          </button>
        </form>

        <p className="text-body-sm text-center text-outline">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

