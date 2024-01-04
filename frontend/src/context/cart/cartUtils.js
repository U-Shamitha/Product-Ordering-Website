// Function to add an item to the cart
export const addToCart = (cartProducts, setCartProducts, itemToAdd) => {
    const updatedCart = [...cartProducts, itemToAdd];
    localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
    setCartProducts(updatedCart);
  };
  
  // Function to remove an item from the cart
  export const removeFromCart = (cartProducts, setCartProducts, itemIdToRemove) => {
    const updatedCart = cartProducts.filter(item => item.id !== itemIdToRemove);
    localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
    setCartProducts(updatedCart);
  };