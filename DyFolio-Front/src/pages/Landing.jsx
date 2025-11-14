import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b15] text-white flex w-full justify-center">
      <div className="w-full max-w-5xl" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
        <div className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-[#2b9cff]/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 top-0 h-80 w-80 rounded-full bg-[#144c75]/30 blur-3xl" aria-hidden="true" />
        <section className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-5xl font-semibold leading-tight tracking-tight">
            Construisez votre portfolio <span className="bg-gradient-to-r from-[#6fe7ff] via-[#37c9ff] to-[#2b9cff] bg-clip-text text-transparent">DyFolio</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Créez une vitrine élégante pour votre profil tech, partagez vos projets et présentez vos compétences en quelques minutes.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#inscription"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#37c9ff] to-[#2b9cff] px-7 py-3 text-base font-semibold text-black shadow-lg shadow-[#2b9cff]/30 transition-transform hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              Commencer
              <span aria-hidden>→</span>
            </a>
            <a
              href="#fonctionnalites"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 px-6 py-3 text-base text-slate-200 transition-colors hover:bg-slate-800/60"
            >
              Explorer les fonctionnalités
            </a>
          </div>
        </section>

        <section id="fonctionnalites" className="fade-in-up mx-auto mt-24 max-w-5xl rounded-3xl border border-slate-800/70 bg-gradient-to-br from-[#081a2c]/90 via-[#051322]/90 to-[#0a1e32]/80 p-10 shadow-2xl shadow-black/40 backdrop-blur">
          <h2 className="text-3xl font-semibold text-white text-center">Tout ce dont vous avez besoin</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Pages dynamiques',
                description: 'Chaque utilisateur dispose de son URL personnelle : /{username}.',
              },
              {
                title: 'GraphQL prêt à l’emploi',
                description: 'Connectez votre contenu et mettez-le à jour en direct grâce à Apollo Client.',
              },
              {
                title: 'Design moderne',
                description: 'Un thème sombre élégant et responsive optimisé pour les développeurs créatifs.',
              },
            ].map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-slate-800/60 bg-[#081423]/80 p-6 text-center shadow-lg shadow-black/30">
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="inscription" className="fade-in-up mx-auto mt-24 max-w-4xl text-center">
          <div className="rounded-3xl border border-slate-800/60 bg-gradient-to-r from-[#0a1f33] via-[#082740] to-[#0b2f4b] p-10 shadow-2xl shadow-black/40">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Prêt à créer votre portfolio ?</h2>
            <p className="mt-4 text-slate-300">
              Inscrivez-vous et obtenez votre URL personnalisée en quelques clics.
            </p>
            <Link
              to="/register"
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#6fe7ff] to-[#2b9cff] px-8 py-3 text-base font-semibold text-black shadow-lg shadow-[#2b9cff]/40 transition-transform hover:-translate-y-0.5"
            >
              Créer mon compte
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
