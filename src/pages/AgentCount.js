import { agentNetworkStats } from '../data/agentStats';
import CountUp from '../components/CountUp';

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
                <h2 className="fs-1 mb-2 lh-base">
                  <CountUp value={agentNetworkStats.total} /> registered agents{' '}
                  <span style={{ color: '#F8882B' }}>across Rwanda</span>
                </h2>
                <p className="text-muted mb-2">DDIN registry snapshot · {agentNetworkStats.updatedAt}</p>
              </div>
            </div>

            {/* Region cards */}
            {agentNetworkStats.provinces.map((region) => (
              <div key={region.label} className="col-lg-2 col-md-4 col-sm-6 col-6 my-3">
                <div className={`card border-0 ${region.colorClass} rounded-4`}>
                  <div className="card-body">
                    <h3 className="fs-1"><CountUp value={region.count} /></h3>
                    <p className={`fs-sm font--medium mb-0 ${region.textClass}`}>
                      {region.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-12">
              <small className="text-muted"><CountUp value={agentNetworkStats.unmappedProvince} /> registry records do not list a province.</small>
            </div>

          </div>
        </div>
      </section>
      <div className="clearfix"></div>
    </>
  );
}

export default AgentCount;
