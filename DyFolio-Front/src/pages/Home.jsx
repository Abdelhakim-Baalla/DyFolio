import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Bienvenue sur DyFolio
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Votre portfolio dynamique et professionnel
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/projects" 
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Voir mes projets
            </Link>
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
