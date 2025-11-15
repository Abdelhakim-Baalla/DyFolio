import { Navigate, useLocation, useParams } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const { username } = useParams();
  const loginPath = username ? `/${username}/login` : '/login';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirige vers la page de login en sauvegardant la route demandée
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  return children;
}
