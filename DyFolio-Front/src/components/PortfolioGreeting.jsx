import { useQuery } from '@apollo/client/react';
import { GET_PORTFOLIO } from '../graphql/queries/getPortfolio';

export default function PortfolioGreeting() {
  const { data, loading, error } = useQuery(GET_PORTFOLIO, {
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return <span className="text-xs text-slate-400">Chargement du profil...</span>;
  }

  if (error) {
    console.error('Apollo Client error', error);
    return <span className="text-xs text-red-400">GraphQL indisponible pour le moment.</span>;
  }

  const profil = data?.getPortfolio?.profil;

  if (!profil) {
    return null;
  }

  const displayName = profil.prenom || profil.nom || 'sur DyFolio';

  return (
    <span className="text-xs text-slate-300">
      GraphQL connecté : bienvenue {displayName} !
    </span>
  );
}
