import {
  HeroBanner,
  IntroSection,
  TextImageRow,
  SplitHighlight,
  StepsSection,
  EngagementBlock,
  FeatureCardsSection,
} from "../components/PageLayout";

export default function FloatManagementPage() {
  return (
    <>
      <HeroBanner
        title="Optimizing Agent Network Liquidity"
        subtitle="for Effective Float Management"
        description="Explore strategies and best practices for maintaining optimal liquidity and efficient float management within agent networks."
        imageSrc="/assets/img/image_banner.png"
        imageAlt="Float Management"
      />

      {/* Intro */}
      <IntroSection
        imageSrc="/assets/img/image7.jpg"
        labelColor="danger"
        labelText="ANLFM"
        title={<>Agent Network Liquidity &amp;<br />Float Management</>}
        body="The Agent Network Liquidity & Float Management Program is a strategic initiative designed to support agent networks and ensure they have sufficient liquidity to meet their financial obligations while minimizing financial risk. This program involves a comprehensive process for monitoring and managing cash flow within the agent network, ensuring that agents have sufficient funds to conduct transactions and serve their customers effectively."
      />

      {/* Second intro row */}
      <div style={{ paddingBottom: "2rem" }}>
        <TextImageRow
          labelColor="danger"
          labelText="Easy marketing"
          title={<>Enhancing Liquidity and Float Management<br />through Cash Management Optimization</>}
          body="Discover the importance of optimizing cash management tools and techniques in effectively managing liquidity and float within agent networks. Learn how leveraging financial instruments like Treasury bills and commercial papers can generate returns on idle cash while mitigating financial risks."
          imageSrc="/assets/img/image5.jpg"
        />
      </div>
      <div className="clearfix" />

      {/* Split highlight */}
      <SplitHighlight
        icon="fa-solid fa-wallet"
        title={<>Strategic Cash Flow Forecasting<br />for Agent Network Liquidity Management</>}
        body="Explore the critical role of cash flow forecasting in agent network liquidity management. By analyzing historical data and trends, network managers can predict cash flow patterns for individual agents, ensuring they have the necessary liquidity for seamless operations and customer service."
        imageSrc="/assets/img/image8.jpg"
      />
      <div className="clearfix" />

      {/* Program approaches */}
      <StepsSection
        sectionLabel="Loved Our Features"
        sectionTitle="Strategies for Enhanced Liquidity Management in Agent Networks"
        sectionSubtitle="This comprehensive guide delves into program approaches that can elevate liquidity management within agent networks."
        leftLabelColor="orange"
        leftLabel="Easiest Plan"
        leftTitle={<>The Program Approaches<br />The Use Of Cash Flow Forecasting</>}
        leftIntro="Learn about the importance of cash flow forecasting, the implementation of efficient payment and collection processes, and the optimization of cash management tools and techniques to ensure smoother operations and financial stability."
        steps={[
          {
            icon: "fa-solid fa-layer-group",
            title: "Cash Flow Forecasting",
            body: "Understand how analyzing historical data and trends can help predict cash flow patterns, enabling proactive liquidity management.",
          },
          {
            icon: "fa-solid fa-cubes-stacked",
            title: "Effective Payment and Collection Processes",
            body: "Explore strategies for streamlining payment and collection processes to ensure timely cash availability for agents.",
          },
          {
            icon: "fa-solid fa-sack-dollar",
            title: "Cash Management Tools and Techniques",
            body: "Discover how leveraging financial instruments and tools can enhance cash management efficiency, reducing idle cash and minimizing financial risks.",
          },
        ]}
        rightImageSrc="/assets/img/mob-app.png"
        bottomLabelColor="seegreen"
        bottomLabel="Easiest Plan"
        bottomTitle={<>Enhancing Agent Network Efficiency<br />through Effective Payment Processes</>}
        bottomBody="Explore the critical role of efficient payment and collection processes in optimizing cash flow within the agent network. Learn how streamlined billing, electronic payment systems, and optimized payment terms can reduce cash tied up in accounts receivable and payable."
        bottomLeftImageSrc="/assets/img/blog-4.jpg"
        bottomRightOverlaySrc="/assets/img/img-3.png"
      />
      <div className="clearfix" />

      {/* Engagement — image on right this time */}
      <EngagementBlock
        label="Enhance Engagement"
        title={<>Implementing Effective Cash Management<br />Strategies for Agent Network Success</>}
        body="Discover the benefits of implementing effective cash management strategies to support agent network financial health. These strategies empower agents to serve customers efficiently and meet their financial obligations, while the Agent Network Liquidity & Float Management Program provides valuable support for network liquidity."
        imageSrc="/assets/img/custom-img/cs-2.png"
        imageLeft={false}
      />

      {/* Feature cards grid */}
      <FeatureCardsSection
        sectionLabel="Our Features"
        title="Empowering Agent Networks through Cash Flow Optimization"
        subtitle="Explore strategies, programs, and effective cash management techniques that empower agent networks, ensuring they maintain sufficient liquidity, enhance customer service, and meet their financial obligations with confidence."
        cards={[
          {
            title: "Agent Network Liquidity Program",
            body: "This program plays a crucial role in supporting agent networks by providing valuable tools and strategies to ensure they maintain sufficient liquidity for effective operations.",
          },
          {
            title: "Effective Cash Management",
            body: "The implementation of efficient cash management strategies empowers network managers to enhance the financial health of their agents. This, in turn, enables agents to better serve their customers.",
          },
          {
            title: "Enhanced Customer Service",
            body: "Effective cash management not only improves financial health but also enhances agents' ability to provide superior customer service, creating a win-win scenario for both agents and customers.",
          },
          {
            title: "Meeting Financial Obligations",
            body: "With the aid of cash management strategies and the Agent Network Liquidity Program, agents can ensure they have the necessary resources to meet their financial obligations, contributing to overall network stability and success.",
          },
        ]}
      />
    </>
  );
}
