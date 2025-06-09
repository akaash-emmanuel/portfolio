import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Projects.css';
import ProjectsLoader from '../components/ProjectsLoader';

function Projects() {
  const [loading, setLoading] = useState(true);
  const [goingHome, setGoingHome] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleGoHome = () => {
    setGoingHome(true);
    // Show loader for 1.5 seconds then navigate
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  const handleVideoCanPlay = (e) => {
    setVideoReady(true);
    console.log('Video can play event fired');
    const video = e.target;
    // Make sure the video plays
    if (video.paused) {
      video.play().catch(() => {
        console.log('Video autoplay was prevented');
      });
    }
  };
  return (
    <>
      {(loading || goingHome) && <ProjectsLoader onLoadingComplete={handleLoadingComplete} />}
      {!loading && !goingHome && (
        <div className="projects-page" style={{ backgroundColor: '#111' }}>
          <video 
            autoPlay 
            muted 
            loop 
            className={`background-video fade-in-video${videoReady ? ' visible' : ''}`}
            playsInline
            onCanPlay={handleVideoCanPlay}
            style={{ width: '100vw', height: '100vh', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
          >
            <source src="/projects.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="page-title">Projects</div>
          <div className="custom-grid-layout">            <div className="grid-left">
              <div className="grid-box horizontal translucent-box" onClick={() => window.open('https://notdoneyetbrosorry.com', '_blank')} onMouseEnter={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.play();
                }
              }} onMouseLeave={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
              }}>
                <video
                  src="/sentient.mp4"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  muted
                  loop
                  playsInline
                  preload="none"
                ></video>
                <div className="project-content">
                  <h2>Sentient</h2>
                  <p>An intelligent 2D game experience featuring an adaptive enemy agent that learns player behavior in real time using reinforcement learning and behavioral analytics, built with PyGame and PyTorch for dynamic, responsive gameplay.</p>
                </div>
              </div>              <div className="grid-box horizontal translucent-box" onClick={() => window.open('https:thisoneisntdonetoo.com', '_blank')} onMouseEnter={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.play();
                }
              }} onMouseLeave={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
              }}>
                <video
                  src="/ei.mp4"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  muted
                  loop
                  playsInline
                  preload="none"
                ></video>
                <div className="project-content">
                  <h2>SENSEI</h2>
                  <p>SENSory Emotional Intelligence - a multi-modal AI system that analyzes emotional intelligence through text, audio, and video inputs, leveraging deep learning and behavioral signals to decode human affect with real-time precision and adaptive insight.</p>
                </div>
              </div>
            </div>
            <div className="grid-right">
              <div className="grid-box vertical translucent-box" onClick={() => window.open('https://solsticeatlas.netlify.app', '_blank')} onMouseEnter={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.play();
                }
              }} onMouseLeave={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
              }}>
                <video
                  src="/solar.mp4"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  muted
                  loop
                  playsInline
                  preload="none"
                ></video>
                <div className="project-content">
                  <h2>Solstice Atlas</h2>
                  <p>An immersive 3D journey through our solar system, featuring real-time astronomical data visualization and interactive planetary exploration powered by Three.js and live API integrations</p>                </div>
              </div>
            </div>
          </div>
          
          {/* Go Back Home Button */}
          <button 
            className="go-home-button"
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

export default Projects;
