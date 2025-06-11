import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import AboutMeLoader from '../components/AboutMeLoader';
import { preloadVideo } from '../lib/utils';

function Home() {
  const nameRef = useRef(null);
  const themeRef = useRef(null);
  const [aboutLoading, setAboutLoading] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [loading, setLoading] = useState(true);
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
    // Trigger animation only once
    if (!animated) {
      document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('animate-fade-in');
      });
      setAnimated(true);
    }
    
    // Preload other page videos in the background for faster navigation
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        Promise.all([
          preloadVideo('/aboutme.mp4'),
          preloadVideo('/projects.mp4'),
          preloadVideo('/contact.mp4')
        ]).then(() => {
          console.log('Background videos preloaded');
        });
      });
    }
  }, [animated]);

  useEffect(() => {
    if (videoReady) {
      setTimeout(() => setLoading(false), 200);
    }
  }, [videoReady]);

  const handleAboutClick = () => {
    setAboutLoading(true);
    setTimeout(() => {
      navigate('/about');
    }, 1500);
  };

  return (
    <>
      {loading && <AboutMeLoader untilReady={!videoReady ? true : false} />}      <div className={`home-page${pageVisible ? ' page-visible' : ''}`} style={{ display: loading ? 'none' : undefined }}>
        <video 
          autoPlay 
          muted 
          loop 
          className="background-video" 
          playsInline 
          preload="auto" 
          onCanPlay={() => { setPageVisible(true); setVideoReady(true); }}
          onError={() => { setPageVisible(true); setVideoReady(true); }} // Force content to show even if video fails
          fetchPriority="high" // Prioritize this video since it's the landing page
        >
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
      </div>
    </>
  );
}

export default Home;
