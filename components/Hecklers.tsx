
import React from 'react';
import { HecklerInteraction } from '../types';
import { Skull, Zap } from 'lucide-react';

const hecklers: HecklerInteraction[] = [
  { id: '1', hecklerQuote: "Du bist nicht lustig!", kikoComeback: "Deine Frau fand mich gestern Nacht extrem lustig. Sie hat über meine Witze UND deine Performance gelacht.", damageRating: 5 },
  { id: '2', hecklerQuote: "Mein Hund ist lustiger als du.", kikoComeback: "Bring ihn hoch, vielleicht kann er mir erklären, warum du immer noch Single bist.", damageRating: 4 },
  { id: '3', hecklerQuote: "Booooo!", kikoComeback: "Bist du ein Geist oder einfach nur innerlich tot?", damageRating: 3 },
];

const Hecklers: React.FC = () => {
  const submitHeckle = () => {
    alert("Willst du wirklich von Kiko zerstört werden? Sende deinen Roast an info@kikomedy.com und bete um Gnade.");
  };

  return (
    <section id="hecklers" className="py-20 bg-vest text-white relative border-t-8 border-jet scroll-mt-24">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-16">
            <span className="block text-3xl font-comic text-banana mb-2 uppercase italic tracking-widest">SIE HABEN ES VERSUCHT. SIE SIND GESCHEITERT.</span>
            <span className="text-7xl md:text-9xl font-display text-white banana-text uppercase">
              HALLE DER SCHANDE
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hecklers.map((item) => (
              <div key={item.id} className="bg-white border-4 border-jet p-8 hover:rotate-1 transition-transform group relative shadow-flyer">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity text-jet">
                  <Skull size={64} />
                </div>
                
                <div className="mb-6 relative">
                   <div className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest flex items-center gap-1">
                      <Zap size={14} /> Heckler laberte:
                   </div>
                   <div className="bg-sky/10 border-l-4 border-sky p-4 italic text-2xl text-jet font-body font-medium">
                     "{item.hecklerQuote}"
                   </div>
                </div>

                <div className="relative">
                   <div className="text-xs font-bold text-vest uppercase mb-2 text-right tracking-widest flex items-center gap-1 justify-end">
                      Kikos atomarer Konter <Zap size={14} />
                   </div>
                   <div className="bg-banana border-4 border-jet p-4 text-2xl font-black text-jet text-right shadow-flyer transform translate-x-2">
                     "{item.kikoComeback}"
                   </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t-2 border-jet/10 pt-4">
                  <span className="text-sm font-bold text-jet uppercase tracking-tighter">FATALITY-BEWERTUNG:</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Skull 
                        key={i} 
                        size={20} 
                        className={`${i < item.damageRating ? 'text-vest fill-vest' : 'text-gray-200'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <button 
              onClick={submitHeckle}
              className="text-banana font-comic text-xl hover:text-white underline decoration-wavy transition-colors"
             >
                Selbst geroastet worden? Reiche dein L für die öffentliche Demütigung ein.
             </button>
          </div>
        </div>
    </section>
  );
};

export default Hecklers;
