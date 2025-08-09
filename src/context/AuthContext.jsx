import { createContext, useContext, useState, useEffect } from "react";
import { api, authUtils } from "../services/api";

// Create context
const AuthContext = createContext();

// Roles can be: "patient", "doctor", "hospitalOwner", "staff"
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user details (name, role, token, etc.)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing authentication on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log('🔍 Checking auth with token:', token ? `${token.substring(0, 20)}...` : 'null');
        
        if (token && token !== 'undefined' && token !== 'null') {
          console.log('🔑 Token found, calling getMe');
          const response = await api.auth.getMe();
          console.log('✅ Auth check successful:', response);
          setUser(response.data.user);
        } else {
          console.log('❌ No valid token found');
        }
      } catch (err) {
        console.error('❌ Auth check failed:', err);
        console.log('🧹 Removing corrupted token');
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔐 Attempting login for:', email);
      const response = await api.auth.login({ email, password });
      console.log('✅ Login response:', response);
      
      // Store token
      console.log('💾 Storing token:', response.data.token ? `${response.data.token.substring(0, 20)}...` : 'null');
      authUtils.setToken(response.data.token);
      
      // Set user data
      console.log('👤 Setting user:', response.data.user);
      setUser(response.data.user);
      
      return response;
    } catch (err) {
      console.error('❌ Login failed:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.auth.register(userData);
      
      // Store token
      authUtils.setToken(response.data.token);
      
      // Set user data
      setUser(response.data.user);
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      authUtils.removeToken();
      setUser(null);
    }
  };

  // Check if user has required role
  const hasRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && authUtils.isAuthenticated();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error,
      login, 
      register,
      logout, 
      hasRole,
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
