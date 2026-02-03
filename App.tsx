
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Instagram, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Videos from './components/Videos';
import Shows from './components/Shows';
import Merch from './components/Merch';
import Hecklers from './components/Hecklers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Popup from './components/Popup';

const KIKO_HEADSHOT = "https://kikomedy.com/img/Kiko_Head_001-01-frei_cropped.png";

const App: React.FC = () => {
  const [konamiInput, setKonamiInput] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  
  // Adjusted thresholds: 
  // [0.02, 0.08] makes it slide in almost immediately after scrolling past the very top.
  // [0.9, 0.98] makes it stay visible longer before sliding away at the footer.
  const kikoX = useTransform(scrollYProgress, [0.02, 0.08, 0.9, 0.98], [150, 0, 0, 150]);
  const kikoRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  const viralAlerts = [
    "Ein Reel von @kikomedy hat gerade 1 Mio. Views erreicht!",
    "Jemand in Basel hat gerade deinen letzten Roast geteilt.",
    "Neuer Follower aus den Schweizer Alpen! 🐄",
    "Ticketverkäufe für Zürich EXPLODIEREN!",
    "Warnung: Hohes Level an Comedy erkannt.",
    "User @swiss_cow_king folgt dir jetzt.",
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...konamiInput, e.key];
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift();
      }
      setKonamiInput(newInput);

      if (JSON.stringify(newInput) === JSON.stringify(KONAMI_CODE)) {
        triggerEasterEgg();
        setKonamiInput([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setNotification(viralAlerts[Math.floor(Math.random() * viralAlerts.length)]);
        setTimeout(() => setNotification(null), 4000);
      }
    }, 12000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(notificationInterval);
    };
  }, [konamiInput]);

  const triggerEasterEgg = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#f8e434', '#c62828', '#64b5f6']
      });
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#f8e434', '#c62828', '#64b5f6']
      });
    }, 250);

    alert("BANANA-MODUS AKTIVIERT!");
  };

  return (
    <div className="font-body bg-sky text-jet min-h-screen selection:bg-banana selection:text-jet overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Videos />
      <Shows />
      <Merch />
      <Hecklers />
      <Contact />
      <Footer />
      <Popup />

      <motion.div
        style={{ x: kikoX, rotate: kikoRotate }}
        className="fixed top-1/2 right-0 -translate-y-1/2 z-[40] pointer-events-none"
      >
        <div className="relative group pointer-events-auto cursor-help">
          <img 
            src={KIKO_HEADSHOT} 
            alt="Peeking Kiko" 
            className="w-24 md:w-48 h-auto drop-shadow-flyer origin-right"
          />
          <div className="absolute -top-10 right-full mr-2 bg-white border-4 border-jet p-2 font-comic text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            "Scroll weiter, ich brauch die Aufmerksamkeit!"
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed bottom-10 right-10 z-[100] bg-jet text-white border-4 border-banana p-4 shadow-flyer flex items-center gap-4 max-w-xs pointer-events-none"
          >
            <div className="bg-vest p-2 rounded-full">
              <Instagram size={24} className="text-white" />
            </div>
            <div>
              <p className="font-display text-xl leading-none mb-1">VIRAL-ALARM</p>
              <p className="font-comic text-sm text-banana">{notification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
