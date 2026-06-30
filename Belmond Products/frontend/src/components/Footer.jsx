import React from 'react';
import { Link } from 'react-router-dom';
import { useFeedback } from '../context/FeedbackContext';

const Footer = () => {
  const { openDrawer } = useFeedback();

  const handleAboutClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      const aboutSection = document.getElementById('about');
      if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="wrapper flex-container">

        {/* Col 1 – Logo + contact */}
        <div className="col col-1">
          <div className="box">
            <Link to="/" className="footer__logo">
              <img
                src="https://belmond-tea.com/local/templates/main2/img/logo.svg"
                alt="Belmond Tea Logo"
                style={{ height: '55px', filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.5))' }}
              />
            </Link>
            <span
              className="link modal-popup"
              style={{ cursor: 'pointer' }}
              onClick={openDrawer}
            >
              Feedback
            </span>
            <div className="box-bottom">
              <p>For distributors</p>
              <a href="tel:+1234567890">+94 123 456 7890</a>
            </div>
          </div>
        </div>

        {/* Col 2 – Site map */}
        <div className="col col-2">
          <div className="box">
            <ul>
              <li>Types</li>
              <li><Link to="/collection?type=classic-black-teas">Classic black teas</Link></li>
              <li><Link to="/collection?type=fruit-and-herbal-teas">Flavoured black teas</Link></li>
              <li><Link to="/collection?type=green-teas-and-tisanes">Green teas and tisanes</Link></li>
            </ul>
          </div>
          <div className="box">
            <ul>
              <li>Formats</li>
              <li><Link to="/collection?format=sachets">Sachets</Link></li>
              <li><Link to="/collection?format=leaf-and-granules">Leaf and granules</Link></li>
              <li><Link to="/collection?format=pyramids">Pyramids</Link></li>
            </ul>
          </div>
          <div className="box">
            <ul>
              <li>Collections</li>
              <li><Link to="/collection?type=gifts">Tea gifts</Link></li>
              <li><Link to="/collection?type=wellness-collection">Wellness Collection</Link></li>
            </ul>
          </div>
          <div className="box box-about">
            <ul>
              <li>&nbsp;</li>
              <li><Link to="/#about" onClick={handleAboutClick}>About the brand</Link></li>
              <li><Link to="/journal">Interesting things about tea</Link></li>
              <li><Link to="/news">Promotions and news</Link></li>
            </ul>
          </div>
        </div>

        {/* Col 3 – Social + legal */}
        <div className="col col-3">
          <div className="footer__social">
            <div className="subTitle">Stay tuned for updates</div>
            
          </div>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Personal data processing policy</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Cookie Policy</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Site Usage Policy</a></li>
          </ul>
          <div className="footer__copyright">
            Developed by Pamuditha
            
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
