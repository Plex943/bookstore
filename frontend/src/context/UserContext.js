import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({children}) {
    const { authenticated, admin, register, login, logout } = useAuth()

    return <Context.Provider value={{ authenticated, admin, register, login , logout}}>{children}</Context.Provider>
}

export { Context, UserProvider }