import { motion } from 'framer-motion';
import { useState } from 'react';
import ChatPopup from './ChatPopup';

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const buttonVariants = {
    open: { backgroundColor: "#3b82f6" },
    closed: { backgroundColor: "#1e40af" },
  };

  const popupVariants = {
    open: { translateY: 0, opacity: 1 },
    closed: { translateY: 100, opacity: 0 },
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end">
      {isOpen && (
        <motion.div
          className="w-80 bg-white shadow-2xl rounded-md overflow-hidden mb-4"
          initial="closed"
          animate="open"
          variants={popupVariants}
          transition={{ duration: 0.5 }}
        >
          <ChatPopup />
        </motion.div>
      )}
      <motion.button
        onClick={toggleChat}
        className="relative group w-10 h-10 text-white font-bold text-2xl rounded-full focus:outline-none flex items-center justify-center z-10"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={buttonVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="relative flex flex-col overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
          {!isOpen && (
            <div className="transform transition-all duration-150 overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </div>
          )}
          {isOpen && (
            <div className="flex flex-col justify-between w-[16px] h-[16px] transform transition-all duration-300 origin-center overflow-hidden">
              <div className="bg-white mb-1 h-[2px] w-5 transform transition-all duration-300 origin-left group-focus:translate-y-5"></div>
              <div className="bg-white mb-1 h-[2px] w-5 rounded transform transition-all duration-300 group-focus:translate-y-5 delay-75"></div>
              <div className="bg-white h-[2px] w-5 transform transition-all duration-300 origin-left group-focus:translate-y-5 delay-100"></div>
            </div>
          )}
        </div>
      </motion.button>
    </div>
  );

}
