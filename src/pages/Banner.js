import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { agentNetworkStats } from '../data/agentStats';
import CountUp from '../components/CountUp';

const slides = [
  {
    bg: 'assets/img/banner1.jpg',
    heading: (
      <>
        Empower your business nationwide with a{' '}
        <span style={{ color: '#F8882B' }}>decentralised agent network.</span>
      </>
    ),
    stats: [
      { value: agentNetworkStats.total, label: 'Registered agents' },
    ],
    image: 'assets/img/image_banner.png',
    imageAlt: 'Moola Plus agent services shown on a laptop and phone',
  },
  {
    bg: 'assets/img/banner2.jpg',
    heading: (
      <>
        Handle everyday agent services with{' '}
        <span style={{ color: '#F8882B' }}>Moola Plus</span> — from payments and balance checks
        to transactions and commissions.
      </>
    ),
    stats: [],
    image: 'assets/img/image_banner.png',
    imageAlt: 'Moola Plus agent services shown on a laptop and phone',
  },
  {
    bg: 'assets/img/banner2.jpg',
    heading: (
      <>
        Join DDIN and serve customers in your community through a{' '}
        <span style={{ color: '#F8882B' }}>nationwide network of independent agents.</span>
      </>
    ),
    stats: [],
    image: 'assets/img/about.png',
    imageAlt: 'DDIN community',
  },
];

function Banner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current, paused, goTo]);

  return (
    <div
      className="position-relative overflow-hidden"
      style={{ backgroundColor: '#202A4E' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides track */}
      <div
        style={{
          display: 'flex',
          transform: `translateX(-${current * 100}%)`,
          transition: 'transform 0.6s ease-in-out',
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-100 position-relative"
            style={{ minHeight: '100vh' }}
          >
            {/* Background image overlay */}
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                backgroundImage: `url('${slide.bg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.15,
              }}
            />

            {/* Slide content */}
            <div
              className="container d-flex align-items-center position-relative"
              style={{ minHeight: '100vh', zIndex: 1 }}
            >
              <div className="row justify-content-between align-items-center w-100 py-5">
                {/* Text column */}
                <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12">
                  <h1
                    className="text-white mb-4 lh-base"
                    style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 500 }}
                  >
                    {slide.heading}
                  </h1>

                  {slide.stats.length > 0 && (
                    <div className="d-flex gap-5 mb-4">
                      {slide.stats.map((stat) => (
                        <div key={stat.label}>
                          <div
                            className="text-white"
                            style={{ fontSize: '1.8rem', fontWeight: 500 }}
                          >
                            <CountUp value={stat.value} />
                          </div>
                          <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem' }}>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="d-flex flex-wrap gap-2 mt-4">
                    <a
                      href="/services"
                      className="btn btn-success font--medium px-4 rounded-5"
                    >
                      How it works
                    </a>
                    <Link
                      to="/agent-registration"
                      className="btn btn-outline-light font--medium px-4 rounded-5"
                    >
                      Become an agent{' '}
                      <i className="fa-solid fa-circle-play ms-2"></i>
                    </Link>
                  </div>
                </div>

                {/* Image column */}
                <div className="col-xl-5 col-lg-5 col-md-5 d-none d-md-block">
                  <img
                    src={`/${slide.image}`}
                    alt={slide.imageAlt}
                    className="img-fluid"
                    style={{ maxHeight: '480px', objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={() => goTo(current - 1)}
        className="position-absolute top-50 translate-middle-y btn p-0"
        style={{
          left: '1rem',
          zIndex: 10,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff',
        }}
        aria-label="Previous slide"
      >
        &#8592;
      </button>
      <button
        onClick={() => goTo(current + 1)}
        className="position-absolute top-50 translate-middle-y btn p-0"
        style={{
          right: '1rem',
          zIndex: 10,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff',
        }}
        aria-label="Next slide"
      >
        &#8594;
      </button>

      {/* Dot indicators */}
      <div
        className="position-absolute bottom-0 start-50 translate-middle-x d-flex gap-2 pb-4"
        style={{ zIndex: 10 }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: i === current ? 4 : '50%',
              background: i === current ? '#F8882B' : 'rgba(255,255,255,0.4)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
