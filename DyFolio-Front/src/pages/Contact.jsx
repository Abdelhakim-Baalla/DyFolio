import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { useState, useEffect } from 'react';
import { Mail, User, MessageSquare, Send, Sparkles, MapPin, Phone, Linkedin, Github, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import { GET_PORTFOLIO } from '../graphql/queries/getPortfolio';

const GlassCard = ({ children, className = '', delay = 0 }) => (
  <div
    className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

export default function Contact() {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

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

  const profil = data?.getPortfolio?.profil;
  const fullName = [profil?.prenom, profil?.nom].filter(Boolean).join(' ').trim();


  const userLocation = profil?.localisation?.trim();
  
  // Construire les infos de contact dynamiquement
  const contactInfo = [
    userLocation && {
      icon: MapPin,
      label: 'Localisation',
      value: userLocation,
      href: null
    }
  ].filter(Boolean);

  // Extraire et parser les réseaux sociaux
  const socialLinks = (profil?.reseauxSociaux || [])
    .filter(Boolean)
    .map(link => {
      const url = link.trim();
      let icon = Globe;
      let name = 'Site web';
      let color = 'from-[#6fe7ff] to-[#2b9cff]';

      // Détecter le type de réseau social
      if (url.toLowerCase().includes('linkedin')) {
        icon = Linkedin;
        name = 'LinkedIn';
        color = 'from-blue-400 to-blue-600';
      } else if (url.toLowerCase().includes('github')) {
        icon = Github;
        name = 'GitHub';
        color = 'from-gray-400 to-gray-600';
      } else if (url.toLowerCase().includes('twitter') || url.toLowerCase().includes('x.com')) {
        icon = Globe;
        name = 'Twitter/X';
        color = 'from-slate-400 to-slate-600';
      } else if (url.toLowerCase().includes('facebook')) {
        icon = Globe;
        name = 'Facebook';
        color = 'from-blue-500 to-blue-700';
      } else if (url.toLowerCase().includes('instagram')) {
        icon = Globe;
        name = 'Instagram';
        color = 'from-pink-400 to-purple-600';
      }

      return { icon, name, href: url, color };
    });

  // Validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    } else if (formData.nom.trim().length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simuler l'envoi (remplacer par votre API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Succès
      setSubmitStatus('success');
      setFormData({ nom: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (err) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <section className="relative px-6 pb-20">
          <div className="max-w-6xl mx-auto text-center">

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mb-8 tracking-tight leading-tight">
              Contactez{' '}
              <span className="bg-gradient-to-r from-[#6fe7ff] via-[#37c9ff] to-[#2b9cff] bg-clip-text text-transparent">
                {fullName || 'moi'}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Une question ? Un projet en tête ? N&apos;hésitez pas à me contacter, je vous répondrai dans les plus brefs délais
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="relative px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Contact Info - Left Side */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Cards */}
                {contactInfo.length > 0 ? (
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      const content = (
                        <GlassCard 
                          key={index} 
                          className="p-6 group hover:-translate-y-2 cursor-pointer"
                          delay={index * 100}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6fe7ff]/20 to-[#2b9cff]/20 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#2b9cff]/20">
                              <Icon className="w-7 h-7 text-[#6fe7ff]" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-400 mb-1">{info.label}</p>
                              <p className="text-base font-semibold text-white group-hover:text-[#6fe7ff] transition-colors break-words">
                                {info.value}
                              </p>
                            </div>
                          </div>
                        </GlassCard>
                      );

                      return info.href ? (
                        <a key={index} href={info.href} className="block">
                          {content}
                        </a>
                      ) : content;
                    })}
                  </div>
                ) : (
                  <GlassCard className="p-8">
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6fe7ff]/20 to-[#2b9cff]/20 mx-auto">
                        <MapPin className="w-8 h-8 text-[#6fe7ff]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Informations de localisation</h3>
                        <p className="text-sm text-slate-400">
                          Utilisez le formulaire ci-contre pour me contacter directement.
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                )}

                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <GlassCard className="p-8">
                    <h3 className="text-xl font-semibold text-white mb-6">Retrouvez-moi sur</h3>
                    <div className="space-y-3">
                      {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#2b9cff]/50 transition-all duration-300 group"
                          >
                            <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${social.color} group-hover:scale-110 transition-transform duration-300`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-base font-medium text-slate-300 group-hover:text-white transition-colors">
                              {social.name}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </GlassCard>
                )}
              </div>

              {/* Contact Form - Right Side */}
              <div className="lg:col-span-3">
                <GlassCard className="p-8 md:p-10">
                  <h2 className="text-3xl font-bold text-white mb-8">Envoyez-moi un message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nom */}
                    <div>
                      <label htmlFor="nom" className="block text-sm font-medium text-slate-300 mb-2">
                        Nom complet *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          id="nom"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-4 bg-white/5 border ${errors.nom ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-[#2b9cff]/50 focus:bg-white/10 transition-all`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.nom && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.nom}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-4 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-[#2b9cff]/50 focus:bg-white/10 transition-all`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                        Message *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-slate-400" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="6"
                          className={`w-full pl-12 pr-4 py-4 bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-[#2b9cff]/50 focus:bg-white/10 transition-all resize-none`}
                          placeholder="Votre message..."
                        />
                      </div>
                      {errors.message && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#37c9ff] to-[#2b9cff] text-black font-bold text-lg rounded-2xl shadow-xl shadow-[#2b9cff]/50 hover:shadow-2xl hover:shadow-[#2b9cff]/70 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Envoyer le message</span>
                        </>
                      )}
                    </button>

                    {/* Success/Error Messages */}
                    {submitStatus === 'success' && (
                      <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <p className="text-sm text-green-400">Message envoyé avec succès ! Je vous répondrai bientôt.</p>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <p className="text-sm text-red-400">Une erreur est survenue. Veuillez réessayer.</p>
                      </div>
                    )}
                  </form>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}