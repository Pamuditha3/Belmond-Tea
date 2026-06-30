import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFeedback } from '../context/FeedbackContext';

const Header = () => {
  const [isSolid, setIsSolid] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openDrawer } = useFeedback();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll handler for transparent/solid transition
  useEffect(() => {
    // If not homepage, make it solid by default
    if (location.pathname !== '/') {
      setIsSolid(true);
      return;
    }

    // Scroll listener for homepage
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSolid(true);
      } else {
        setIsSolid(false);
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handler to scroll to #about section on Home Screen
  const handleAboutClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (location.pathname === '/') {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#about');
    }
  };

  // Listen to navigation changes and auto scroll to hash anchors if present
  useEffect(() => {
    if (location.pathname === '/' && location.hash === '#about') {
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <header className={`header ${isSolid ? 'solid' : 'transparent'} en`}>
        <div className="wrapper">
          <Link to="/" className="header__logo" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="https://belmond-tea.com/local/templates/main2/img/logo.svg" alt="Belmond Tea Logo" />
          </Link>
          
          <nav>
            <ul className="header__nav">
              <li className="header__nav--item">
                <a href="#about" onClick={handleAboutClick}>About Richard</a>
              </li>
              <li className="header__nav--item">
                <Link to="/collection">Our tea</Link>
                <div className="header__subNav">
                  <ul>
                    <li>Types</li>
                    <li><Link to="/collection?type=classic-black-teas">Classic black teas</Link></li>
                    <li><Link to="/collection?type=fruit-and-herbal-teas">Flavoured black teas</Link></li>
                    <li><Link to="/collection?type=green-teas-and-tisanes">Green teas and tisanes</Link></li>
                  </ul>
                  <ul>
                    <li>Collections</li>
                    <li><Link to="/collection?type=gifts">Tea gifts</Link></li>
                    <li><Link to="/collection?type=wellness-collection">Wellness Collection</Link></li>
                  </ul>
                  <ul>
                    <li>Formats</li>
                    <li><Link to="/collection?format=sachets">Sachets</Link></li>
                    <li><Link to="/collection?format=leaf-and-granules">Leaf and granules</Link></li>
                    <li><Link to="/collection?format=pyramids">Pyramids</Link></li>
                  </ul>
                </div>
              </li>
              <li className="header__nav--item">
                <Link to="/journal">Journal</Link>
              </li>
              <li className="header__nav--item">
                <Link to="/news">Offers & news</Link>
              </li>
            </ul>
          </nav>
          
          <div 
            className={`header__mobile-btn js-hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <a href="#about" onClick={handleAboutClick}>About Richard</a>
        <Link to="/collection" onClick={() => setIsMobileMenuOpen(false)}>Our tea</Link>
        <Link to="/journal" onClick={() => setIsMobileMenuOpen(false)}>Journal</Link>
        <Link to="/news" onClick={() => setIsMobileMenuOpen(false)}>Offers & news</Link>
      </div>
    </>
  );
};

export default Header;
