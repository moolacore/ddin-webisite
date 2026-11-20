import React from 'react';
import { agentNetworkStats } from '../data/agentStats';
import CountUp from './CountUp';

const services = [
  { label: "Agent Network Accelerator Program", href: "/agent_network_accelerator" },
  { label: "Agent Network Management Program", href: "/agent_network_management" },
  { label: "Community Agent Network",          href: "/community_agent_network" },
  { label: "Distribution to the last Mile",    href: "/Distribution_to_the_last_Mile" },
  { label: "Liquidity & Float Management",     href: "/Liquidity_Float_Management" },
  { label: "Below the Line & Market Activation", href: "/Below_Line_Market_Activation" },
];

const agentLinks = [
  "Service aggregation",
  "All In One Services",
  "Harmonized Requirements",
  "Revenue Sharing",
  "Float Account To All Service",
];

const companyLinks = [
  { label: "Home",           href: "/" },
  { label: "About Us",       href: "/about" },
  { label: "Contact Us",     href: "/contact" },
  { label: "Become an agent", href: "/agent-registration" },
];

const socials = [
  { icon: "fa-facebook",    href: "#" },
  { icon: "fa-linkedin",    href: "https://www.linkedin.com/company/103228948/admin/dashboard/" },
  { icon: "fa-google-plus", href: "#" },
  { icon: "fa-twitter",     href: "https://x.com/DdinLtd" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer skin-light-footer">
      <div>
        <div className="container">
          <div className="row">

            {/* Logo & Description */}
            <div className="col-lg-3 col-md-4">
              <div className="footer-widget">
                <a href="/"><img src="/assets/img/logo.png" className="img-footer" alt="DDIN Logo" /></a>
                <div className="footer-add">
                  <p>we specialize in creating seamless connections and optimizing networks to keep your business running smoothly</p>
                </div>
                <div className="foot-socials">
                  <ul>
                    {socials.map(({ icon, href }) => (
                      <li key={icon}>
                        <a href={href}><i className={`fa-brands ${icon}`}></i></a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Our Services */}
            <div className="col-lg-3 col-md-4">
              <div className="footer-widget">
                <h4 className="widget-title font--bold">Our Services</h4>
                <ul className="footer-menu">
                  {services.map(({ label, href }) => (
                    <li key={href}><a href={href}>{label}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Agent Section */}
            <div className="col-lg-3 col-md-4">
              <div className="footer-widget">
                <h4 className="widget-title">Agent Section</h4>
                <ul className="footer-menu">
                  {agentLinks.map((label) => (
                    <li key={label}><a href="#">{label}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The Company */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h4 className="widget-title">The Company</h4>
                <ul className="footer-menu">
                  {companyLinks.map(({ label, href }) => (
                    <li key={href}><a href={href}>{label}</a></li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center justify-content-between">

            <div className="col-xl-4 col-lg-4 col-md-4">
              <p className="mb-0">DDIN &copy; {currentYear}</p>
            </div>

            <div className="col-xl-8 col-lg-8 col-md-8">
              <div className="job-info-count-group">
                {agentNetworkStats.provinces.map(({ count, label }) => (
                  <div className="single-jb-info-count" key={label}>
                    <div className="jbs-y7">
                      <h5 className="ctr"><CountUp value={count} /></h5>
                    </div>
                    <div className="jbs-y5">
                      <p>{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
