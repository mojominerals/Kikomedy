
import React, { useState } from 'react';
import { Play, Instagram, X, ExternalLink, Zap, Heart, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPost {
  id: string;
  reelId: string;
  title: string;
  views: string;
  thumbnail: string;
}

const viralReels: VideoPost[] = [
  { 
    id: '1', 
    reelId: 'C4p6lO6M8f_',
    title: "KIKO gegen den Rest", 
    views: "2.4M", 
    thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400&h=711"
  },
  { 
    id: '2', 
    reelId: 'C39_9s8M7gA',
    title: "Warum Kühe nicht wählen", 
    views: "1.1M", 
    thumbnail: "https://images.unsplash.com/photo-1545464333-9cbd1f263aa0?auto=format&fit=crop&q=80&w=400&h=711"
  },
  { 
    id: '3', 
    reelId: 'C3X_YvVM6fD',
    title: "Dating in den Alpen", 
    views: "3.8M", 
    thumbnail: "https://images.unsplash.com/photo-1527224857830-43a7acc852fe?auto=format&fit=crop&q=80&w=400&h=711"
  },
  { 
    id: '4', 
    reelId: 'C2z_U7YM5eC',
    title: "Schweizer Probleme", 
    views: "950K", 
    thumbnail: "https://images.unsplash.com/photo-1531058285147-758e9d63ef3c?auto=format&fit=crop&q=80&w=400&h=711"
  },
];

const INSTAGRAM_URL = "https://www.instagram.com/kikomedy/";

const Videos: React.FC = () => {
  const [selectedReel, setSelectedReel] = useState<string | null>(null);

  return (
    <section id="videos" className="py-20 bg-sky relative border-t-8 border-jet overflow-hidden scroll-mt-24">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex flex-wrap gap-20 justify-center items-center">
        {[...Array(20)].map((_, i) => (
          <Instagram key={i} size={150} />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-7xl md:text-9xl font-display text-white mb-4 text-center banana-text uppercase">
            VIRALER <span className="text-vest">WAHNSINN</span>
          </h2>
          <div className="flex flex-col items-center gap-4">
             <p className="font-comic text-2xl text-jet bg-white px-4 py-1 border-2 border-jet -rotate-1 shadow-sm">
                Klicke ein Video, um den echten Wahnsinn zu sehen!
             </p>
            <a 
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-jet text-banana font-display text-3xl px-6 py-2 border-4 border-white shadow-flyer transform rotate-1 flex items-center gap-2 hover:bg-vest hover:text-white transition-all cursor-pointer group"
            >
                <Instagram size={32} className="group-hover:scale-110 transition-transform" /> @KIKOMEDY
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {viralReels.map((video) => (
            <motion.div 
              key={video.id} 
              whileHover={{ y: -10, rotate: 1 }}
              onClick={() => setSelectedReel(video.reelId)}
              className="group relative bg-jet border-4 border-jet shadow-flyer overflow-hidden rounded-xl aspect-[9/16] cursor-pointer"
            >
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                <div className="absolute top-4 right-4 flex gap-2">
                   <div className="bg-vest text-white font-display text-xl px-3 py-1 border-2 border-jet shadow-sm animate-pulse uppercase">
                    WATCH NOW
                   </div>
                </div>
                
                <h3 className="font-display text-3xl text-white mb-2 leading-tight group-hover:text-banana transition-colors">
                  {video.title}
                </h3>
                
                <div className="flex items-center gap-4 text-white font-bold text-sm mb-4">
                  <span className="flex items-center gap-1"><Heart size={16} fill="currentColor" className="text-vest" /> {video.views}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={16} /> REELS</span>
                </div>

                <div className="flex items-center justify-center w-full bg-banana text-jet font-display text-2xl py-3 gap-2 border-2 border-jet shadow-sm group-hover:bg-white transition-colors">
                  <Play size={24} fill="currentColor" /> VIDEO LADEN
                </div>
              </div>

              {/* Overlay Hover Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="w-24 h-24 bg-vest/90 rounded-full flex items-center justify-center border-4 border-white shadow-flyer">
                  <Play fill="white" size={48} className="ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="font-comic text-3xl text-jet mb-8 rotate-1">
             "Mein Instagram ist ein Müllcontainer-Brand. Komm und wärm dir die Hände."
          </p>
          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-4 px-12 py-6 bg-jet text-white font-display text-4xl uppercase border-4 border-white shadow-flyer hover:bg-vest hover:shadow-banana transition-all transform -rotate-2 hover:rotate-0"
          >
            <Instagram size={48} />
            EMPIRE BETRETEN
          </a>
        </div>
      </div>

      {/* Lightbox / Video Player */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-jet/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-lg aspect-[9/16] bg-black border-8 border-jet shadow-[0_0_50px_rgba(248,228,52,0.3)] rounded-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedReel(null)}
                className="absolute top-4 right-4 z-[110] bg-vest text-white p-3 rounded-full border-4 border-jet shadow-flyer hover:scale-110 transition-transform"
              >
                <X size={32} />
              </button>

              {/* Instagram Embed Iframe */}
              <div className="w-full h-full pt-12 pb-4 px-2">
                <iframe
                  src={`https://www.instagram.com/reels/${selectedReel}/embed`}
                  className="w-full h-full border-0 rounded-lg"
                  scrolling="no"
                  allowTransparency={true}
                  frameBorder="0"
                ></iframe>
              </div>

              {/* Branding Bar */}
              <div className="absolute bottom-0 left-0 w-full bg-banana border-t-4 border-jet py-2 flex justify-center items-center gap-4">
                <div className="font-display text-xl text-jet uppercase tracking-widest">NÖD DÄ HELLSCHT TV</div>
                <div className="flex gap-1">
                    <Zap size={16} fill="currentColor" className="text-vest" />
                    <Zap size={16} fill="currentColor" className="text-vest" />
                    <Zap size={16} fill="currentColor" className="text-vest" />
                </div>
              </div>
            </motion.div>
            
            {/* Click outside to close */}
            <div 
                className="absolute inset-0 -z-10 cursor-pointer" 
                onClick={() => setSelectedReel(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bottom Marquee Link */}
      <a 
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white border-y-4 border-jet py-4 mt-20 overflow-hidden whitespace-nowrap group hover:bg-banana transition-colors cursor-pointer"
      >
        <div className="animate-marquee group-hover:[animation-play-state:paused] inline-block font-display text-4xl text-jet tracking-widest uppercase">
          FOLGE KIKO AUF INSTAGRAM @KIKOMEDY | TÄGLICHE ROASTS | KUH-UPDATES | NUKLEARE ENERGIE | FOLGE KIKO AUF INSTAGRAM @KIKOMEDY | TÄGLICHE ROASTS | KUH-UPDATES | NUKLEARE ENERGIE | FOLGE KIKO AUF INSTAGRAM @KIKOMEDY |
        </div>
      </a>
    </section>
  );
};

export default Videos;
