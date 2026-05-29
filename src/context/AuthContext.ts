import { createContext } from "react";


const AuthContext = createContext({
    user: null,
    isLoading: false,
    isLoggedIn: false,
    isReady: false,
    login: async (response: unknown) => {},
    logout: async () => {},

})

export default AuthContext;