import { motion } from "framer-motion";
import { FiStar, FiUser } from "react-icons/fi";
import { useState } from "react";
import ReviewModal from "../common/ReviewModal";
import { useQuery } from "@tanstack/react-query";
import { getMyOrderAPI } from "../services/service";

const reviews = [
    {
        name: "Anjali Nair",
        location: "Kochi, Kerala",
        rating: 5,
        text: "The mural painting I ordered is absolutely stunning. The level of detail and the vibrancy of the colors exceeded my expectations. It's truly a piece of heritage in my living room.",
        initials: "AN"
    },
    {
        name: "Rahul Sharma",
        location: "Bangalore",
        rating: 5,
        text: "Got a customized Nettipattam for my new home. The quality of the gold plating and the craftsmanship is top-notch. It was packaged so securely too!",
        initials: "RS"
    },
    {
        name: "Priya Menon",
        location: "Mumbai",
        rating: 5,
        text: "Arts & Craft by Kavya is my go-to for gifts. Their resin coasters are works of art. Fast delivery and beautiful packaging every single time.",
        initials: "PM"
    },
];

export default function Review() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch orders to find delivered items for review selection
    const { data: orderData } = useQuery({
        queryKey: ["orders"],
        queryFn: getMyOrderAPI,
        enabled: isModalOpen // Only fetch when they want to write a review
    });

    const deliveredOrders = orderData?.orders?.filter(order => order.status === "Delivered") || [];

    return (
        <section className="bg-black py-20 md:py-32 px-4 md:px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center mb-12 md:mb-20">
                    <span className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-[0.5em] mb-4">Voices of Art Lovers</span>
                    <h2 className="text-3xl md:text-6xl font-serif text-white tracking-tight">
                        Customer <span className="italic">Stories</span>
                    </h2>
                    <div className="flex gap-1 mt-6 text-[var(--color-primary)]">
                        {[...Array(5)].map((_, i) => <FiStar key={i} fill="currentColor" />)}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#0f1219] p-8 md:p-10 rounded-[30px] md:rounded-[40px] border border-white/5 relative group hover:border-[var(--color-primary)]/20 transition-all shadow-2xl"
                        >
                            {/* Initials / Avatar */}
                            <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center text-black font-black text-lg mb-8 shadow-lg shadow-[var(--color-primary)]/20">
                                {review.initials}
                            </div>

                            <div className="flex gap-1 mb-4 text-[var(--color-primary)] text-sm">
                                {[...Array(review.rating)].map((_, i) => <FiStar key={i} fill="currentColor" />)}
                            </div>

                            <p className="text-gray-400 italic leading-relaxed mb-10 opacity-90">
                                "{review.text}"
                            </p>

                            <div className="pt-6 border-t border-white/5">
                                <h4 className="text-white font-bold text-lg tracking-tight">{review.name}</h4>
                                <p className="text-[10px] uppercase font-bold text-gray-600 tracking-widest">{review.location}</p>
                            </div>

                            {/* Decorative Quote Mark */}
                            <div className="absolute top-10 right-10 text-white/5 text-8xl font-serif pointer-events-none">
                                "
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 flex flex-col items-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
                    >
                        Write a Review
                    </button>
                    <p className="mt-4 text-gray-600 text-[10px] uppercase font-bold tracking-widest">
                        Be the first to share your experience
                    </p>
                </div>

                <ReviewModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    deliveredItems={deliveredOrders}
                />
            </div>
        </section>
    );
}
