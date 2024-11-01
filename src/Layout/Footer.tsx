//import { Link } from 'react-router-dom';
import './Footer.css'; // Assuming the CSS is saved in Footer.css

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Quiz App. All rights reserved.
        </p>
        <p className="footer-text mt-2">
          Made with ❤️ by Uzma Usmani
        </p>
      </div>
    </footer>
  );
};

export default Footer;
