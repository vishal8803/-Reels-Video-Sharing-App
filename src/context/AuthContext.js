import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState("");

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    let unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);

  const store = {
    user,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={store}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
