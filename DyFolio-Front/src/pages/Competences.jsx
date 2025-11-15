import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { useState, useEffect } from 'react';
import { Code2, Sparkles, Award, TrendingUp, Filter } from 'lucide-react';
import { GET_PORTFOLIO } from '../graphql/queries/getPortfolio';

const GlassCard = ({ children, className = '', delay = 0 }) => (
  <div
    className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

const SkillBadge = ({ skill, index }) => {
  const niveau = skill.niveau || 0;
  const pourcentage = Math.min(100, Math.max(0, niveau));
  
  return (
    <GlassCard className="p-6 group hover:-translate-y-2" delay={index * 50}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-[#6fe7ff] transition-colors">
            {skill.nom}
          </h3>
          {skill.categorie && (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-[#2b9cff]/10 border border-[#2b9cff]/30 text-[#6fe7ff] rounded-full">
              {skill.categorie.nom}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-5 h-5 text-[#6fe7ff]" />
          <span className="text-2xl font-bold bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] bg-clip-text text-transparent">
            {pourcentage}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#6fe7ff] via-[#37c9ff] to-[#2b9cff] rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${pourcentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>

      {/* Niveau description */}
      <div className="mt-3 text-sm text-slate-400">
        {pourcentage >= 90 && <span><Award className="w-4 h-4 inline mr-1" /> Expert</span>}
        {pourcentage >= 70 && pourcentage < 90 && <span><TrendingUp className="w-4 h-4 inline mr-1" /> Avancé</span>}
        {pourcentage >= 50 && pourcentage < 70 && <span><Sparkles className="w-4 h-4 inline mr-1" /> Intermédiaire</span>}
        {pourcentage < 50 && <span><Code2 className="w-4 h-4 inline mr-1" /> Débutant</span>}
      </div>
    </GlassCard>
  );
};

export default function Competences() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategorie, setSelectedCategorie] = useState('all');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { username } = useParams();
  const routeUsername = username?.trim() || undefined;
  
  const { data, loading, error } = useQuery(GET_PORTFOLIO, {
    fetchPolicy: 'network-only',
    variables: { username: routeUsername },
    skip: !username,
  });

  // Redirection si l'utilisateur n'existe pas
  if (username && !loading) {
    const profil = data?.getPortfolio?.profil;
    if (error || !profil || (!profil.nom && !profil.prenom && !profil.metier && !profil.bio)) {
      return <Navigate to="/404" replace />;
    }
  }

  const competences = data?.getPortfolio?.competences || [];
  const profil = data?.getPortfolio?.profil;
  const fullName = [profil?.prenom, profil?.nom].filter(Boolean).join(' ').trim();

  // Extraire toutes les catégories uniques
  const categories = [...new Set(
    competences.map(c => c.categorie?.nom).filter(Boolean)
  )];

  // Filtrer les compétences par catégorie
  const filteredCompetences = selectedCategorie === 'all'
    ? competences
    : competences.filter(c => c.categorie?.nom === selectedCategorie);

  // Grouper par catégorie pour l'affichage
  const competencesParCategorie = categories.reduce((acc, cat) => {
    acc[cat] = filteredCompetences.filter(c => c.categorie?.nom === cat);
    return acc;
  }, {});

  // Compétences sans catégorie
  const competencesSansCategorie = filteredCompetences.filter(c => !c.categorie);

  // Statistiques
  const niveauMoyen = competences.length > 0
    ? Math.round(competences.reduce((sum, c) => sum + (c.niveau || 0), 0) / competences.length)
    : 0;
  const expertises = competences.filter(c => c.niveau >= 90).length;
  const enApprentissage = competences.filter(c => c.niveau < 50).length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#030b15] via-[#051322] to-[#030b15] text-white">
      {/* Background Effects */}
      <div 
        className="pointer-events-none fixed -left-24 top-32 h-96 w-96 rounded-full bg-[#2b9cff]/20 blur-3xl transition-transform duration-1000"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      <div 
        className="pointer-events-none fixed -right-16 top-0 h-96 w-96 rounded-full bg-[#144c75]/30 blur-3xl transition-transform duration-1000"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      />
      <div 
        className="pointer-events-none fixed bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#6fe7ff]/10 blur-3xl transition-transform duration-1000"
        style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
      />
      
      {/* Grid Background */}
      <div className="pointer-events-none fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJiOWNmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />

      <div className="relative w-full" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
        {/* Hero Section */}
        <section className="relative px-6 pb-16">
          <div className="max-w-6xl mx-auto text-center">

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium mb-6 tracking-tight">
              Mes{' '}
              <span className="bg-gradient-to-r from-[#6fe7ff] via-[#37c9ff] to-[#2b9cff] bg-clip-text text-transparent">
                Compétences
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
              Découvrez mon expertise technique et les technologies que je maîtrise pour donner vie à vos projets
            </p>

            {/* Stats Cards */}
            {!loading && competences.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <GlassCard className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6fe7ff]/20 to-[#2b9cff]/20 mb-3">
                    <Code2 className="w-6 h-6 text-[#6fe7ff]" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] bg-clip-text text-transparent mb-1">
                    {competences.length}
                  </div>
                  <div className="text-sm text-slate-400">Technologies</div>
                </GlassCard>

                <GlassCard className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6fe7ff]/20 to-[#2b9cff]/20 mb-3">
                    <Award className="w-6 h-6 text-[#6fe7ff]" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] bg-clip-text text-transparent mb-1">
                    {expertises}
                  </div>
                  <div className="text-sm text-slate-400">Expertises</div>
                </GlassCard>

                <GlassCard className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6fe7ff]/20 to-[#2b9cff]/20 mb-3">
                    <TrendingUp className="w-6 h-6 text-[#6fe7ff]" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] bg-clip-text text-transparent mb-1">
                    {niveauMoyen}%
                  </div>
                  <div className="text-sm text-slate-400">Niveau moyen</div>
                </GlassCard>
              </div>
            )}

            {/* Filter */}
            {categories.length > 0 && (
              <div className="max-w-md mx-auto">
                <GlassCard className="p-4">
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <select
                      value={selectedCategorie}
                      onChange={(e) => setSelectedCategorie(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#2b9cff]/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="all" className="bg-[#051322]">Toutes les catégories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-[#051322]">{cat}</option>
                      ))}
                    </select>
                  </div>
                </GlassCard>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section className="relative px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            {loading && (
              <div className="text-center py-20">
                <div className="inline-flex items-center gap-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-3">
                  <div className="w-3 h-3 bg-[#6fe7ff] rounded-full animate-pulse"></div>
                  <span className="text-slate-300">Chargement des compétences...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center py-20">
                <div className="inline-flex items-center gap-3 backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-full px-6 py-3">
                  <span className="text-red-400">Impossible de charger les compétences</span>
                </div>
              </div>
            )}

            {!loading && !error && filteredCompetences.length === 0 && (
              <div className="text-center py-20">
                <Code2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-2xl font-medium text-slate-400 mb-2">Aucune compétence trouvée</h3>
                <p className="text-slate-500">Les compétences seront bientôt disponibles</p>
              </div>
            )}

            {!loading && !error && filteredCompetences.length > 0 && (
              <div className="space-y-12">
                {/* Par catégorie */}
                {Object.entries(competencesParCategorie).map(([categorie, skills]) => (
                  skills.length > 0 && (
                    <div key={categorie}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <h2 className="text-2xl font-semibold text-white px-4">
                          {categorie}
                        </h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill, index) => (
                          <SkillBadge key={skill.id} skill={skill} index={index} />
                        ))}
                      </div>
                    </div>
                  )
                ))}

                {/* Sans catégorie */}
                {competencesSansCategorie.length > 0 && (
                  <div>
                    {categories.length > 0 && (
                      <>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                          <h2 className="text-2xl font-semibold text-white px-4">
                            Autres compétences
                          </h2>
                          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        </div>
                      </>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {competencesSansCategorie.map((skill, index) => (
                        <SkillBadge key={skill.id} skill={skill} index={index} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}