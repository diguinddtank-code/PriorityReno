import React, { useEffect, useState, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
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
    { label: "Installations Completed", value: "700+" },
    { label: "Star Rating", value: "5.0" },
    { label: "Years Experience", value: "15+" }
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
    <section id="testimonials" className="py-20 md:py-28 bg-white relative overflow-hidden">
       {/* Ambient Lighting Background - Adjusted for Light Mode */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 md:mb-20">
            <Reveal width="100%" variant="left">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                         <div className="flex bg-slate-50 px-3 py-1 rounded-full items-center gap-2 border border-slate-200 shadow-sm">
                            <div className="flex gap-0.5">
                                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-brand-orange fill-current" />)}
                            </div>
                            <span className="text-xs font-bold text-slate-900">5.0</span>
                         </div>
                         <span className="text-slate-500 text-xs uppercase tracking-wider font-bold">Verified Local Reviews</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6 text-slate-900">
                        Atlanta's Most <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-600">Trusted Installers</span>
                    </h2>
                    <p className="text-slate-600 text-lg max-w-lg leading-relaxed">
                        We don't just build kitchens; we build reputation. Join hundreds of satisfied homeowners who chose quality contractors over big box stores.
                    </p>
                </div>
            </Reveal>

            <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                    <Reveal key={i} delay={i * 150} variant="scale" width="100%">
                        <div className="bg-slate-50 border border-slate-200 p-4 md:p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                            <div className="text-3xl md:text-5xl font-bold text-slate-900 mb-2 font-serif group-hover:text-brand-orange transition-colors duration-300">
                                <Counter end={stat.value} />
                            </div>
                            <div className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest font-bold">{stat.label}</div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
      </div>

      {/* FAST MARQUEE (Responsive Speed) */}
      <div className="relative w-full overflow-hidden pb-8">
        {/* Gradients to hide edges - match bg-white */}
        <div className="absolute top-0 left-0 bottom-8 w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-8 w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

        <div className="flex animate-[marquee_10s_linear_infinite] hover:[animation-play-state:paused]">
            {marqueeReviews.map((review, i) => (
                <div key={i} className="flex-shrink-0 w-[280px] md:w-[400px] mx-3 md:mx-4">
                    <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/50 p-6 md:p-8 rounded-2xl h-full flex flex-col relative group hover:border-brand-orange/30 transition-all duration-300 hover:-translate-y-1">
                        <Quote className="text-brand-orange w-6 h-6 md:w-8 md:h-8 mb-4 md:mb-6 opacity-20 group-hover:opacity-100 transition-opacity" />
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed italic mb-6 md:mb-8 flex-grow line-clamp-4">
                            "{review.text}"
                        </p>
                        <div className="flex items-center gap-4 border-t border-slate-100 pt-4 md:pt-6 mt-auto">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shrink-0 text-sm md:text-base shadow-md">
                                {review.author.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">{review.author}</h4>
                                <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500">
                                    <span>{review.location}</span>
                                    <span className="hidden md:inline w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span className="text-brand-orange block md:inline font-semibold">{review.badge}</span>
                                </div>
                            </div>
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