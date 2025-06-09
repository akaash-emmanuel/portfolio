import { useState, useEffect } from 'react';
import '../styles/ProjectsLoader.css';

function ProjectsLoader({ onLoadingComplete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the loader after 1.5 seconds
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
    <div className="projects-loader-container">
      <div className="projects-loader-image-container">
        <img src="/moon.png" alt="Loading..." className="projects-loader-image" />
      </div>
    </div>
  ) : null;
}

export default ProjectsLoader;
