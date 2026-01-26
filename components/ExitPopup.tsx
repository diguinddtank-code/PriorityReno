import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, ShieldCheck, Loader2, Lock, ArrowRight } from 'lucide-react';
import Button from './Button';

const ExitPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Check if already shown in this session
    const sessionShown = sessionStorage.getItem('priority_exit_shown');
    if (sessionShown) {
      setHasShown(true);
      return;
    }

    const handleMouseOut = (e: MouseEvent) => {
      // Logic: If mouse leaves the top of the viewport (y < 0)
      if (e.clientY <= 0 && !hasShown && !sessionStorage.getItem('priority_exit_shown')) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('priority_exit_shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseOut);
    return () => document.removeEventListener('mouseleave', handleMouseOut);
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.currentTarget);
    
    try {
        const response = await fetch("https://formsubmit.co/ajax/priorityrenovationsatl@gmail.com", {
            method: "POST",
            body: formData,
            headers: { 
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            setFormStatus('success');
            // Conversion tracking
            // @ts-ignore
            if (typeof window.gtag_report_conversion === 'function') {
                 // @ts-ignore
                 window.gtag_report_conversion();
            }
            // Auto close after success
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);
        } else {
            setFormStatus('error');
        }
    } catch (error) {
        setFormStatus('error');
    }
  };

  if (!isVisible) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row animate-scale-in">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/10 hover:bg-black/20 rounded-full text-slate-500 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image & Hook */}
        <div className="w-full md:w-2/5 bg-slate-900 relative hidden md:flex flex-col justify-between p-8 text-white">
             {/* Background Image */}
             <div className="absolute inset-0 opacity-40">
                <img 
                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" 
                    alt="Luxury Kitchen" 
                    className="w-full h-full object-cover"
                />
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

             <div className="relative z-10">
                 <div className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest inline-block px-3 py-1 rounded-full mb-4">
                    Exclusive Offer
                 </div>
                 <h2 className="text-3xl font-serif leading-tight">
                    Wait! Before You <span className="text-brand-orange italic">Overpay</span>...
                 </h2>
             </div>

             <div className="relative z-10 space-y-4">
                 <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-orange shrink-0" size={20} />
                    <p className="text-sm text-slate-200">Lock in this month's lower material rates.</p>
                 </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-orange shrink-0" size={20} />
                    <p className="text-sm text-slate-200">Get a FREE Stainless Steel Sink with any kitchen project ($300 Value).</p>
                 </div>
             </div>
        </div>

        {/* Right Side: High Converting Form */}
        <div className="w-full md:w-3/5 p-8 md:p-10 bg-white relative">
            
            {/* Mobile Header (Only shows on mobile) */}
            <div className="md:hidden mb-6">
                <h2 className="text-2xl font-serif text-slate-900 mb-2">Wait! Don't Miss Out.</h2>
                <p className="text-slate-500 text-sm">Get a free sink ($300 value) if you request a quote today.</p>
            </div>

            {formStatus === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-scale-in">
                        <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-serif text-slate-900 mb-2">Offer Activated!</h3>
                    <p className="text-slate-500 max-w-xs mx-auto mb-6">
                        We've received your details. One of our specialists will call you shortly to apply your discount.
                    </p>
                    <Button onClick={handleClose} variant="outline" fullWidth>
                        Return to Site
                    </Button>
                </div>
            ) : (
                <>
                    <div className="hidden md:block mb-6">
                        <h3 className="text-2xl font-bold text-slate-900">Secure Your Price Today</h3>
                        <p className="text-slate-500 text-sm mt-1">Estimates are free. The savings are real.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="hidden" name="_subject" value="EXIT POPUP: Discount Claimed!" />
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="text" name="_honey" style={{display: 'none'}} />

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Name</label>
                            <input required type="text" name="name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-orange outline-none transition-all" placeholder="Enter your name" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                            <input required type="tel" name="phone" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-orange outline-none transition-all" placeholder="(555) 123-4567" />
                        </div>
                        
                        <div>
                             <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email (Optional)</label>
                             <input type="email" name="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-orange outline-none transition-all" placeholder="email@example.com" />
                        </div>

                        <Button 
                            type="submit" 
                            fullWidth 
                            disabled={formStatus === 'submitting'}
                            className="py-4 text-base shadow-xl shadow-brand-orange/20 mt-2"
                        >
                            {formStatus === 'submitting' ? (
                                <><Loader2 className="animate-spin" size={20} /> Securing Offer...</>
                            ) : (
                                <>Get My Free Quote & Bonus <ArrowRight size={18} className="ml-2" /></>
                            )}
                        </Button>
                        
                        {formStatus === 'error' && (
                             <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>
                        )}

                        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-4 bg-slate-50 py-2 rounded-lg">
                            <Lock size={10} /> 
                            <span>Your information is 100% secure. No spam.</span>
                        </div>
                    </form>
                </>
            )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ExitPopup;