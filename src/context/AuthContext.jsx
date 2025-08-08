import { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext();

// Roles can be: "patient", "doctor", "hospitalOwner", "staff"
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user details (name, role, token, etc.)
  const [loading, setLoading] = useState(false);

  // Simulate login
  const login = (username, role) => {
    setLoading(true);
    setTimeout(() => {
      setUser({
        name: username,
        role: role,
        token: "sample-jwt-token",
      });
      setLoading(false);
    }, 1000);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Check if user has required role
  const hasRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
