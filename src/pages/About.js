import React from 'react';
import ServicesSection from './ServicesSection';
import Partners from './Partners';
import CTA from './CTA';

const purposeCards = [
    {
        icon: "fa-brands fa-twitter",
        bgClass: "bg-light-success text-success",
        title: "Vision",
        content: "To become a leading distribution Network, with the ultimate goal of driving sustainable growth and promoting financial inclusion in Africa communities",
        type: "text",
    },
    {
        icon: "fa-solid fa-images",
        bgClass: "bg-light-warning text-warning",
        title: "Mission",
        content: "Providing an integrated distribution agent network in Africa and connecting diverse markets by delivering exceptional value to our esteemed customers.",
        type: "text",
    },
    {
        icon: "fa-solid fa-lightbulb",
        bgClass: "bg-light-purple text-purple",
        title: "Core value",
        type: "list",
        items: [
            "Keep People Involved",
            "The Network of the Best",
            "Completing tasks exactly on time",
        ],
    },
    {
        icon: "fa-solid fa-envelope-open-text",
        bgClass: "bg-light-info text-info",
        title: "Goal",
        type: "list",
        items: [
            "Aiming to establish a strong market presence",
            "Foster a customer-centric culture",
            "Drive sustainable growth",
            "And promote financial inclusion in Africa through a leading both service aggregator platform and distribution network.",
        ],
    },
];

function About() {
    return (
        <div>
            {/* ============================ Breadcrumbs =========================== */}
            <section
                className="bg-cover">
                <div className="ht-80"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-10 col-12">
                            <h1 className="text-light mb-4">We're Here for<br />Solving your Solutions</h1>
                            <p className="fs-5 fw-light text-light mb-4">
                                We unite a multitude of services from diverse institutions onto a single, user-friendly platform
                            </p>
                            <a href="#about" className="btn btn-primary px-5">Know More..</a>
                        </div>
                    </div>
                </div>
                <div className="ht-80"></div>
            </section>
            {/* ============================ Breadcrumbs End ======================= */}

            {/* ============================ About Section Start ================================== */}
            <section className="pt-8" id="about">
                <div className="container">

                    {/* Row 1: Image Left, Text Right */}
                    <div className="row justify-content-between align-items-center mb-3">
                        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                            <div className="position-relative exloi">
                                <div className="position-relative">
                                    <img src="/assets/img/image1.png" className="img-fluid" alt="About DDIN" />
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div className="position-relative exloi mt-md-0 mt-4">
                                <div className="exloi-caption">
                                    <div className="label text-warning bg-light-warning d-inline-flex rounded-4 mb-2 font--medium">
                                        <span>About us</span>
                                    </div>
                                    <h2 className="mb-3 lh-base">
                                        DDIN, Agent Network with{' '}
                                        <span style={{ color: '#F8882B' }}>3000+ Experts</span>
                                    </h2>
                                    <p className="mb-0 fs-5 fw-light">
                                        DDIN is the number #1 leading agent network company in Rwanda with over 3000 experienced
                                        representatives across the country. DDIN aggregates multiple services from different
                                        institutions into one integrated platform.
                                    </p>
                                    <div className="sml-butns mt-5">
                                        <a href="#" className="btn btn-light-warning font--medium rounded-5">
                                            Explore more <i className="fa-regular fa-circle-right ms-2"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Text Left, Image Right */}
                    <div className="row justify-content-between align-items-center mt-5">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div className="position-relative exloi py-lg-0 pb-4">
                                <div className="exloi-caption">
                                    <div className="label text-danger bg-light-danger d-inline-flex rounded-4 mb-2 font--medium">
                                        <span>Easy marketing</span>
                                    </div>
                                    <h2 className="mb-3 lh-base">
                                        Empowering Communities with{' '}
                                        <span style={{ color: '#F8882B' }}>Agent Network Management</span>
                                    </h2>
                                    <p className="mb-0 fw-light fs-5">
                                        We decentralize your services to end customers, through agents network management
                                        framework operating from provincial to sector level.
                                    </p>
                                    <div className="lios-vrst">
                                        <ul>
                                            {[
                                                { count: 4200, label: 'Agent network' },
                                                { count: 6900, label: 'Agent network targeting by 2024' },
                                            ].map(({ count, label }) => (
                                                <li key={label}>
                                                    <div className="lios-parts mx-3">
                                                        <h2>
                                                            <span className="ctr me-1">{count}</span>
                                                            <span style={{ color: '#F8882B' }}>+</span>
                                                        </h2>
                                                        <h6 className="text-muted">{label}</h6>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                            <div className="position-relative exloi mt-md-0 mt-4">
                                <div className="position-relative">
                                    <img src="/assets/img/image3.jpg" className="img-fluid" alt="Agent Network" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <div className="clearfix"></div>
            {/* ============================ About Section End ================================== */}

            {/* ============================ Purpose Section Start ================================== */}
            <section className="bg-dark">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-xxl-5 col-xl-4 col-lg-4">
                            <div className="position-relative py-lg-0 pb-4">
                                <h2 className="mb-3 fs-1 mb-lg-3" style={{ color: '#F8882B' }}>Our purpose</h2>
                                <p className="text-light fs-5 fw-light">
                                    DDIN specializes in agent network management, focusing on leveraging digital technology
                                    to promote financial inclusion and enhance access to financial services. DDIN's operations
                                    align with the government's initiatives to promote financial inclusion and contribute to
                                    Rwanda's socio-economic development.
                                </p>
                                <div className="position-relative mt-3">
                                    <button type="button" className="btn btn-danger">Learn More</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-6 col-xl-7 col-lg-7 col-md-12 offset-xxl-1 offset-xl-1 offset-lg-1">
                            <div className="row gy-xl-5 gy-lg-5 gy-4 gx-4">
                                {purposeCards.map(({ icon, bgClass, title, content, type, items }) => (
                                    <div className="col-xl-6 col-lg-6 col-md-6" key={title}>
                                        <div className="position-relative mb-3">
                                            <div className={`${bgClass} circle d-inline-flex square--80`}>
                                                <i className={`${icon} fs-2`}></i>
                                            </div>
                                        </div>
                                        <div className="crd-srv">
                                            <h4 className="font--bold text-light mb-2">{title}</h4>
                                            {type === 'text' ? (
                                                <p className="text-light opacity-75 fw-light fs-6 mb-0">{content}</p>
                                            ) : (
                                                <ul className="list-unstyled d-none d-lg-block pb-3 mb-3 mb-lg-4">
                                                    {items.map((item) => (
                                                        <li className="d-flex pt-2 fs-6 text-light" key={item}>
                                                            <i className="fa-solid fa-check fs-5 text-success mt-n1 me-2"></i>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <div className="clearfix"></div>
            {/* ============================ Purpose Section End ================================== */}

            <ServicesSection />

            <div className="container">

                <div className="row justify-content-between align-items-center mb-5">

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="position-relative exloi">
                            <div className="exloi-caption">
                                <div className="label text-success bg-light-success d-inline-flex rounded-4 mb-2 font--medium"><span>Growth</span></div>
                                <h2 className="mb-3 lh-base"><span style={{ color: '#F8882B' }}>Continuous Training Ensures</span> Excellence in Task Execution by Our Agents</h2>
                                <p className="mb-0 fs-5 fw-light">Our agents acquire the current skills necessary to perform their assigned tasks exceptionally well by participating in ongoing orientation and refresher training sessions.</p>

                            </div>
                        </div>
                    </div>

                    <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                        <div className="position-relative mt-md-0 mt-4">
                            <img src="assets/img/image4.png" className="img-fluid" alt="" />
                        </div>
                    </div>

                </div>

                <div className="row justify-content-between align-items-center mt-3">

                    <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                        <div className="position-relative">
                            <img src="assets/img/people-cartoon.png" className="img-fluid" alt="" />
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="position-relative exloi mt-md-0 mt-4">
                            <div className="exloi-caption">
                                <div className="label text-success bg-light-success d-inline-flex rounded-4 mb-2 font--medium"><span>User Analytics</span></div>
                                <h2 className="mb-3 lh-base">We help <span style={{ color: '#F8882B' }}>decentralize</span> your services to end customers through <br />our independent <span style={{ color: '#F8882B' }}>agent network</span> across the country</h2>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Partners />
            <CTA />
        </div>
    );
}

export default About;