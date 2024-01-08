import { ReactElement, createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { AuthContextType, AuthType } from "../types";
import { router, useSegments } from "expo-router";

const KEY = "BAP_AUTH";

const getAuthFromStorage = async () => {
    const authFromStorage = await SecureStore.getItemAsync(KEY);
    if (authFromStorage) {
        return JSON.parse(authFromStorage);
    };
};

export const saveAuthToStorage = async (auth: AuthType) => {
    await SecureStore.setItemAsync(KEY, JSON.stringify(auth));
}

const removeAuthFromStorage = async () => {
    SecureStore.deleteItemAsync(KEY);
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children } : { children: ReactElement }) => {
    const [auth, setAuth] = useState<AuthType | null>(null);
    const segments = useSegments();

    useEffect(() => {
        getAuthFromStorage();
        if (auth) {
            saveAuthToStorage(auth);
            router.replace("/dashboard")
        } else {
            removeAuthFromStorage();
            router.replace("/")
        }
    }, [auth]);

    useEffect(() => {
        if(segments[0] === "(tabs)" && !auth) {
            router.replace("/")
        }
    }, [segments, auth])
    

    // handle logout
    const handleLogout = async () => {
        setAuth(null);
    };

    // handle login
    const handleLogin = (auth: AuthType) => {
        setAuth(auth);
    };

    // return
    return (
        <AuthContext.Provider value={{ auth, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const useUser = () => {
    const authContext = useAuthContext();
    return authContext?.auth?.user;
};

export const useUserLevel = () => {
    const user = useUser();
    return user?.userLevel;
};

export default AuthProvider;
