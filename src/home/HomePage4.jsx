import { motion } from "framer-motion";
import { FiTruck, FiGift, FiAward } from "react-icons/fi";

function FeatureCard({ icon, title, description, delay }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-[#0f1219] border border-white/5 rounded-[40px] p-10 flex flex-col items-center text-center group hover:border-white/10 transition-all shadow-2xl"
    >
      <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center mb-8 relative">
        <div className="absolute inset-0 bg-[var(--color-primary)] blur-2xl opacity-0 group-hover:opacity-20 transition-all" />
        <img src={icon} className="w-12 h-12 relative z-10" alt="" />
      </div>
      <h3 className="text-2xl font-serif text-white mb-4 tracking-tight">{title}</h3>
      <p className="text-gray-500 leading-relaxed font-medium text-sm">{description}</p>
    </motion.article>
  );
}

export default function WhyShopWithUs() {
  return (
    <section className="bg-black py-32 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-[0.4em] mb-4 block"> Difference</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">Why Choose Our <span className="italic">Artisanal Gallery</span>?</h2>
          </div>
          <div className="hidden md:block h-[1px] flex-1 bg-white/5 mx-12 mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            delay={0.1}
            icon="src/assets/discount1.png"
            title="Pan-India Delivery"
            description="Experience seamless doorstep delivery across India. Handcrafted treasures, meticulously packaged and shipped to reach you in perfect condition."
          />

          <FeatureCard
            delay={0.2}
            icon="src/assets/discount2.png"
            title="Bespoke Artistry"
            description="We believe in uniqueness. Every piece can be customized to mirror your personal aesthetic, making it a true reflection of your soul."
          />

          <FeatureCard
            delay={0.3}
            icon="src/assets/discount3.png"
            title="Unrivalled Value"
            description="Direct-from-artist pricing ensures you receive master-level craftsmanship without the gallery markup. Premium art, accessible to all."
          />
        </div>
      </div>
    </section>
  );
}
