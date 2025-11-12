import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    motDePasse: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b15] text-white flex w-full justify-center items-center">
      <div className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-[#2b9cff]/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 top-0 h-80 w-80 rounded-full bg-[#144c75]/30 blur-3xl" aria-hidden="true" />
      
      <div className="relative w-full max-w-md mx-auto px-6">
        <div className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-[#081a2c]/90 via-[#051322]/90 to-[#0a1e32]/80 p-8 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-white mb-2">Connexion</h1>
            <p className="text-slate-400">Accédez à votre espace personnel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="votre@email.com"
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

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#37c9ff] to-[#2b9cff] px-6 py-3 text-base font-semibold text-black shadow-lg shadow-[#2b9cff]/30 transition-transform hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Pas encore de compte ?{' '}
              <Link
                to="/register"
                className="text-[#37c9ff] hover:text-[#2b9cff] font-medium transition-colors"
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}