import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AboutMeLoader from '../components/AboutMeLoader';
import '../styles/AboutMeLoader.css';
import '../styles/About.css'; 

function About() {
  const [loading, setLoading] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [goingHome, setGoingHome] = useState(false);
  const navigate = useNavigate();

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleVideoCanPlay = () => {
    setVideoReady(true);
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
        <div className="about-page-container">
          <div className="about-background-video">
            <video src="/aboutme.mp4" autoPlay loop muted></video>
          </div>
          <div className="about-overlay-box">
            <h1 className="about-title">About Me</h1>
            <div className="about-flex-row">
              <div className="about-paragraph-grid">
                <p>
                  Hi! I’m Ray. I love building creative, interactive, and intelligent digital experiences. Whether it’s AI, games, or web apps, I’m always exploring new ways to blend technology and art. My favorite projects are the ones that make people smile, think, or feel inspired. When I’m not coding, you’ll find me sketching, gaming, or hanging out with my dog.
                </p>
              </div>
              <div className="about-picture-grid">
                <div className="hoverable-circle">
                  <img src="/cat.png" alt="Ray's avatar" className="about-avatar" />
                </div>
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
