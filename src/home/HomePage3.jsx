import ShopByCategory from "../product/ShopByCategory";

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
    <section className="px-4 sm:px-6 lg:px-16 mt-10">
      <h2 className="text-center text-2xl sm:text-3xl font-extrabold">
        Shop by Category
      </h2>
      <p className="text-center text-gray-500 mt-2 mb-8">
        Our Product Category
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
