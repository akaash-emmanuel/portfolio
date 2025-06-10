import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './styles/App.css'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Loader from './components/Loader'
import About from './pages/About';
import AboutMeLoader from './components/AboutMeLoader';

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    document.body.style.backgroundColor = '#000';
    
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);
  
  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              <Loader onLoadingComplete={handleLoadingComplete} />
              {!loading && <Home />}
            </>
          } />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
