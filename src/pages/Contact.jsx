import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Contact.css';
import Loader from '../components/Loader';

function Contact() {
  const [loading, setLoading] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [goingHome, setGoingHome] = useState(false);
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
  const handleVideoCanPlay = (e) => {
    setVideoReady(true);
    console.log('Contact video can play event fired');
    console.log('Video element classes:', e.target.className);
    console.log('Video ready state:', videoReady);
    const video = e.target;
    // Make sure the video plays
    if (video.paused) {
      video.play().catch(() => {
        console.log('Video autoplay was prevented');
      });
    }
  };

  const handleGoHome = () => {
    setGoingHome(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <>
      {(loading || goingHome) && <Loader onLoadingComplete={handleLoadingComplete} />}
      {!loading && !goingHome && (
        <div className="contact-page">
          <video 
            autoPlay 
            muted 
            loop 
            className="background-video"
            playsInline
            onCanPlay={handleVideoCanPlay}
            style={{ width: '100vw', height: '100vh', objectFit: 'cover', position: 'fixed', top: 0, left: 0, zIndex: 0, opacity: 0.8 }}
          >
            <source src="/contact.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="contact-title">Contact me</div>
          <div className="contact-icons">
            <a className="contact-icon-link" href="https://mail.google.com/mail/?view=cm&to=rayipudiemmanuel@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Gmail">
              <img src="/gmail-svgrepo-com.svg" alt="Gmail" className="contact-icon" />
            </a>
            <a className="contact-icon-link" href="https://www.linkedin.com/in/akaash-rayipudi-518192256/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="/linkedin-svgrepo-com.svg" alt="LinkedIn" className="contact-icon" />
            </a>
            <div className="contact-icon-link phone-hover-group" aria-label="Show phone number">
              <img src="/phone-svgrepo-com.svg" alt="Phone" className="contact-icon" />
              <div className="phone-number-grid">8197699433</div>
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

export default Contact;
