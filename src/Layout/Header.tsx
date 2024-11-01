import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">
          <Link to="/" className="header-link">
            Quiz App
          </Link>
        </h1>
        <nav className="header-nav">
          <Link to="/" className="header-nav-link">
            Home
          </Link>
          <Link to="/quiz" className="header-nav-link">
            Quiz
          </Link>
          <Link to="/results" className="header-nav-link">
            Results
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
