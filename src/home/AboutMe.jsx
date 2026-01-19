import { motion } from "framer-motion";
import { FiMapPin, FiAward, FiStar, FiHeart, FiCode, FiCornerDownRight, FiInstagram, FiMessageCircle } from "react-icons/fi";

export default function AboutMe() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 md:px-6 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Hero Section - Restored previous wording & layout */}
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative z-10 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                            <img
                                src="/src/assets/myPic1.jpg"
                                alt="Kavya R Menon"
                                className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-primary)]/10 blur-3xl rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[var(--color-primary)]/5 blur-3xl rounded-full" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <span className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-[0.6em] mb-4 block">
                            The Artist Behind The Craft
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif mb-8 tracking-tighter leading-tight">
                            Hi, I'm <span className="font-bold italic text-[var(--color-primary)]">Kavya R Menon</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed mb-8 italic">
                            "A software developer by profession and an artist by passion."
                        </p>
                        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                            <p>
                                Proudly from Edappal, Malappuram district, Kerala, I have always held art close to my heart, while technology remains my strength.
                            </p>
                            <p>
                                Through this platform, I bring both worlds together—combining my creative passion with my professional expertise to build an e-commerce space where art meets innovation.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-6">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                                    <FiCode /> Software Developer
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                                    <FiHeart /> Artist
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-6">
                                <a
                                    href="https://www.instagram.com/arts_n_crafts_by_kavya/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-pink-500/10 active:scale-95 group"
                                >
                                    <FiInstagram size={18} className="group-hover:rotate-12 transition-transform" />
                                    Instagram
                                </a>
                                <a
                                    href="https://wa.me/919037009645"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#25D366] text-white text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-green-500/10 active:scale-95 group"
                                >
                                    <FiMessageCircle size={18} className="group-hover:rotate-12 transition-transform" />
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>


                {/* Core Philosophy Section - Merged Journey info here */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[40px] bg-[#0f1219] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 blur-2xl rounded-full" />
                        <FiStar className="text-3xl text-[var(--color-primary)] mb-6" />
                        <h3 className="text-2xl font-serif text-white mb-4">The Artisanal Edge</h3>
                        <p className="text-gray-400 leading-relaxed font-light">
                            Every creation is handcrafted with extreme patience. I specialize in bespoke artworks, thoughtfully tailored to your unique story and space requirements. No two pieces are ever identical, ensuring your art is truly yours.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[40px] bg-[#0f1219] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-primary)]/5 blur-2xl rounded-full" />
                        <FiAward className="text-3xl text-[var(--color-primary)] mb-6" />
                        <h3 className="text-2xl font-serif text-white mb-4">Heritage & Modernity</h3>
                        <p className="text-gray-400 leading-relaxed font-light">
                            Whether it's the traditional Kerala Mural Painting or contemporary Resin Art, I strive to bring the sacred elegance of our heritage into modern homes.
                        </p>
                    </motion.div>
                </div>

                {/* Expertise Table/Grid - More compact */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 italic">The <span className="text-[var(--color-primary)]">Collection</span> Scope</h2>
                        <div className="h-[1px] w-20 bg-[var(--color-primary)] mx-auto opacity-40" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Nettipattam", desc: "Golden elephant caparisons." },
                            { title: "Mural Painting", desc: "Vibrant traditional temple art." },
                            { title: "Resin Art", desc: "Jewellery & keepsake preservation." },
                            { title: "Fusion Art", desc: "Blending Mural & Nettipattam styles." },
                            { title: "Fabric Painting", desc: "Custom art on sarees & wearables." },
                            { title: "Home Décor", desc: "Dream catchers & 3D moon art." }
                        ].map((work, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[var(--color-primary)]/20 transition-all"
                            >
                                <FiCornerDownRight className="text-[var(--color-primary)] shrink-0" />
                                <div>
                                    <h4 className="text-white font-serif text-lg leading-tight">{work.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1 font-light tracking-wide">{work.desc}</p>
                                </div>
                            </motion.div>

                        ))}
                    </div>
                </div>

                {/* Closing - Perfectly aligned */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto border-t border-white/5 pt-16"
                >
                    <p className="text-xl font-serif text-white/80 leading-relaxed mb-10 italic">
                        "Each piece is carefully handcrafted to tell a story — your story. Whether you're looking for a meaningful gift, a traditional art form, or a personalized creation, I'm happy to bring your ideas to life."
                    </p>
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20">
                        <FiMapPin className="text-[var(--color-primary)] text-sm" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-primary)]">Edappal, Malappuram - Kerala</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
