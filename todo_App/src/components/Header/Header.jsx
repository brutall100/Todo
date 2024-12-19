import './Header.css';

function Header() {
  return (
    <header className="header">
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/" className="nav-link">Namai</a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link">Apie</a>
            </li>
            <li className="nav-item">
              <a href="/features" className="nav-link">DII Pasiulymai</a>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link">Susisiekime</a>
            </li>
          </ul>
        </nav>
    </header>
  );
}

export default Header;



