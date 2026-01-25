import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal, CheckCircle2, TrendingUp } from 'lucide-react';
import { Reveal } from './Reveal';
import Button from './Button';

const Transformation: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Before/After Images - High quality kitchen contrast
  const beforeImage = "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop"; // Slightly darker/older looking kitchen
  const afterImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"; // Bright luxury kitchen

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
    <section id="transformation" className="py-20 md:py-28 bg-slate-900 overflow-hidden relative">
      {/* Ambient Lighting Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal width="100%" variant="up">
          <div className="text-center mb-12">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Real Results</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mt-3 mb-6">See The Difference Quality Makes</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
              Don't imagine the potential—see it. Slide to reveal how we transform outdated spaces into high-value, luxury environments in under a week.
            </p>
          </div>
        </Reveal>

        <Reveal width="100%" variant="scale">
          <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none group touch-none">
            
            {/* Aspect Ratio Container */}
            <div 
              ref={containerRef}
              className="relative aspect-[4/3] md:aspect-[16/9] w-full cursor-col-resize"
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              
              {/* Image 2 (AFTER) - Background Layer */}
              <img 
                src={afterImage} 
                alt="After Renovation" 
                className="absolute inset-0 w-full h-full object-cover"
                draggable="false"
              />
              <div className="absolute top-6 right-6 bg-brand-orange text-white px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg z-10">
                After
              </div>

              {/* Overlays on After Image (Hotspots) */}
              <div className="absolute bottom-12 right-12 hidden md:block animate-fade-in delay-500">
                 <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl max-w-xs">
                    <h4 className="text-brand-orange font-bold text-xs uppercase mb-2 flex items-center gap-2">
                        <TrendingUp size={14} /> ROI Increase
                    </h4>
                    <p className="text-white text-sm">
                        This kitchen remodel increased the home's appraisal value by an estimated <span className="font-bold text-green-400">18%</span>.
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
                  className="absolute inset-0 w-full h-full object-cover filter sepia-[.3] brightness-75 grayscale-[.5]" 
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-slate-900 group-hover:scale-110 transition-transform">
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
                        <p className="text-slate-400 text-sm">Replaced laminate with Calacatta Gold Quartz.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-orange shrink-0 mt-1" />
                    <div>
                        <h4 className="text-white font-bold">Cabinet Refacing</h4>
                        <p className="text-slate-400 text-sm">New shaker doors & soft-close hardware.</p>
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