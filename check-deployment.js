// Pre-deployment test script
const fs = require('fs');
const path = require('path');

// Check for common deployment issues
function checkDeploymentReadiness() {
  console.log('Checking deployment readiness for Netlify...');
  
  const issues = [];
  const publicDir = path.join(__dirname, 'public');
  
  // Check for required files
  if (!fs.existsSync(path.join(publicDir, '_redirects'))) {
    issues.push('Missing _redirects file for SPA routing');
  }
  
  // Check for video files
  const requiredVideos = ['home.mp4', 'aboutme.mp4', 'projects.mp4', 'contact.mp4', 'sentient.mp4'];
  for (const video of requiredVideos) {
    if (!fs.existsSync(path.join(publicDir, video))) {
      issues.push(`Missing video file: ${video}`);
    }
  }
  
  // Verify service worker
  if (!fs.existsSync(path.join(publicDir, 'service-worker.js'))) {
    issues.push('Missing service-worker.js for offline support');
  }
  
  // Ensure netlify config exists
  if (!fs.existsSync(path.join(__dirname, 'netlify.toml'))) {
    issues.push('Missing netlify.toml configuration file');
  }
  
  // Report results
  if (issues.length > 0) {
    console.error('⚠️ Deployment issues found:');
    issues.forEach(issue => console.error(`  - ${issue}`));
    process.exit(1);
  } else {
    console.log('✅ Deployment check passed. Ready for Netlify!');
  }
}

// Run checks
checkDeploymentReadiness();
