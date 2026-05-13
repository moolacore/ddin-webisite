import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import BecameAnAgent from './pages/BecameAnAgent';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import ServicesPage from './pages/ServicesPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/became-an-agent" element={<BecameAnAgent />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/services/*" element={<ServicesPage />} /> {/* Services page with nested routes */}
        <Route path="/dashboard/*" element={<Dashboard />} /> {/* Dashboard page with nested routes */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;