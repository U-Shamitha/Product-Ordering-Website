import { createContext } from "react";

const authContext = createContext({
  authenticated: false,
  setAuthenticated: (auth) => {}
});

export default authContext;