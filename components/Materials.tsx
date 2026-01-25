import React, { useState } from 'react';
import { Check, ChevronRight, Info } from 'lucide-react';
import { Reveal } from './Reveal';

const Materials: React.FC = () => {
  const categories = ["Quartz", "Granite", "Marble", "Porcelain"];
  const [activeCategory, setActiveCategory] = useState("Quartz");

  const materialsDB: Record<string, any[]> = {
    "Quartz": [
        { name: "Calacatta Gold", img: "https://images.unsplash.com/photo-1596489360817-f55a156cb2f6?q=80&w=600&auto=format&fit=crop", tag: "Popular" },
        { name: "Pure White", img: "https://images.unsplash.com/photo-1587317768567-9388df6554b7?q=80&w=600&auto=format&fit=crop", tag: "Modern" },
        { name: "Carrara Mist", img: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=600&auto=format&fit=crop", tag: "Classic" },
        { name: "Midnight Grey", img: "https://images.unsplash.com/photo-1629815598696-9f796695245f?q=80&w=600&auto=format&fit=crop", tag: "Bold" },
    ],
    "Granite": [
        { name: "Black Galaxy", img: "https://images.unsplash.com/photo-1628198758804-9842af564c76?q=80&w=600&auto=format&fit=crop", tag: "Durable" },
        { name: "Blue Savoie", img: "https://images.unsplash.com/photo-1617855073387-573523293838?q=80&w=600&auto=format&fit=crop", tag: "Exotic" },
        { name: "Colonial White", img: "https://images.unsplash.com/photo-1550920404-585802523f46?q=80&w=600&auto=format&fit=crop", tag: "Value" },
    ],
    "Marble": [
        { name: "Carrara White", img: "https://images.unsplash.com/photo-1574488421008-8df0db378615?q=80&w=600&auto=format&fit=crop", tag: "Timeless" },
        { name: "Emperador", img: "https://images.unsplash.com/photo-1610443721703-9b8764a7c06c?q=80&w=600&auto=format&fit=crop", tag: "Luxury" },
    ],
    "Porcelain": [
        { name: "Statuario", img: "https://images.unsplash.com/photo-1599692461877-a87f4c78119c?q=80&w=600&auto=format&fit=crop", tag: "New" },
        { name: "Cement Look", img: "https://images.unsplash.com/photo-1596489360817-f55a156cb2f6?q=80&w=600&auto=format&fit=crop", tag: "Industrial" },
    ]
  };

  const [selectedMaterial, setSelectedMaterial] = useState(materialsDB["Quartz"][0]);

  return (
    <section id="materials" className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal width="100%" variant="left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Stone Inventory</span>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mt-2">Browse Granite & Quartz Slabs</h2>
            </div>
            <div className="hidden md:block text-slate-500 text-sm">
                Inventory updated weekly. Fabrication & Installation available.
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left: Mobile-Friendly Controls & Grid */}
            <div className="w-full lg:w-1/2 flex flex-col">
                {/* Scrollable Categories (App-like pill selector) */}
                <Reveal width="100%" delay={100} variant="up">
                  <div className="flex overflow-x-auto gap-3 pb-4 mb-2 no-scrollbar md:flex-wrap">
                      {categories.map((cat) => (
                          <button
                              key={cat}
                              onClick={() => {
                                  setActiveCategory(cat);
                                  setSelectedMaterial(materialsDB[cat][0]);
                              }}
                              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                                  activeCategory === cat 
                                  ? 'bg-slate-900 text-white shadow-lg scale-105' 
                                  : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-400 hover:scale-105'
                              }`}
                          >
                              {cat}
                          </button>
                      ))}
                  </div>
                </Reveal>

                {/* Material Grid */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 mt-4 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {materialsDB[activeCategory]?.map((mat, idx) => (
                        <Reveal key={idx} width="100%" delay={idx * 50} variant="scale">
                          <div 
                              onClick={() => setSelectedMaterial(mat)}
                              className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                                  selectedMaterial.name === mat.name 
                                  ? 'border-brand-orange ring-2 ring-brand-orange/20 scale-95' 
                                  : 'border-transparent hover:border-slate-300 hover:scale-105'
                              }`}
                          >
                              <img src={mat.img} alt={mat.name} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-2 md:p-3">
                                  <span className="text-white text-[10px] md:text-xs font-bold leading-tight line-clamp-2">{mat.name}</span>
                                  {selectedMaterial.name === mat.name && (
                                      <div className="absolute top-2 right-2 bg-brand-orange rounded-full p-1 text-white animate-scale-in">
                                          <Check size={10} strokeWidth={4} />
                                      </div>
                                  )}
                              </div>
                          </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Right: Live Preview (Sticky on Desktop) */}
            <div className="w-full lg:w-1/2 order-first lg:order-last">
                <Reveal width="100%" delay={200} variant="right">
                  <div className="bg-white rounded-2xl p-2 shadow-2xl border border-slate-100 h-64 md:h-full md:min-h-[400px] relative overflow-hidden group">
                      <img 
                          src={selectedMaterial.img} 
                          alt={selectedMaterial.name} 
                          className="w-full h-full object-cover rounded-xl transition-transform duration-700 ease-out-expo group-hover:scale-105"
                          key={selectedMaterial.name} // Key forces re-render for nice fade
                      />
                      
                      {/* Floating Info Card */}
                      <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-xl shadow-lg border border-slate-100 animate-slide-up-fade">
                          <div className="flex justify-between items-start mb-2">
                              <div>
                                  <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider mb-2">
                                      {selectedMaterial.tag} Collection
                                  </span>
                                  <h3 className="text-xl md:text-2xl font-serif text-slate-900">{selectedMaterial.name}</h3>
                              </div>
                              <div className="bg-slate-900 text-white rounded-full p-2 hidden md:block">
                                  <Info size={20} />
                              </div>
                          </div>
                          <p className="text-slate-500 text-sm mb-4 hidden md:block">
                              Premium {activeCategory} surface suitable for kitchen islands, vanities, and high-traffic areas.
                          </p>
                          <button 
                              onClick={() => document.getElementById('quote-form')?.scrollIntoView({behavior: 'smooth'})}
                              className="w-full bg-brand-orange text-white py-2.5 md:py-3 rounded-lg font-bold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
                          >
                              Get Installation Quote <span className="hidden md:inline">for {selectedMaterial.name}</span> <ChevronRight size={16} />
                          </button>
                      </div>
                  </div>
                </Reveal>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Materials;