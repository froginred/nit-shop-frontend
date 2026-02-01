import React, { createContext, useEffect, useState } from "react";
import { fetchCurrentUser, clearAuthHeaders, setAuthHeaders } from "../services/ApiService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isRequestToGetCurrentUserDone, setIsRequestToGetCurrentUserDone] = useState(false);

    const updateCurrentUserContext = (user) => {
        setCurrentUser(user);
    };

    const logout = () => {
        clearAuthHeaders();
        setCurrentUser(null);
    };

    // on site load: if token exists then load user
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsRequestToGetCurrentUserDone(true);
            return;
        }

        setAuthHeaders(token);
        fetchCurrentUser()
            .then((res) => setCurrentUser(res.data))
            .catch(() => {
                // token invalid/expired → clean
                clearAuthHeaders();
                setCurrentUser(null);
            })
            .finally(() => setIsRequestToGetCurrentUserDone(true));
    }, []);

    return (
        <UserContext.Provider
            value={{
                currentUser,
                updateCurrentUserContext,
                isRequestToGetCurrentUserDone,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
