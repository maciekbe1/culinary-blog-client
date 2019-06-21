import { createContext } from "react";
import { isAuthenticated } from "./containers/isAuth";

const Context = createContext({
    isAuth: isAuthenticated().isAuth,
    login: isAuthenticated().login
});

export default Context;
