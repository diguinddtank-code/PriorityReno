import React, { useState } from 'react';
import { Award, Gem, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';

const WhyChooseUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      id: 1,
      icon: Award,
      title: "Expert Stone Installers",
      subtitle: "15+ Years Experience",
      desc: "Our granite and quartz installers are factory-trained artisans. We use digital laser templating for 100% accurate countertop installation and seamless fits.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      icon: Gem,
      title: "Direct Granite Sourcing",
      subtitle: "No Middleman",
      desc: "We import slabs directly, making us the most affordable stone supplier in Atlanta. Get premium Grade-A materials without big-box retailer markups.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 3,
      icon: Clock,
      title: "3-5 Day Installation",
      subtitle: "Fast Turnaround",
      desc: "Need countertops installed fast? Once templates are taken, our local fabrication shop cuts your stone in record time. We don't leave you without a kitchen.",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      icon: Sparkles,
      title: "Clean Installation",
      subtitle: "Dust-Free Process",
      desc: "We are professional contractors who respect your home. Our installation team uses industrial air scrubbers and protective coverings to leave your space spotless.",
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-slate-50 py-16 md:py-24 relative overflow-hidden">
        {/* Background Gradients - Subtle warmth */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full translate-x-1/2 pointer-events-none mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal width="100%" variant="down">
                <div className="mb-10 md:mb-16 text-center md:text-left">
                    <span className="text-brand-orange font-bold uppercase tracking-widest text-xs bg-brand-orange/10 px-3 py-1 rounded-full">Why Choose Priority</span>
                    <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mt-4 leading-tight">
                        The Best Installers in <span className="underline decoration-brand-orange/30 decoration-4 underline-offset-4">Atlanta</span>.
                    </h2>
                    <p className="text-slate-600 mt-4 max-w-2xl text-lg">
                        We combine old-world craftsmanship with modern technology to deliver precision results.
                    </p>
                </div>
            </Reveal>

            {/* --- MOBILE LAYOUT (Clean White Cards) --- */}
            <div className="flex flex-col gap-4 md:hidden">
                {features.map((feature, idx) => (
                    <Reveal key={idx} width="100%" delay={idx * 100} variant="up">
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-row h-32 items-stretch group">
                            {/* Mobile Image Left */}
                            <div className="w-1/3 relative shrink-0 overflow-hidden">
                                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-slate-900/10"></div>
                            </div>
                            
                            {/* Mobile Content Right */}
                            <div className="w-2/3 p-4 flex flex-col justify-center relative">
                                <div className="absolute top-2 right-2 text-brand-orange opacity-20">
                                    <feature.icon size={40} />
                                </div>
                                <div className="flex items-center gap-2 mb-1 relative z-10">
                                    <h3 className="text-sm font-bold text-slate-900 leading-tight">{feature.title}</h3>
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed relative z-10">{feature.desc}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>

            {/* --- DESKTOP LAYOUT (Split Screen Sticky - HIGH CONTRAST) --- */}
            <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left Column: Interactive List */}
                <div className="col-span-5 flex flex-col justify-center gap-3">
                    {features.map((feature, idx) => (
                        <div 
                            key={idx}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={`group p-6 rounded-2xl cursor-pointer transition-all duration-300 border-l-4 ${
                                activeIndex === idx 
                                ? 'bg-white border-l-brand-orange shadow-xl shadow-slate-200/50 scale-105 z-10' 
                                : 'bg-transparent border-l-transparent hover:bg-white hover:shadow-sm hover:border-l-slate-300'
                            }`}
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <div className={`p-2.5 rounded-xl transition-colors duration-300 shadow-sm ${
                                    activeIndex === idx 
                                    ? 'bg-brand-orange text-white rotate-3' 
                                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                                }`}>
                                    <feature.icon size={20} strokeWidth={2.5} />
                                </div>
                                <h3 className={`text-xl font-bold transition-colors duration-300 ${
                                    activeIndex === idx ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'
                                }`}>
                                    {feature.title}
                                </h3>
                            </div>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === idx ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                <p className="text-slate-600 text-sm leading-relaxed pl-[54px] pr-4">
                                    {feature.desc}
                                </p>
                                <div className="pl-[54px] mt-3 flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-wider animate-fade-in">
                                    <CheckCircle2 size={12} /> Priority Guarantee
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Sticky Image Preview */}
                <div className="col-span-7 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/20 border-4 border-white">
                    {features.map((feature, idx) => (
                        <div 
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transform scale-105" />
                            
                            {/* Dark gradient ONLY on image to make white text readable */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80"></div>
                            
                            <div className={`absolute bottom-10 left-10 max-w-md transition-all duration-700 delay-100 transform ${activeIndex === idx ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-brand-orange w-8 h-1 rounded-full"></div>
                                    <span className="text-white/90 font-bold uppercase tracking-widest text-xs shadow-black drop-shadow-md">{feature.subtitle}</span>
                                </div>
                                <h3 className="text-4xl font-serif text-white leading-tight drop-shadow-lg">
                                    {feature.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    </section>
  );
};

export default WhyChooseUs;