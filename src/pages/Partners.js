const partners = [
  { src: 'assets/img/brand/irembo.png', alt: 'Irembo' },
  { src: 'assets/img/brand/spenn.png', alt: 'Spenn' },
  { src: 'assets/img/brand/mobicash.png', alt: 'Mobicash' },
  { src: 'assets/img/brand/bk.png', alt: 'BK' },
  { src: 'assets/img/brand/ICT-Chamber-Logo.png', alt: 'ICT Chamber' },
  { src: 'assets/img/brand/ecobank.png', alt: 'Ecobank' },
  { src: 'assets/img/brand/fdi.png', alt: 'FDI' },
  { src: 'assets/img/brand/mpost.png', alt: 'MPost' },
  { src: 'assets/img/brand/old.png', alt: 'Old Mutual' },
  { src: 'assets/img/brand/pindo.png', alt: 'Pindo' },
  { src: 'assets/img/brand/rra.png', alt: 'RRA' },
  { src: 'assets/img/brand/ahupa.png', alt: 'Ahupa' },
];

function Partners() {
  return (
    <section className="gray-simple">
      <div className="container">

        <div className="row align-items-center justify-content-center">
          <div className="col-xl-7 col-lg-7 col-md-11 mb-3">
            <div className="sec-heading text-center">
              <div className="label text-success bg-light-success d-inline-flex rounded-4 mb-2 font--medium">
                <span>Loved by our clients</span>
              </div>
              <h2 className="mb-1">
                Working With <span style={{ color: '#F8882B' }}>The Best Partners</span>
              </h2>
              <p className="text-muted fs-6">
                We believe in the power of collaboration. Our partnerships are instrumental in
                delivering exceptional products and services to our customers. Together, we achieve more.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center row-cols-3 row-cols-md-5 row-cols-lg-6 g-md-4 g-3">
          {partners.map((partner) => (
            <div key={partner.alt} className="col">
              <div className="card border-0 rounded-4 px-4 py-4">
                <div className="position-relative text-center">
                  <img
                    src={`/${partner.src}`}
                    className="img-fluid"
                    alt={partner.alt}
                    style={{ height: 50, objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Partners;