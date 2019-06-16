import { createContext } from "react";

const Context = createContext({
    isAuth: false,
    token: null,
    login: null
});

export default Context;
