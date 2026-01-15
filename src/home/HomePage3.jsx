import ShopByCategory from "../product/ShopByCategory";
import "./home.css";

function HomePage3() {
  const categories = [
    {
      title: "Resin Product",
      imageUrl: ["src/assets/category/resin1.jpg", "src/assets/category/resin2.jpg"],
      link: "Resin",
    },
    {
      title: "Mural Paints",
      imageUrl: ["src/assets/category/mural1.jpg", "src/assets/image14.jpg"],
      link: "Painting",
    },
    {
      title: "Nettippattam",
      imageUrl: ["src/assets/image8.webp", "src/assets/image9.jpg"],
      link: "Nettipattam",
    },
    {
      title: "Craft Works",
      imageUrl: ["src/assets/category/craft1.jpg", "src/assets/category/craft2.jpg"],
      link: "Craft",
    },
  ];

  return (
    <section className="category-section">
      <h2 className="section-title">
        Shop by <span>Category</span>
      </h2>
      <p className="subtitle text-center mb-10">
        Explore our curated collections
      </p>

      <div className="category-grid">
        {categories.map((c) => (
          <ShopByCategory
            key={c.title}
            title={c.title}
            imageUrl={c.imageUrl}
            link={c.link}
          />
        ))}
      </div>
    </section>
  );
}

export default HomePage3;
