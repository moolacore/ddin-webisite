import {
  HeroBanner,
  IntroSection,
  TextImageRow,
  BenefitsSection,
  StepsSection,
  EngagementBlock,
  PerformanceSection,
} from "../components/PageLayout";

export default function ANMPage() {
  return (
    <>
      <HeroBanner
        title="Agent Network"
        subtitle="Management Program"
        description="Designed to empower businesses and institutions, ANM ensures efficient management of agent networks, vital for exceptional customer service and operational success."
        imageSrc="/assets/img/image_banner.png"
        imageAlt="ANM"
      />

      {/* Intro */}
      <IntroSection
        imageSrc="/assets/img/image7.jpg"
        labelColor="danger"
        labelText="ANM"
        title="Agent Network Management"
        body="The Agent Network Management (ANM) program is a comprehensive solution designed to help organizations and institutions manage their agent networks more effectively. This program is especially important for businesses that rely heavily on agent networks to serve their customers."
      />

      {/* Second intro row */}
      <div style={{ paddingBottom: "2rem" }}>
        <TextImageRow
          labelColor="danger"
          labelText="Easy marketing"
          title={<>Incentivizing Excellence:<br />The ANM Program's Rewards Initiative</>}
          body="The ANM program introduces a compelling incentive program that rewards agents for exceeding performance objectives. These incentives encompass financial rewards, recognition programs, and various motivators to inspire agents to excel in their roles. Through these incentives, organizations can foster a culture of high performance, diminish agent turnover, and elevate customer satisfaction."
          imageSrc="/assets/img/image5.jpg"
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
            title: "Performance-Based Rewards",
            body: "The ANM program incentivizes agents based on their achievement of performance targets, encouraging them to strive for excellence in their tasks.",
          },
          {
            icon: "fa-solid fa-user-shield",
            title: "Financial Incentives",
            body: "Agents are eligible for financial rewards, providing them with a tangible benefit for their exceptional performance.",
          },
          {
            icon: "fa-solid fa-photo-film",
            title: "Recognition Programs",
            body: "The program includes recognition initiatives that acknowledge and celebrate outstanding agents, further motivating them to excel.",
          },
          {
            icon: "fa-solid fa-screwdriver-wrench",
            title: "Improved Culture",
            body: "By offering incentives, organizations can cultivate a culture that values and rewards performance, leading to higher employee morale and productivity.",
          },
          {
            icon: "fa-solid fa-lightbulb",
            title: "Reduced Turnover",
            body: "Incentives play a pivotal role in reducing agent turnover rates, as motivated agents are more likely to stay committed to their roles and organizations.",
          },
          {
            icon: "fa-solid fa-chart-simple",
            title: "Enhanced Customer Satisfaction",
            body: "With motivated and high-performing agents, organizations can provide better customer service, resulting in improved customer satisfaction and loyalty.",
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
            body: "The ANM program's training service offers a range of training programs that enable agents to improve their skills and knowledge.",
          },
          {
            icon: "fa-solid fa-cubes-stacked",
            title: "Training",
            body: "Investing in agent training leads to improved agent performance, reduced errors, and enhanced customer satisfaction.",
          },
          {
            icon: "fa-solid fa-sack-dollar",
            title: "Support",
            body: "Training programs cover Product Training, Sales Training, Customer Service Training, and Marketing Training, ensuring comprehensive skill development for agents.",
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
        bottomTitle="Elevate Agent Performance with ANM's Training Services"
        bottomBody="ANM's training services provide a diverse array of programs, equipping agents with the skills and knowledge needed for enhanced performance. Investing in agent training leads to improved service quality, error reduction, and heightened customer satisfaction."
        bottomLeftImageSrc="/assets/img/blog-4.jpg"
        bottomRightOverlaySrc="/assets/img/img-3.png"
      />
      <div className="clearfix" />

      {/* Engagement */}
      <EngagementBlock
        label="Enhance Engagement"
        title="Comprehensive Support and Monitoring for Optimal Agent Performance"
        body="The ANM program offers a suite of services, including performance monitoring, support, and training, to empower organizations to manage their agent networks effectively. Monitor, support, and train your agents to enhance performance, reduce errors, and boost customer satisfaction."
        imageSrc="/assets/img/custom-img/cs-2.png"
        imageLeft
      />

      {/* Performance features */}
      <PerformanceSection
        imageSrc="/assets/img/mob-app.png"
        features={[
          {
            title: "Performance Monitoring",
            body: "The ANM program's performance monitoring service tracks key performance indicators such as agent productivity, customer satisfaction, and agent retention, allowing organizations to identify improvement areas and optimize agent network management strategies.",
          },
          {
            title: "Support Service",
            body: "The program's support service equips agents with essential tools and resources, such as marketing materials, product training, and customer service support, ensuring their motivation, engagement, and peak performance.",
          },
          {
            title: "Training Service",
            body: "ANM's training service offers a wide range of training programs, including product, sales, customer service, and marketing training, enabling agents to enhance their skills and knowledge. Investing in agent training can lead to improved performance, reduced errors, and heightened customer satisfaction.",
          },
        ]}
      />
    </>
  );
}
