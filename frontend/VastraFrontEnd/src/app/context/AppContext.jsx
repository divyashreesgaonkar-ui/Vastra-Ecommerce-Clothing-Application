import React, { createContext, useContext, useState } from 'react';

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);         // Array of cart items
  const [wishlist, setWishlist] = useState([]); // Array of products
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Add product to cart
  const addToCart = (product, size, color, quantity) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Update cart item quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Add product to wishlist
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  // Login function
  const login = (admin = false) => {
    setIsAuthenticated(true);
    setIsAdmin(admin);
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCart([]);
    setWishlist([]);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        isAuthenticated,
        isAdmin,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
