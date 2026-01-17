import { motion } from "framer-motion";
import { FiUsers, FiStar, FiTruck, FiBox, FiGlobe, FiAward, FiGift, FiEdit3, FiSun, FiCheckCircle, FiInfo } from "react-icons/fi";

const artisanalPledges = [
    {
        icon: <FiTruck />,
        title: "Free shipping all over india ",
        description:
            "Carefully packed and shipped across India . From our Kerala studio to your doorstep, every artwork is securely packed to arrive safely and beautifully.",
    },
    {
        icon: <FiEdit3 />,
        title: "100% Hand-Painted",
        description: "Every masterpiece is created with precision and care—no machines, no printing, just pure artisanal soul.",
    },
    {
        icon: <FiSun />,
        title: "Fade-Resistant Colors",
        description: "We use high-grade, durable pigments that maintain their vibrancy for decades, resisting the test of time.",
    },
    {
        icon: <FiInfo />,
        title: "Natural Handmade Variations",
        description:
            "As each piece is handcrafted, subtle variations such as tiny air bubbles, texture differences, or slight color shifts may occur due to weather and manual techniques. Exact replicas are not possible. Please place your order only if you appreciate the beauty of these natural variations.",
    },
    {
        icon: <FiCheckCircle />,
        title: "Premium Quality Resin",
        description: "Our resin art features non-toxic, food-grade materials that are crystal clear and highly durable.",
    },
];

const metrics = [
    { value: "100+", label: "Happy Customers" },
    { value: "180+", label: "Products Sold" },
    { value: "4.5/5", label: "Avg. Artist Rating" },
];

export default function BrandStory() {
    return (
        <section className="bg-black py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
            {/* Background Aesthetic */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--color-primary)]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-primary)]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[var(--color-primary)] font-bold text-[10px] md:text-xs uppercase tracking-[0.6em] mb-4 block"
                    >
                        Arts & Crafts By Kavya
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-7xl font-serif text-white tracking-tighter"
                    >
                        Why Trust Us !!!
                    </motion.h2>
                </div>

                {/* Main Content Area */}
                <div className="bg-[#0f1219] border border-white/5 rounded-[40px] md:rounded-[60px] p-6 md:p-20 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/5 blur-[100px] pointer-events-none" />

                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        {/* Summary Column */}
                        <div className="lg:w-1/3 sticky top-32">
                            <h3 className="text-3xl font-serif text-white mb-6">Our Artisanal <span className="italic text-[var(--color-primary)]">Commitments</span></h3>
                            <p className="text-gray-500 text-sm leading-relaxed font-medium mb-12">
                                Beyond aesthetics, we pledge absolute quality and transparency in every brushstroke and pour. Our work mirrors our heritage and passion.
                            </p>

                            {/* Metrics inside the commitment box */}
                            <div className="grid grid-cols-1 gap-8">
                                {metrics.map((m, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="text-3xl font-serif font-black text-white italic group-hover:text-[var(--color-primary)] transition-colors">{m.value}</div>
                                        <div className="text-[10px] uppercase font-black tracking-widest text-gray-600 border-l border-white/10 pl-4">{m.label}</div>
                                    </div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="mt-10 p-1 flex flex-col items-center"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative mb-4 text-center flex flex-col items-center">
                                        <div className="w-20 h-24 bg-[var(--color-primary)] rounded-b-full rounded-t-lg relative flex items-center justify-center shadow-[0_0_40px_rgba(0,161,209,0.3)] border-4 border-white/20">
                                            <div className="absolute top-0 left-0 w-full h-[30%] bg-[var(--color-primary)] rounded-t-lg" />
                                            {/* Shield shape approximation */}
                                            <div className="bg-white rounded-lg p-2 z-10">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                            </div>

                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-white font-serif text-xl block leading-tight">Razorpay Trusted</span>
                                        <span className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-[0.3em] font-sans">Business</span>
                                    </div>
                                </div>
                            </motion.div>


                            {/* Additional Perks */}
                            <div className="mt-12 flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-[var(--color-primary)] shadow-xl"><FiGift size={16} /></div>
                                    <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-[var(--color-primary)] shadow-xl"><FiGlobe size={16} /></div>
                                </div>
                                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 max-w-[120px]">
                                    Premium Packaging & Global Standards
                                </div>
                            </div>
                        </div>

                        {/* Detailed Features Column */}
                        <div className="lg:w-2/3 grid grid-cols-1 gap-6">
                            {artisanalPledges.map((pledge, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex flex-col md:flex-row gap-8 p-8 rounded-[40px] bg-black/40 border border-white/5 hover:border-[var(--color-primary)]/20 transition-all group"
                                >
                                    <div className="w-16 h-16 rounded-3xl bg-[var(--color-primary)]/5 flex items-center justify-center text-[var(--color-primary)] text-3xl flex-shrink-0 group-hover:scale-110 transition-transform border border-white/5">
                                        {pledge.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-2xl font-serif text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors line-height-tight">{pledge.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity whitespace-pre-line">
                                            {pledge.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-16 pt-10 border-t border-white/5">
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.5em]">
                        Arts & Crafts By Kavya ⋅ Focused on Artisanal Excellence
                    </p>
                </div>
            </div>
        </section>
    );
}

