// Image optimization script for Netlify
const fs = require('fs');
const path = require('path');

// Check if we're in the Netlify environment
const isNetlify = process.env.NETLIFY === 'true';

console.log('Starting Netlify deployment optimization...');

// Create a _headers file for setting proper cache headers
function createHeadersFile() {
  const headersContent = `# Cache settings for Netlify
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

# Cache fonts and styles for 1 year
/*.ttf
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

# Cache JS files for 1 year
/*.js
  Cache-Control: public, max-age=31536000, immutable

# Cache static assets for 1 year
/*.svg
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=31536000, immutable

/*.jpg
  Cache-Control: public, max-age=31536000, immutable

/*.jpeg
  Cache-Control: public, max-age=31536000, immutable

# Cache videos for 1 day with range support
/*.mp4
  Cache-Control: public, max-age=86400
  Accept-Ranges: bytes
`;

  fs.writeFileSync(path.join(__dirname, 'public', '_headers'), headersContent);
  console.log('Created _headers file for Netlify optimization');
}

// Ensure _redirects file exists
function createRedirectsFile() {
  const redirectsContent = `# Handle SPA routing in Netlify
/*    /index.html   200
`;

  fs.writeFileSync(path.join(__dirname, 'public', '_redirects'), redirectsContent);
  console.log('Created _redirects file for SPA routing');
}

// Run the optimizations
function optimize() {
  try {
    createHeadersFile();
    createRedirectsFile();
    console.log('Netlify optimization completed successfully!');
  } catch (error) {
    console.error('Error during optimization:', error);
    process.exit(1);
  }
}

// Run immediately for local builds or when script is executed directly
if (require.main === module) {
  optimize();
}

module.exports = { optimize };
