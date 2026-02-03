
import React from 'react';
import { MerchItem } from '../types';
import { ShoppingBag, Palmtree, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const KIKO_HEADSHOT = "https://kikomedy.com/img/Kiko_Head_001-01-frei_cropped.png";

const items: MerchItem[] = [
  { id: '1', name: 'KIKO "Glückssocken"', price: '19 CHF', tagline: 'Riechen nach Erfolg und Käse.', image: 'https://images.unsplash.com/photo-1582966239100-80c71488a573?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: '2', name: 'KIKO Schlüsselanhänger', price: '12 CHF', tagline: 'Damit du deine Schlüssel (und Verstand) nicht verlierst.', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: '3', name: 'Nöd Dä Hellscht Hoodie', price: '55 CHF', tagline: 'Hält warm, wenn das Hirn versagt.', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: '4', name: 'Die Rote Weste (Replica)', price: '89 CHF', tagline: '100% Nukleare Energie. 0% Geschmack.', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400&h=400' },
];

const Merch: React.FC = () => {
  const addToCart = (itemName: string) => {
    alert(`${itemName} wurde in deinen Warenkorb geworfen. Gute Wahl, du Mode-Gott!`);
  };

  return (
    <section id="merch" className="py-20 bg-white border-t-8 border-jet relative overflow-hidden scroll-mt-24">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="grid grid-cols-6 gap-20 transform -rotate-12 translate-y-20">
            {[...Array(24)].map((_, i) => (
                <img key={i} src={KIKO_HEADSHOT} className="w-24 grayscale" alt="decor" />
            ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="relative mb-6"
          >
            <div className="absolute -top-10 -right-10 bg-banana p-4 rounded-full border-4 border-jet rotate-12 z-20 shadow-flyer hidden md:block">
               <Star size={40} className="text-jet fill-jet" />
            </div>
            <img 
              src={KIKO_HEADSHOT} 
              alt="Shop Mascot" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-flyer"
            />
          </motion.div>
          
          <h2 className="text-7xl md:text-9xl font-display text-jet leading-none text-center mb-4">
            KIKOMEDY <span className="text-vest">SHOP</span>
          </h2>
          <div className="bg-jet text-white font-comic text-xl px-6 py-2 transform -rotate-1 border-4 border-white shadow-flyer">
             "Qualität ist uns egal, solange es rot und gelb ist!"
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <motion.div 
              key={item.id} 
              whileHover={{ y: -10 }}
              className="group border-4 border-jet p-4 bg-white hover:bg-banana/10 transition-all relative shadow-flyer flex flex-col"
            >
              <div className="aspect-square bg-gray-100 mb-4 overflow-hidden border-2 border-jet relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute top-2 left-2 bg-jet text-white p-1 rounded-sm border border-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Zap size={16} fill="white" />
                </div>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-3xl font-display text-jet leading-none mb-1 group-hover:text-vest transition-colors uppercase">{item.name}</h3>
                <p className="font-comic text-gray-500 mb-6 text-sm">{item.tagline}</p>
              </div>

              <div className="flex justify-between items-center border-t-2 border-jet pt-4 mt-auto">
                <span className="text-3xl font-display text-vest">{item.price}</span>
                <button 
                  onClick={() => addToCart(item.name)}
                  className="bg-jet text-banana p-4 hover:bg-vest hover:text-white transition-colors border-2 border-jet shadow-banana flex items-center gap-2 group-active:translate-y-1 group-active:shadow-none"
                >
                  <ShoppingBag size={20} />
                  <span className="font-display text-xl uppercase">KAUFEN</span>
                </button>
              </div>
              
              {/* Product Badge */}
              <div className="absolute -top-3 -right-3 bg-banana text-jet font-display text-sm px-3 py-1 border-2 border-jet shadow-sm transform rotate-6 group-hover:rotate-0 transition-transform">
                BESTSELLER
              </div>
            </motion.div>
          ))}
        </div>

        {/* Shop Guarantee */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t-4 border-jet/10 pt-12">
            <div>
              <div className="bg-sky w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-jet shadow-sm">
                <Star className="text-white" />
              </div>
              <h4 className="font-display text-2xl uppercase">Handverpackt</h4>
              <p className="font-comic text-sm text-gray-400">Wahrscheinlich von Kiko selbst (keine Garantie auf Sauberkeit).</p>
            </div>
            <div>
              <div className="bg-vest w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-jet shadow-sm">
                <Zap className="text-white" />
              </div>
              <h4 className="font-display text-2xl uppercase">Turbo Versand</h4>
              <p className="font-comic text-sm text-gray-400">Schneller als ein Berggewitter, langsamer als eine Schnecke.</p>
            </div>
            <div>
              <div className="bg-banana w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-jet shadow-sm">
                <Palmtree className="text-jet" />
              </div>
              <h4 className="font-display text-2xl uppercase">Insel-Vibes</h4>
              <p className="font-comic text-sm text-gray-400">Jede Bestellung enthält eine imaginäre Palme.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Merch;
