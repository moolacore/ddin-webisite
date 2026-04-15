function CTA() {
  return (
    <section className="bg-cover call-action-container bg-dark position-relative">
      {/* Background decorations */}
      <div className="position-absolute bottom-0 end-0" style={{ zIndex: 0 }}>
        <img src="/assets/img/alert-bg.png" alt="" width={300} />
      </div>
      <div className="position-absolute bottom-0 start-0" style={{ zIndex: 0 }}>
        <img src="/assets/img/circle.png" alt="" width={150} />
      </div>

      {/* Main content */}
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-12 col-sm-12">
            <div className="call-action-wraps">
              <div className="call-action-captions">
                <h2 className="text-light mb-4 lh-base">
                  Are You Really Interested To
                  <br />
                  Work With Us?
                </h2>
                <p className="text-light fs-6 mb-4">
                  Our agents receive current training to ensure they stay compliant and deliver
                  exceptional performance.
                </p>
                <div className="call-btn-groups">
                  <a href="/contact" className="btn btn-primary font--medium me-4 my-2">
                    Connect With Us
                  </a>
                  <a href="tel:+250783038641" className="btn btn-whites font--medium my-2">
                    Call: +250 783 038 641
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right-side image (desktop only) */}
      <div
        className="position-absolute bottom-0 end-0 me-5 d-none d-md-flex"
        style={{ zIndex: 0 }}
      >
        <img src="/assets/img/about.png" alt="" width={350} />
      </div>
    </section>
  );
}

export default CTA;