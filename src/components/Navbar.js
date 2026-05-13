import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className={`header header-transparent ${isScrolled ? 'fixed-header' : ''}`}>
      <div className="container">
        <nav id="navigation" className="navigation navigation-landscape">
          <div className="nav-header">
            {/* Logo */}
            <Link className="nav-brand static-logo" to="/">
              <img src="/assets/img/logo-light.png" className="logo" alt="Logo" />
            </Link>
            <Link className="nav-brand fixed-logo" to="/">
              <img src="/assets/img/logo.png" className="logo" alt="Logo" />
            </Link>

            {/* Mobile toggle */}
            <div className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}></div>

            {/* Mobile CTA */}
            <div className="mobile_nav">
              <ul>
                <li>
                  <Link to="/became-an-agent" className="btn btn-info">
                    <i className="fas fa-sign-in-alt me-2"></i>Become an Agent
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={`nav-menus-wrapper ${menuOpen ? 'nav-menus-wrapper-open' : ''}`}>
            <ul className="nav-menu">

              {/* Home */}
              <li><Link to="/">Home</Link></li>

              {/* About */}
              <li><Link to="/about">About</Link></li>

              {/* DDIN Services Dropdown */}
              <li>
                <a href="#!">DDIN Services <span className="submenu-indicator"></span></a>
                <ul className="nav-dropdown nav-submenu xxl-menu">
                  <div className="row">
                    {/* Services Column */}
                    <div className="col-md-6">
                      <h6 className="lh-base fs-6 font--bold m-0">Services</h6>
                      {[
                        { href: '/agent_network_accelerator', icon: 'fa-mug-hot', bg: 'bg-light-success', text: 'success', label: 'Agent Network Accelerator Program' },
                        { href: '/agent_network_management', icon: 'fa-brands fa-slack', bg: 'bg-light-warning', text: 'warning', label: 'Agent Network Management Program' },
                        { href: '/community_agent_network', icon: 'fa-envelope-open-text', bg: 'bg-light-info', text: 'info', label: 'Community Agent Network' },
                        { href: '/Distribution_to_the_last_Mile', icon: 'fa-eye', bg: 'bg-light-purple', text: 'purple', label: 'Distribution to the Last Mile' },
                        { href: '/Liquidity_Float_Management', icon: 'fa-brands fa-dropbox', bg: 'bg-light-seegreen', text: 'seegreen', label: 'Liquidity & Float Management' },
                        { href: '/Below_Line_Market_Activation', icon: 'fa-briefcase', bg: 'bg-light-danger', text: 'danger', label: 'Below the Line & Market Activation' },
                      ].map((item) => (
                        <li key={item.href}>
                          <Link to={item.href}>
                            <div className="mega-advance-menu">
                              <div className={`mega-first square--50 rounded-2 ${item.bg} text-${item.text} fs-4`}>
                                <i className={`fa-solid ${item.icon}`}></i>
                              </div>
                              <div className="mega-last ps-2">
                                <h6 className="lh-base fs-6 font--bold m-0">{item.label}</h6>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </div>

                    {/* Agent Section Column */}
                    <div className="col-md-6">
                      <h6 className="lh-base fs-6 font--bold m-0">Agent Section</h6>
                      {[
                        { icon: 'fa-brands fa-shopify', bg: 'bg-light-primary', text: 'primary', label: 'Service Aggregation' },
                        { icon: 'fa-mobile-screen-button', bg: 'bg-light-orange', text: 'orange', label: 'All In One Services' },
                        { icon: 'fa-layer-group', bg: 'bg-light-success', text: 'success', label: 'Revenue Sharing' },
                        { icon: 'fa-lightbulb', bg: 'bg-light-purple', text: 'purple', label: 'Float Account To All Service' },
                      ].map((item, i) => (
                        <li key={i}>
                          <a href="#!">
                            <div className="mega-advance-menu">
                              <div className={`mega-first square--50 rounded-2 ${item.bg} text-${item.text} fs-4`}>
                                <i className={`fa-solid ${item.icon}`}></i>
                              </div>
                              <div className="mega-last ps-2">
                                <h6 className="lh-base fs-6 font--bold m-0">{item.label}</h6>
                              </div>
                            </div>
                          </a>
                        </li>
                      ))}
                    </div>
                  </div>
                </ul>
              </li>

              {/* Agents Dropdown */}
              <li>
                <a href="#!">Agents <span className="submenu-indicator"></span></a>
                <ul className="nav-dropdown nav-submenu">
                  <li><a href="#!">Digital Service</a></li>
                  <li><a href="#!">Product Services</a></li>
                </ul>
              </li>

              {/* Become an Agent */}
              <li><Link to="/became-an-agent">Become an Agent</Link></li>
              {/* Services */}
              <li><Link to="/services">Services</Link></li>
              {/* Dashboard */}
              <li><Link to="/dashboard">Dashboard</Link></li>
              {/* Contact */}
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>

            {/* Right side - Join Now */}
            <ul className="nav-menu nav-menu-social align-to-right">
              <li className="list-buttons light ms-2">
                <Link to="https://ee.kobotoolbox.org/x/a8ESAIFG" className="btn btn-info" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-sign-in-alt me-2"></i>Join Now
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;