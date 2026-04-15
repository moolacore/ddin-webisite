const regions = [
  { count: '1,018', label: 'Kigali City',        colorClass: 'bg-light-success', textClass: 'text-success' },
  { count: '807',   label: 'Southern Province',   colorClass: 'bg-light-warning', textClass: 'text-warning' },
  { count: '771',   label: 'Northern Province',   colorClass: 'bg-light-info',    textClass: 'text-info'    },
  { count: '682',   label: 'Eastern Province',    colorClass: 'bg-light-danger',  textClass: 'text-danger'  },
  { count: '922',   label: 'Western Province',    colorClass: 'bg-light-info',    textClass: 'text-info'    },
];

function AgentCount() {
  return (
    <>
      <section>
        <div className="container">
          <div className="row align-items-center">

            {/* Heading */}
            <div className="col-12 mb-3">
              <div className="position-relative">
                <div className="label text-success bg-light-success d-inline-flex rounded-4 mb-2 font--medium">
                  <span>Our Areas</span>
                </div>
                <h2 className="fs-1 mb-3 lh-base">
                  Local Agents Everywhere{' '}
                  <span style={{ color: '#F8882B' }}>Across Rwanda</span>
                </h2>
              </div>
            </div>

            {/* Region cards */}
            {regions.map((region) => (
              <div key={region.label} className="col-md-2 col-sm-6 col-6 mx-3 my-3">
                <div className={`card border-0 ${region.colorClass} rounded-4`}>
                  <div className="card-body">
                    <h3 className="fs-1">{region.count}+</h3>
                    <p className={`fs-sm font--medium mb-0 ${region.textClass}`}>
                      {region.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
      <div className="clearfix"></div>
    </>
  );
}

export default AgentCount;