const services = [
  {
    title: 'Agent Network Accelerator',
    desc: 'Build a well-trained network in no time. We help you expand your market reach with no further recruitment.',
    href: '/agent_network_accelerator',
  },
  {
    title: 'ANM, Agent Network Management',
    desc: 'Leave it to us. At DDIN, we recruit, train, and manage agents networks requirements for your business.',
    href: '/agent_network_management',
  },
  {
    title: 'Community Agent Network',
    desc: 'Want to trade with specific groups of clients? We will help you, DDIN customize your market niche with a specific targeted market segmentation.',
    href: '/community_agent_network',
  },
  {
    title: 'Market Activation',
    desc: 'DDIN\'s below-the-line strategy makes market breakthrough hassle-free. Take your business straight to potential customers.',
    href: '/Below_Line_Market_Activation',
  },
  {
    title: 'Product Distribution',
    desc: 'Distribute to the last mile. Place your products as near as your customers would walk.',
    href: '/Distribution_to_the_last_Mile',
  },
  {
    title: 'Liquidity & Float Management',
    desc: 'Adequate float, reliable cash flow, seamless transactions.',
    href: '/Liquidity_Float_Management',
  },
];

function ServicesSection() {
  return (
    <section className="position-relative gray">
      <div className="container">

        <div className="row align-items-center justify-content-center">
          <div className="col-xl-7 col-lg-7 col-md-11 mb-3">
            <div className="sec-heading text-center">
              <div className="label text-success bg-light-success d-inline-flex rounded-4 mb-2 font--medium">
                <span>Services</span>
              </div>
              <h2 className="mb-1">
                Discover <span style={{ color: '#F8882B' }}>More About</span> Our Services
              </h2>
              <p className="text-muted fs-6">
                We take pride in offering a diverse range of solutions tailored to meet your needs.
                Explore our service categories below to find the perfect solution for you.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-xl-4 g-lg-3 g-3">
          {services.map((service) => (
            <div key={service.href} className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="verticle-blog-wrap bg-white p-3 rounded-2">
                <div className="article-caption py-2">
                  <div className="article-heads mb-3">
                    <h4 className="font--bold mb-1">{service.title}</h4>
                  </div>
                  <div className="article-desc mb-3">
                    <p className="m-0">{service.desc}</p>
                  </div>
                  <div className="article-links">
                    <a href={service.href} className="text-seegreen font--bold">
                      Continue Reading <i className="fa-solid fa-arrow-right ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;