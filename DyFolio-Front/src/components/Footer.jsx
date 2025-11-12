import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../contexts/ThemeContext'

export default function Footer() {
  

  const { dark } = useTheme();

  const theme = {
    brand: dark ? 'text-gray-200' : 'text-black',
    paragraph: dark ? 'text-gray-400' : 'text-gray-600',
    heading: dark ? 'text-gray-200' : 'text-gray-700',
    link: dark ? 'text-gray-300 hover:text-sky-400' : 'text-gray-600 hover:text-sky-500',
    socialText: dark ? 'text-gray-300' : 'text-gray-600',
    border: dark ? 'border-gray-700' : 'border-gray-200',
    copyright: dark ? 'text-gray-400' : 'text-gray-600',
  };

  return (
    <footer
      className={`${dark ? 'bg-slate-900 text-gray-300' : 'bg-white text-gray-800'} py-24 h-1/2 flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20 justify-center`}
      style={{ paddingTop: '45px', paddingBottom: '50px' }}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 items-start text-center md:text-left">
          <div>
            <h3 className={`text-2xl font-bold ${theme.brand}`}>DyFolio</h3>
            <p className={`text-sm mt-3 ${theme.paragraph} max-w-md`}>
              Créer des expériences numériques exceptionnelles avec passion et
              expertise.
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className={`text-lg font-semibold mb-4 ${theme.heading}`}>Navigation</h4>
            <nav className="flex flex-col gap-3 text-sm text-center md:text-left">
              <a href="#" className={`py-1 ${theme.link} transition-colors duration-300`}>Accueil</a>
              <a href="#" className={`py-1 ${theme.link} transition-colors duration-300`}>Projets</a>
              <a href="#" className={`py-1 ${theme.link} transition-colors duration-300`}>Compétences</a>
              <a href="#" className={`py-1 ${theme.link} transition-colors duration-300`}>Contact</a>
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-start md:text-left">
            <h4 className={`text-lg font-semibold mb-4 ${theme.heading}`}>Suivez-moi</h4>
            <div className={`flex items-center gap-6 ${theme.socialText}`}>
              <a href="#" aria-label="GitHub" className="hover:text-white dark:hover:text-white transition-colors duration-300">
                <FontAwesomeIcon icon={faGithub} className="text-2xl" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300">
                <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300">
                <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className={`mt-14 border-t pt-8 ${theme.border} flex flex-col md:flex-row items-center justify-between gap-6`}>
          <p className={`text-sm ${theme.copyright}`}>&copy; {new Date().getFullYear()} DyFolio. Tous droits réservés.</p>

        </div>
      </div>
    </footer>
  );
}
