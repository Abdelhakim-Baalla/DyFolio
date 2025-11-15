import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { useState, useEffect } from 'react';
import { ExternalLink, Github, Code2, Sparkles, Filter, Search } from 'lucide-react';
import { GET_PORTFOLIO } from '../graphql/queries/getPortfolio';

const GlassCard = ({ children, className = '', delay = 0 }) => (
  <div
    className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

export default function Projects() {
  const [scrollY, setScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompetence, setSelectedCompetence] = useState('all');

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

  const projets = data?.getPortfolio?.projets || [];
  const profil = data?.getPortfolio?.profil;
  const fullName = [profil?.prenom, profil?.nom].filter(Boolean).join(' ').trim();

  // Extraire toutes les compétences uniques
  const allCompetences = [...new Set(
    projets.flatMap(p => p.competences?.map(c => c.nom) || [])
  )].filter(Boolean);

  // Filtrer les projets
  const filteredProjets = projets.filter(projet => {
    const matchesSearch = projet.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         projet.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompetence = selectedCompetence === 'all' || 
                              projet.competences?.some(c => c.nom === selectedCompetence);
    return matchesSearch && matchesCompetence;
  });

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
                Projets
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
              Découvrez mes réalisations et explorez les technologies que j&apos;utilise pour créer des expériences exceptionnelles
            </p>

            {/* Search & Filter Bar */}
            <div className="max-w-4xl mx-auto">
              <GlassCard className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Rechercher un projet..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-[#2b9cff]/50 focus:bg-white/10 transition-all"
                    />
                  </div>

                  {/* Filter Dropdown */}
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <select
                      value={selectedCompetence}
                      onChange={(e) => setSelectedCompetence(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#2b9cff]/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="all" className="bg-[#051322]">Toutes les technologies</option>
                      {allCompetences.map(comp => (
                        <option key={comp} value={comp} className="bg-[#051322]">{comp}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                  <span>{filteredProjets.length} projet{filteredProjets.length !== 1 ? 's' : ''} trouvé{filteredProjets.length !== 1 ? 's' : ''}</span>
                  {(searchTerm || selectedCompetence !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCompetence('all');
                      }}
                      className="text-[#6fe7ff] hover:text-[#37c9ff] transition-colors"
                    >
                      Réinitialiser les filtres
                    </button>
                  )}
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="relative px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            {loading && (
              <div className="text-center py-20">
                <div className="inline-flex items-center gap-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-3">
                  <div className="w-3 h-3 bg-[#6fe7ff] rounded-full animate-pulse"></div>
                  <span className="text-slate-300">Chargement des projets...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center py-20">
                <div className="inline-flex items-center gap-3 backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-full px-6 py-3">
                  <span className="text-red-400">Impossible de charger les projets</span>
                </div>
              </div>
            )}

            {!loading && !error && filteredProjets.length === 0 && (
              <div className="text-center py-20">
                <Code2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-2xl font-medium text-slate-400 mb-2">Aucun projet trouvé</h3>
                <p className="text-slate-500">
                  {searchTerm || selectedCompetence !== 'all' 
                    ? 'Essayez de modifier vos critères de recherche' 
                    : 'Les projets seront bientôt disponibles'}
                </p>
              </div>
            )}

            {!loading && !error && filteredProjets.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjets.map((projet, index) => (
                  <GlassCard key={projet.id} className="overflow-hidden group" delay={index * 100}>
                    {/* Project Image */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#0a1f33] to-[#082740]">
                      {projet.image ? (
                        <img
                          src={projet.image}
                          alt={projet.titre}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Code2 className="w-16 h-16 text-slate-600" />
                        </div>
                      )}
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030b15] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-[#6fe7ff] transition-colors">
                        {projet.titre}
                      </h3>
                      
                      <p className="text-slate-300 text-base mb-4 line-clamp-3">
                        {projet.description}
                      </p>

                      {/* Competences Tags */}
                      {projet.competences && projet.competences.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {projet.competences.slice(0, 4).map((comp, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-xs font-medium bg-[#2b9cff]/10 border border-[#2b9cff]/30 text-[#6fe7ff] rounded-full"
                            >
                              {comp.nom}
                            </span>
                          ))}
                          {projet.competences.length > 4 && (
                            <span className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-400 rounded-full">
                              +{projet.competences.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {projet.lienDemo && (
                          <a
                            href={projet.lienDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#37c9ff] to-[#2b9cff] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#2b9cff]/50 transition-all hover:-translate-y-0.5"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm">Demo</span>
                          </a>
                        )}
                        {projet.lienCode && (
                          <a
                            href={projet.lienCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-slate-200 font-medium rounded-xl hover:bg-white/10 hover:border-[#2b9cff]/50 transition-all"
                          >
                            <Github className="w-4 h-4" />
                            <span className="text-sm">Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}