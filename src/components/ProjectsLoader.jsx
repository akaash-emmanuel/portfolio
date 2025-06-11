import { useState, useEffect } from 'react';
import '../styles/ProjectsLoader.css';

function ProjectsLoader({ onLoadingComplete, untilReady }) {
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
    <div className="projects-loader-container">
      <div className="projects-loader-image-container">
        <img src="/moon.png" alt="Loading..." className="projects-loader-image" />
      </div>
    </div>
  );
}

export default ProjectsLoader;
