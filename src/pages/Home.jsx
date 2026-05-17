import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <h2>Online szavazási platform</h2>

        <p>
          Ez az alkalmazás lehetőséget ad szavazások létrehozására,
          megjelenítésére és a felhasználói válaszok kezelésére.
          A rendszer célja egy egyszerű, átlátható és könnyen használható
          online szavazási felület biztosítása.
        </p>

        <Link to="/polls" className="hero-button">
          Aktív szavazások megtekintése
        </Link>
      </section>
    </main>
  )
}

export default Home