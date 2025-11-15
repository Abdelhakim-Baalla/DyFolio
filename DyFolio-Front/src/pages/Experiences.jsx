import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { useState, useEffect } from 'react';
import { Briefcase, Calendar, MapPin, Sparkles, Clock, Building2 } from 'lucide-react';
import { GET_PORTFOLIO } from '../graphql/queries/getPortfolio';

const GlassCard = ({ children, className = '', delay = 0 }) => (
  <div
    className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

const ExperienceCard = ({ experience, index, isLast }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Présent';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  };

  const calculateDuration = (start, end) => {
    if (!start) return '';
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                   (endDate.getMonth() - startDate.getMonth());
    
    if (months < 1) return '< 1 mois';
    if (months < 12) return `${months} mois`;
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths === 0) return `${years} an${years > 1 ? 's' : ''}`;
    return `${years} an${years > 1 ? 's' : ''} ${remainingMonths} mois`;
  };

  const duration = calculateDuration(experience.dateDebut, experience.dateFin);
  const isCurrentJob = !experience.dateFin;

  return (
    <div className="relative flex gap-8 group" style={{ animationDelay: `${index * 100}ms` }}>
      {/* Timeline Line */}
      <div className="relative flex flex-col items-center">
        {/* Circle */}
        <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6fe7ff]/20 to-[#2b9cff]/20 border-2 border-[#2b9cff]/50 backdrop-blur-xl group-hover:scale-110 group-hover:border-[#6fe7ff] transition-all duration-300">
          <Briefcase className="w-7 h-7 text-[#6fe7ff]" />
          {isCurrentJob && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#6fe7ff] rounded-full animate-pulse">
              <div className="absolute inset-0 bg-[#6fe7ff] rounded-full animate-ping"></div>
            </div>
          )}
        </div>
        
        {/* Vertical Line */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-[#2b9cff]/50 via-[#2b9cff]/20 to-transparent mt-4"></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-16">
        <GlassCard className="p-8 group-hover:-translate-y-2 group-hover:shadow-[#2b9cff]/20">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#6fe7ff] transition-colors">
                {experience.poste}
              </h3>
              <div className="flex items-center gap-2 text-lg text-slate-300 mb-3">
                <Building2 className="w-5 h-5 text-[#37c9ff]" />
                <span className="font-medium">{experience.entreprise}</span>
              </div>
            </div>

            {isCurrentJob && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6fe7ff]/20 to-[#2b9cff]/20 border border-[#6fe7ff]/40 text-[#6fe7ff] text-sm font-semibold rounded-full">
                <Clock className="w-4 h-4 animate-pulse" />
                En cours
              </span>
            )}
          </div>

          {/* Dates & Duration */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Calendar className="w-4 h-4 text-[#37c9ff]" />
              <span>
                {formatDate(experience.dateDebut)} - {formatDate(experience.dateFin)}
              </span>
            </div>
            {duration && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4 text-[#37c9ff]" />
                <span>{duration}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {experience.description && (
            <div className="text-base text-slate-300 leading-relaxed whitespace-pre-line">
              {experience.description}
            </div>
          )}

          {/* Decorative gradient bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2b9cff]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </GlassCard>
      </div>
    </div>
  );
};

export default function Experiences() {
  const [scrollY, setScrollY] = useState(0);

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

  const experiences = data?.getPortfolio?.experiences || [];
  const profil = data?.getPortfolio?.profil;
  const fullName = [profil?.prenom, profil?.nom].filter(Boolean).join(' ').trim();

  // Trier les expériences par date (plus récentes en premier)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = a.dateFin ? new Date(a.dateFin) : new Date();
    const dateB = b.dateFin ? new Date(b.dateFin) : new Date();
    return dateB - dateA;
  });

  // Statistiques
  const totalExperiences = experiences.length;
  const currentJobs = experiences.filter(e => !e.dateFin).length;
  const totalYears = experiences.reduce((total, exp) => {
    if (!exp.dateDebut) return total;
    const start = new Date(exp.dateDebut);
    const end = exp.dateFin ? new Date(exp.dateFin) : new Date();
    const years = (end - start) / (1000 * 60 * 60 * 24 * 365);
    return total + years;
  }, 0);

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
          <div className="max-w-5xl mx-auto text-center">

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium mb-6 tracking-tight">
              Mon{' '}
              <span className="bg-gradient-to-r from-[#6fe7ff] via-[#37c9ff] to-[#2b9cff] bg-clip-text text-transparent">
                Parcours
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
              Découvrez mon parcours professionnel et les expériences qui ont forgé mon expertise
            </p>

            {/* Stats Cards */}
            {!loading && experiences.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <GlassCard className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6fe7ff]/20 to-[#2b9cff]/20 mb-3">
                    <Briefcase className="w-6 h-6 text-[#6fe7ff]" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] bg-clip-text text-transparent mb-1">
                    {totalExperiences}
                  </div>
                  <div className="text-sm text-slate-400">Expérience{totalExperiences > 1 ? 's' : ''}</div>
                </GlassCard>

                <GlassCard className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6fe7ff]/20 to-[#2b9cff]/20 mb-3">
                    <Clock className="w-6 h-6 text-[#6fe7ff]" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] bg-clip-text text-transparent mb-1">
                    {Math.round(totalYears)}+
                  </div>
                  <div className="text-sm text-slate-400">Années d&apos;expérience</div>
                </GlassCard>

                <GlassCard className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6fe7ff]/20 to-[#2b9cff]/20 mb-3">
                    <Building2 className="w-6 h-6 text-[#6fe7ff]" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] bg-clip-text text-transparent mb-1">
                    {currentJobs > 0 ? currentJobs : '–'}
                  </div>
                  <div className="text-sm text-slate-400">Poste{currentJobs > 1 ? 's' : ''} actuel{currentJobs > 1 ? 's' : ''}</div>
                </GlassCard>
              </div>
            )}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="relative px-6 pb-20">
          <div className="max-w-5xl mx-auto">
            {loading && (
              <div className="text-center py-20">
                <div className="inline-flex items-center gap-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-3">
                  <div className="w-3 h-3 bg-[#6fe7ff] rounded-full animate-pulse"></div>
                  <span className="text-slate-300">Chargement des expériences...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center py-20">
                <div className="inline-flex items-center gap-3 backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-full px-6 py-3">
                  <span className="text-red-400">Impossible de charger les expériences</span>
                </div>
              </div>
            )}

            {!loading && !error && sortedExperiences.length === 0 && (
              <div className="text-center py-20">
                <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-2xl font-medium text-slate-400 mb-2">Aucune expérience</h3>
                <p className="text-slate-500">Les expériences seront bientôt disponibles</p>
              </div>
            )}

            {!loading && !error && sortedExperiences.length > 0 && (
              <div className="space-y-0">
                {sortedExperiences.map((experience, index) => (
                  <ExperienceCard
                    key={experience.id}
                    experience={experience}
                    index={index}
                    isLast={index === sortedExperiences.length - 1}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}