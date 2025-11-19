import { NavLink, Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie, faSun, faMoon, faUser, faArrowRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { username } = useParams();
  const basePath = username ? `/${username}` : '';
  const hasUsername = Boolean(username);

  const theme = {
    centerActive: dark ? 'text-sky-400 border-sky-400' : 'text-sky-600 border-sky-600',
    centerInactive: dark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black',
    admin: dark ? 'border-gray-700 text-gray-200' : 'border-gray-300 text-gray-700 hover:bg-gray-100',
    btn: dark ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-200',
    navBg: dark ? 'bg-slate-900 text-gray-300' : 'bg-white text-gray-800',
  };

  const centerLinkClass = ({ isActive }) =>
    `pb-3 px-2 text-sm font-medium transition-colors ${isActive ? `border-b-2 ${theme.centerActive}` : theme.centerInactive}`;

  const handleLogout = () => {
    logout();
    navigate(basePath || '/', { replace: true });
  };

  return (
    <nav className={`${theme.navBg} w-full shadow-sm flex items-center justify-center`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex items-center h-16">
          {/* Logo / brand */}
          <div className="flex-shrink-0 pr-4">
            <Link to={basePath || '/'} className={`text-lg font-semibold tracking-wide ${dark ? 'text-gray-100' : 'text-gray-900'} flex items-center gap-2`}>
              <img src="../../DyFolio-icon.png" alt="DyFolio logo" className="h-8 w-8" />
              DyFolio
            </Link>
          </div>

          {/* Center links */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-end gap-8">
              {hasUsername ? (
                <>
                  <NavLink to={basePath || '/'} className={centerLinkClass} end>
                    Accueil
                  </NavLink>
                  <NavLink to={`${basePath}/projets`} className={centerLinkClass}>
                    Projets
                  </NavLink>
                  <NavLink to={`${basePath}/competences`} className={centerLinkClass}>
                    Compétences
                  </NavLink>
                  <NavLink to={`${basePath}/experiences`} className={centerLinkClass}>
                    Expériences
                  </NavLink>
                  <NavLink to={`${basePath}/contact`} className={centerLinkClass}>
                    Contact
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/" className={centerLinkClass} end>
                    Accueil
                  </NavLink>
                  <a href="#fonctionnalites" className={`pb-3 px-2 text-sm font-medium transition-colors ${theme.centerInactive}`}>
                    Fonctionnalités
                  </a>
                  <a href="#inscription" className={`pb-3 px-2 text-sm font-medium transition-colors ${theme.centerInactive}`}>
                    Inscription
                  </a>
                  <Link to="/contact" className={`pb-3 px-2 text-sm font-medium transition-colors ${theme.centerInactive}`}>
                    Contact
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right side: auth + admin + theme toggle */}
          <div className="flex items-center gap-4">
            {!hasUsername && (
              <>
                {!isAuthenticated ? (
                  <div className="flex items-center gap-2 pr-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faUser} aria-hidden={true} />
                      <Link
                        to={`${basePath}/login`}
                        className={`px-3 py-1 text-sm ${theme.centerInactive}`}
                      >
                        Connexion
                      </Link>
                    </div>

                    <span className="text-gray-400">|</span>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faArrowRightToBracket} aria-hidden={true} />
                      <Link
                        to={`${basePath}/register`}
                        className={`px-3 py-1 text-sm ${theme.centerInactive}`}
                      >
                        Inscription
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link
                      to={`${basePath}/admin`}
                      className={`px-3 py-1 text-sm flex items-center gap-2 ${theme.admin}`}
                      aria-label="Admin"
                    >
                      <FontAwesomeIcon icon={faUserTie} aria-hidden={true} />
                      <span>Admin</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-1 text-sm flex items-center gap-2 text-red-400 hover:text-red-300"
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} aria-hidden={true} />
                      <span>Déconnexion</span>
                    </button>
                  </>
                )}
              </>
            )}

            <button
              onClick={toggle}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${theme.btn}`}
              aria-label="Toggle theme"
              title="Basculer thème"
            >
              {dark ? (
                <FontAwesomeIcon icon={faSun} aria-hidden={true} />
              ) : (
                <FontAwesomeIcon icon={faMoon} aria-hidden={true} />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
