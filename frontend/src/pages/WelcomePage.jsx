import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

function WelcomePage() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/faq');
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="logo">
          <div className="logo-circle"></div>
        </div>
        
        <div className="content">
          <h1 className="title">WELCOME TO</h1>
          <h2 className="subtitle">HAMRO GHUM GHAM</h2>
          <p className="description">Experience the beauty of nature and discover amazing adventures</p>
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
        <img src="/images/Welcome.jpg" alt="Wilderness" className="welcome-image" />
      </div>
    </div>
  );
}

export default WelcomePage;