import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import FAQpage from './pages/FAQpage';
import ViewBookings from './pages/ViewBookings';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
                <Route path="/bookings" element={<ViewBookings />} />

        <Route path="/faq" element={<FAQpage />} />
      </Routes>
    </Router>
  );
}

export default App;