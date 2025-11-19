import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { router } from './routes';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { apolloClient } from './graphql/apolloClient';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>
);
