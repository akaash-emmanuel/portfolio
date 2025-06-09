import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import AboutMeLoader from '../components/AboutMeLoader';

function Home() {
  const nameRef = useRef(null);
  const themeRef = useRef(null);
  const [aboutLoading, setAboutLoading] = React.useState(false);
  const navigate = useNavigate();

  // Force font to load and apply
  useEffect(() => {
    if (nameRef.current) {
      // Apply the font explicitly
      nameRef.current.style.fontFamily = "'BalooBhaijaan2', sans-serif";
    }
    if (themeRef.current) {
      themeRef.current.style.fontFamily = "'BalooBhaijaan2', sans-serif";
    }
  }, []);

  const handleAboutClick = () => {
    setAboutLoading(true);
    setTimeout(() => {
      navigate('/about');
    }, 1500);
  };

  return (
    <div className="home-page">
      <video autoPlay muted loop className="background-video">
        <source src="/home.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>      
      <div className="content">
        <div className="name-container fade-in">
          <div className="name" ref={nameRef}>
            <div className="first-name">Akaash</div>
            <div className="second-name">Emmanuel</div>
          </div>
        </div>
        
        <div className="theme-selector fade-in" ref={themeRef}>
          <div className="play-triangle"></div>
          <div className="theme-text">Pick your theme</div>          <div className="theme-menu">
            <button className="theme-menu-item" onClick={handleAboutClick}>About Me</button>
            <Link to="/projects" className="theme-menu-item">Projects</Link>
            <Link to="/contact" className="theme-menu-item">Contact Me</Link>
          </div>
        </div>
      </div>
      {aboutLoading && <AboutMeLoader />}
    </div>
  );
}

export default Home;
