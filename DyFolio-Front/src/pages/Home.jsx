import { Link, useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { useState, useEffect } from 'react';
import { Code2, Palette, Zap, MapPin, ArrowRight, Briefcase, Award, Rocket } from 'lucide-react';
import PortfolioGreeting from '../components/PortfolioGreeting';
import { GET_PORTFOLIO } from '../graphql/queries/getPortfolio';

const GlassCard = ({ children, className = '', delay = 0 }) => (
  <div
    className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

const stats = [
  { icon: Briefcase, value: '50+', label: 'Projets livrés' },
  { icon: Award, value: '5+', label: "Années d'expérience" },
  { icon: Rocket, value: '20+', label: 'Technologies maîtrisées' },
];

const services = [
  {
    Icon: Code2,
    title: 'Développement Web',
    description: 'Applications modernes avec React, Next.js et TypeScript.',
  },
  {
    Icon: Palette,
    title: 'Design UI/UX',
    description: 'Interfaces intuitives alliant esthétisme et ergonomie.',
  },
  {
    Icon: Zap,
    title: 'Performance',
    description: 'Optimisations techniques pour des expériences rapides.',
  },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { username } = useParams();
  const basePath = username ? `/${username}` : '';
  const routeUsername = username?.trim() || undefined;
  const { data, loading, error } = useQuery(GET_PORTFOLIO, {
    fetchPolicy: 'network-only',
    variables: { username: routeUsername },
    skip: !username, // Ne pas exécuter la query si pas de username
  });

  // Si l'utilisateur n'existe pas, rediriger vers NotFound
  // Vérifier après le chargement et seulement si on a un username
  if (username && !loading) {
    const profil = data?.getPortfolio?.profil;
    
    // Si erreur GraphQL, pas de profil, ou profil complètement vide (utilisateur inexistant)
    if (error || !profil || (!profil.nom && !profil.prenom && !profil.metier && !profil.bio)) {
      return <Navigate to="/404" replace />;
    }
  }

  const buildPath = (suffix = '') => {
    if (!suffix) {
      return basePath || '/';
    }
    return `${basePath}${suffix}`;
  };

  const profil = data?.getPortfolio?.profil;
  const fullName = [profil?.prenom, profil?.nom].filter(Boolean).join(' ').trim();
  const jobTitle = profil?.metier?.trim() || 'Designer UI/UX et développeur créatif';
  const heroBio =
    profil?.bio?.trim() ||
    'Je conçois des expériences numériques élégantes, performantes et mémorables pour vos utilisateurs.';
  const localisation = profil?.localisation?.trim();
  const portraitSrc =
    profil?.photo;
  const socialLinks = Array.isArray(profil?.reseauxSociaux)
    ? profil.reseauxSociaux.filter(Boolean).slice(0, 3)
    : [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#030b15] via-[#051322] to-[#030b15] text-white">
      {/* Background Effects - Animated */}
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
      
      {/* Animated Grid Background */}
      <div className="pointer-events-none fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJiOWNmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />

      <div className="relative w-full"  style={{ paddingTop: '45px', paddingBottom: '150px' }}>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_400px]">
              <div className="space-y-6">
                {loading && !profil && (
                  <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-slate-400">
                    <div className="w-2 h-2 bg-[#6fe7ff] rounded-full animate-pulse"></div>
                    Chargement du profil...
                  </div>
                )}

                {error && (
                  <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 text-sm text-red-400">
                    Impossible de charger le profil
                  </div>
                )}

                {profil && <PortfolioGreeting profil={profil} />}

                <h1 className="text-6xl md:text-8xl font-medium leading-tight tracking-tight">
                  {fullName ? (
                    <>
                      Bonjour, je suis
                      <br />
                      <span className="bg-gradient-to-r from-[#6fe7ff] via-[#37c9ff] to-[#2b9cff] bg-clip-text text-transparent">
                        {fullName}
                      </span>
                    </>
                  ) : (
                    <>
                      Créons quelque chose
                      <br />
                      <span className="bg-gradient-to-r from-[#6fe7ff] via-[#37c9ff] to-[#2b9cff] bg-clip-text text-transparent">
                        d&apos;extraordinaire
                      </span>
                    </>
                  )}
                </h1>

                <p className="text-xl sm:text-2xl text-slate-200 font-medium">{jobTitle}</p>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">{heroBio}</p>

                {localisation && (
                  <div className="flex items-center gap-2 text-sm sm:text-base text-slate-400">
                    <MapPin className="w-5 h-5 text-[#37c9ff]" />
                    <span>{localisation}</span>
                  </div>
                )}

                {socialLinks.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link, index) => {
                      let label = link;
                      try {
                        const url = new URL(link);
                        label = url.hostname.replace(/^www\./, '');
                      } catch {
                        label = link.replace(/^https?:\/\//, '');
                      }

                      return (
                        <a
                          key={`${link}-${index}`}
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-5 py-2 text-sm sm:text-base text-slate-200 hover:bg-white/10 hover:border-[#2b9cff]/50 transition-all duration-300"
                        >
                          {label}
                        </a>
                      );
                    })}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    to={buildPath('/projets')}
                    className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#37c9ff] to-[#2b9cff] px-8 py-4 text-base font-semibold text-black shadow-2xl shadow-[#2b9cff]/50 transition-all hover:-translate-y-2 hover:shadow-[#2b9cff]/70"
                  >
                    Voir mes projets
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to={buildPath('/contact')}
                    className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-700 bg-slate-900/60 backdrop-blur px-8 py-4 text-base font-medium text-slate-200 transition-all hover:border-[#2b9cff]/50 hover:bg-slate-800/80"
                  >
                    Me contacter
                  </Link>
                </div>
              </div>

              <div className="w-full">
                <GlassCard className="overflow-hidden p-0 h-[500px]">
                  <img
                    src={portraitSrc}
                    alt={fullName ? `Portrait de ${fullName}` : 'Profile'}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-6">En quelques chiffres</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <GlassCard key={stat.label} className="text-center p-8" delay={index * 100}>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6fe7ff]/20 to-[#2b9cff]/20 mb-6">
                      <Icon className="w-8 h-8 text-[#6fe7ff]" />
                    </div>
                    <div className="text-5xl font-medium bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] bg-clip-text text-transparent mb-3">
                      {stat.value}
                    </div>
                    <div className="text-slate-300 text-base font-medium">{stat.label}</div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-6">Ce que je fais</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] mx-auto rounded-full mb-6"></div>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
                Excellence dans chaque étape du cycle de développement web
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {services.map((service, index) => {
                const Icon = service.Icon;
                return (
                  <GlassCard key={service.title} className="p-10 text-center" delay={index * 100}>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6fe7ff]/20 to-[#2b9cff]/20 mb-6">
                      <Icon className="w-8 h-8 text-[#6fe7ff]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-medium text-white mb-4">{service.title}</h3>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">{service.description}</p>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="fade-in-up relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-r from-[#0a1f33] via-[#082740] to-[#0b2f4b] p-10 text-center shadow-2xl shadow-black/40">
            <div className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#37c9ff]/20 blur-2xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-12 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#2b9cff]/20 blur-2xl" aria-hidden="true" />
            <div className="relative">
              <h4 className="text-xl font-semibold text-white md:text-2xl">Travaillons ensemble</h4>
              <p className="mx-auto mt-3 max-w-xl text-slate-300">
                Vous avez un projet en tête ? Prenons un café virtuel et bâtissons l’expérience numérique que vos utilisateurs attendent.
              </p>
              <Link
                to={buildPath('/contact')}
                className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] px-8 py-3 text-base font-semibold text-black shadow-lg shadow-[#2b9cff]/40 transition-transform hover:-translate-y-0.5"
              >
                Démarrer un projet
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
