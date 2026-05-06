import React from 'react'
import AgentCount from './AgentCount'
import Partners from './Partners'
import CTA from './CTA'

function BecameAnAgent() {
  return (
    <div>
      {/* ============================ Breadcrumbs =========================== */}
      <section className="bg-cover" style={{ background: "url(assets/img/banner.jpg) no-repeat" }} data-overlay="4">
        <div className="ht-80"></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-10 col-12">
              <h1 className="text-light mb-4">Unlock the power today <br />Network of the Best</h1>
              <p className="fs-5 fw-light text-light mb-4">Join now to be a part of our thriving community and take your journey to the next level</p>
              <a href="/agent/profile" className="btn btn-primary px-5">Join Now...</a>
            </div>
          </div>
        </div>
        <div className="ht-80"></div>
      </section>
      {/* ============================ Breadcrumbs End ======================= */}

      {/* ============================ Reason For Love Us Start ================================== */}
      <section className="pt-0">
        <div className="container">

          <div className="row justify-content-between align-items-center mt-5 pb-5">

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="position-relative exloi">
                <div className="exloi-caption">
                  <div className="label text-success bg-light-success d-inline-flex rounded-4 mb-2 font--medium"><span>Collaborate with Us</span></div>
                  <h2 className="mb-3 lh-base">Discover IN DDIN AGENT Network</h2>
                  <p className="mb-0 fs-5 fw-light">Unlock new markets and business opportunities with the dependable DDIN Agent Network. Join us to connect, collaborate, and expand your reach.</p>

                </div>
              </div>
            </div>

            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <div className="position-relative exloi mt-md-0 mt-4">

                <div className="position-relative">
                  <img src="/assets/img/side-5.jpg" className="img-fluid rounded-4" alt="" />
                </div>
              </div>
            </div>

          </div>
          <div className="row justify-content-between align-items-center pb-5">

            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <div className="position-relative exloi">
                <div className="position-relative">
                  <img src="/assets/img/blog-2.jpg" className="img-fluid rounded-3" alt="" />
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="position-relative exloi mt-md-0 mt-4">
                <div className="exloi-caption">
                  <div className="label text-success bg-light-success d-inline-flex rounded-4 mb-2 font--medium"><span>User benefit</span></div>
                  <h2 className="mb-3 lh-base">Empower Your Success with IN DDIN AGENT Network</h2>
                  <p className="mb-0 fs-5 fw-light">Experience the undeniable strength of our market presence and our unwavering commitment to a customer-centric culture. At DDIN, we specialize in delivering not only growth but also fostering financial inclusion for our valued partners. Join us in the journey towards prosperity and success.</p>
                  <ul className="m-0 p-0 mt-4 row">
                    <li className="py-2 fs-6 col-sm-6"><i className="fa-solid fa-check text-success me-2"></i>Authorization & Services Integrated At One Cost</li>
                    <li className="py-2 fs-6 col-sm-6"><i className="fa-solid fa-check text-success me-2"></i>Training & Support Management</li>
                    <li className="py-2 fs-6 col-sm-6"><i className="fa-solid fa-check text-success me-2"></i>Merging System Available</li>
                    <li className="py-2 fs-6 col-sm-6"><i className="fa-solid fa-check text-success me-2"></i>Reach More With Less</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <div className="clearfix"></div>
      {/* ============================ Reason For Love Us End ================================== */}

      {/* ============================ Call To Action ================================== */}
      <section className="p-lg-0 call-action-container bg-success position-relative">
        <div className="position-absolute top-0 end-0 z-0">
          <img src="/assets/img/alert-bg.png" alt="SVG" width="300" />
        </div>
        <div className="position-absolute bottom-0 start-0 me-10 z-0">
          <img src="/assets/img/circle.png" alt="SVG" width="150" />
        </div>
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">

              <div className="call-action-wraps py-4">
                <div className="call-action-caption mb-5">
                  <h2 className="text-light lh-base mb-3">One Integrated Platform.</h2>
                  <p className="text-light fs-5 fw-light">Experience the future of convenience with DDIN, where we seamlessly bring together a wide array of services from various institutions into a single, integrated platform. Simplify your life, streamline your tasks, and access everything you need in one place.</p>
                </div>
                <div className="call-action-forms">
                  <div className="btns-clasic mt-5 mb-3">
                    <div className="btn-groupss">
                      <a href="JavaScript:Void(0);" className="btn btn-lg btn-success border-light font--medium px-lg-4 px-xl-5 mx-2 my-2">How It Work</a>
                      <a href="JavaScript:Void(0);" className="btn btn-lg btn-whites text-success font--medium px-lg-4 px-xl-5 mx-2 my-2">Discover More..<i className="fa-solid fa-circle-play ms-2"></i></a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-xl-5 col-lg-5">

              <div className="call-action-thumb d-lg-block d-none">
                <div className="call-action-caption">
                  <img src="/assets/img/mob-app.png" className="img-fluid" alt="img app" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 pt-8">
        <div className="container">

          <div className="row justify-content-between align-items-center mb-8">

            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <div className="position-relative exloi wow animated fadeInLeft">
                <div className="exloi-caption">
                  <div className="label text-success bg-light-success d-inline-flex rounded-4 mb-2 font--medium"><span>Best Deals</span></div>
                  <h2 className="mb-3 lh-base">Ever wanted optimized agent network platform?</h2>
                  <p className="mb-0 fs-5 fw-light">Search no more, minimize the chances of cash shortages, and ensure punctual deposits through an integrated agent platform.</p>
                  <ul className="m-0 p-0 mt-4">
                    <li className="py-2 fs-6"><i className="fa-solid fa-check text-success me-2"></i>No need to search further</li>
                    <li className="py-2 fs-6"><i className="fa-solid fa-check text-success me-2"></i>Reduce the risk of cash shortages</li>
                    <li className="py-2 fs-6"><i className="fa-solid fa-check text-success me-2"></i>Merging System Available</li>
                    <li className="py-2 fs-6"><i className="fa-solid fa-check text-success me-2"></i>Ensure timely deposits</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <div className="position-relative exloi mt-md-0 mt-4 wow animated fadeInRight">
                <div className="position-relative">
                  <img src="/assets/img/image1.png" className="img-fluid" alt="" />
                </div>
              </div>
            </div>

          </div>

          <div className="row justify-content-between align-items-center mt-8">

            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <div className="position-relative exloi wow animated fadeInLeft">
                <div className="position-relative">
                  <img src="/assets/img/image3.jpg" className="img-fluid" alt="" />
                </div>
              </div>
            </div>

            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <div className="position-relative exloi mt-md-0 mt-4 wow animated fadeInRight">
                <div className="exloi-caption">
                  <div className="label text-success bg-light-success d-inline-flex rounded-4 mb-2 font--medium"><span>Easy marketing</span></div>
                  <h2 className="mb-3 lh-base">Empowering Customers through a Nationwide Network of Independent Agents</h2>
                  <p className="mb-0 fs-5 fw-light">We support decentralizing services for customers through our network of independent agents across the country.
                    Through ongoing orientation and refresher training, our agents acquire the modern skills needed to complete assigned work flawlessly.</p>

                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
      <div className="clearfix"></div>

      <section className="position-relative">
        <div className="position-absolute top-0 start-0 end-0 gray-simple ht-500"></div>
        <div className="container position-relative z-1">

          <div className="row align-items-center justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-11 mb-3">
              <div className="sec-heading text-center">
                <div className="label text-success bg-light-success d-inline-flex rounded-4 mb-2 font--medium"><span>Our Services</span></div>
                <h2 className="mb-1">Effortless Expansion<br /> Building a Well-Trained Network with Ease</h2>
                <p className="test-muted fs-6">Let us help you extend your market reach and grow your network without incurring extra expenses. Our support ensures a well-trained team in no time.</p>
              </div>
            </div>
          </div>

        </div>
      </section >

      <AgentCount />

      <Partners />

      <CTA />
    </div >
  )
}

export default BecameAnAgent;