import React, { createContext, useContext, useState, useEffect } from 'react';
import apiFetch from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync with backend on authentication change or load from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      fetchBackendCart();
    } else {
      const stored = localStorage.getItem('shopease_cart');
      if (stored) {
        try {
          setItems(JSON.parse(stored));
        } catch (e) {
          setItems([]);
        }
      }
    }
  }, [isAuthenticated]);

  // Persist guest cart
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('shopease_cart', JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  const fetchBackendCart = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/cart');
      if (res.data && res.data.items) {
        setItems(res.data.items);
      }
    } catch (err) {
      console.warn('Could not sync cart with server:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    const qty = Number(quantity);

    const updateLocalCart = () => {
      setItems((prevItems) => {
        const existingIdx = prevItems.findIndex(
          (i) => (i.product?._id || i.product) === product._id
        );
        if (existingIdx > -1) {
          const updated = [...prevItems];
          const newQty = updated[existingIdx].quantity + qty;
          if (newQty > (product.stockCount || 99)) {
            return prevItems;
          }
          updated[existingIdx].quantity = newQty;
          return updated;
        } else {
          return [
            ...prevItems,
            {
              _id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
              product: product._id,
              title: product.title,
              image: product.images?.[0] || '',
              price: product.price,
              quantity: qty,
            },
          ];
        }
      });
    };

    if (isAuthenticated) {
      try {
        const res = await apiFetch('/cart', {
          method: 'POST',
          body: JSON.stringify({ productId: product._id, quantity: qty }),
        });
        if (res.data && res.data.items) {
          setItems(res.data.items);
        } else {
          updateLocalCart();
        }
      } catch (err) {
        console.warn('Backend cart sync failed, operating in offline/demo mode:', err.message);
        updateLocalCart();
      }
    } else {
      updateLocalCart();
    }

    setIsDrawerOpen(true);
  };

  const updateQuantity = async (itemId, quantity) => {
    const qty = Number(quantity);
    if (qty <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item._id === itemId || (item.product?._id || item.product) === itemId
          ? { ...item, quantity: qty }
          : item
      )
    );

    if (isAuthenticated) {
      try {
        const res = await apiFetch(`/cart/${itemId}`, {
          method: 'PUT',
          body: JSON.stringify({ quantity: qty }),
        });
        if (res.data && res.data.items) {
          setItems(res.data.items);
        }
      } catch (err) {
        console.warn('Backend update cart quantity failed:', err.message);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setItems((prev) =>
      prev.filter(
        (item) => item._id !== itemId && (item.product?._id || item.product) !== itemId
      )
    );

    if (isAuthenticated) {
      try {
        const res = await apiFetch(`/cart/${itemId}`, {
          method: 'DELETE',
        });
        if (res.data && res.data.items) {
          setItems(res.data.items);
        }
      } catch (err) {
        console.warn('Backend remove from cart failed:', err.message);
      }
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await apiFetch('/cart', { method: 'DELETE' });
      } catch (err) {
        console.warn('Error clearing backend cart', err);
      }
    }
    setItems([]);
    localStorage.removeItem('shopease_cart');
  };

  // Calculations
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = parseFloat(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );
  const discount = 0;
  // Free shipping over ₹499, else ₹99
  const shipping = subtotal > 499 || items.length === 0 ? 0 : 99;
  const tax = parseFloat((subtotal * 0.05).toFixed(2));
  const total = parseFloat((subtotal - discount + shipping + tax).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        loading,
        isDrawerOpen,
        openCartDrawer: () => setIsDrawerOpen(true),
        closeCartDrawer: () => setIsDrawerOpen(false),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;

