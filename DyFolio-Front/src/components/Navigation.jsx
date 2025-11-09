import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export default function Navigation() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const theme = {
    centerActive: dark ? 'text-sky-400 border-sky-400' : 'text-sky-600 border-sky-600',
    centerInactive: dark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black',
    admin: dark ? 'border-gray-700 text-gray-200' : 'border-gray-300 text-gray-700 hover:bg-gray-100',
    btn: dark ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-200',
    navBg: dark ? 'bg-slate-900 text-gray-300' : 'bg-white text-gray-800',
  };

  const centerLinkClass = ({ isActive }) =>
    `pb-3 px-2 text-sm font-medium transition-colors ${isActive ? `border-b-2 ${theme.centerActive}` : theme.centerInactive}`;

  return (
    <nav className={`${theme.navBg} w-full shadow-sm flex items-center justify-center`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex items-center h-16">
          {/* Logo / brand */}
          <div className="flex-shrink-0 pr-4">
            <Link to="/" className={`text-lg font-semibold tracking-wide ${dark ? 'text-gray-100' : 'text-gray-900'} flex items-center gap-2`}>
              <img src="../../DyFolio-icon.png" alt="DyFolio logo" className="h-8 w-8" />
              DyFolio
            </Link>
          </div>

          {/* Center links */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-end gap-8">
              <NavLink to="/" className={centerLinkClass} end>
                Accueil
              </NavLink>
              <NavLink to="/projects" className={centerLinkClass}>
                Projets
              </NavLink>
              <NavLink to="/competences" className={centerLinkClass}>
                Compétences
              </NavLink>
              <NavLink to="/experiences" className={centerLinkClass}>
                Expériences
              </NavLink>
              <NavLink to="/contact" className={centerLinkClass}>
                Contact
              </NavLink>
            </div>
          </div>

          {/* Right side: admin + theme toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className={`px-3 py-1 text-sm flex items-center gap-2 ${theme.admin}`}
              aria-label="Admin"
            >
              <FontAwesomeIcon icon={faUserTie} aria-hidden={true} />
              <span>Admin</span>
            </Link>

            <button
              onClick={() => setDark((d) => !d)}
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
