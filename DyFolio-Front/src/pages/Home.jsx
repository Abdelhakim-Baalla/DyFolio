import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#041018] text-white"> 
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center"> 
        <div className="inline-block mb-6">
          <span className="bg-[#0b2633] text-[#8be1ff] px-4 py-2 rounded-full text-sm font-medium">Disponible pour de nouveaux projets</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
          Créons quelque chose
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff]">d'extraordinaire</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
          Designer UI/UX et développeur créatif passionné par la création d'expériences numériques élégantes et fonctionnelles.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#37c9ff] to-[#2b9cff] text-black rounded-full font-semibold shadow-lg hover:scale-[1.02] transition-transform">
            Voir mes projets
          </Link>

          <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-3 bg-transparent border border-slate-700 text-slate-200 rounded-full hover:bg-slate-800 transition-colors">
            Me contacter
          </Link>
        </div>
      </section>

      {/* About card */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="bg-gradient-to-br from-[#071625]/80 to-[#081426]/60 rounded-2xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="flex-1 text-slate-200">
            <h2 className="text-2xl font-semibold mb-3">À propos de moi</h2>
            <p className="text-slate-300 mb-6">Développeur full-stack avec une passion pour le design et l'innovation. Je transforme des idées complexes en solutions numériques simples et élégantes. Spécialisé dans React, TypeScript et les technologies web modernes, je crée des applications performantes et visuellement impressionnantes.</p>

            <div className="flex flex-wrap gap-3">
              <div className="bg-[#061728] px-4 py-3 rounded-lg shadow-inner text-center min-w-[100px]">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-slate-400">Projets</div>
              </div>
              <div className="bg-[#061728] px-4 py-3 rounded-lg shadow-inner text-center min-w-[100px]">
                <div className="text-2xl font-bold text-white">5+</div>
                <div className="text-sm text-slate-400">Années d'expé.</div>
              </div>
              <div className="bg-[#061728] px-4 py-3 rounded-lg shadow-inner text-center min-w-[100px]">
                <div className="text-2xl font-bold text-white">20+</div>
                <div className="text-sm text-slate-400">Technologies</div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-80 h-48 md:h-56 rounded-lg overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=60" alt="code" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <h3 className="text-2xl font-semibold text-center mb-4">Ce que je fais</h3>
        <p className="text-center text-slate-400 mb-8">Excellence dans chaque aspect du développement web</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#061426] rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-4">💻</div>
            <h4 className="font-semibold mb-2">Développement Web</h4>
            <p className="text-slate-400 text-sm">Applications web modernes avec React, Next.js et TypeScript.</p>
          </div>

          <div className="bg-[#061426] rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-4">🎨</div>
            <h4 className="font-semibold mb-2">Design UI/UX</h4>
            <p className="text-slate-400 text-sm">Interfaces utilisateur intuitives et esthétiques.</p>
          </div>

          <div className="bg-[#061426] rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-4">⚡</div>
            <h4 className="font-semibold mb-2">Performance</h4>
            <p className="text-slate-400 text-sm">Optimisation et bonnes pratiques pour des apps rapides.</p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-[#072033] to-[#0b2b3f] rounded-2xl p-8 md:p-10 shadow-2xl text-center">
          <h4 className="text-xl font-semibold mb-2">Travaillons ensemble</h4>
          <p className="text-slate-300 mb-6">Vous avez un projet en tête ? Discutons-en autour d'un café virtuel.</p>
          <Link to="/contact" className="inline-block px-6 py-3 bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] text-black rounded-full font-semibold">Démarrer un projet</Link>
        </div>
      </section>
    </main>
  );
}
