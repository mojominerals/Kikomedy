
import React, { useState, useMemo } from 'react';
import { Show } from '../types';
import { MapPin, Ticket, Palmtree, Zap, Info, X, List, Map as MapIcon, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const shows: Show[] = [
  { id: '1', date: '10.04.26', venue: 'Kino Stüssihof', city: 'Zürich', status: 'available', price: '45 CHF' },
  { id: '2', date: '11.04.26', venue: 'Kino Stüssihof', city: 'Zürich', status: 'available', price: '45 CHF' },
  { id: '3', date: '16.04.26', venue: 'Fauteuil', city: 'Basel', status: 'last-chance', price: '42 CHF' },
  { id: '4', date: '17.04.26', venue: 'Mood 12', city: 'Amriswil', status: 'available', price: '38 CHF' },
  { id: '5', date: '18.04.26', venue: 'ROK Klub', city: 'Luzern', status: 'available', price: '40 CHF' },
  { id: '6', date: '21.04.26', venue: 'Oxil', city: 'Zofingen', status: 'available', price: '35 CHF' },
  { id: '7', date: '24.04.26', venue: "Let's Fetz", city: 'Einsiedeln', status: 'available', price: '35 CHF' },
  { id: '8', date: '25.04.26', venue: 'Harley Davidson', city: 'Rümlang', status: 'available', price: '45 CHF' },
  { id: '9', date: '30.04.26', venue: 'AP Café', city: 'Aadorf', status: 'available', price: '30 CHF' },
  { id: '10', date: '08.05.26', venue: 'Nordportal', city: 'Baden', status: 'available', price: '45 CHF' },
  { id: '11', date: '13.06.26', venue: 'Weid Am Berg', city: 'Heiden', status: 'available', price: '38 CHF' },
  { id: '12', date: '02.09.26', venue: 'Madlen', city: 'Heerbrugg', status: 'available', price: '40 CHF' },
  { id: '13', date: '03.09.26', venue: 'Caverno', city: 'Bülach', status: 'available', price: '38 CHF' },
  { id: '14', date: '11.09.26', venue: 'Plaza Klub', city: 'Zürich', status: 'last-chance', price: '50 CHF' },
];

// High-fidelity relative coordinates for a 1000x650 viewBox
const cityCoords: Record<string, { x: number; y: number }> = {
  'Zürich': { x: 650, y: 175 },
  'Basel': { x: 530, y: 120 },
  'Amriswil': { x: 810, y: 140 },
  'Luzern': { x: 610, y: 260 },
  'Zofingen': { x: 560, y: 220 },
  'Einsiedeln': { x: 690, y: 270 },
  'Rümlang': { x: 640, y: 155 },
  'Aadorf': { x: 730, y: 165 },
  'Baden': { x: 610, y: 160 },
  'Heiden': { x: 850, y: 155 },
  'Heerbrugg': { x: 870, y: 185 },
  'Bülach': { x: 655, y: 135 },
};

const Shows: React.FC = () => {
  // Changed default viewMode from 'map' to 'list'
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const filteredShows = useMemo(() => 
    selectedCity ? shows.filter(s => s.city === selectedCity) : [], 
  [selectedCity]);

  const uniqueCities = useMemo(() => Array.from(new Set(shows.map(s => s.city))), []);

  const buyTicket = (venue: string) => {
    alert(`Ticket-Kauf für ${venue} gestartet! Dein Browser wird dich jetzt zum Glück führen.`);
  };

  return (
    <section id="shows" className="py-20 bg-sky relative overflow-hidden border-t-8 border-jet scroll-mt-24">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-7xl md:text-9xl font-display text-white mb-6 text-center uppercase tracking-tighter banana-text">
            TOUR <span className="text-vest">TICKETS</span>
          </h2>
          
          {/* View Toggle */}
          <div className="flex bg-jet p-1 border-4 border-jet shadow-flyer transform -rotate-1">
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-6 py-2 font-display text-2xl transition-all ${viewMode === 'list' ? 'bg-banana text-jet shadow-sm' : 'text-white hover:text-banana'}`}
            >
              <List size={20} /> LISTE
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-6 py-2 font-display text-2xl transition-all ${viewMode === 'map' ? 'bg-banana text-jet shadow-sm' : 'text-white hover:text-banana'}`}
            >
              <MapIcon size={20} /> KARTE
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {viewMode === 'map' ? (
            <div className="flex flex-col xl:flex-row gap-8 bg-white/10 backdrop-blur-md p-4 md:p-8 border-4 border-jet shadow-flyer rounded-xl">
              
              {/* INTERACTIVE MAP CONTAINER */}
              <div className="flex-[3] relative bg-jet/90 rounded-lg overflow-hidden min-h-[450px] md:min-h-[600px] border-4 border-jet shadow-inner">
                <div className="absolute top-4 left-4 z-20">
                   <div className="bg-banana text-jet px-4 py-2 font-display text-2xl border-2 border-jet shadow-sm rotate-1">
                      LIVE RADAR: SCHWEIZ
                   </div>
                </div>

                <svg viewBox="0 0 1000 650" className="w-full h-full drop-shadow-2xl">
                  {/* Geographic High-Detail Switzerland Outline */}
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M500,50 L550,60 L600,40 L650,70 L700,55 L750,90 L800,80 L850,110 L900,100 L950,130 L930,180 L960,230 L940,280 L970,330 L930,380 L950,430 L910,480 L930,530 L880,560 L830,540 L780,580 L730,560 L680,600 L630,580 L580,620 L530,600 L480,640 L430,610 L380,630 L330,600 L280,620 L230,590 L180,610 L130,580 L80,600 L50,560 L80,510 L40,460 L70,410 L30,360 L60,310 L20,260 L50,210 L30,160 L80,130 L130,150 L180,120 L230,140 L280,110 L330,130 L380,100 L430,120 L480,90 Z" 
                    className="fill-banana/10 stroke-banana stroke-[8] stroke-linejoin-round"
                  />
                  <path 
                    d="M500,50 L550,60 L600,40 L650,70 L700,55 L750,90 L800,80 L850,110 L900,100 L950,130 L930,180 L960,230 L940,280 L970,330 L930,380 L950,430 L910,480 L930,530 L880,560 L830,540 L780,580 L730,560 L680,600 L630,580 L580,620 L530,600 L480,640 L430,610 L380,630 L330,600 L280,620 L230,590 L180,610 L130,580 L80,600 L50,560 L80,510 L40,460 L70,410 L30,360 L60,310 L20,260 L50,210 L30,160 L80,130 L130,150 L180,120 L230,140 L280,110 L330,130 L380,100 L430,120 L480,90 Z"
                    className="fill-sky/5 stroke-white/20 stroke-[2]"
                  />

                  {/* City Markers */}
                  {uniqueCities.map((city) => {
                    const coords = cityCoords[city] || { x: 500, y: 300 };
                    const isSelected = selectedCity === city;
                    const isHovered = hoveredCity === city;

                    return (
                      <motion.g 
                        key={city}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredCity(city)}
                        onMouseLeave={() => setHoveredCity(null)}
                        onClick={() => setSelectedCity(city)}
                      >
                        {/* Radioactive Glow */}
                        <motion.circle 
                          cx={coords.x} cy={coords.y} r="20"
                          fill={isSelected ? '#c62828' : '#f8e434'}
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: isHovered || isSelected ? 0.3 : 0,
                            scale: isHovered || isSelected ? 1.5 : 1
                          }}
                        />

                        {/* Animated Pin */}
                        <motion.g
                          animate={isHovered || isSelected ? { y: -10 } : { y: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <circle cx={coords.x} cy={coords.y} r="8" className={`${isSelected ? 'fill-vest' : 'fill-banana'} stroke-jet stroke-2`} />
                          <MapPin 
                            x={coords.x - 16} y={coords.y - 36} 
                            size={32} 
                            className={`${isSelected ? 'text-vest' : 'text-banana'} drop-shadow-lg`} 
                            fill={isSelected ? 'white' : 'currentColor'}
                          />
                        </motion.g>

                        {/* Label Tooltip */}
                        <AnimatePresence>
                          {(isHovered || isSelected) && (
                            <motion.g
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                            >
                              <rect 
                                x={coords.x - 60} y={coords.y + 15} 
                                width="120" height="34" 
                                className="fill-jet stroke-white stroke-2" 
                                rx="4"
                              />
                              <text 
                                x={coords.x} y={coords.y + 38} 
                                textAnchor="middle" 
                                className="fill-white font-display text-2xl uppercase tracking-widest pointer-events-none"
                              >
                                {city}
                              </text>
                            </motion.g>
                          )}
                        </AnimatePresence>
                      </motion.g>
                    );
                  })}
                </svg>
                
                <div className="absolute bottom-4 right-4 text-white/20 font-display text-sm tracking-widest pointer-events-none italic">
                    * GEOGRAPHICALLY ACCURATE-ISH
                </div>
              </div>

              {/* DETAILS PANEL */}
              <div className="flex-[2] min-h-[500px] flex flex-col">
                <AnimatePresence mode="wait">
                  {selectedCity ? (
                    <motion.div 
                      key={selectedCity}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white border-4 border-jet shadow-flyer p-6 md:p-10 flex flex-col h-full"
                    >
                      <div className="flex justify-between items-start mb-8 border-b-4 border-jet pb-4">
                        <div>
                          <h3 className="font-display text-7xl text-jet leading-none uppercase mb-2">
                            {selectedCity}
                          </h3>
                          <div className="bg-vest text-white px-3 py-1 font-display text-xl -rotate-1 inline-block">
                             NÖD DÄ HELLSCHT TOUR 2026
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedCity(null)}
                          className="p-3 bg-jet text-white hover:bg-vest transition-colors shadow-sm"
                        >
                          <X size={24} />
                        </button>
                      </div>

                      <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                        {filteredShows.map((show) => (
                          <motion.div 
                            key={show.id} 
                            whileHover={{ scale: 1.02 }}
                            className="border-4 border-jet p-6 hover:bg-sky/5 transition-all relative group"
                          >
                             <div className="flex justify-between items-center mb-3">
                                <span className="font-display text-3xl text-vest">{show.date}</span>
                                <span className="font-display text-2xl text-jet bg-banana px-3 border-2 border-jet">{show.price}</span>
                             </div>
                             <h4 className="font-display text-4xl text-jet mb-4 tracking-tight">{show.venue}</h4>
                             
                             <button 
                                onClick={() => buyTicket(show.venue)}
                                className={`w-full flex items-center justify-center gap-3 py-4 font-display text-3xl border-4 border-jet shadow-flyer transition-all active:translate-x-1 active:translate-y-1 active:shadow-none
                                  ${show.status === 'last-chance' ? 'bg-vest text-white' : 'bg-banana text-jet hover:bg-jet hover:text-white'}
                                `}
                              >
                                <Ticket size={24} /> TICKETS SICHERN
                              </button>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-8 p-4 bg-sky text-white border-4 border-jet flex items-center gap-4 rotate-1 shadow-banana">
                         <Zap className="text-banana animate-pulse" />
                         <p className="text-sm font-comic leading-tight text-jet">
                            Achtung: Lachkrämpfe können zu Sauerstoffmangel führen!
                         </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white border-4 border-jet shadow-flyer p-12 text-center flex flex-col items-center justify-center h-full"
                    >
                      <div className="w-40 h-40 bg-sky rounded-full flex items-center justify-center border-4 border-jet mb-8 shadow-banana animate-bounce">
                         <MapPin size={80} className="text-white" />
                      </div>
                      <h3 className="font-display text-6xl text-jet mb-6 uppercase">REGION WÄHLEN</h3>
                      <p className="font-comic text-2xl text-gray-400 max-w-sm mx-auto mb-8">
                         "Klick auf die gelben Punkte, um zu sehen, wo wir die Schweiz zerstören."
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                         {uniqueCities.slice(0, 5).map(c => (
                           <button key={c} onClick={() => setSelectedCity(c)} className="px-5 py-2 border-2 border-jet font-display text-xl hover:bg-banana transition-colors">
                            {c}
                           </button>
                         ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            /* LIST VIEW MODE */
            <div className="bg-white border-8 border-jet shadow-flyer max-w-5xl mx-auto overflow-hidden">
               <div className="bg-jet text-white p-6 flex justify-between items-center">
                  <h3 className="font-display text-4xl uppercase">ALLE TOUR DATEN 2026</h3>
                  <div className="flex gap-1">
                     <Zap className="text-banana" size={24} />
                     <Zap className="text-banana" size={24} />
                  </div>
               </div>
               
               <div className="divide-y-4 divide-jet">
                  {shows.map((show) => (
                    <div key={show.id} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-banana/10 transition-colors">
                       <div className="flex items-center gap-6">
                          <div className="text-center bg-sky border-4 border-jet p-4 shadow-sm transform -rotate-2">
                             <div className="font-display text-4xl text-white leading-none">{show.date.split('.')[0]}</div>
                             <div className="font-display text-xl text-jet">{show.date.split('.')[1]}.{show.date.split('.')[2]}</div>
                          </div>
                          <div>
                             <h4 className="font-display text-4xl text-jet uppercase leading-none mb-1">{show.venue}</h4>
                             <p className="font-display text-2xl text-vest uppercase tracking-widest">{show.city}</p>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-4">
                          <div className="hidden sm:block text-right">
                             <p className="font-comic text-jet text-sm uppercase font-bold">{show.price}</p>
                             {show.status === 'last-chance' && <p className="text-vest font-black text-xs animate-pulse">FAST WEG!</p>}
                          </div>
                          <button 
                            onClick={() => buyTicket(show.venue)}
                            className="bg-jet text-banana px-8 py-3 font-display text-3xl hover:bg-vest hover:text-white transition-all shadow-flyer flex items-center gap-2 uppercase"
                          >
                            <Ticket size={24} /> TICKETS
                          </button>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="bg-banana p-8 text-center border-t-8 border-jet">
                  <p className="font-display text-4xl text-jet uppercase mb-4">FEHLT DEINE STADT?</p>
                  <a href="#contact" className="inline-block bg-white border-4 border-jet px-10 py-4 font-display text-3xl hover:bg-jet hover:text-white transition-all shadow-flyer">
                     KIKO EINLADEN
                  </a>
               </div>
            </div>
          )}
        </div>

        {/* BOOKING SECTION */}
        <div className="max-w-4xl mx-auto mt-20">
            <div className="bg-white p-8 md:p-12 border-4 border-jet shadow-flyer transform -rotate-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                   <Zap size={128} fill="black" />
                </div>
                <h3 className="text-4xl md:text-7xl font-display text-jet mb-6 text-center uppercase leading-none relative z-10">
                    KIKO FÜR DEINEN <span className="text-vest">EVENT</span>?
                </h3>
                <p className="text-center text-gray-500 font-comic text-2xl mb-10 relative z-10">
                    "Ich rede viel, esse wenig und mache alle froh (hoffentlich)."
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                    <a href="#contact" className="bg-vest text-white font-display text-4xl px-12 py-6 hover:bg-jet hover:text-banana transition-all border-4 border-transparent hover:border-jet uppercase shadow-flyer text-center">
                        JETZT ANFRAGEN
                    </a>
                    <div className="bg-banana border-4 border-jet p-6 flex items-center gap-4 shadow-flyer">
                        <Palmtree size={40} className="text-jet" />
                        <div>
                           <p className="font-display text-2xl leading-none">HOTLINE</p>
                           <p className="font-comic text-sm">info@kikomedy.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #050505;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #c62828;
        }
      `}} />
    </section>
  );
};

export default Shows;
