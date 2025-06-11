import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function VideoLoader({ src, fallbackImage, children, onVideoReady }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);
  
  useEffect(() => {
    // Set a timeout to switch to fallback if video takes too long
    timeoutRef.current = setTimeout(() => {
      if (!videoLoaded) {
        setUsingFallback(true);
        if (onVideoReady) onVideoReady();
      }
    }, 5000); // Wait 5 seconds for video before using fallback
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onVideoReady]);
  
  const handleCanPlay = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVideoLoaded(true);
    if (onVideoReady) onVideoReady();
  };
  
  const handleError = () => {
    console.error("Video failed to load");
    setUsingFallback(true);
    if (onVideoReady) onVideoReady();
  };
  
  return (
    <>
      {!usingFallback && (
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          onCanPlay={handleCanPlay}
          onError={handleError}
          className="background-video"
          style={{ display: videoLoaded ? 'block' : 'none' }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {usingFallback && fallbackImage && (
        <div 
          className="background-image" 
          style={{ 
            backgroundImage: `url(${fallbackImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1
          }}
        />
      )}
      
      {children}
    </>
  );
}

VideoLoader.propTypes = {
  src: PropTypes.string.isRequired,
  fallbackImage: PropTypes.string,
  children: PropTypes.node,
  onVideoReady: PropTypes.func
};

export default VideoLoader;
