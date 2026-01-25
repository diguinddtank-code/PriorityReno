import React, { useEffect, useState, useRef } from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';

// Easing function for smooth number counting (Ease Out Expo)
const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

// Robust Counter Component
const Counter = ({ end, duration = 2500, suffix = '' }: { end: string, duration?: number, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const numericEnd = parseFloat(end.replace(/[^0-9.]/g, ''));
  const isFloat = end.includes('.');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number | null = null;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const currentCount = easedProgress * numericEnd;
            setDisplayValue(currentCount);
            if (progress < 1) requestAnimationFrame(animate);
            else setDisplayValue(numericEnd);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [numericEnd, duration]);

  return (
    <span ref={nodeRef}>
      {isFloat ? displayValue.toFixed(1) : Math.floor(displayValue)}
      {suffix || end.replace(/[0-9.]/g, '')}
    </span>
  );
};

const Testimonials: React.FC = () => {
  const stats = [
    { label: "Installations", value: "700+" },
    { label: "Google Rating", value: "5.0" },
    { label: "Years Active", value: "15+" }
  ];

  const reviews = [
    {
      id: 1,
      text: "Best quartz countertop installers in Buckhead! The precision in the cutting was unbelievable and no visible seams.",
      author: "Eleanor Vance",
      location: "Buckhead, GA",
      badge: "Quartz Install"
    },
    {
      id: 2,
      text: "Priority Renovations handled our complete cabinet refacing in just 4 days. It looks like a brand new custom kitchen.",
      author: "Marcus Chen",
      location: "Alpharetta, GA",
      badge: "Cabinet Refacing"
    },
    {
      id: 3,
      text: "Their installation team was respectful and fast. The granite selection process was smooth and the install was flawless.",
      author: "Sarah Miller",
      location: "Roswell, GA",
      badge: "Granite Install"
    },
    {
      id: 4,
      text: "Transforming our master bath felt daunting, but these contractors made it effortless. The vanity top is absolutely stunning.",
      author: "David K.",
      location: "Sandy Springs, GA",
      badge: "Bathroom Remodel"
    },
    {
      id: 5,
      text: "I was looking for custom cabinets near me and found them. The quality of the solid wood and soft-close hinges is worth every penny.",
      author: "Jessica T.",
      location: "Marietta, GA",
      badge: "Custom Cabinetry"
    }
  ];

  // Create a massive loop array for smoothness
  const marqueeReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-white relative overflow-hidden">
       {/* Ambient Lighting Background - Subtle Orange Tint */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Header Layout */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-10 md:mb-12">
            <Reveal width="100%" variant="left">
                <div className="max-w-2xl">
                    {/* Google Badge */}
                    <div className="inline-flex items-center gap-3 bg-white border border-slate-200 shadow-sm px-4 py-1.5 rounded-full mb-4 hover:shadow-md transition-shadow cursor-default">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-4 h-4" alt="Google" />
                        <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-[#FBBC05] fill-current" />)}
                        </div>
                        <span className="text-xs font-bold text-slate-700 border-l border-slate-200 pl-3 ml-1">5.0 Excellent</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight mb-3">
                        Loved by Atlanta <span className="text-brand-orange relative inline-block">Homeowners</span>
                    </h2>
                    <p className="text-slate-500 text-sm md:text-base max-w-lg">
                        Real reviews from your neighbors. We pride ourselves on precision, cleanliness, and speed.
                    </p>
                </div>
            </Reveal>

            {/* Compact Stats Grid - Fixed mobile layout */}
            <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
                {stats.map((stat, i) => (
                    <Reveal key={i} delay={i * 100} variant="up">
                        <div className="bg-white border-2 border-brand-orange/10 p-3 md:p-4 rounded-xl text-center shadow-sm hover:border-brand-orange/40 transition-colors h-full flex flex-col justify-center items-center">
                            <div className="text-xl md:text-3xl font-bold text-slate-900 font-serif text-brand-orange leading-none mb-1">
                                <Counter end={stat.value} />
                            </div>
                            <div className="text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">{stat.label}</div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
      </div>

      {/* FAST MARQUEE (High Contrast Cards) */}
      <div className="relative w-full overflow-hidden pb-4">
        {/* Gradients to hide edges */}
        <div className="absolute top-0 left-0 bottom-8 w-16 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-8 w-16 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"></div>

        <div className="flex animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] py-4">
            {marqueeReviews.map((review, i) => (
                <div key={i} className="flex-shrink-0 w-[300px] md:w-[380px] mx-3">
                    {/* CARD: Compact & High Contrast Border */}
                    <div className="bg-white border-2 border-brand-orange/20 hover:border-brand-orange p-6 rounded-2xl h-full flex flex-col relative group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] hover:-translate-y-1">
                        
                        {/* Quote Icon & Google Logo Header */}
                        <div className="flex justify-between items-start mb-4">
                            <Quote className="text-brand-orange w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-4 h-4 opacity-50 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
                        </div>

                        <p className="text-slate-700 text-sm leading-relaxed font-medium mb-6 line-clamp-4">
                            "{review.text}"
                        </p>

                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-xs border border-slate-200">
                                {review.author.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-1">
                                    <h4 className="font-bold text-slate-900 text-sm">{review.author}</h4>
                                    <CheckCircle2 size={12} className="text-blue-500 fill-blue-50" />
                                </div>
                                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                                    {review.location}
                                </div>
                            </div>
                        </div>
                        
                        {/* Floating Badge on Card */}
                        <div className="absolute -top-3 right-6 bg-white border border-brand-orange/30 text-brand-orange text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">
                            {review.badge}
                        </div>

                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;