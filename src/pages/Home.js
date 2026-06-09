import Banner from '../pages/Banner';
import AgentCount from '../pages/AgentCount';
import ServicesSection from '../pages/ServicesSection';
import Partners from '../pages/Partners';
import CTA from '../pages/CTA';
import DDINPaymentPage from '../pages/DDINPaymentPage';

function Home() {
  return (
    <>
      <Banner />

      {/* ====== Pay Services ====== */}
      <DDINPaymentPage />

      {/* ====== Who We Are ====== */}
      <section className="pt-8">
        <div className="container">

          {/* Row 1 */}
          <div className="row justify-content-between align-items-center mb-3">
            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <div className="position-relative exloi">
                <div className="position-relative">
                  <img src="/assets/img/picture1.png" className="img-fluid" alt="Who we are" />
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="position-relative exloi mt-md-0 mt-4">
                <div className="exloi-caption">
                  <div className="label text-primary bg-light-warning d-inline-flex rounded-4 mb-2 font--medium">
                    <span>who we are</span>
                  </div>
                  <h2 className="mb-3 lh-base">
                    Agent Network with <span style={{ color: '#F8882B' }}>4200+ Experts</span>
                  </h2>
                  <p className="mb-0 fs-5 fw-light">
                    DDIN serves as a management platform for a network of independent agents located
                    throughout the country. We bring together various services offered by different
                    institutions, organizations or companies onto a single platform.
                  </p>
                  <div className="sml-butns mt-5">
                    <a href="/about" className="btn btn-light-warning font--medium rounded-5">
                      Explore more <i className="fa-regular fa-circle-right ms-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="row justify-content-between align-items-center mt-5">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="position-relative exloi py-lg-0 pb-4">
                <div className="exloi-caption">
                  <div className="label text-danger bg-light-warning d-inline-flex rounded-4 mb-2 font--medium">
                    <span>we stand</span>
                  </div>
                  <h2 className="mb-3 lh-base">
                    <span style={{ color: '#F8882B' }}>DDIN ranks among the foremost </span>
                    network companies in Rwanda
                  </h2>
                  <p className="mb-0 fw-light fs-5">
                    DDIN stands as the top agent network company in Rwanda, boasting 4200+ seasoned
                    representatives countrywide. We bring together a variety of services from various
                    organizations onto a single, unified platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <div className="position-relative exloi mt-md-0 mt-4">
                <div className="position-relative">
                  <img src="/assets/img/about.png" className="img-fluid" alt="About DDIN" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <div className="clearfix"></div>

      <AgentCount />
      <ServicesSection />

      {/* ====== Features Strip ====== */}
      <section className="bg-seegreen pt-4 pb-4">
        <div className="container">
          <div className="row g-4">
            {[
              {
                icon: 'fa-regular fa-clock',
                title: 'Time Saving',
                desc: 'Our efficient agent network streamlines transactions, saving you valuable time and making it easier.',
              },
              {
                icon: 'fa-solid fa-shield-heart',
                title: 'Secure Payment',
                desc: 'With our robust agent network, your transactions are handled securely and reliably, ensuring peace of mind.',
              },
              {
                icon: 'fa-solid fa-headset',
                title: '24x7 Support',
                desc: 'Our dedicated agent network provides round-the-clock support, ensuring you can get help whenever you need it.',
              },
            ].map((feature) => (
              <div key={feature.title} className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                <div className="d-flex align-items-center">
                  <div className="exljk-icon text-warning fs-2">
                    <i className={feature.icon}></i>
                  </div>
                  <div className="exljk-caps ps-3">
                    <h5 className="text-light fw-semibold">{feature.title}</h5>
                    <p className="m-0 text-light lh-base opacity-75">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="clearfix"></div>

      {/* ====== Integration Section ====== */}
      <section className="pt-8">
        <div className="container">

          {/* Row 1 */}
          <div className="row justify-content-between align-items-center mb-8">
            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <div className="position-relative exloi">
                <img src="/assets/img/image_banner.png" className="img-fluid" alt="Integration" />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="position-relative exloi mt-md-0 mt-4">
                <div className="exloi-caption">
                  <div className="label text-success bg-light-success d-inline-flex rounded-4 mb-2 font--medium">
                    <span>integration</span>
                  </div>
                  <h2 className="mb-3 lh-base">
                    DDIN aggregates <span style={{ color: '#F8882B' }}>multiple services</span> from
                    different institutions into{' '}
                    <span style={{ color: '#F8882B' }}>one integrated platform.</span>
                  </h2>
                  <div className="sml-butns mt-5">
                    <a href="#" className="btn btn-light-success font--medium rounded-5">
                      Learn more <i className="fa-regular fa-circle-right ms-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="row justify-content-between align-items-center mt-5">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="position-relative exloi py-lg-0 pb-4">
                <div className="exloi-caption">
                  <h2 className="mb-3 lh-base">
                    We help <span style={{ color: '#F8882B' }}>decentralize</span> your services to
                    end customers through our independent{' '}
                    <span style={{ color: '#F8882B' }}>agent network</span> across the country
                  </h2>
                  <div className="sml-butns mt-5">
                    <a href="/contact" className="btn btn-light-success font--medium rounded-5">
                      schedule a call <i className="fa-regular fa-circle-right ms-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <div className="position-relative exloi mt-md-0 mt-4">
                <img src="/assets/img/mob-app.png" className="img-fluid" alt="Mobile App" />
              </div>
            </div>
          </div>

        </div>
      </section>
      <div className="clearfix"></div>

      <Partners />
      <CTA />
    </>
  );
}

export default Home;