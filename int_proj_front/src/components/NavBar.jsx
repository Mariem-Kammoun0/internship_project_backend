import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/interview.png';
import { isAuthenticated } from "../services/auth";
import { useState, useEffect } from "react";

export default function NavBar() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  
  useEffect(()=>{
    const fetchUser = async()=>{
      const user=await isAuthenticated();
      setUser(user);
    };
  fetchUser();
  },[]);
  
  let navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Contact', href: '/contact' },
    { name: 'Entreprises', href: '/companies' },
    { name: 'Offres', href: '/job-offers' },
    { name: 'Connexion', href: '/login' },
    { name: 'Inscription', href: '/register' },
  ];

  if (user) {
    if (user.role === 'employer') {
      navigation = [
        { name: 'Tableau de bord', href: '/dashboard' },
        { name: 'Créer offre', href: '/job-create' },
        { name: 'Entreprises', href: '/companies' },
        { name: 'Offres', href: '/job-offers' },
        { name: 'Profil', href: '/profile' },
        { name: 'Déconnexion', href: '/logout' },
      ];
    } else {
      navigation = [
        { name: 'Entreprises', href: '/companies' },
        { name: 'Offres', href: '/job-offers' },
        { name: 'Profil', href: '/profile' },
        { name: 'Déconnexion', href: '/logout' },
      ];
    }
  }

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="navbar bg-base-200 px-4 lg:px-6 shadow-sm">
      {/* Logo et nom */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10">
              <img
                src={logo}
                alt="Lynq Logo"
                className="rounded-lg"
              />
            </div>
          </div>
          <span className="text-xl font-bold text-primary">Lynq</span>
        </Link>
      </div>

      {/* Navigation desktop */}
      <div className="hidden lg:flex flex-none gap-4">
        <ul className="menu menu-horizontal px-1 gap-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.href}
                className={`rounded-lg transition-colors ${
                  isActive(item.href) 
                    ? 'bg-primary text-primary-content' 
                    : 'hover:bg-base-300'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Avatar utilisateur */}
        {user?.authenticated && (
          <div className="dropdown dropdown-end">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img 
                  src={user.avatar || 'https://placehold.co/40x40'} 
                  alt="Avatar utilisateur" 
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border border-base-300"
            >
              <li className="menu-title">
                <span>{user.name || 'Utilisateur'}</span>
              </li>
              <div className="divider my-1"></div>
              <li>
                <Link to="/profile" className="gap-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Profil
                </Link>
              </li>
              <li>
                <Link to="/settings" className="gap-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Paramètres
                </Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <Link to="/logout" className="gap-3 text-error">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  Déconnexion
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Menu mobile */}
      <div className="lg:hidden">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-square">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 12h18m-9 9l9-9-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border border-base-300"
          >
            {navigation.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.href}
                  className={`${
                    isActive(item.href) ? 'bg-primary text-primary-content' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {user?.authenticated && (
              <>
                <div className="divider"></div>
                <li className="menu-title">
                  <span>Compte</span>
                </li>
                <li><Link to="/profile">Profil</Link></li>
                <li><Link to="/settings">Paramètres</Link></li>
                <li><Link to="/logout" className="text-error">Déconnexion</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}