import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    nom: '',
    prenom: '',
    metier: '',
    email: '',
    motDePasse: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { register: registerUser } = useAuth();
  const { username } = useParams();
  const basePath = username ? `/${username}` : '';
  const buildPath = (suffix = '') => {
    if (!suffix) {
      return basePath || '/';
    }
    return `${basePath}${suffix}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.motDePasse !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setSubmitting(true);
    try {
      await registerUser({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.motDePasse,
        nom: formData.nom.trim(),
        prenom: formData.prenom.trim(),
        metier: formData.metier.trim() || 'Administrateur',
      });
      const redirectPath = location.state?.from?.pathname ?? buildPath('/admin');
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b15] text-white flex w-full justify-center items-center py-12">
      <div className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-[#2b9cff]/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 top-0 h-80 w-80 rounded-full bg-[#144c75]/30 blur-3xl" aria-hidden="true" />
      
      <div className="relative w-full max-w-md mx-auto px-6">
        <div className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-[#081a2c]/90 via-[#051322]/90 to-[#0a1e32]/80 p-8 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-white mb-2">Inscription</h1>
            <p className="text-slate-400">Créez votre compte DyFolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-700/70 bg-[#061728]/60 text-white placeholder-slate-400 focus:border-[#2b9cff] focus:outline-none focus:ring-2 focus:ring-[#2b9cff]/20"
                  placeholder="admin-dyfolio"
                />
              </div>
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-slate-300 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-700/70 bg-[#061728]/60 text-white placeholder-slate-400 focus:border-[#2b9cff] focus:outline-none focus:ring-2 focus:ring-[#2b9cff]/20"
                  placeholder="Jean"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-slate-300 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-700/70 bg-[#061728]/60 text-white placeholder-slate-400 focus:border-[#2b9cff] focus:outline-none focus:ring-2 focus:ring-[#2b9cff]/20"
                  placeholder="Dupont"
                />
              </div>
              <div>
                <label htmlFor="metier" className="block text-sm font-medium text-slate-300 mb-2">
                  Métier
                </label>
                <input
                  type="text"
                  id="metier"
                  name="metier"
                  value={formData.metier}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-700/70 bg-[#061728]/60 text-white placeholder-slate-400 focus:border-[#2b9cff] focus:outline-none focus:ring-2 focus:ring-[#2b9cff]/20"
                  placeholder="Administrateur"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-700/70 bg-[#061728]/60 text-white placeholder-slate-400 focus:border-[#2b9cff] focus:outline-none focus:ring-2 focus:ring-[#2b9cff]/20"
                placeholder="jean.dupont@email.com"
              />
            </div>

            <div>
              <label htmlFor="motDePasse" className="block text-sm font-medium text-slate-300 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="motDePasse"
                name="motDePasse"
                value={formData.motDePasse}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-700/70 bg-[#061728]/60 text-white placeholder-slate-400 focus:border-[#2b9cff] focus:outline-none focus:ring-2 focus:ring-[#2b9cff]/20"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-700/70 bg-[#061728]/60 text-white placeholder-slate-400 focus:border-[#2b9cff] focus:outline-none focus:ring-2 focus:ring-[#2b9cff]/20"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-950/40 border border-red-500/30 rounded-lg p-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-gradient-to-r from-[#37c9ff] to-[#2b9cff] px-6 py-3 text-base font-semibold text-black shadow-lg shadow-[#2b9cff]/30 transition-transform hover:-translate-y-0.5 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Inscription...' : "S'inscrire"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Déjà un compte ?{' '}
              <Link
                to={buildPath('/login')}
                className="text-[#37c9ff] hover:text-[#2b9cff] font-medium transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}