import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.address?.street || '');
  const [city, setCity] = useState(user?.address?.city || '');
  const [state, setState] = useState(user?.address?.state || '');
  const [postalCode, setPostalCode] = useState(user?.address?.postalCode || '');
  const [country, setCountry] = useState(user?.address?.country || 'USA');
  const [password, setPassword] = useState('');

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      setSaving(true);
      await updateProfile({
        name,
        phone,
        address: { street, city, state, postalCode, country },
        ...(password.trim() ? { password } : {}),
      });
      setMessage({ type: 'success', text: 'Profile & default shipping address saved!' });
      setPassword('');
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="border-b border-surface-container-high pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface">Member Profile & Settings</h1>
          <p className="text-body-sm text-outline mt-1">Manage contact credentials and saved delivery addresses.</p>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg border border-error/30 text-error hover:bg-error-container/20 font-label-md font-semibold transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Sign Out</span>
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-body-sm font-medium ${
            message.type === 'success'
              ? 'bg-tertiary-container/20 text-tertiary border border-tertiary'
              : 'bg-error-container/30 text-error border border-error'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Avatar Card */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4 text-center">
          <div className="w-20 h-20 rounded-full bg-primary-fixed text-primary text-headline-lg font-bold flex items-center justify-center mx-auto shadow-xs">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-headline-sm font-semibold text-on-surface">{user?.name}</h3>
            <p className="text-body-sm text-outline">{user?.email}</p>
            <span className="mt-2 inline-block px-3 py-0.5 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider">
              {user?.role} Role
            </span>
          </div>

          <div className="pt-4 border-t border-surface-container-high space-y-2">
            <Link
              to="/orders"
              className="w-full py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>View Order History</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Profile & Address Form (2 Cols) */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-6">
          <h3 className="text-headline-sm font-semibold text-on-surface">Update Details</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-label-sm font-semibold text-on-surface block mb-1">Street Address</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="120 Market Street"
                  className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">State / Province</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">Postal Code</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-label-sm font-semibold text-on-surface block mb-1">
                  Change Password (Leave blank to keep unchanged)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password (optional)"
                  className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-6 h-11 rounded-lg bg-primary hover:bg-secondary text-white font-label-md font-semibold transition-colors shadow-xs active:scale-[0.98]"
            >
              {saving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

