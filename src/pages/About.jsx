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
          <div className="about-content">
            <div className="about-paragraph-grid">
              {/* Empty grid for paragraph content */}
            </div>
            <div className="about-picture-grid">
              <div className="hoverable-circle">
                {/*picture will be added here */}
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
