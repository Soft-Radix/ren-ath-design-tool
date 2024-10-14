import React, { createContext, useState, useEffect } from "react";
import { getAdminLocalInfo, getUserLocalInfo } from "../utils/common";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const user = getUserLocalInfo();
    const admin = getAdminLocalInfo();
    setUser(user ?? null);
    setAdmin(admin ?? null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
