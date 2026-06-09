import {
  HeroBanner,
  IntroSection,
  TextImageRow,
  SplitHighlight,
  StepsSection,
  EngagementBlock,
  PerformanceSection,
} from "../components/PageLayout";

export default function BTLPage() {
  return (
    <>
      <HeroBanner
        title="Below the Line"
        subtitle="and Market Activation Programs"
        description="Explore the power of Below-the-Line (BTL) and market activation programs, strategically crafted to captivate customers and drive sales through personalized experiential marketing."
        imageSrc="/assets/img/mob-app.png"
        imageAlt="BTL"
      />

      {/* Intro */}
      <IntroSection
        imageSrc="/assets/img/image_banner.png"
        labelColor="danger"
        labelText="BTL"
        title="Below The Line And Market Activation Program"
        body="Below-the-line (BTL) and market activation programs are strategic initiatives designed to drive customer engagement and generate sales through targeted, experiential marketing activities. These programs are typically used to complement above-the-line (ATL) marketing efforts such as TV, radio, and print advertising."
      />

      {/* Second intro row */}
      <div style={{ paddingBottom: "2rem" }}>
        <TextImageRow
          labelColor="danger"
          labelText="Easy marketing"
          title={<>Driving Sales and Loyalty<br />Through BTL and Market Activation</>}
          body="Explore how Below-the-Line (BTL) and market activation programs, rooted in direct and experiential marketing, empower organizations to forge personal connections with customers, leaving indelible impressions that foster loyalty and drive sales. Discover their impact on boosting brand awareness and creating enduring customer relationships."
          imageSrc="/assets/img/image8.jpg"
        />
      </div>
      <div className="clearfix" />

      {/* Split highlight */}
      <SplitHighlight
        icon="fa-solid fa-wallet"
        title="Maximizing Impact: BTL and Market Activation Strategies"
        body="Explore how BTL and market activation strategies leverage direct marketing and experiential techniques to create lasting impressions, drive sales, build brand awareness, and foster customer loyalty. Discover the power of personal and engaging customer connections in achieving business success."
        imageSrc="/assets/img/image7.jpg"
      />
      <div className="clearfix" />

      {/* Why you'll love us */}
      <StepsSection
        sectionLabel="Loved Our Features"
        sectionTitle="Unlocking Success with BTL and Market Activation"
        sectionSubtitle="Our program thrives on meticulous coordination of its core components"
        leftLabelColor="orange"
        leftLabel="Easiest Plan"
        leftTitle="Discover the potential of Below-the-Line (BTL) and Market Activation"
        leftIntro="Strategies in creating lasting customer connections, driving sales, and building brand loyalty through direct and experiential marketing."
        steps={[
          {
            icon: "fa-solid fa-layer-group",
            title: "Personal Engagement",
            body: "Learn how BTL and Market Activation strategies enable organizations to connect with customers on a personal level, forging stronger relationships.",
          },
          {
            icon: "fa-solid fa-cubes-stacked",
            title: "Sales Boost",
            body: "Explore their effectiveness in driving sales and revenue growth through targeted marketing activities.",
          },
          {
            icon: "fa-solid fa-sack-dollar",
            title: "Brand Loyalty",
            body: "See how these initiatives build brand awareness and foster customer loyalty, ultimately leading to repeat business and success.",
          },
        ]}
        rightImageSrc="/assets/img/image6.jpg"
        bottomLabelColor="seegreen"
        bottomLabel="Easiest Plan"
        bottomTitle="Factors for Effective Market Activation"
        bottomBody="Dive into the key determinants of success for Below-the-Line (BTL) and market activation programs. Explore how factors such as the quality of promotional materials, campaign creativity, sales team effectiveness, and measurement capabilities significantly influence the outcome of these strategic marketing initiatives."
        bottomLeftImageSrc="/assets/img/blog-4.jpg"
        bottomRightOverlaySrc="/assets/img/img-3.png"
      />
      <div className="clearfix" />

      {/* Engagement */}
      <EngagementBlock
        label="Enhance Engagement"
        title="Empowering Success with Market Activation Tools"
        body="Uncover the potential of Below-the-Line (BTL) and market activation programs as invaluable tools for organizations seeking to boost sales and enhance brand awareness. Explore how these programs utilize targeted experiential marketing activities to establish personal connections with customers, leaving lasting impressions that foster loyalty and drive repeat business."
        imageSrc="/assets/img/custom-img/cs-2.png"
        imageLeft
      />

      {/* Performance */}
      <PerformanceSection
        imageSrc="/assets/img/mob-app.png"
        features={[
          {
            title: "Sharper Insights into Market Activation Focus",
            body: "Delve into the specialized realm of market activation, a distinctive subset of Below-the-Line (BTL) marketing. Discover how it centers its efforts on igniting sales through precisely tailored campaigns, events, and promotions. Explore the strategies that create urgency and excitement around products or services, often incorporating discounts, giveaways, contests, and enticing incentives.",
          },
        ]}
      />
    </>
  );
}
