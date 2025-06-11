// This file helps optimize the build for Netlify deployment
const fs = require('fs');
const path = require('path');

// Ensure _redirects file exists
const publicDir = path.resolve(__dirname, 'public');
const redirectsPath = path.join(publicDir, '_redirects');

if (!fs.existsSync(redirectsPath)) {
  fs.writeFileSync(redirectsPath, '/* /index.html 200');
  console.log('Created Netlify _redirects file');
}

// Create headers file to ensure CSP allows videos
const headersPath = path.join(publicDir, '_headers');
const headersContent = `/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Content-Security-Policy: default-src 'self'; img-src 'self' data:; media-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self';
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/*.mp4
  Cache-Control: public, max-age=86400
  Accept-Ranges: bytes

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.ttf
  Cache-Control: public, max-age=31536000, immutable
`;

fs.writeFileSync(headersPath, headersContent);
console.log('Created Netlify _headers file');

console.log('Netlify deployment optimization complete');
