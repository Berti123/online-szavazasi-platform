import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <h1>Online Szavazási Platform</h1>

      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/">Kezdőlap</NavLink>
          </li>
          <li>
            <NavLink to="/polls">Szavazások</NavLink>
          </li>
          <li>
            <NavLink to="/create-poll">Új szavazás</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header