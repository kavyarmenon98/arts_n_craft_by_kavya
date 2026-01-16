import Slider from "react-slick";
import { motion } from "framer-motion";

function HomePage2() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const data = [
    {
      title: "Kerala Mural Painting",
      subtitle: "A Timeless Heritage",
      description: "Step into a world of celestial beauty with Kerala's iconic mural art. Rooted in the 7th century, these masterpieces capture the essence of temple antiquity through vibrant hues and intricate detailing. Heavily influenced by Pallava aesthetics and perfected over generations, each stroke tells a legendary story of divinity and grace, bringing a sacred elegance to any space.",
      image: [
        "src/assets/image2.jpg",
        "src/assets/image4.jpg",
        "src/assets/image13.png",
      ],
    },
    {
      title: "Traditional Nettipattam",
      subtitle: "The Golden Elephant Caparison",
      description: "Embrace the symbol of prosperity and grand heritage with the Traditional Nettipattam. Meticulously crafted from copper and gold-plated spheres, this 'elephants' forehead ornament' is a testament to Kerala's regal festivities. Whether as a housewarming gift or a statement piece for your living room, it brings the grandeur of the temple festivals right into your modern home.",
      image: [
        "src/assets/image8.webp",
        "src/assets/image9.jpg",
        "src/assets/image10.jpg",
        "src/assets/image11.webp",
      ],
    },
  ];

  return (
    <section className="bg-black py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Intro Section */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            src="/src/assets/logo2.png"
            alt="Kavya Arts"
            className="w-40 mb-12 drop-shadow-[0_0_30px_rgba(255,159,67,0.2)]"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif text-white/90 leading-relaxed max-w-4xl italic"
          >
            "Enchanting you since 2019. Discover the refined and exclusive collection by Kavya Arts & Craft. Expertly curated products bring grandeur to your space, ensuring uniqueness and elegance."
          </motion.p>
          <div className="h-0.5 w-24 bg-[var(--color-primary)] mt-12 rounded-full opacity-50" />
        </div>

        {/* Featured Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {data.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group"
            >
              <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden mb-10 shadow-2xl border border-white/5">
                <Slider {...settings} className="h-full">
                  {item.image.map((src, index) => (
                    <div key={index} className="h-full bg-neutral-900/50 flex items-center justify-center">
                      <img
                        src={src}
                        className="w-full h-full object-cover transition-opacity duration-[2s]"
                        alt=""
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="px-6">
                <span className="text-[var(--color-primary)] font-bold text-[10px] uppercase tracking-[0.4em] mb-3 block">
                  {item.subtitle}
                </span>
                <h3 className="text-3xl font-serif text-white mb-6 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {item.description}
                </p>
                <div className="mt-8 flex items-center gap-4 text-white text-xs font-black uppercase tracking-widest cursor-pointer group/btn">
                  Explore Story
                  <div className="w-10 h-[1px] bg-white group-hover/btn:w-20 transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage2;
