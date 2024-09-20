import React, { createContext, useState, useEffect } from "react";
import { getUserLocalInfo } from "../utils/common";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getUserLocalInfo();
    setUser(user ?? null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
