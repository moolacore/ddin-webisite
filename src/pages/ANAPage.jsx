import {
  HeroBanner,
  IntroSection,
  TextImageRow,
  BenefitsSection,
  StepsSection,
} from "../components/PageLayout";

export default function ANAPage() {
  return (
    <>
      <HeroBanner
        title="Agent Network"
        subtitle="Accelerator Program"
        description="Strategically enhances agent networks for organizations in sectors like finance, telecommunications, payments, insurance, distribution, and logistics."
        imageSrc="/assets/img/image_banner.png"
        imageAlt="ANA"
      />

      {/* Intro */}
      <IntroSection
        imageSrc="/assets/img/image5.jpg"
        labelColor="danger"
        labelText="ANA"
        title="Agent Network Accelerator"
        body="The Agent Network Accelerator (ANA) initiative is a well-planned strategy aimed at expediting the expansion and reach of agent networks across diverse sectors, including finance, telecommunications, payment service providers, insurance, distribution, and logistics, for different organizations and institutions."
      />

      {/* Second intro row */}
      <div style={{ paddingBottom: "2rem" }}>
        <TextImageRow
          labelColor="danger"
          labelText="Easy marketing"
          title={<>Agent Network Accelerator:<br />Enhancing Agent Network Success</>}
          body="The ANA Program provides a holistic solution to assist organizations and institutions in streamlining the recruitment, training, and support of agents with greater efficiency and effectiveness. Leveraging cutting-edge technology and industry best practices, this program empowers organizations to realize their agent network expansion goals in a shorter timeframe, all while reducing costs and boosting overall productivity."
          imageSrc="/assets/img/image6.jpg"
          overlayImages={["/assets/img/slip-2.png"]}
        />
      </div>
      <div className="clearfix" />

      {/* Benefits */}
      <BenefitsSection
        title="Explore Our Abilities We have"
        subtitle="Enhancing Agent Network Success"
        cards={[
          {
            icon: "fa-solid fa-envelope-open-text",
            title: "Comprehensive Solution",
            body: "The ANA Program offers a comprehensive approach to address the needs of organizations and institutions looking to enhance their agent networks.",
          },
          {
            icon: "fa-solid fa-user-shield",
            title: "Efficient Agent Management",
            body: "It facilitates the recruitment, training, and support of agents in a more efficient and streamlined manner.",
          },
          {
            icon: "fa-solid fa-photo-film",
            title: "Technological Advancements",
            body: "By harnessing the power of technology, the program enables organizations to stay ahead in the rapidly evolving landscape of agent networks.",
          },
          {
            icon: "fa-solid fa-screwdriver-wrench",
            title: "Accelerated Growth",
            body: "Organizations can achieve their agent network expansion objectives faster, thanks to the program's strategic approach.",
          },
          {
            icon: "fa-solid fa-lightbulb",
            title: "Cost Reduction",
            body: "The ANA Program helps reduce operational costs, making it a cost-effective solution for organizations.",
          },
          {
            icon: "fa-solid fa-chart-simple",
            title: "Increased Productivity",
            body: "With improved agent management and support, organizations can boost overall productivity in their operations.",
          },
        ]}
      />
      <div className="clearfix" />

      {/* Why you'll love us */}
      <StepsSection
        sectionSubtitle="At vero eos et accusamus et iusto odio dignissimos ducimus"
        leftLabelColor="orange"
        leftLabel="Easiest Plan"
        leftTitle={<>We've Better Plan For<br />Agents</>}
        leftIntro="Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet."
        steps={[
          {
            icon: "fa-solid fa-layer-group",
            title: "Recruitment",
            body: "Identifying and onboarding potential agents from target markets is a foundational step in building a robust network.",
          },
          {
            icon: "fa-solid fa-cubes-stacked",
            title: "Training",
            body: "Agents receive comprehensive training that equips them with essential skills and knowledge to excel in their roles.",
          },
          {
            icon: "fa-solid fa-sack-dollar",
            title: "Support",
            body: "Ongoing support mechanisms are in place to assist agents in their day-to-day activities, ensuring they remain effective and motivated.",
          },
          {
            icon: "fa-solid fa-sack-dollar",
            title: "Management",
            body: "Effective management strategies are implemented to oversee and optimize the performance of the agent network as a whole.",
          },
        ]}
        rightImageSrc="/assets/img/training.jpg"
        rightOverlaySrc="/assets/img/at-2.png"
        bottomLabelColor="seegreen"
        bottomLabel="Easiest Plan"
        bottomTitle="Comprehensive Agent Network Development Program"
        bottomBody="This program centers around four essential areas crucial for building a thriving agent network. It starts with identifying potential agents in target markets, evaluating their suitability, and seamlessly integrating them into the network. The training process equips agents with the necessary knowledge, skills, and tools, encompassing product expertise, sales acumen, customer service, and marketing. Alongside recruitment and training, the program emphasizes strong support mechanisms and efficient management to ensure the success of the agent network."
        bottomLeftImageSrc="/assets/img/blog-4.jpg"
        bottomRightOverlaySrc="/assets/img/img-3.png"
      />
      <div className="clearfix" />
    </>
  );
}
