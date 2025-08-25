import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, x: 80 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { type: "tween", duration: 0.5 },
      }}
      exit={{
        opacity: 0,
        x: -80,
        transition: { type: "tween", duration: 0.5 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
