export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Optimize video loading on Netlify
export function preloadVideo(src) {
  return new Promise((resolve, reject) => {
    // Check if already cached in service worker
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const controller = navigator.serviceWorker.controller;
      controller.postMessage({
        type: 'CHECK_VIDEO_CACHE',
        url: src
      });
    }
    
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'video';
    preloadLink.href = src;
    preloadLink.onload = () => resolve(true);
    preloadLink.onerror = (error) => {
      console.warn('Video preload failed:', error);
      resolve(false); // Don't reject, as we still want to try loading the video normally
    };
    document.head.appendChild(preloadLink);
  });
}

// Network status detection for optimized delivery
export function useNetworkStatus() {
  // Check if we're on Netlify's CDN
  const isNetlify = window.location.hostname.includes('netlify.app');
  const isOnline = window.navigator.onLine;
  
  // Detect connection speed category
  let connectionSpeed = 'unknown';
  if (navigator.connection) {
    const conn = navigator.connection;
    if (conn.effectiveType) {
      connectionSpeed = conn.effectiveType; // 'slow-2g', '2g', '3g', or '4g'
    }
  }
  
  return {
    isNetlify,
    isOnline,
    connectionSpeed
  };
}

// Optimize video rendering on Netlify
export function optimizeVideoForNetlify(videoElement) {
  if (!videoElement) return;
  
  // Add attributes for better performance
  videoElement.setAttribute('fetchpriority', 'high');
  videoElement.setAttribute('preload', 'auto');
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('muted', '');
  videoElement.muted = true; // Explicitly set muted property
  
  // Force play when ready
  const forcePlay = () => {
    if (videoElement.paused) {
      videoElement.play().catch(err => {
        console.warn('Auto-play prevented:', err);
      });
    }
  };
  
  videoElement.addEventListener('canplay', forcePlay);
  videoElement.addEventListener('loadedmetadata', forcePlay);
  
  return () => {
    videoElement.removeEventListener('canplay', forcePlay);
    videoElement.removeEventListener('loadedmetadata', forcePlay);
  };
}
