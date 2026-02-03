
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote, Flame } from 'lucide-react';

const KIKO_HEADSHOT = "https://kikomedy.com/img/Kiko_Head_001-01-frei_cropped.png";

const KIKO_QUOTES = [
  "Ich bin nicht der Hellste, aber hell genug, um zu sehen, dass du starrst.",
  "Hör auf mich anzuklicken, ich bin keine Kuhglocke!",
  "Yodel-ay-hee-hast du nichts Besseres zu tun?",
  "Hast du den Käse dabei oder bist du nur wegen der Witze hier?",
  "Mein Gehirn besteht zu 70% aus Gruyère und zu 30% aus Verwirrung.",
  "Bist du ein Heckler? Du piekst mich wie einer.",
  "NUKLEARE COMEDY AKTIVIERT!",
  "Vorsicht mit den Haaren, die sind Schweizer Präzisionsarbeit."
];

const KikoAvatar: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [quote, setQuote] = useState("");

  const handleClick = () => {
    const randomQuote = KIKO_QUOTES[Math.floor(Math.random() * KIKO_QUOTES.length)];
    setQuote(randomQuote);
    setIsClicked(true);
    
    // Auto-hide quote after 3 seconds
    setTimeout(() => setIsClicked(false), 3000);
  };

  return (
    <div className="relative inline-block">
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: -80 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 w-56 bg-jet text-banana p-4 rounded-xl border-4 border-white shadow-flyer pointer-events-none"
          >
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-jet border-b-4 border-r-4 border-white rotate-45" />
            <p className="font-comic text-sm text-center leading-tight uppercase font-black">
              {quote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.8, rotate: -15 }}
        onClick={handleClick}
        className="cursor-pointer relative group"
      >
        <div className="absolute inset-0 bg-banana blur-2xl opacity-0 group-hover:opacity-40 transition-opacity rounded-full"></div>
        
        <div className="w-40 h-40 md:w-56 md:h-56 relative z-10">
          <img 
            src={KIKO_HEADSHOT} 
            alt="Kiko Headshot" 
            className="w-full h-full object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transform transition-transform duration-300 group-hover:drop-shadow-[0_0_20px_rgba(248,228,52,0.8)]"
          />
        </div>
        
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute bottom-4 right-4 bg-vest text-white p-3 rounded-full border-4 border-jet shadow-flyer z-20"
        >
          <Flame size={24} fill="white" />
        </motion.div>

        <div className="absolute -top-4 -left-4 bg-banana text-jet text-xs font-black px-3 py-1 border-4 border-jet rounded-full uppercase tracking-tighter shadow-flyer opacity-0 group-hover:opacity-100 transition-opacity rotate-[-10deg]">
          KLICK MICH!
        </div>
      </motion.div>
    </div>
  );
};

export default KikoAvatar;
