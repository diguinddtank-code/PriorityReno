import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, MapPin, Layers, Box, Maximize2 } from 'lucide-react';
import Button from './Button';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  const galleryItems = [
    {
      id: 'buckhead',
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      category: "FULL KITCHEN REMODEL",
      title: "Buckhead Kitchen Makeover",
      location: "Buckhead, Atlanta",
      date: "August 2024",
      material: "Italian Calacatta Gold Marble",
      scope: "450 Sq. Ft. Full Renovation",
      description: "Our installers completed this 450 sq. ft. luxury kitchen renovation in Buckhead, featuring a dramatic, book-matched Calacatta Gold marble island installation with mitered edges. We also handled the custom walnut cabinetry fabrication and installation, integrating high-end appliances.",
      tags: ["#LuxuryKitchen", "#MarbleIsland", "#CustomCabinetry", "#BuckheadRenovation"]
    },
    {
      id: 'alpharetta',
      src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop",
      category: "COUNTERTOP INSTALLATION",
      title: "Quartz Countertops Installation",
      location: "Alpharetta, GA",
      date: "September 2024",
      material: "Premium Pure White Quartz (3cm)",
      scope: "120 Sq. Ft. Counters & Backsplash",
      description: "For this Alpharetta home, our quartz installers fitted 3cm Pure White Quartz countertops. The project featured a seamless double waterfall edge installation on the peninsula. Precision CNC fabrication ensured a perfect fit for the flush-mount sink and cooktop.",
      tags: ["#QuartzCountertops", "#WaterfallEdge", "#ModernDesign", "#KitchenUpgrade"]
    },
    {
      id: 'marietta',
      src: "https://images.unsplash.com/photo-1620626012053-93f268326996?q=80&w=2070&auto=format&fit=crop",
      category: "MASTER BATHROOM",
      title: "Granite Vanity Installation",
      location: "Marietta, GA",
      date: "October 2024",
      material: "Honed Blue Savoie Granite",
      scope: "85 Sq. Ft. Vanity & Shower",
      description: "We transformed this Marietta master bath with honed Blue Savoie Granite vanity tops. Our team handled the floating cabinet installation and full tile work for the shower, demonstrating our capability as full-service bathroom remodelers near you.",
      tags: ["#BathroomRemodel", "#GraniteVanity", "#SpaBathroom", "#TileWork"]
    },
    {
      id: 'johnscreek',
      src: "https://images.unsplash.com/photo-1596238638979-99411963625d?q=80&w=2069&auto=format&fit=crop",
      category: "OUTDOOR KITCHEN",
      title: "Johns Creek Outdoor Living",
      location: "Johns Creek, GA",
      date: "November 2024",
      material: "Leathered Black Granite",
      scope: "Custom BBQ Station & Bar",
      description: "This outdoor kitchen project required durable materials to withstand Atlanta weather. We installed leathered Black Granite countertops which provide excellent grip and resistance to elements, paired with stacked stone veneer for the cabinet structure.",
      tags: ["#OutdoorKitchen", "#Granite", "#PatioDesign", "#BBQStation"]
    },
    {
      id: 'roswell',
      src: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop",
      category: "FIREPLACE SURROUND",
      title: "Modern Fireplace Cladding",
      location: "Roswell, GA",
      date: "December 2024",
      material: "Statuary White Marble",
      scope: "Floor-to-Ceiling Stone Cladding",
      description: "We transformed a standard fireplace into a stunning focal point using large-format Statuary White Marble slabs. The veins were carefully matched to flow continuously from the floor to the ceiling, creating a seamless piece of art in this living room.",
      tags: ["#FireplaceDesign", "#MarbleCladding", "#LivingRoom", "#InteriorDesign"]
    },
    {
      id: 'dunwoody',
      src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
      category: "BASEMENT BAR",
      title: "Dunwoody Wet Bar",
      location: "Dunwoody, GA",
      date: "January 2025",
      material: "Backlit Onyx Quartz",
      scope: "Full Bar Fabrication",
      description: "For this high-end basement entertainment area, we installed a custom wet bar featuring semi-translucent Quartzite with integrated LED backlighting. The result is a moody, sophisticated atmosphere perfect for hosting guests.",
      tags: ["#WetBar", "#BasementRemodel", "#BacklitStone", "#Entertainment"]
    }
  ];

  const handleScrollToQuote = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setSelectedImage(null);
    setTimeout(() => {
        const form = document.getElementById('quote-form');
        if (form) form.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <section id="locations" className="py-16 md:py-24 bg-slate-950 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs md:text-sm">Local Projects</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mt-3">Installations Near You</h2>
            <p className="text-slate-400 mt-4 max-w-xl">
              See our recent work. From quartz countertop installation in Alpharetta to cabinet refacing in Buckhead, we serve the entire Metro Atlanta area.
            </p>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
             <div key={item.id} className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800 group hover:border-brand-orange/60 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full hover:shadow-2xl hover:shadow-brand-orange/10">
                 
                 {/* Image Container with Placeholder BG */}
                 <div className="relative h-64 overflow-hidden cursor-pointer bg-slate-800" onClick={() => setSelectedImage(item)}>
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                    
                    {/* Location Badge */}
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10 border border-white/10 shadow-lg">
                      <MapPin size={12} className="text-brand-orange" />
                      {item.location.toUpperCase()}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <Maximize2 size={20} />
                        </div>
                    </div>
                 </div>

                 {/* Content Container */}
                 <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <span className="text-brand-orange text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2">
                        {item.category}
                    </span>
                    <h3 className="text-2xl font-serif text-white mb-6 group-hover:text-brand-orange transition-colors cursor-pointer" onClick={() => setSelectedImage(item)}>
                        {item.title}
                    </h3>

                    {/* Specs Box - ADDED ORANGE BORDER */}
                    <div className="bg-slate-950/30 rounded-xl p-4 flex items-start gap-4 md:gap-6 mb-6 border border-brand-orange/20 hover:border-brand-orange/40 transition-colors">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">
                                <Layers size={12} /> Material
                            </div>
                            <p className="text-slate-200 font-medium text-sm leading-tight line-clamp-2">{item.material}</p>
                        </div>
                        <div className="w-px h-10 bg-white/10"></div>
                        <div className="flex-1">
                             <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">
                                <Box size={12} /> Scope
                            </div>
                            <p className="text-slate-200 font-medium text-sm leading-tight line-clamp-2">{item.scope}</p>
                        </div>
                    </div>

                    {/* Button - UPDATED TO ORANGE FILLED */}
                    <button 
                        onClick={handleScrollToQuote}
                        className="w-full bg-brand-orange text-white py-4 rounded-lg text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 group/btn mt-auto transform active:scale-95"
                    >
                        Quote This Project
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                 </div>
               </div>
          ))}
        </div>

        {/* RESPONSIVE MODAL - DARK THEME */}
        {selectedImage && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl animate-fade-in md:p-12 overflow-hidden">
            
            {/* Modal Container */}
            <div 
                className="w-full h-full md:h-auto md:max-h-[90vh] md:max-w-6xl md:rounded-3xl bg-slate-900 overflow-hidden flex flex-col md:flex-row shadow-2xl animate-scale-in border-none md:border border-white/10 relative" 
                onClick={(e) => e.stopPropagation()}
            >
                
                {/* Close Button - Always fixed top right of the modal container */}
                <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 z-[100] p-2 bg-black/40 text-white rounded-full backdrop-blur-md border border-white/10 hover:bg-brand-orange transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Left: Image (Top on mobile) */}
                <div className="w-full md:w-3/5 h-64 md:h-auto md:min-h-full relative bg-black shrink-0">
                    <img 
                        src={selectedImage.src} 
                        alt={selectedImage.title} 
                        className="w-full h-full object-cover" 
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:hidden opacity-90 pointer-events-none"></div>
                </div>

                {/* Right: Content (Bottom on mobile) */}
                <div className="flex-1 flex flex-col bg-slate-900 text-white relative h-full overflow-hidden">
                    
                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 pb-28 md:pb-10">
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange border border-brand-orange/20 text-[10px] font-bold uppercase tracking-widest mb-4">
                            {selectedImage.category}
                        </span>
                        
                        <h3 className="text-2xl md:text-4xl font-serif mb-6 leading-tight">
                            {selectedImage.title}
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-6 mb-8 bg-white/5 rounded-2xl p-6 border border-white/5">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white/10 rounded-lg"><Layers size={18} className="text-brand-orange" /></div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Material Selection</h4>
                                    <p className="text-sm md:text-base font-medium text-slate-100">{selectedImage.material}</p>
                                </div>
                            </div>
                            <div className="w-full h-px bg-white/10"></div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white/10 rounded-lg"><Box size={18} className="text-brand-orange" /></div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Project Scope</h4>
                                    <p className="text-sm md:text-base font-medium text-slate-100">{selectedImage.scope}</p>
                                </div>
                            </div>
                            <div className="w-full h-px bg-white/10"></div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white/10 rounded-lg"><MapPin size={18} className="text-brand-orange" /></div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Location</h4>
                                    <p className="text-sm md:text-base font-medium text-slate-100">{selectedImage.location}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed">
                            <p>{selectedImage.description}</p>
                        </div>
                    </div>

                    {/* Sticky Footer Action - Always visible at bottom */}
                    <div className="p-4 md:p-6 bg-slate-900 border-t border-white/10 z-20 shrink-0">
                        <Button 
                            fullWidth 
                            onClick={handleScrollToQuote} 
                            className="shadow-xl shadow-brand-orange/20 py-4 bg-brand-orange text-white border-transparent"
                        >
                            Get a Quote Like This <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
      )}
      </div>
    </section>
  );
};

export default Gallery;