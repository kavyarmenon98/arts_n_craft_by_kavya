import Slider from "react-slick";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Import all images properly for production
import logo2 from "../assets/logo2.png";
import image2 from "../assets/image2.jpg";
import image4 from "../assets/image4.jpg";
import image13 from "../assets/image13.png";
import image7 from "../assets/image7.jpg";
import image5 from "../assets/image5.jpg";
import image9 from "../assets/image9.jpg";
import image19 from "../assets/image19.jpg";
import image11 from "../assets/image11.webp";
import image10 from "../assets/image10.jpg";
import nettipattam3 from "../assets/nettipattam3.jpg";
import nettippatam4 from "../assets/nettippatam5.jpg";

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
      title: "Kerala Mural Paintings",
      subtitle: "A Timeless Heritage",
      description: "Step into a world of celestial beauty with Kerala's iconic mural art. Rooted in the 7th century, these masterpieces capture the essence of temple antiquity through vibrant hues and intricate detailing. Heavily influenced by Pallava aesthetics and perfected over generations, each stroke tells a legendary story of divinity and grace, bringing a sacred elegance to any space.",
      image: [image2, image4, image13],
    },
    {
      title: "Traditional Nettipattam",
      subtitle: "The Golden Elephant Caparison",
      description: "Embrace the symbol of prosperity and grand heritage with the Traditional Nettipattam. Meticulously crafted from copper and gold-plated spheres, this 'elephants' forehead ornament' is a testament to Kerala's regal festivities. Whether as a housewarming gift or a statement piece for your living room, it brings the grandeur of the temple festivals right into your modern home.",
      image: [image5, nettipattam3],
    },
  ];

  return (
    <section className="bg-black py-12 md:py-20 px-4 md:px-6 relative overflow-hidden mb-8 md:mb-0">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Intro Section */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={logo2}
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
            "Enchanting you since 2019. Discover the refined and exclusive collection by <span className="text-[var(--color-primary)] not-italic">Kavya Arts & Craft</span> . Here art is thoughtfully created with emotion, patience, and precision, offering rare, elegant creations that transform spaces into experiences."
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-[1px] bg-[var(--color-primary)] mt-16 opacity-60"
          />
        </div>

        {/* Featured Stories - Side by Side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 md:mt-24">
          {data.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative rounded-[40px] overflow-hidden bg-[#0f1219] border border-white/5 group flex flex-col h-full"
            >
              {/* Image side - Optimized for Artworks */}
              <div className="w-full h-[380px] md:h-[500px] overflow-hidden relative bg-neutral-900/40">
                <Slider {...settings} className="h-full">
                  {item.image.map((src, index) => (
                    <div key={index} className="h-full outline-none relative flex items-center justify-center">
                      <img
                        src={src}
                        alt={item.title}
                        className={`w-auto h-full max-w-[85%] ${item.title.includes("Nettipattam") ? "object-contain p-4 md:p-6" : "object-cover w-full"} transition-all duration-[4s] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ))}
                </Slider>

                {/* Floating Label */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                  <span className="px-3 py-1 md:px-4 md:py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[var(--color-primary)] text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold">
                    Featured Collection
                  </span>
                </div>
              </div>

              {/* Content side - Reduced padding to fix gap */}
              <div className="p-6 md:p-10 flex flex-col flex-1">
                <span className="text-[var(--color-primary)] font-bold text-[10px] uppercase tracking-[0.4em] mb-3 block">
                  {item.subtitle}
                </span>
                <h3 className="text-3xl font-serif text-white mb-3 tracking-tight leading-tight group-hover:text-[var(--color-primary)] transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light mb-6 border-l-2 border-[var(--color-primary)]/20 pl-6 italic opacity-80 flex-1">
                  {item.description}
                </p>

                <div className="mt-auto">
                  <motion.button
                    onClick={() => navigate("/listProduct")}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-white hover:text-[var(--color-primary)] transition-all group/btn"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explore Collection</span>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 group-hover/btn:border-[var(--color-primary)] group-hover/btn:bg-[var(--color-primary)] group-hover/btn:text-black transition-all">
                      <FiArrowRight className="text-lg" />
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
