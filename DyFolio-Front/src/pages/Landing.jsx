import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Code2, Sparkles, Zap, Shield, BarChart3, Globe, Rocket, Palette, Lock, Smartphone, MessageCircle, TrendingUp, Eye, Edit3 } from 'lucide-react';

const GlassCard = ({ children, className = '', delay = 0 }) => (
  <div
    className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

export default function Landing() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      <div className="relative w-full">

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-25">
          <div className="max-w-6xl mx-auto text-center w-full">
            <h1 className="text-7xl md:text-9xl font-small leading-tight tracking-tight mb-10">
              Créez votre
              <br />
              <span className="bg-gradient-to-r from-[#6fe7ff] via-[#37c9ff] to-[#2b9cff] bg-clip-text text-transparent">
                Portfolio Parfait
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-14 px-4">
              Une plateforme moderne pour présenter vos compétences, expériences et projets avec style et professionnalisme.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
              <Link
                to="/register"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#37c9ff] to-[#2b9cff] px-8 py-2 text-lg font-medium text-black shadow-2xl shadow-[#2b9cff]/50 transition-all hover:-translate-y-2 hover:shadow-[#2b9cff]/70"
              >
                Commencer gratuitement
                <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="#fonctionnalites"
                className="inline-flex items-center gap-3 rounded-2xl border-2 border-slate-700 bg-slate-900/60 px-8 py-2 text-lg font-medium text-slate-200 backdrop-blur transition-all hover:border-[#2b9cff]/50 hover:bg-slate-800/80"
              >
                Découvrir
              </a>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto mt-24 px-4">
              <GlassCard className="text-center p-5">
                <div className="text-5xl font-medium bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] bg-clip-text text-transparent mb-3">
                  100+
                </div>
                <div className="text-slate-300 text-base font-medium">Portfolios créés</div>
              </GlassCard>
              <GlassCard className="text-center p-5" delay={100}>
                <div className="text-5xl font-medium bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] bg-clip-text text-transparent mb-3">
                  5min
                </div>
                <div className="text-slate-300 text-base font-medium">Pour démarrer</div>
              </GlassCard>
              <GlassCard className="text-center p-5" delay={200}>
                <div className="text-5xl font-medium bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] bg-clip-text text-transparent mb-3">
                  100%
                </div>
                <div className="text-slate-300 text-base font-medium">Gratuit</div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="fonctionnalites" className="relative py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-white mb-6">Fonctionnalités Puissantes</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] mx-auto rounded-full mb-6"></div>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-400 max-w-2xl mx-auto px-4">
                Tous les outils dont vous avez besoin pour créer un portfolio professionnel
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
              {[
                {
                  Icon: Code2,
                  title: 'URL Personnalisée',
                  description: 'Votre propre lien unique pour partager votre portfolio partout.',
                },
                {
                  Icon: Zap,
                  title: 'Temps Réel',
                  description: 'Mises à jour instantanées avec GraphQL et Apollo Client.',
                },
                {
                  Icon: Sparkles,
                  title: 'Design Premium',
                  description: 'Interface moderne et élégante qui impressionne.',
                },
                {
                  Icon: Shield,
                  title: 'Ultra Sécurisé',
                  description: 'Protection JWT et chiffrement de vos données.',
                },
                {
                  Icon: BarChart3,
                  title: 'Gestion Facile',
                  description: 'Dashboard intuitif pour gérer tout votre contenu.',
                },
                {
                  Icon: Globe,
                  title: 'Production Ready',
                  description: 'Infrastructure Docker avec CI/CD automatisé.',
                },
              ].map((feature, index) => (
                <GlassCard key={feature.title} className="p-10" delay={index * 100}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6fe7ff]/20 to-[#2b9cff]/20 mb-6">
                      <feature.Icon className="w-8 h-8 text-[#6fe7ff]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-medium text-white mb-4">{feature.title}</h3>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">{feature.description}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section id="avantages" className="relative py-32 px-6 bg-gradient-to-b from-transparent via-[#051322]/50 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-white mb-6">Pourquoi DyFolio ?</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] mx-auto rounded-full mb-6"></div>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-400 max-w-2xl mx-auto px-4">
                La solution complète pour créer un portfolio qui fait la différence
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center px-4">
              {/* Colonne gauche - Avantages */}
              <div className="space-y-6">
                {[
                  {
                    Icon: Rocket,
                    title: 'Interface Intuitive',
                    description: 'Créez et gérez votre portfolio en quelques clics, sans compétences techniques. Notre éditeur visuel rend tout simple et rapide.',
                  },
                  {
                    Icon: Palette,
                    title: 'Personnalisation Complète',
                    description: 'Adaptez chaque élément à votre image de marque personnelle. Couleurs, typographies, layouts - tout est personnalisable.',
                  },
                  {
                    Icon: Zap,
                    title: 'Performance Optimale',
                    description: 'Temps de chargement ultra-rapide pour une expérience utilisateur parfaite. Optimisé pour le SEO et les performances.',
                  },
                  {
                    Icon: Lock,
                    title: 'Sécurité Avancée',
                    description: 'Protection JWT, chiffrement des données et sauvegardes automatiques pour garantir la sécurité de vos informations.',
                  },
                  {
                    Icon: Smartphone,
                    title: 'Responsive Design',
                    description: 'Votre portfolio s\'adapte automatiquement à tous les écrans : mobile, tablette et desktop pour une expérience optimale.',
                  },
                  {
                    Icon: MessageCircle,
                    title: 'Support Réactif',
                    description: 'Une équipe dédiée pour vous accompagner dans votre réussite. Réponses rapides et solutions efficaces à vos questions.',
                  },
                ].map((advantage, index) => {
                  const Icon = advantage.Icon;
                  return (
                    <GlassCard key={advantage.title} className="flex gap-5 p-6 hover:scale-[1.02] transition-transform" delay={index * 100}>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6fe7ff]/20 to-[#2b9cff]/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#6fe7ff]" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-medium text-white mb-2">{advantage.title}</h3>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{advantage.description}</p>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>

              {/* Colonne droite - Mockup du Dashboard */}
              <div className="space-y-6">
                <GlassCard className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-medium text-white">Tableau de Bord</h3>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="backdrop-blur-sm bg-gradient-to-br from-[#6fe7ff]/10 to-[#2b9cff]/10 border border-white/10 rounded-2xl p-4">
                      <div className="text-xs sm:text-sm text-slate-400 mb-1">Vues totales</div>
                      <div className="text-2xl sm:text-3xl font-medium text-white">2,847</div>
                      <div className="text-xs sm:text-sm text-green-400 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        12.5%
                      </div>
                    </div>
                    <div className="backdrop-blur-sm bg-gradient-to-br from-[#6fe7ff]/10 to-[#2b9cff]/10 border border-white/10 rounded-2xl p-4">
                      <div className="text-xs sm:text-sm text-slate-400 mb-1">Projets</div>
                      <div className="text-2xl sm:text-3xl font-medium text-white">24</div>
                      <div className="text-xs sm:text-sm text-green-400 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        3 nouveaux
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    <div className="text-sm sm:text-base font-medium text-slate-300 mb-3">Activité récente</div>
                    {[
                      { Icon: BarChart3, text: 'Nouveau projet ajouté', time: '2h' },
                      { Icon: Eye, text: '125 nouvelles vues', time: '5h' },
                      { Icon: Edit3, text: 'Profil mis à jour', time: '1j' },
                    ].map((activity, i) => {
                      const ActivityIcon = activity.Icon;
                      return (
                        <div key={i} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6fe7ff] to-[#2b9cff] flex items-center justify-center">
                            <ActivityIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm sm:text-base text-white font-medium">{activity.text}</div>
                            <div className="text-xs sm:text-sm text-slate-400">Il y a {activity.time}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section id="technologies" className="relative py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-white mb-6">Stack Technique Moderne</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] mx-auto rounded-full mb-6"></div>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-400 max-w-2xl mx-auto px-4">
                Propulsé par les technologies les plus avancées du marché
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-4">
              {['React', 'Node.js', 'GraphQL', 'MongoDB', 'TypeScript', 'Tailwind', 'Docker', 'JWT'].map((tech, index) => (
                <GlassCard key={tech} className="p-8 text-center" delay={index * 50}>
                  <div className="text-lg sm:text-xl font-medium text-white">{tech}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="inscription" className="relative py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <GlassCard className="p-12 sm:p-16 lg:p-20 text-center relative overflow-hidden">
              <div className="absolute top-10 right-10 w-40 h-40 bg-[#6fe7ff]/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#2b9cff]/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-white mb-8">
                  Prêt à briller ?
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed px-4">
                  Rejoignez des centaines de professionnels qui ont déjà créé leur portfolio avec DyFolio. 
                  <span className="text-[#6fe7ff] font-medium"> C'est gratuit, rapide et sans engagement !</span>
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
                  <Link
                    to="/register"
                    className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] px-12 py-5 text-lg font-bold text-black shadow-2xl shadow-[#2b9cff]/60 transition-all hover:-translate-y-2 hover:shadow-[#2b9cff]/80"
                  >
                    Créer mon portfolio
                    <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-3 rounded-2xl border-2 border-slate-600 bg-slate-900/70 px-12 py-5 text-lg font-bold text-slate-200 backdrop-blur transition-all hover:border-slate-500 hover:bg-slate-800/90"
                  >
                    Se connecter
                  </Link>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-slate-400 text-sm px-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Sans carte bancaire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>100% gratuit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Prêt en 5 minutes</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </div>
    </main>
  );
}
