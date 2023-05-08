import { motion } from 'framer-motion';

export function Pricing() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <h1>Pricing</h1>
      <p>Heres our pricing information...</p>
    </motion.div>
  );
}
