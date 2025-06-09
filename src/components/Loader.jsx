import { useState, useEffect } from 'react';
import '../styles/Loader.css';

function Loader({ onLoadingComplete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the loader after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 1500);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return isLoading ? (
    <div className="loader-container">
      <div className="loader-image-container">
        <img src="/cat.png" alt="Loading..." className="loader-image" />
      </div>
    </div>
  ) : null;
}

export default Loader;
