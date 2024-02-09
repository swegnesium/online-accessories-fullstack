import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const cleanPrice = (priceString) => {
    // Remove non-numeric characters (including '$' signs)
    return parseFloat(priceString.toString().replace(/[^0-9.]/g, ''));
  };
  
  const addToCart = (product) => {
    // Add item to cart
    setCart([...cart, product]);
  
    // Update total price when added
    setTotalPrice((prevTotalPrice) => prevTotalPrice + cleanPrice(product.price));
  };
  
  const removeFromCart = (product) => {
    // Remove the item from the cart
    const updatedCart = cart.filter((cartItem) => cartItem.id !== product.id);
  
    // Update the total price
    const newTotalPrice = updatedCart.reduce((acc, item) => acc + cleanPrice(item.price), 0);
    setTotalPrice(newTotalPrice);
  
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, totalPrice, addToCart, removeFromCart }}>
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