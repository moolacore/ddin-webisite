import {
  HeroBanner,
  IntroSection,
  TextImageRow,
  BenefitsSection,
  SplitHighlight,
  EngagementBlock,
  PerformanceSection,
} from "../components/PageLayout";

export default function CANPage() {
  return (
    <>
      <HeroBanner
        title="The Community Agent"
        subtitle="Network Program"
        description="Through training and support, Community agents network provide essential information, education, and services, bridging gaps and fostering community growth."
        imageSrc="/assets/img/image_banner.png"
        imageAlt="CAN"
      />

      {/* Intro */}
      <IntroSection
        imageSrc="/assets/img/image5.jpg"
        labelColor="danger"
        labelText="CAN"
        title="The Community Agent Network (CAN) Program"
        body="The Community Agent Network (CAN) program is a visionary initiative aimed at enhancing accessibility to essential products and services within marginalized communities. Through this program, local residents are empowered as agents, equipped with the knowledge and skills to offer information, education, and vital services to fellow community members. Join us in bridging the gap and fostering self-reliance within underserved areas through CAN."
      />

      {/* Second intro row */}
      <div style={{ paddingBottom: "2rem" }}>
        <TextImageRow
          labelColor="danger"
          labelText="Easy marketing"
          title={<>Revolutionizing Community Development<br />The Community Agent Network (CAN) Program</>}
          body="The Community Agent Network (CAN) Program represents a groundbreaking approach to community development, harnessing the inherent strengths and assets within the community. By enlisting and empowering local residents as agents, this initiative not only generates employment opportunities but also nurtures local skills and resilience, leading to sustainable growth. Explore the transformable power of CAN in fostering self-sufficiency and empowerment within communities."
          imageSrc="/assets/img/image8.jpg"
        />
      </div>
      <div className="clearfix" />

      {/* Benefits */}
      <BenefitsSection
        title="Explore Our Abilities We have"
        subtitle="Enhancing Community Agent Network Success"
        cards={[
          {
            icon: "fa-solid fa-envelope-open-text",
            title: "Local Job Creation",
            body: "CAN recruits and trains community members as agents, thereby stimulating job opportunities within the community itself.",
          },
          {
            icon: "fa-solid fa-user-shield",
            title: "Building Local Capacity",
            body: "The program invests in local talent and skills, amplifying the community's capacity to address its unique challenges and needs.",
          },
          {
            icon: "fa-solid fa-photo-film",
            title: "Enhancing Resilience",
            body: "Through education and empowerment, CAN bolsters community resilience, enabling them to withstand and recover from adversity.",
          },
        ]}
      />
      <div className="clearfix" />

      {/* Split highlight with two columns */}
      <SplitHighlight
        imageSrc="/assets/img/image9.jpg"
        cols={[
          {
            icon: "fa-solid fa-wallet",
            title: "Empowering Agents for Success — Ongoing Support in the CAN Program",
            body: "The CAN program prioritizes the success of its agents by offering continuous support, including access to marketing materials, regular communication, and performance incentives. This approach has proven to be highly effective in accelerating service expansion and enhancing the well-being of under-served communities.",
          },
          {
            icon: "fa-solid fa-briefcase",
            title: "CAN Program — A Catalyst for Inclusive Community Development",
            body: "The CAN program serves as a valuable tool for organizations and institutions seeking to extend access to products and services in underserved communities. By harnessing the community's strengths and assets, the program creates employment opportunities, enhances local capacity, and fortifies community resilience, fostering sustainable growth.",
          },
        ]}
      />

      {/* Engagement */}
      <EngagementBlock
        label="Enhance Engagement"
        title={<>Community-Centered Development<br />The CAN Program's Comprehensive Approach</>}
        body="The CAN program employs a comprehensive process, engaging with community leaders and stakeholders to discern community needs and priorities. This invaluable input informs program design, ensuring a tailored approach that caters to specific community requirements."
        imageSrc="/assets/img/custom-img/cs-2.png"
        imageLeft
      />

      {/* Performance */}
      <PerformanceSection
        imageSrc="/assets/img/mob-app.png"
        features={[
          {
            title: "Community Engagement",
            body: "CAN initiates a collaborative process with community leaders and stakeholders to identify and prioritize community needs, serving as the foundation for program design and customization.",
          },
          {
            title: "Four Pillars",
            body: "The program's approach comprises four integral phases: Recruitment, Training, Support, and Management, each playing a vital role in empowering and sustaining community agents.",
          },
        ]}
      />
    </>
  );
}
