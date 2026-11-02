import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // allows selecting customer or admin for testing!
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      setLoading(true);
      const user = await register(name, email, password, role);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-surface-container-lowest border border-surface-container-high rounded-2xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-primary-container text-white flex items-center justify-center mx-auto shadow-xs">
            <span className="material-symbols-outlined text-[28px]">person_add</span>
          </div>
          <h2 className="text-headline-lg font-bold text-on-surface">Create an Account</h2>
          <p className="text-body-sm text-outline">
            Join ShopEase to unlock express checkout, tracking, and curated drops.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-error-container/30 border border-error text-error text-body-sm font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-label-sm font-semibold text-on-surface mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Miller"
              className="w-full h-11 px-3.5 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-label-sm font-semibold text-on-surface mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jordan@example.com"
              className="w-full h-11 px-3.5 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-label-sm font-semibold text-on-surface mb-1">
              Password (Min 6 chars) *
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 px-3.5 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Role selector for academic demonstration */}
          <div>
            <label className="block text-label-sm font-semibold text-on-surface mb-1">
              Account Role (Academic Viva Selector)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`py-2 px-3 rounded-lg text-label-sm font-semibold border transition-all ${
                  role === 'customer'
                    ? 'border-primary bg-primary-fixed text-on-primary-fixed'
                    : 'border-surface-container-high bg-surface-container-low text-outline'
                }`}
              >
                Customer Role
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 px-3 rounded-lg text-label-sm font-semibold border transition-all ${
                  role === 'admin'
                    ? 'border-primary bg-primary text-white shadow-xs'
                    : 'border-surface-container-high bg-surface-container-low text-outline'
                }`}
              >
                Administrator Role
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg bg-primary hover:bg-secondary text-white font-label-lg font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">
              {loading ? 'hourglass_top' : 'check'}
            </span>
            <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
          </button>
        </form>

        <p className="text-body-sm text-center text-outline">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

