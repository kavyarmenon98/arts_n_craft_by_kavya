import "./home.css";

/** Reusable card */
function FeatureCard({ icon, title, description }) {
  return (
    <article className="feature-card" role="listitem">
      <div className="feature-icon" aria-hidden="true">
        <img src={icon} style={{borderRadius:'10px'}} />
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
    </article>
  );
}

/** Section */
export default function WhyShopWithUs() {
  return (
    <div className="mt-10">

    <section className="why-section" aria-labelledby="why-title">
      <div className="why-container">
        <h2 id="why-title" className="why-heading">Why Shop with Us?</h2>

        <div className="features-grid" role="list" aria-label="Key benefits">
          <FeatureCard
            icon="src/assets/discount1.png"
            title="Free Shipping Everywhere in India "
            description="Free shipping to everyone across India. In-stock items will be delivered within one week of shipment. We also customize every product based on your requirements."
          />

          <FeatureCard
            icon="src/assets/discount2.png"

            title="Exclusive Offers and Deals"
            description="Enjoy discounts up to 30% on more than 5 Products. Shop now!"
          />

          <FeatureCard
            icon="src/assets/discount3.png"
          
            title="The Best Price in the Market"
            description="Unmatched savings on a wide range of products. Shop smart, shop with us!"
          />
        </div>
      </div>
    </section>
    </div>
  );
}
