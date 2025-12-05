// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
