import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AboutMeLoader from '../components/AboutMeLoader';
import '../styles/AboutMeLoader.css';
import '../styles/About.css'; 

function About() {
  const [loading, setLoading] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [goingHome, setGoingHome] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const navigate = useNavigate();

  // Refs for animated elements
  const headerRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const circleRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    if (!loading && !goingHome && !animated) {
      // Add animate-fade-in class only once after loader
      headerRef.current?.classList.add('animate-fade-in');
      overlayRef.current?.classList.add('animate-fade-in');
      titleRef.current?.classList.add('animate-fade-in');
      paragraphRef.current?.classList.add('animate-fade-in');
      circleRef.current?.classList.add('animate-fade-in');
      avatarRef.current?.classList.add('animate-fade-in');
      setAnimated(true);
    }
  }, [loading, goingHome, animated]);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleVideoCanPlay = () => {
    setVideoReady(true);
    setPageVisible(true);
  };

  const handleGoHome = () => {
    setGoingHome(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <>
      {(loading || goingHome) && <AboutMeLoader onLoadingComplete={handleLoadingComplete} />}
      {!loading && !goingHome && (
        <div className={`about-page-container${pageVisible ? ' page-visible' : ''}`}>
          <div className="about-background-video">
            <video src="/aboutme.mp4" autoPlay loop muted playsInline preload="auto" onCanPlay={handleVideoCanPlay}></video>
          </div>
          <div className="about-header-row" ref={headerRef}>
            <h1 className="about-title" ref={titleRef}>About Me</h1>
            <div className="hoverable-circle" ref={circleRef}>
              <img src="/me.jpeg" alt="Ray's avatar" className="about-avatar" ref={avatarRef} />
            </div>
          </div>
          <div className="about-overlay-box custom-about-layout" ref={overlayRef}>
            <div className="about-right-column">
              <div className="about-paragraph-grid" ref={paragraphRef} style={{ color: '#fff', fontSize: '1.2rem', lineHeight: '1.7' }}>
                <span className="typewriter-text">
                I’m passionate about building things that don’t just work, they impress. Whether it’s a sleek interface or an innovative idea, I love using cutting-edge technology to make life easier, smarter, and a bit more fun all for the dopamine hit. Lately, I’ve been diving deep into the world of AI and machine learning, fascinated by how these tools can evolve further. As a final-year computer science student, I’m always experimenting, learning, and pushing boundaries. If there’s a challenge that needs creativity and a touch of the future, you’ll probably find me right in the middle of it with coffee in hand, code on screen, and curiosity in overdrive.
                </span>
              </div>
            </div>
          </div>
          <button
            className="go-home-button-baloo"
            onClick={handleGoHome}
            aria-label="Go back to home page"
          >
            ← Home
          </button>
        </div>
      )}
    </>
  );
}

export default About;
