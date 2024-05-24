import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";

export const AuthContext = createContext();

// provides user object to all pages
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [user])

  useEffect(() => {
    // observe change
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null)
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={[user, loading]}>
      {children}
    </AuthContext.Provider>
  );
};