import { Link } from 'react-router-dom';
import PortfolioGreeting from '../components/PortfolioGreeting';

const stats = [
  { value: '50+', label: 'Projets livrés' },
  { value: '5+', label: 'Années d\'expérience' },
  { value: '20+', label: 'Technologies maîtrisées' },
];

const services = [
  {
    icon: <i className="fa-solid fa-code"></i>,
    title: 'Développement Web',
    description: 'Applications modernes avec React, Next.js et TypeScript.',
  },
  {
    icon: <i className="fa-solid fa-palette"></i>,
    title: 'Design UI/UX',
    description: 'Interfaces intuitives alliant esthétisme et ergonomie.',
  },
  {
    icon: <i className="fa-solid fa-bolt"></i>,
    title: 'Performance',
    description: 'Optimisations techniques pour des expériences rapides.',
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b15] text-white flex w-full justify-center ">
      <div className="w-full max-w-5xl" style={{ paddingTop: '45px', paddingBottom: '150px' }}>
      <div className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-[#2b9cff]/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 top-0 h-80 w-80 rounded-full bg-[#144c75]/30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-[40%] h-96 w-96 -translate-x-1/2 rounded-full bg-[#08233a]/40 blur-3xl" aria-hidden="true" />

      <section className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 text-center">
        <h1 className="mb-6 text-5xl font-semibold leading-tight tracking-tight">
          Créons quelque chose
          <br />
          <span className="bg-gradient-to-r from-[#6fe7ff] via-[#37c9ff] to-[#2b9cff] bg-clip-text text-transparent">d&apos;extraordinaire</span>
        </h1>

        <p className="mx-auto mb-10 w-full text-lg text-slate-300 sm:text-xl" style={{marginTop: '32px', marginBottom: '25px'}}>
          Designer UI/UX et développeur créatif passionné par la création d\'expériences numériques élégantes, performantes et mémorables.
        </p>

        <div className="mt-4 flex justify-center">
          <PortfolioGreeting />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#37c9ff] to-[#2b9cff] px-7 py-3 text-base font-semibold text-black shadow-lg shadow-[#2b9cff]/30 transition-transform hover:-translate-y-0.5 hover:scale-[1.02]"
          >
            Voir mes projets
            <span aria-hidden>→</span>
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 px-6 py-3 text-base text-slate-200 transition-colors hover:bg-slate-800/60"
          >
            Me contacter
          </Link>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 pb-14">
        <div className="flex flex-col items-center gap-8 rounded-3xl border border-slate-800/70 bg-gradient-to-br from-[#081a2c]/90 via-[#051322]/90 to-[#0a1e32]/80 p-6 shadow-2xl shadow-black/40 backdrop-blur md:flex-row md:items-stretch md:gap-10 md:p-10">
          <div className="flex-1 text-slate-200">
            <h2 className="mb-4 text-2xl font-semibold text-white md:text-3xl">À propos de moi</h2>
            <p className="mb-8 text-slate-300">
              Développeur full-stack avec une passion pour le design et l’innovation. Je transforme des idées complexes en solutions numériques élégantes, en combinant React, TypeScript et les meilleures pratiques du web moderne.
            </p>

            <div className="grid w-full gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#0c263a] bg-[#061728]/60 px-5 py-4 text-center shadow-inner shadow-black/40"
                >
                  <div className="text-2xl font-bold text-white">{item.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wide text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-3xl border border-slate-800/60 shadow-xl shadow-black/40 md:w-[340px]">
            <img
              src="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=60"
              alt="Code editor"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h3 className="text-2xl font-semibold text-white md:text-3xl">Ce que je fais</h3>
          <p className="mt-3 text-slate-400">Excellence dans chaque étape du cycle de développement web.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-3xl border border-slate-800/70 bg-[#081423]/80 p-8 text-center shadow-lg shadow-black/30 transition hover:border-[#2b9cff]/60 hover:shadow-[#2b9cff]/30"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d2236] text-2xl shadow-inner shadow-black/60">
                {service.icon}
              </div>
              <h4 className="text-lg font-semibold text-white">{service.title}</h4>
              <p className="mt-3 text-sm text-slate-400">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-r from-[#0a1f33] via-[#082740] to-[#0b2f4b] p-10 text-center shadow-2xl shadow-black/40">
          <div className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#37c9ff]/20 blur-2xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-12 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#2b9cff]/20 blur-2xl" aria-hidden="true" />
          <div className="relative">
            <h4 className="text-xl font-semibold text-white md:text-2xl">Travaillons ensemble</h4>
            <p className="mx-auto mt-3 max-w-xl text-slate-300">
              Vous avez un projet en tête ? Prenons un café virtuel et bâtissons l’expérience numérique que vos utilisateurs attendent.
            </p>
            <Link
              to="/contact"
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
