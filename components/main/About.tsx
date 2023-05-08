import { motion } from 'framer-motion';

export function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col md:flex-row items-center justify-between py-12 px-6 md:px-12 min-h-screen"
    >
      <motion.div
        className="w-full md:w-1/2 mb-8 md:mb-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <img
          src="/example.png"
          alt="AI Chatbot"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </motion.div>
      <motion.div
        className="w-full md:w-1/2 md:pl-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About Our AI Chatbot</h1>
        <p className="mb-4">
          Our AI chatbot is powered by advanced machine learning algorithms that allow it to understand and respond to a wide range of user queries. It&apos;s capable of natural language processing, which means it can understand and respond to user queries in a conversational manner.
        </p>
        <p className="mb-4">
          The chatbot can be integrated into any website or application and can be used for a variety of purposes, including customer support, lead generation, and more. It&apos;s available 24/7, ensuring that your users always have someone (or rather, something) to talk to.
        </p>
        <p className="mb-8">
          With our AI chatbot, you can improve user engagement, reduce customer support costs, and provide a more personalized user experience.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200"
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
