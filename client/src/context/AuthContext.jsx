import React, { createContext, useContext, useReducer, useEffect } from 'react';
import apiFetch from '../utils/api';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check persisted user on load
  useEffect(() => {
    const stored = localStorage.getItem('shopease_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch({ type: 'AUTH_SUCCESS', payload: parsed });
      } catch (e) {
        localStorage.removeItem('shopease_user');
        dispatch({ type: 'AUTH_FAIL', payload: null });
      }
    } else {
      dispatch({ type: 'AUTH_FAIL', payload: null });
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const userData = res.data;
      localStorage.setItem('shopease_user', JSON.stringify(userData));
      dispatch({ type: 'AUTH_SUCCESS', payload: userData });
      return userData;
    } catch (err) {
      dispatch({ type: 'AUTH_FAIL', payload: err.message });
      throw err;
    }
  };

  const register = async (name, email, password, role = 'customer') => {
    dispatch({ type: 'AUTH_START' });
    try {
      const res = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role }),
      });
      const userData = res.data;
      localStorage.setItem('shopease_user', JSON.stringify(userData));
      dispatch({ type: 'AUTH_SUCCESS', payload: userData });
      return userData;
    } catch (err) {
      dispatch({ type: 'AUTH_FAIL', payload: err.message });
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('shopease_user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await apiFetch('/auth/me', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      });
      const updatedUser = res.data;
      localStorage.setItem('shopease_user', JSON.stringify(updatedUser));
      dispatch({ type: 'AUTH_SUCCESS', payload: updatedUser });
      return updatedUser;
    } catch (err) {
      throw err;
    }
  };

  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        isAdmin: state.user?.role === 'admin',
        login,
        register,
        logout,
        updateProfile,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

