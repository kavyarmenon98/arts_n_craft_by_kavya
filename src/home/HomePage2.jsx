import Slider from "react-slick";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function HomePage2() {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
    dotsClass: "slick-dots custom-dots-bottom",
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
        "src/assets/home2.jpg",
        "src/assets/home3.jpg",
      ],
    },
    {
      title: "Traditional Nettipattam",
      subtitle: "The Golden Elephant Caparison",
      description: "Embrace the symbol of prosperity and grand heritage with the Traditional Nettipattam. Meticulously crafted from copper and gold-plated spheres, this 'elephants' forehead ornament' is a testament to Kerala's regal festivities. Whether as a housewarming gift or a statement piece for your living room, it brings the grandeur of the temple festivals right into your modern home.",
      image: [
        "src/assets/image8.webp",
        "src/assets/image9.jpg",
        "src/assets/image19.jpg",
        "src/assets/image11.webp",
        "src/assets/image10.jpg",
        "src/assets/nettipattam3.jpg",
        "src/assets/nettippatam4.jpg",


      ],
    },
  ];

  return (
    <section className="bg-black py-20 md:py-40 px-4 md:px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Intro Section */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="/src/assets/logo2.png"
              alt="Kavya Arts"
              className="w-48 mb-12 drop-shadow-[0_0_40px_rgba(0,161,209,0.3)]"
            />
            <div className="absolute inset-0 bg-[var(--color-primary)]/10 blur-3xl rounded-full scale-150 -z-10" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-2xl md:text-4xl font-serif text-white/90 leading-relaxed max-w-5xl italic font-light"
          >
            "Enchanting you since 2019. Discover the refined and exclusive collection by Kavya Arts & Craft. Expertly curated products bring <span className="text-[var(--color-primary)] not-italic">grandeur</span> to your space, ensuring uniqueness and elegance."
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-[1px] bg-[var(--color-primary)] mt-16 opacity-60"
          />
        </div>

        {/* Featured Stories - Refactored to horizontal model */}
        <div className="flex flex-col gap-24 mt-32">
          {data.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[40px] overflow-hidden bg-[#0f1219] border border-white/5 group"
            >
              <div className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center`}>
                {/* Image side */}
                <div className={`w-full lg:w-1/2 h-80 ${item.title.includes("Mural") ? "lg:h-[650px]" : "lg:h-[500px]"} overflow-hidden relative bg-neutral-900/30`}>
                  <Slider {...settings} className="h-full">
                    {item.image.map((src, index) => (
                      <div key={index} className={`${item.title.includes("Mural") ? "h-[650px]" : "h-[500px]"} outline-none relative flex items-center justify-center`}>
                        <img
                          src={src}
                          alt={item.title}
                          className={`w-full h-full ${item.title.includes("Nettipattam") ? "object-contain p-4" : "object-cover"} transform scale-100 group-hover:scale-105 transition-transform duration-[4s]`}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-${idx % 2 === 0 ? "r" : "l"} from-black/40 to-transparent lg:block hidden`} />
                      </div>
                    ))}
                  </Slider>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />

                  {/* Floating Label */}
                  <div className="absolute top-8 left-8 z-20">
                    <span className="px-5 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[var(--color-primary)] text-[10px] uppercase tracking-[0.3em] font-bold">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content side */}
                <div className="w-full lg:w-1/2 p-10 lg:p-20">
                  <span className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-[0.4em] mb-6 block">
                    {item.subtitle}
                  </span>
                  <h3 className="text-4xl lg:text-5xl font-serif text-white mb-8 tracking-tight leading-tight group-hover:text-[var(--color-primary)] transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light mb-10 border-l-2 border-[var(--color-primary)]/20 pl-6 italic">
                    {item.description}
                  </p>

                  <motion.button
                    onClick={() => navigate("/listProduct")}
                    whileHover={{ x: idx % 2 === 0 ? 10 : -10 }}
                    className={`flex items-center gap-4 text-white hover:text-[var(--color-primary)] transition-all group/btn ${idx % 2 === 0 ? "" : "flex-row-reverse"}`}
                  >
                    <span className="text-xs font-black uppercase tracking-[0.3em]">Explore Heritage</span>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 group-hover/btn:border-[var(--color-primary)] group-hover/btn:bg-[var(--color-primary)] group-hover/btn:text-black transition-all">
                      <FiArrowRight className={`text-xl ${idx % 2 === 0 ? "" : "rotate-180"}`} />
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx="true">{`
        .custom-dots-bottom {
          bottom: 25px !important;
        }
        .custom-dots-bottom li button:before {
          color: white !important;
          font-size: 6px !important;
          opacity: 0.3 !important;
        }
        .custom-dots-bottom li.slick-active button:before {
          color: var(--color-primary) !important;
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}

export default HomePage2;
