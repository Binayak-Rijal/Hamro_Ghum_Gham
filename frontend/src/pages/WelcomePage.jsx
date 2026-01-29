import './WelcomePage.css';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

function WelcomePage() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/home');
  };

  return (
    <div className="container">
      <ScrollToTop />
      <div className="left-panel">
        <div className="logo">
          <div className="logo-circle">
            <img 
              src="/images/logo.png" 
              alt="Hamro Ghum Gham Logo" 
              className="logo-image"
              onError={(e) => {
                // Fallback if image doesn't load
                e.target.style.display = 'none';
                e.target.parentElement.classList.add('logo-fallback');
              }}
            />
          </div>
        </div>
        
        <div className="content">
          <h1 className="title">WELCOME TO</h1>
          <h2 className="subtitle">HAMRO GHUM GHAM</h2>
          <p className="description">
            Experience the beauty of nature and discover amazing adventures
          </p>
          <button className="explore-btn" onClick={handleExplore}>
            EXPLORE
          </button>
        </div>

        <div className="navigation">
          <div className="nav-dot active"></div>
          <div className="nav-dot"></div>
          <div className="nav-dot"></div>
        </div>
      </div>

      <div className="right-panel">
        <img 
          src="/images/Welcome2.jpg" 
          alt="Beautiful Nepal Landscape" 
          className="welcome-image" 
        />
      </div>
    </div>
  );
}

export default WelcomePage;