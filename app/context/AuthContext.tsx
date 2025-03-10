import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UsuarioAuth } from '../../backEnd/interfaces';
import ApiCaller from '../../backEnd/apiCaller';

const apiCaller = new ApiCaller();

// Add token to the auth state
interface AuthState {
  isAuthenticated: boolean;
  user: UsuarioAuth | null;
  token: string | null;
}

interface AuthContextType extends AuthState {
  login: (credentials: { login: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  token: null,
  login: async () => false,
  logout: async () => {},
  loading: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedToken && storedUser) {
        setAuthState({
          isAuthenticated: true,
          token: storedToken,
          user: JSON.parse(storedUser),
        });
      }
    } catch (error) {
      console.error('Error checking token:', error);
      await logout();
    }
  };

  const login = async (credentials: { login: string; password: string }) => {
    try {
      console.log("login", credentials);
      setLoading(true);
      const response = await apiCaller.authMethods.loginUser(
        credentials,
        '' // Initial token not needed for login
      );

      if (response && response.token) {
        // Store both token and user data
        await AsyncStorage.setItem('token', response.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.user));

        setAuthState({
          isAuthenticated: true,
          token: response.token,
          user: response.user,
        });

        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['token', 'user']);
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...authState,
        login, 
        logout, 
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 