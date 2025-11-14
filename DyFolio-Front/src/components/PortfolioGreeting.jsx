export default function PortfolioGreeting({ profil }) {
  if (!profil) {
    return null;
  }

  const displayName = [profil.prenom, profil.nom]
    .filter(Boolean)
    .join(' ')
    .trim() || 'sur DyFolio';

  return (
    <span className="text-sm text-slate-300">
      Bienvenue {displayName} !
    </span>
  );
}
