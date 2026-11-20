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
import DDINPaymentPage from './pages/DDINPaymentPage';
import ANAPage from "./pages/ANAPage";
import ANMPage from "./pages/ANMPage";
import BTLPage from "./pages/BTLPage";
import CANPage from "./pages/CANPage";
import DistributionPage from "./pages/DistributionPage";
import FloatManagementPage from "./pages/FloatManagementPage";
import AgentRegistration from './pages/AgentRegistration';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/became-an-agent" element={<BecameAnAgent />} />
        <Route path="/agent-registration" element={<AgentRegistration />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/services/*" element={<DDINPaymentPage />} /> {/* Services page with nested routes */}
        <Route path="/dashboard/*" element={<Dashboard />} /> {/* Dashboard page with nested routes */}
        <Route path="/agent_network_accelerator" element={<ANAPage />} />
        <Route path="/agent_network_management" element={<ANMPage />} />
        <Route path="/Below_Line_Market_Activation" element={<BTLPage />} />
        <Route path="/community_agent_network" element={<CANPage />} />
        <Route path="/Distribution_to_the_last_Mile" element={<DistributionPage />} />
        <Route path="/Liquidity_Float_Management" element={<FloatManagementPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
