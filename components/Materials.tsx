import React, { useState } from 'react';
import { Check, ChevronRight, Info, MapPin, Phone } from 'lucide-react';
import { Reveal } from './Reveal';

const Materials: React.FC = () => {
  // Removed "Porcelain" from categories
  const categories = ["Quartz", "Granite", "Marble"];
  const [activeCategory, setActiveCategory] = useState("Quartz");

  const materialsDB: Record<string, any[]> = {
    "Quartz": [
        { name: "Calacatta Gold", img: "https://marinamarmores.com.br/wp-content/uploads/2019/07/marmore_Calacatta-Oro.jpg", tag: "Popular" },
        { name: "Pure White", img: "https://marinamarmores.com.br/wp-content/uploads/2019/08/quartzo-1141-Pure-White-Caesarstone.jpg", tag: "Modern" },
        { name: "Carrara Mist", img: "https://fabquartz.com/cdn/shop/files/Carrara-Mist-Primary-Web-Image-HiResJPG.jpg?v=1691535877&width=1946", tag: "Classic" },
        { name: "Midnight Grey", img: "https://marble.com/uploads/materials/2370/1280X720/quartz_Midnight-Mist-Honed-Pental-Quartz_NZQMuk3QMR5GiLcUxElw.jpg", tag: "Bold" },
        { name: "Statutario Nuvo", img: "https://studio.caesarstoneus.com/wp-content/uploads/2020/12/5111_Statuario-Nuvo_5111_Full_Slab_1920x890px-1.jpg", tag: "Premium" },
        { name: "Concrete Matte", img: "https://www.wk.com.au/productdata/productimages/Concrete-Matte-slab.jpg", tag: "Industrial" },
    ],
    "Granite": [
        { name: "Black Galaxy", img: "https://marinamarmores.com.br/wp-content/uploads/2019/08/granito-Black-Galaxy.jpg", tag: "Durable" },
        { name: "Blue Savoie", img: "https://d1eukw5if3dy4m.cloudfront.net/storage/post/zec0PLKic3E4v7aafUsz9fvTcx2v0ejBfvivXTlj.jpg", tag: "Exotic" },
        { name: "Colonial White", img: "https://marinamarmores.com.br/wp-content/uploads/2019/08/granito-Colonial-White.jpg", tag: "Value" },
        { name: "Titanium Black", img: "https://marinamarmores.com.br/wp-content/uploads/2019/08/granito-Titanium-Black1.jpg", tag: "Luxury" },
        { name: "Alaska White", img: "https://www.alicante.com.br/wp-content/uploads/2021/07/Granito-Branco-Alasca-1000x2000-1.png", tag: "Popular" },
    ],
    "Marble": [
        { name: "Carrara White", img: "https://marble.com/uploads/materials/1075/1280X720/marble_White-Carrara_fWF1kmDGuRZJavjUsERa.jpg", tag: "Timeless" },
        { name: "Emperador", img: "https://marmialberti.it/wp-content/uploads/2025/02/Emperador-dark.jpg", tag: "Luxury" },
        { name: "Calacatta Viola", img: "https://marble.com/uploads/materials/3092/1280X720/marble_Calacatta-Viola-Rq-Marble_Kv8jws0qFeq0gpwfK9hR.jpg", tag: "Statement" },
        { name: "Nero Marquina", img: "https://www.fiorantina.com/wp-content/uploads/2023/03/FORMATO-PATTERN-14.jpg", tag: "Bold" },
    ]
    // Removed Porcelain data
  };

  const [selectedMaterial, setSelectedMaterial] = useState(materialsDB["Quartz"][0]);

  const handlePhoneClick = (e: React.MouseEvent) => {
    // @ts-ignore
    if (typeof window.gtag_report_conversion === 'function') {
        e.preventDefault();
        // @ts-ignore
        window.gtag_report_conversion('tel:4703804785');
    }
  };

  return (
    <section id="materials" className="py-16 md:py-24 bg-slate-950 overflow-hidden relative">
      {/* Ambient Lighting Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal width="100%" variant="left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Stone Inventory</span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mt-2">Browse Granite & Quartz Slabs</h2>
            </div>
            <div className="hidden md:block text-slate-400 text-sm">
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
                              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                                  activeCategory === cat 
                                  ? 'bg-white text-slate-900 border-white shadow-lg scale-105' 
                                  : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white hover:scale-105'
                              }`}
                          >
                              {cat}
                          </button>
                      ))}
                  </div>
                </Reveal>

                {/* Material Grid */}
                {/* Ensure aspect-square is present to keep all items exactly the same size */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 mt-4 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {materialsDB[activeCategory]?.map((mat, idx) => (
                        <Reveal key={idx} width="100%" delay={idx * 50} variant="scale">
                          <div 
                              onClick={() => setSelectedMaterial(mat)}
                              className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 bg-slate-900 ${
                                  selectedMaterial.name === mat.name 
                                  ? 'border-brand-orange ring-2 ring-brand-orange/20 scale-95' 
                                  : 'border-transparent hover:border-slate-700 hover:scale-105'
                              }`}
                          >
                              <img 
                                src={mat.img} 
                                alt={mat.name} 
                                loading="lazy" 
                                decoding="async"
                                className="w-full h-full object-cover" 
                              />
                              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-2 md:p-3">
                                  <span className="text-white text-[10px] md:text-xs font-bold leading-tight line-clamp-2 drop-shadow-md">{mat.name}</span>
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

                {/* Showroom CTA Banner */}
                <Reveal width="100%" delay={300} variant="up">
                  <div className="mt-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-xl p-5 md:p-6 text-center relative overflow-hidden group shadow-lg">
                      <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <h3 className="text-white font-serif text-xl mb-2 relative z-10">Don't see what you're looking for?</h3>
                      <p className="text-slate-400 text-sm mb-5 max-w-sm mx-auto relative z-10 leading-relaxed">
                          Visit our showroom to view over <span className="text-white font-bold">200+ full-size slabs</span> in person.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
                          <a 
                              href="tel:4703804785"
                              onClick={handlePhoneClick}
                              className="flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-slate-200 transition-colors w-full sm:w-auto shadow-lg"
                          >
                              <Phone size={16} className="text-brand-orange fill-brand-orange" />
                              Call Showroom
                          </a>
                          <button 
                              onClick={() => document.getElementById('quote-form')?.scrollIntoView({behavior: 'smooth'})} 
                              className="flex items-center justify-center gap-2 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wide hover:border-white hover:text-white transition-colors w-full sm:w-auto hover:bg-white/5"
                          >
                              <MapPin size={16} />
                              Get Directions
                          </button>
                      </div>
                  </div>
                </Reveal>
            </div>

            {/* Right: Live Preview (Sticky on Desktop) */}
            <div className="w-full lg:w-1/2 order-first lg:order-last">
                <Reveal width="100%" delay={200} variant="right">
                  <div className="bg-slate-900 rounded-2xl p-2 shadow-2xl border border-slate-800 h-64 md:h-full md:min-h-[400px] relative overflow-hidden group">
                      <img 
                          src={selectedMaterial.img} 
                          alt={selectedMaterial.name} 
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover rounded-xl transition-transform duration-700 ease-out-expo group-hover:scale-105"
                          key={selectedMaterial.name} // Key forces re-render for nice fade
                      />
                      
                      {/* Gradient for text legibility on bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>

                      {/* Floating Info Card */}
                      <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-slate-900/90 backdrop-blur-md p-4 md:p-5 rounded-xl shadow-2xl border border-white/10 animate-slide-up-fade">
                          <div className="flex justify-between items-start mb-2">
                              <div>
                                  <span className="inline-block px-2 py-1 bg-white/10 text-white rounded text-[10px] font-bold uppercase tracking-wider mb-2 border border-white/10">
                                      {selectedMaterial.tag} Collection
                                  </span>
                                  <h3 className="text-xl md:text-2xl font-serif text-white">{selectedMaterial.name}</h3>
                              </div>
                              <div className="bg-white/10 text-white rounded-full p-2 hidden md:block hover:bg-white/20 transition-colors">
                                  <Info size={20} />
                              </div>
                          </div>
                          <p className="text-slate-400 text-sm mb-4 hidden md:block">
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