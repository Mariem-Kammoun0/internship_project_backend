import logo from '../assets/interview.png';

export default function Navbar({ user }) {
  let navigation = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
    { name: 'Companies', href: '/companies' },
    { name: 'Offers', href: '/offers' },
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/register' },
  ]

  if (user?.authenticated) {
    if (user.role === 'admin') {
      navigation = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Job Creation', href: '/job-create' },
        { name: 'Companies', href: '/companies' },
        { name: 'Offers', href: '/offers' },
        { name: 'Profile', href: '/profile' },
        { name: 'Logout', href: '/logout' },
      ]
    } else {
      navigation = [
        { name: 'Companies', href: '/companies' },
        { name: 'Offers', href: '/offers' },
        { name: 'Profile', href: '/profile' },
        { name: 'Logout', href: '/logout' },
      ]
    }
  }

  return (
    <div className="navbar bg-base-200 px-6">
      <div className="flex-1">
        <img
          src={logo}
          alt="Company Logo"
            />        
          <a href="/" className="btn btn-ghost normal-case text-xl">Lynq</a>
      </div>
      <div className="flex-none gap-4">
        <ul className="menu menu-horizontal px-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>

        {user?.authenticated && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.avatar || 'https://placehold.co/40x40'} alt="avatar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="/profile" className="justify-between">Profile</a>
              </li>
              <li>
                <a href="/settings">Settings</a>
              </li>
              <li>
                <a href="/logout">Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
