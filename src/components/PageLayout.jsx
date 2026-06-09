// ─── Shared layout primitives ────────────────────────────────────────────────
// Used by all DDIN program pages (ANA, ANM, BTL, CAN, Distribution, Float)

// ── Label badge ──────────────────────────────────────────────────────────────
export function Label({ color = "danger", children }) {
  const map = {
    danger: "text-danger bg-light-danger",
    success: "text-success bg-light-success",
    orange: "text-orange bg-light-orange",
    seegreen: "text-seegreen bg-light-seegreen",
    primary: "text-primary bg-light-primary",
  };
  return (
    <div className={`label ${map[color]} d-inline-flex rounded-4 mb-2 font--medium`}>
      <span>{children}</span>
    </div>
  );
}

// ── Hero banner ───────────────────────────────────────────────────────────────
export function HeroBanner({ title, subtitle, description, imageSrc, imageAlt = "" }) {
  return (
    <div
      className="image-bottom-cover hero-header position-relative"
      style={{ background: "#202A4E url(/assets/img/bg2.png) no-repeat" }}
      data-overlay="0"
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="elcoss-excort mt-xl-2 mt-lg-2">
              <h1 className="mb-4">
                {title}
                {subtitle && (
                  <>
                    <br />
                    <span className="font--medium">{subtitle}</span>
                  </>
                )}
              </h1>
              <p className="fs-5 fw-light fs-mob">{description}</p>
            </div>
            <div className="btns-clasic mt-5 mb-3">
              <div className="btn-groupss">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="btn btn-lg btn-light font--medium px-lg-4 px-xl-5 mx-2 ms-0"
                >
                  Get Started
                  <i className="fa-solid fa-circle-arrow-right ms-2 opacity-50" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="position-relative mt-md-0 mt-4">
              <img
                className="d-block position-relative z-2 img-fluid"
                src={imageSrc}
                alt={imageAlt}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Two-col intro section (image left, text right) ────────────────────────────
export function IntroSection({ imageSrc, labelColor, labelText, title, body, ctaText = "Explore Benefit" }) {
  return (
    <section className="pt-8">
      <div className="container">
        <div className="row justify-content-between align-items-center mb-3">
          <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
            <div className="position-relative exloi">
              <img src={imageSrc} className="img-fluid" alt="" />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="position-relative exloi mt-md-0 mt-4">
              <div className="exloi-caption">
                <Label color={labelColor}>{labelText}</Label>
                <h2 className="mb-3 lh-base">{title}</h2>
                <p className="mb-0 fs-5 fw-light">{body}</p>
                <div className="sml-butns mt-5">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="btn btn-light-danger font--medium rounded-5"
                  >
                    {ctaText}
                    <i className="fa-regular fa-circle-right ms-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Two-col text-left + image-right subsection ────────────────────────────────
export function TextImageRow({ labelColor, labelText, title, body, imageSrc, overlayImages }) {
  return (
    <div className="container">
      <div className="row justify-content-between align-items-center mt-5">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
          <div className="position-relative exloi py-lg-0 pb-4">
            <div className="exloi-caption">
              <Label color={labelColor}>{labelText}</Label>
              <h2 className="mb-3 lh-base">{title}</h2>
              <p className="mb-0 fw-light fs-5">{body}</p>
            </div>
          </div>
        </div>
        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
          <div className="position-relative exloi mt-md-0 mt-4">
            {overlayImages && (
              <div className="position-absolute start-0 bottom-0 pb-4 ps-4 z-1">
                {overlayImages.map((src, i) => (
                  <div key={i} className={`dlick-img ${i > 0 ? "mt-1 ps-4" : "mb-2"}`}>
                    <img src={src} className="img-fluid rounded-3" width="210" alt="" />
                  </div>
                ))}
              </div>
            )}
            <div className="position-relative">
              <img src={imageSrc} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Benefits cards grid ───────────────────────────────────────────────────────
export function BenefitsSection({ sectionLabel = "Our benefits", title, subtitle, cards }) {
  return (
    <section className="gray">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-7 col-lg-7 col-md-11 mb-3">
            <div className="sec-heading text-center wow animated fadeInDown">
              <Label color="success">{sectionLabel}</Label>
              <h2 className="mb-1">{title}</h2>
              {subtitle && <p className="test-muted fs-6">{subtitle}</p>}
            </div>
          </div>
        </div>
        <div className="row justify-content-center g-4">
          {cards.map((card, i) => (
            <div key={i} className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
              <div className="card border-0 rounded-4 p-xl-5 p-4 wow animated fadeInUp">
                <div className="position-relative mb-3">
                  <div className="bg-light-primary flex-row text-primary rounded-3 d-inline-flex px-4 py-4">
                    <i className={`${card.icon} fs-2`} />
                  </div>
                </div>
                <div className="crd-srv mb-3">
                  <h4 className="font--bold mb-2">{card.title}</h4>
                  <p className="mb-0">{card.body}</p>
                </div>
                <div className="crd-link">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-primary font--medium"
                  >
                    View Services<i className="fa-regular fa-circle-right ms-2" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Step-services (why you'll love us) ───────────────────────────────────────
export function StepsSection({
  sectionLabel = "Loved Our Features",
  sectionTitle = "Why You'll Love Us?",
  sectionSubtitle,
  leftLabelColor = "orange",
  leftLabel,
  leftTitle,
  leftIntro,
  steps,
  rightImageSrc,
  rightOverlaySrc,
  bottomLabelColor = "seegreen",
  bottomLabel,
  bottomTitle,
  bottomBody,
  bottomLeftImageSrc,
  bottomRightOverlaySrc,
}) {
  return (
    <section>
      <div className="container">
        {/* Section heading */}
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-7 col-lg-7 col-md-11 mb-3">
            <div className="sec-heading text-center wow animated fadeInUp">
              <Label color="success">{sectionLabel}</Label>
              <h2 className="mb-1">{sectionTitle}</h2>
              {sectionSubtitle && <p className="test-muted fs-6">{sectionSubtitle}</p>}
            </div>
          </div>
        </div>

        {/* Steps row */}
        <div className="row justify-content-between align-items-center pb-4">
          <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
            <div className="position-relative exloi py-lg-0 py-4">
              <div className="exloi-caption wow animated fadeInLeft">
                <Label color={leftLabelColor}>{leftLabel}</Label>
                <h2 className="lh-base mb-3">{leftTitle}</h2>
                {leftIntro && <p className="mb-0 fs-5 fw-light">{leftIntro}</p>}
              </div>
              <div className="exloi-link mt-4">
                <div className="step-services mt-4 wow animated fadeInLeft">
                  {steps.map((step, i) => (
                    <div key={i} className="work-step">
                      <div className="work-thumb-icons">
                        <span className="work-icon-box bg-primary border border-4 border-light-primary">
                          <i className={`${step.icon} fs-4`} />
                        </span>
                        <span className="work-icon-box-line bg-primary" />
                      </div>
                      <div className="work-box-text">
                        <h4 className="fw-semibold text-dark mb-1">{step.title}</h4>
                        <p className="mb-0">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="position-relative exloi wow animated fadeInRight mt-md-0 mt-4">
              <div className="position-relative ps-4 pb-4">
                <img src={rightImageSrc} className="img-fluid rounded-3" alt="" />
              </div>
              {rightOverlaySrc && (
                <div className="position-absolute bottom-0 start-0">
                  <img src={rightOverlaySrc} className="img-fluid rounded-2 shadow" width="230" alt="" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom row: image left, text right */}
        <div className="row justify-content-between align-items-center mt-5">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="position-relative exloi wow animated fadeInLeft">
              <div className="position-relative pe-4 pb-4">
                <img src={bottomLeftImageSrc} className="img-fluid rounded-3" alt="" />
              </div>
              {bottomRightOverlaySrc && (
                <div className="position-absolute bottom-0 end-0">
                  <img src={bottomRightOverlaySrc} className="img-fluid rounded-2 shadow" width="230" alt="" />
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
            <div className="position-relative exloi mt-md-0 mt-4 wow animated fadeInRight">
              <div className="exloi-caption">
                <Label color={bottomLabelColor}>{bottomLabel}</Label>
                <h2 className="lh-base mb-3">{bottomTitle}</h2>
                <p className="mb-0 fs-5 fw-light">{bottomBody}</p>
              </div>
              <div className="exloi-link mt-4">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="btn btn-primary font--medium rounded-5"
                >
                  View Services<i className="fa-regular fa-circle-right ms-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Half-image split section (bg-light-seegreen) ──────────────────────────────
export function SplitHighlight({ icon = "fa-solid fa-wallet", title, body, imageSrc, cols }) {
  return (
    <section className="position-relative bg-light-seegreen">
      <div className="container py-4 py-lg-4">
        <div className="row">
          <div className="col-lg-7">
            <div className="row px-3 py-4">
              {cols ? (
                cols.map((col, i) => (
                  <div key={i} className="col-sm-6 mb-3">
                    <div className="pe-md-3 wow fadeInLeft animated">
                      <span className="text-seegreen fs-1 mb-4">
                        <i className={col.icon} />
                      </span>
                      <h5>{col.title}</h5>
                      <p>{col.body}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-sm-12 mb-3">
                  <div className="pe-md-3 wow fadeInLeft animated">
                    <span className="text-seegreen fs-1 mb-4">
                      <i className={icon} />
                    </span>
                    <h5>{title}</h5>
                    <p>{body}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="d-none d-lg-block col-md-5 position-absolute bg-cover top-0 end-0 h-100 rounded-start-5"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className="d-lg-none px-4 wow animated fadeInRight">
        <img className="img-fluid rounded-3" src={imageSrc} alt="" />
      </div>
    </section>
  );
}

// ── Engagement + performance two-section block ────────────────────────────────
export function EngagementBlock({ label, title, body, imageSrc, imageLeft = false }) {
  return (
    <section className="pt-6">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          {imageLeft ? (
            <>
              <div className="col-xl-5 col-lg-6 col-md-6 wow animated fadeInRight">
                <div className="position-relative animated fadeInRight">
                  <img src={imageSrc} className="img-fluid" alt="" />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="d-block position-relative wow animated fadeInLeft mt-md-0 mt-4">
                  <span className="label bg-light-orange text-orange animated fadeInLeft">{label}</span>
                  <h2 className="lh-base animated fadeInLeft">{title}</h2>
                  <p className="animated fadeInLeft">{body}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="d-block position-relative wow animated fadeInLeft mt-md-0 mt-4">
                  <span className="label bg-light-orange text-orange animated fadeInLeft">{label}</span>
                  <h2 className="lh-base animated fadeInLeft">{title}</h2>
                  <p className="animated fadeInLeft">{body}</p>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-6 wow animated fadeInRight">
                <div className="position-relative animated fadeInRight">
                  <img src={imageSrc} className="img-fluid" alt="" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Single-feature list (performance section) ─────────────────────────────────
const SVG_GRID = (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.3" d="M20 14H11C10.4 14 10 13.6 10 13V10C10 9.4 10.4 9 11 9H20C20.6 9 21 9.4 21 10V13C21 13.6 20.6 14 20 14ZM21 20V17C21 16.4 20.6 16 20 16H11C10.4 16 10 16.4 10 17V20C10 20.6 10.4 21 11 21H20C20.6 21 21 20.6 21 20Z" fill="currentColor" />
    <path d="M20 7H3C2.4 7 2 6.6 2 6V3C2 2.4 2.4 2 3 2H20C20.6 2 21 2.4 21 3V6C21 6.6 20.6 7 20 7ZM7 9H3C2.4 9 2 9.4 2 10V20C2 20.6 2.4 21 3 21H7C7.6 21 8 20.6 8 20V10C8 9.4 7.6 9 7 9Z" fill="currentColor" />
  </svg>
);
const SVG_USERS = (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.0173 9H15.3945C14.2833 9 13.263 9.61425 12.7431 10.5963L12.154 11.7091C12.0645 11.8781 12.1072 12.0868 12.2559 12.2071L12.6402 12.5183C13.2631 13.0225 13.7556 13.6691 14.0764 14.4035L14.2321 14.7601C14.2957 14.9058 14.4396 15 14.5987 15H18.6747C19.7297 15 20.4057 13.8774 19.912 12.945L18.6686 10.5963C18.1487 9.61425 17.1285 9 16.0173 9Z" fill="currentColor" />
    <rect opacity="0.3" x="14" y="4" width="4" height="4" rx="2" fill="currentColor" />
    <path d="M4.65486 14.8559C5.40389 13.1224 7.11161 12 9 12C10.8884 12 12.5961 13.1224 13.3451 14.8559L14.793 18.2067C15.3636 19.5271 14.3955 21 12.9571 21H5.04292C3.60453 21 2.63644 19.5271 3.20698 18.2067L4.65486 14.8559Z" fill="currentColor" />
    <rect opacity="0.3" x="6" y="5" width="6" height="6" rx="3" fill="currentColor" />
  </svg>
);
const SVG_ROCKET = (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 21.6C16.6 20.4 9.1 20.3 6.3 21.2C5.7 21.4 5.1 21.2 4.7 20.8L2 18C4.2 15.8 10.8 15.1 15.8 15.8C16.2 18.3 17 20.5 18 21.6ZM18.8 2.8C18.4 2.4 17.8 2.20001 17.2 2.40001C14.4 3.30001 6.9 3.2 5.5 2C6.8 3.3 7.4 5.5 7.7 7.7C9 7.9 10.3 8 11.7 8C15.8 8 19.8 7.2 21.5 5.5L18.8 2.8Z" fill="currentColor" />
    <path opacity="0.3" d="M21.2 17.3C21.4 17.9 21.2 18.5 20.8 18.9L18 21.6C15.8 19.4 15.1 12.8 15.8 7.8C18.3 7.4 20.4 6.70001 21.5 5.60001C20.4 7.00001 20.2 14.5 21.2 17.3ZM8 11.7C8 9 7.7 4.2 5.5 2L2.8 4.8C2.4 5.2 2.2 5.80001 2.4 6.40001C2.7 7.40001 3.00001 9.2 3.10001 11.7C3.10001 15.5 2.40001 17.6 2.10001 18C3.20001 16.9 5.3 16.2 7.8 15.8C8 14.2 8 12.7 8 11.7Z" fill="currentColor" />
  </svg>
);
export const SVGS = [SVG_GRID, SVG_USERS, SVG_ROCKET];

export function PerformanceSection({ features, imageSrc }) {
  return (
    <section className="pt-0">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="d-block position-relative wow animated fadeInLeft">
              <div className="position-relative features-slec mt-4">
                {features.map((f, i) => (
                  <div key={i} className="single-features mb-4">
                    <div className="sfl-icons">
                      <div className="mb-2">
                        <span className="svg-icon text-primary svg-icon-2hx">
                          {SVGS[i % SVGS.length]}
                        </span>
                      </div>
                    </div>
                    <div className="sfl-caps">
                      <h4 className="lh-base">{f.title}</h4>
                      <p className="m-0">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 col-md-6">
            <div className="position-relative wow animated fadeInRight mt-md-0 mt-4">
              <img src={imageSrc} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Horizontal feature cards (float management page) ─────────────────────────
export function FeatureCardsSection({ sectionLabel, title, subtitle, cards }) {
  const icons = [
    "fa-solid fa-wrench",
    "fa-brands fa-wordpress-simple",
    "fa-solid fa-screwdriver-wrench",
    "fa-brands fa-bandcamp",
  ];
  return (
    <section className="position-relative pt-4">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-7 col-lg-7 col-md-11 mb-3">
            <div className="sec-heading text-center wow fadeInUp animated">
              <Label color="success">{sectionLabel}</Label>
              <h2 className="mb-1">{title}</h2>
              {subtitle && <p className="test-muted fs-6">{subtitle}</p>}
            </div>
          </div>
        </div>
        <div className="row g-xl-5 g-lg-5 g-4">
          {cards.map((card, i) => (
            <div key={i} className="col-xl-6 col-lg-6 col-md-12">
              <div className="hgh-features-wrap d-flex gray-simple rounded-4 p-3 wow fadeInLeft animated">
                <div className="row align-items-center">
                  <div className="col-sm-3 col-3 h-100">
                    <div className="hgh-features-icons bg-white d-flex align-items-center justify-content-center rounded-3 h-100 py-3 h-mob-auto">
                      <i className={`${icons[i % icons.length]} text-success fs-1`} />
                    </div>
                  </div>
                  <div className="col-sm-9 col-9">
                    <div className="hgh-features-captions py-3 pe-3">
                      <h4 className="mb-2 fs-5">{card.title}</h4>
                      <p className="m-0">{card.body}</p>
                    </div>
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
