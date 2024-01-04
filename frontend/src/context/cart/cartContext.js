import { createContext } from "react";

const cartContext = createContext({
  cartProducts: [],
  setCartProducts: (cartProducts) => {}
});

export default cartContext;