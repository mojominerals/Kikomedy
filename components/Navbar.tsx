
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ÜBER MICH', href: '#about' },
    { name: 'VIDEOS', href: '#videos' },
    { name: 'SHOWS', href: '#shows' },
    { name: 'MERCH', href: '#merch' },
    { name: 'HECKLER', href: '#hecklers' },
    { name: 'KONTAKT', href: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const navbarHeight = 96; // Updated to match h-24
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsOpen(false);
      window.history.pushState(null, '', href);
    }
  };

  const INSTAGRAM_URL = "https://www.instagram.com/kikomedy/";
  const LOGO_URL = "https://i.ibb.co/STXFBKy/Whats-App-Image-2026-02-03-at-14-43-05-removebg-preview.png";

  return (
    <nav className="fixed top-0 w-full z-50 bg-sky/95 backdrop-blur-sm border-b-4 border-jet">
      {/* Ticker */}
      <a 
        href={INSTAGRAM_URL} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-vest text-white text-xs font-bold py-1 overflow-hidden whitespace-nowrap border-b-2 border-jet hover:bg-banana hover:text-jet transition-colors group cursor-pointer"
      >
        <div className="animate-[marquee_20s_linear_infinite] group-hover:[animation-play-state:paused] inline-block font-display tracking-widest uppercase">
          NÖD DÄ HELLSCHT TOUR 2026 | TICKETS VERKAUFEN SICH SCHNELL | FOLGE KIKO AUF INSTAGRAM @KIKOMEDY | MEHR KÜHE ALS GEHIRNZELLEN | JETZT FOLGEN FÜR TÄGLICHE ROASTS | KÄSE MITBRINGEN | FOLGE KIKO AUF INSTAGRAM @KIKOMEDY |
        </div>
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0 flex items-center">
            <motion.a 
              href="#home" 
              onClick={(e) => handleScroll(e, '#home')}
              whileHover={{ 
                y: -5,
                scale: 1.1,
                rotate: [0, -2, 2, 0]
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 10,
                rotate: { duration: 0.3 }
              }}
              className="block h-16 md:h-20 active:scale-95 py-1 cursor-pointer"
            >
              <img 
                src={LOGO_URL} 
                alt="KIKOMEDY" 
                className="h-full w-auto object-contain drop-shadow-sm"
              />
            </motion.a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="font-display text-2xl px-4 py-2 text-jet hover:bg-banana hover:shadow-banana transition-all border-2 border-transparent hover:border-jet uppercase"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-banana text-jet p-2 border-2 border-jet shadow-banana hover:bg-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-sky border-b-4 border-jet">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="font-display text-3xl text-jet block px-3 py-2 border-b-2 border-jet/10 hover:bg-banana uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
