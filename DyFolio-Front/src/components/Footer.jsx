import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-300 py-16  flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-sky-600 dark:text-sky-400">DyFolio</h3>
            <p className="text-sm mt-3 text-gray-600 dark:text-gray-400 max-w-md">
              Créer des expériences numériques exceptionnelles avec passion et
              expertise.
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Navigation</h4>
            <nav className="flex flex-col gap-2 text-sm text-center md:text-left">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">Accueil</a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">Projets</a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">Compétences</a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">Contact</a>
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-end md:text-right">
            <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Suivez-moi</h4>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
              <a href="#" aria-label="GitHub" className="hover:text-white dark:hover:text-white transition-colors">
                <FontAwesomeIcon icon={faGithub} className="text-xl" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                <FontAwesomeIcon icon={faTwitter} className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} DyFolio. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
