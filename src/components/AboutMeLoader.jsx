import { useState, useEffect } from 'react';
import '../styles/AboutMeLoader.css';

function AboutMeLoader({ onLoadingComplete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return isLoading ? (
    <div className="aboutme-loader-container">
      <div className="aboutme-loader-image-container">
        <img src="/paintbrush.png" alt="Loading..." className="aboutme-loader-image" />
      </div>
    </div>
  ) : null;
}

export default AboutMeLoader;
