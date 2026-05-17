import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <h1>Online Szavazási Platform</h1>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Kezdőlap</Link>
          </li>
          <li>
            <Link to="/polls">Szavazások</Link>
          </li>
          <li>
            <Link to="/create-poll">Új szavazás</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header