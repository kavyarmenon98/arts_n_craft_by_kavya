import { motion } from "framer-motion";

const PageLoader = () => (
  <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-[20000] backdrop-blur-sm">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] rounded-full mb-6"
    />
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white text-xs font-bold uppercase tracking-[0.5em] animate-pulse"
    >
      Preparing Collection
    </motion.p>
  </div>
);

export default PageLoader;

