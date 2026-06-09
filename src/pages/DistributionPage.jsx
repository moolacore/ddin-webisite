import {
  HeroBanner,
  IntroSection,
  TextImageRow,
  SplitHighlight,
  StepsSection,
  EngagementBlock,
  PerformanceSection,
} from "../components/PageLayout";

export default function DistributionPage() {
  return (
    <>
      <HeroBanner
        title="DISTRIBUTION"
        subtitle="TO THE LAST MILE PROGRAM"
        description="Our Distribution to the Last Mile Program is a strategic initiative focused on optimizing supply chain management and logistics to ensure efficient and effective delivery of products and services to end consumers."
        imageSrc="/assets/img/info/digital-marketing.png"
        imageAlt="Distribution"
      />

      {/* Intro */}
      <IntroSection
        imageSrc="/assets/img/image10.jpg"
        labelColor="danger"
        labelText="DLM"
        title="Distribution to the Last Mile Program"
        body="Discover our 'Distribution to the Last Mile Program,' a strategic initiative dedicated to ensuring the efficient and effective delivery of products and services to end consumers. We've developed a comprehensive approach to supply chain management, logistics, and distribution, enabling us to reach even the most remote and challenging areas, so your needs are met with precision and care."
      />

      {/* Second intro row */}
      <div style={{ paddingBottom: "2rem" }}>
        <TextImageRow
          labelColor="danger"
          labelText="Easy marketing"
          title={<>Empowering Last-Mile Delivery<br />Solutions in Developing Nations</>}
          body="Our Distribution to the Last Mile Program takes center stage in addressing the unique challenges faced by organizations and institutions operating in developing countries. We navigate complex infrastructures and logistics by collaborating with local partners, leveraging innovative technology, and employing community-based distribution models. Discover how we empower efficiency and accessibility in challenging contexts."
          imageSrc="/assets/img/class-men-2.png"
          overlayImages={["/assets/img/slip-1.png", "/assets/img/slip-2.png"]}
        />
      </div>
      <div className="clearfix" />

      {/* Split highlight */}
      <SplitHighlight
        icon="fa-solid fa-wallet"
        title={<>Unlocking Efficiency Through<br />Supply Chain Management</>}
        body="Supply Chain Management is the backbone of ensuring products and services are always available when and where they're needed. Dive into the intricacies of this process, which includes coordinating production, transportation, storage, and efficient inventory management to meet demand effectively. Discover how mastering these elements can enhance your business operations."
        imageSrc="/assets/img/mid-img-2.jpg"
      />
      <div className="clearfix" />

      {/* Key components */}
      <StepsSection
        sectionLabel="Loved Our Features"
        sectionTitle="Key Components of Our Efficient Delivery Program"
        sectionSubtitle="Our program thrives on meticulous coordination of its core components"
        leftLabelColor="orange"
        leftLabel="Easiest Plan"
        leftTitle={<>Ensuring timely and efficient delivery of products &amp;<br />services to end consumers</>}
        leftIntro="Explore the pillars of our success: Supply Chain Management, Warehousing, Transportation, and Last-Mile Delivery."
        steps={[
          {
            icon: "fa-solid fa-layer-group",
            title: "Supply Chain Management",
            body: "We optimize the entire supply chain, from sourcing to distribution, to streamline operations and reduce delays.",
          },
          {
            icon: "fa-solid fa-cubes-stacked",
            title: "Warehousing",
            body: "Our strategically located warehouses play a crucial role in inventory management and order fulfillment, enhancing overall efficiency.",
          },
          {
            icon: "fa-solid fa-sack-dollar",
            title: "Transportation",
            body: "We employ a fleet of vehicles and logistics solutions to ensure products and services are in transit swiftly and securely.",
          },
          {
            icon: "fa-solid fa-sack-dollar",
            title: "Last-Mile Delivery",
            body: "Our commitment to reaching every consumer's doorstep, even in remote areas, is the cornerstone of our program's success, offering unparalleled accessibility.",
          },
        ]}
        rightImageSrc="/assets/img/side-4.png"
        rightOverlaySrc="/assets/img/at-2.png"
        bottomLabelColor="seegreen"
        bottomLabel="Easiest Plan"
        bottomTitle="Efficient Delivery Solutions for Enhanced Community Access"
        bottomBody="Discover a valuable tool that empowers organizations to deliver products and services to end consumers with exceptional efficiency. Through expert supply chain management, meticulous logistics coordination, and innovative distribution methods, we bridge the gap even in remote and challenging areas, enhancing community access and overall well-being."
        bottomLeftImageSrc="/assets/img/blog-4.jpg"
        bottomRightOverlaySrc="/assets/img/img-3.png"
      />
      <div className="clearfix" />

      {/* Engagement */}
      <EngagementBlock
        label="Enhance Engagement"
        title="Streamlining Supply Chains for Success"
        body="Discover how optimizing your supply chain can drive efficiency, reduce costs, and enhance your overall business operations. Learn about the key strategies and principles that can help you achieve supply chain excellence, ensuring your products and services reach your customers seamlessly and on time."
        imageSrc="/assets/img/custom-img/cs-2.png"
        imageLeft
      />

      {/* Performance */}
      <PerformanceSection
        imageSrc="/assets/img/mob-app.png"
        features={[
          {
            title: "Warehousing",
            body: "Warehousing is all about safe and secure inventory management, ensuring products are readily available for distribution in a protected environment.",
          },
          {
            title: "Transportation",
            body: "Transportation is the process of moving goods and services from their source to their destination, utilizing various modes like road, air, and sea to facilitate efficient delivery.",
          },
        ]}
      />
    </>
  );
}
