import { useState, useEffect } from 'react';
import '../styles/Loader.css';

function Loader({ onLoadingComplete, untilReady }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (untilReady === false) {
      setIsLoading(false);
      if (onLoadingComplete) onLoadingComplete();
      return;
    }
    // fallback timeout in case untilReady is never set
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete) onLoadingComplete();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onLoadingComplete, untilReady]);

  if (!isLoading) return null;
  return (
    <div className="loader-container">
      <div className="loader-image-container">
        <img src="/cat.png" alt="Loading..." className="loader-image" />
      </div>
    </div>
  );
}

export default Loader;
