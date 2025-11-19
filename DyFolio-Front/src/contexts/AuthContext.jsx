import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '../graphql/mutations/auth';
import { apolloClient } from '../graphql/apolloClient';

const AuthContext = createContext(null);
const STORAGE_KEY = 'dyfolio_auth';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setToken(parsed.token ?? null);
        setUser(parsed.user ?? null);
      }
    } catch (error) {
      console.error('Impossible de charger les informations de session', error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const persistAuth = useCallback((nextToken, nextUser) => {
    if (nextToken && nextUser) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          token: nextToken,
          user: nextUser,
        })
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = useCallback(async ({ identifier, password }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          username: identifier,
          password,
        },
      });

      const payload = data?.login;
      if (!payload?.token || !payload?.user) {
        throw new Error('Réponse de connexion invalide');
      }

      setToken(payload.token);
      setUser(payload.user);
      persistAuth(payload.token, payload.user);
      return payload;
    } catch (error) {
      const graphQLError = error?.graphQLErrors?.[0]?.message;
      throw new Error(graphQLError || error?.message || 'Connexion impossible, veuillez réessayer');
    }
  }, [persistAuth]);

  const register = useCallback(async (input) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: REGISTER_MUTATION,
        variables: { input },
      });

      const payload = data?.register;
      if (!payload?.token || !payload?.user) {
        throw new Error('Réponse d\'inscription invalide');
      }

      setToken(payload.token);
      setUser(payload.user);
      persistAuth(payload.token, payload.user);
      return payload;
    } catch (error) {
      const graphQLError = error?.graphQLErrors?.[0]?.message;
      throw new Error(graphQLError || error?.message || 'Inscription impossible, veuillez réessayer');
    }
  }, [persistAuth]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    persistAuth(null, null);
  }, [persistAuth]);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
    }),
    [loading, login, logout, register, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}

