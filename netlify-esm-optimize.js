// Optimized script for Netlify - ES Module version
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log start
console.log('Starting Netlify deployment optimization...');
console.log(`Current directory: ${__dirname}`);

// Create _headers and _redirects in the dist directory
function createNetlifyFiles() {
  try {
    // Ensure dist directory exists
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Create _headers file
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
`;    fs.writeFileSync(path.join(distDir, '_headers'), headersContent);
    console.log(`Created _headers file in: ${path.join(distDir, '_headers')}`);

    // Create _redirects file
    const redirectsContent = `# Handle SPA routing in Netlify
/*    /index.html   200
`;

    fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent);
    console.log(`Created _redirects file in: ${path.join(distDir, '_redirects')}`);

  } catch (error) {
    console.error('Error creating Netlify files:', error);
  }
}

// Main function
function optimize() {
  try {
    createNetlifyFiles();
    console.log('Netlify optimization completed successfully!');
  } catch (error) {
    console.error('Error during optimization:', error);
    // Don't exit with error to allow build to complete
  }
}

// Run optimization
optimize();
