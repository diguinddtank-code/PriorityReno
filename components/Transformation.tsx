import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';
import Button from './Button';

const Transformation: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Before/After Images - Dramatic Contrast
  const beforeImage = "https://i.imgur.com/EWnnkrO.png"; 
  const afterImage = "https://i.imgur.com/nI4AulC.png"; 

  const handleMove = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
    let clientX;

    if ('touches' in event) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = (event as MouseEvent).clientX;
    }

    const position = ((clientX - left) / width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging) handleMove(e);
    };
    const handleGlobalUp = () => setIsDragging(false);

    if (isDragging) {
      // NOTE: Removed document.body.style.overflow = 'hidden' to prevent scroll locking on mobile
      window.addEventListener('mousemove', handleGlobalMove);
      window.addEventListener('mouseup', handleGlobalUp);
      window.addEventListener('touchmove', handleGlobalMove);
      window.addEventListener('touchend', handleGlobalUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalUp);
      window.removeEventListener('touchmove', handleGlobalMove);
      window.removeEventListener('touchend', handleGlobalUp);
    };
  }, [isDragging]);

  return (
    <section id="transformation" className="py-20 md:py-28 bg-slate-900 overflow-hidden relative border-t border-white/5">
      {/* Ambient Lighting Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal width="100%" variant="up">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-bold uppercase tracking-widest mb-4">
                <Sparkles size={12} />
                <span>Real Transformation</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">See The Difference Quality Makes</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
              Don't imagine the potential—see it. Slide to reveal how we transform outdated spaces into high-value, luxury environments in just days.
            </p>
          </div>
        </Reveal>

        <Reveal width="100%" variant="scale">
          <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none group ring-1 ring-white/5">
            
            {/* Aspect Ratio Container */}
            {/* Added 'touch-pan-y' to allow vertical scrolling while touching this area */}
            <div 
              ref={containerRef}
              className="relative aspect-[4/3] md:aspect-[16/9] w-full cursor-col-resize touch-pan-y"
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              
              {/* Image 2 (AFTER) - Background Layer */}
              <img 
                src={afterImage} 
                alt="After Renovation" 
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                draggable="false"
              />
              <div className="absolute top-6 right-6 bg-brand-orange text-white px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg z-10">
                After
              </div>

              {/* ROI Badge */}
              <div className="absolute bottom-6 right-6 hidden md:block animate-fade-in delay-500 z-10">
                 <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl max-w-xs transform hover:scale-105 transition-transform duration-300">
                    <h4 className="text-brand-orange font-bold text-xs uppercase mb-1 flex items-center gap-2">
                        <TrendingUp size={14} /> Property Value
                    </h4>
                    <p className="text-white text-sm font-medium">
                        Renovations like this typically yield a <span className="font-bold text-green-400">70-80% ROI</span> at resale.
                    </p>
                 </div>
              </div>

              {/* Image 1 (BEFORE) - Clipped Layer */}
              <div 
                className="absolute inset-0 overflow-hidden w-full h-full bg-slate-800"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img 
                  src={beforeImage} 
                  alt="Before Renovation" 
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover filter sepia-[.3] brightness-75 grayscale-[.3]" 
                  draggable="false"
                />
                <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest border border-white/10">
                    Before
                </div>
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-slate-900 hover:scale-110 transition-transform">
                  <MoveHorizontal className="text-slate-900 w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Bottom Info Bar */}
            <div className="bg-slate-800 p-6 md:p-8 grid md:grid-cols-3 gap-6 border-t border-white/5">
                <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-orange shrink-0 mt-1" />
                    <div>
                        <h4 className="text-white font-bold">Quartz Installation</h4>
                        <p className="text-slate-400 text-sm">Calacatta Gold with Mitered Edge.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-orange shrink-0 mt-1" />
                    <div>
                        <h4 className="text-white font-bold">Cabinet Refacing</h4>
                        <p className="text-slate-400 text-sm">Modern shaker style in Pure White.</p>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <Button 
                        onClick={() => document.getElementById('quote-form')?.scrollIntoView({behavior: 'smooth'})}
                        className="w-full md:w-auto shadow-lg shadow-brand-orange/20"
                    >
                        Get This Look
                    </Button>
                </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Transformation;