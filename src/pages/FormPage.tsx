import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Testimonials from '../../components/Testimonials';
import WhyChooseUs from '../../components/WhyChooseUs';
import Gallery from '../../components/Gallery';
import AnnouncementBar from '../../components/AnnouncementBar';
import { ShieldCheck, Star, Clock, CheckCircle2, Loader2, ArrowRight, ChevronDown } from 'lucide-react';
import Button from '../../components/Button';

const FormPage: React.FC = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 100, mass: 0.2 });
  
  // Make the text fade out and move up quickly
  const textOpacity = useTransform(smoothScrollY, [0, 150], [1, 0]);
  const textY = useTransform(smoothScrollY, [0, 200], [0, -100]);
  
  // Make the form shoot up aggressively to overlap the hero section on mobile
  const formYMobile = useTransform(smoothScrollY, [0, 300], [20, -400]);
  const formYDesktop = useTransform(smoothScrollY, [0, 500], [20, -150]);
  
  const formY = isMobile ? formYMobile : formYDesktop;

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
            // @ts-ignore
            if (typeof window.gtag_report_conversion === 'function') {
                 // @ts-ignore
                 window.gtag_report_conversion();
            }
        } else {
            setFormStatus('error');
        }
    } catch (error) {
        setFormStatus('error');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-900 font-sans">
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {isBannerVisible && <AnnouncementBar onClose={() => setIsBannerVisible(false)} />}
        <Navbar isBannerVisible={isBannerVisible} />
      </div>
      
      {/* Fixed Background Image for the parallax effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Kitchen" 
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-slate-900/70 via-slate-900/30 to-transparent"></div>
      </div>

      <main className="w-full relative z-10">
        
        {/* HERO SECTION */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-[100dvh] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left: Copywriting */}
              <motion.div 
                style={{ opacity: textOpacity, y: textY }}
                className="lg:col-span-7 text-center lg:text-left pt-8 md:pt-0 relative z-20"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-brand-orange/30 shadow-lg">
                  <Clock size={14} /> Fast 3-5 Day Turnaround
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
                  Transform Your Home.<br/>
                  <span className="text-brand-orange">Direct Factory Prices.</span>
                </h1>
                <p className="text-slate-300 text-base md:text-lg mb-8 max-w-lg mx-auto lg:mx-0 drop-shadow-md">
                  Skip the middleman. Get premium quartz, granite, and custom cabinets installed by Atlanta's top-rated experts.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-8">
                  <div className="flex items-center gap-2 text-white bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                    <ShieldCheck className="text-green-500" size={20} />
                    <span className="font-medium text-sm">Price Match Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-white bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                    <Star className="text-[#FBBC05]" size={20} fill="currentColor" />
                    <span className="font-medium text-sm">5.0 Google Rating</span>
                  </div>
                </div>
                </motion.div>
              </motion.div>

              {/* Right: The Form */}
              <motion.div 
                style={{ y: formY }}
                className="lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto lg:mr-0 relative z-40"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden border border-slate-100"
                >
                  {/* Top Accent */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-brand-orange"></div>

                  {formStatus === 'success' ? (
                      <div className="text-center animate-fade-in py-8">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4 shadow-sm">
                              <CheckCircle2 size={32} />
                          </div>
                          <h3 className="text-2xl font-serif text-slate-900 mb-2">Request Received!</h3>
                          <p className="text-slate-500 mb-6 text-sm">
                              Thank you. One of our specialists will call you shortly to discuss your project and apply your discount.
                          </p>
                          <Button 
                              variant="outline" 
                              className="w-full border-slate-200 text-slate-600 hover:bg-slate-50"
                              onClick={() => setFormStatus('idle')}
                          >
                              Send Another Request
                          </Button>
                      </div>
                  ) : (
                      <>
                          <div className="mb-6 text-center lg:text-left">
                              <h3 className="text-2xl font-serif text-slate-900 mb-1">Get Your Free Estimate</h3>
                              <p className="text-slate-500 text-sm">Lock in special pricing today. No obligation.</p>
                          </div>

                          <form className="space-y-4" onSubmit={handleSubmit}>
                              <input type="hidden" name="_subject" value="New Lead (Quote Page)" />
                              <input type="hidden" name="_captcha" value="false" />
                              <input type="hidden" name="_template" value="table" />
                              <input type="text" name="_honey" style={{display: 'none'}} />
                              
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">Name</label>
                                  <input required type="text" name="name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all focus:ring-2 focus:ring-brand-orange/20" placeholder="John Doe" />
                              </div>

                              <div>
                                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">Phone Number</label>
                                  <input required type="tel" name="phone" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all focus:ring-2 focus:ring-brand-orange/20" placeholder="(555) 000-0000" />
                              </div>

                              <div>
                                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">Email Address</label>
                                  <input required type="email" name="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all focus:ring-2 focus:ring-brand-orange/20" placeholder="john@example.com" />
                              </div>

                              <div className="relative">
                                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">Project Type</label>
                                  <select required name="projectType" defaultValue="" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all focus:ring-2 focus:ring-brand-orange/20 appearance-none cursor-pointer">
                                      <option value="" disabled>Select Project Type</option>
                                      <option value="countertops">Countertops Installation</option>
                                      <option value="custom-cabinets">Custom Cabinets</option>
                                      <option value="cabinet-refacing">Cabinet Refacing</option>
                                      <option value="kitchen-remodel">Full Kitchen Remodel</option>
                                      <option value="bathroom-vanity">Bathroom Vanity Install</option>
                                      <option value="bathroom-remodel">Full Bathroom Remodel</option>
                                      <option value="backsplash">Backsplash Installation</option>
                                      <option value="flooring">Flooring Installation</option>
                                      <option value="other">Other / General Inquiry</option>
                                  </select>
                                  <ChevronDown className="absolute right-4 top-[38px] text-slate-500 pointer-events-none" size={16} />
                              </div>

                              <Button 
                                  variant="primary" 
                                  fullWidth 
                                  type="submit"
                                  disabled={formStatus === 'submitting'}
                                  className="mt-2 py-4 text-base shadow-xl shadow-brand-orange/30 hover:shadow-brand-orange/50 flex items-center justify-center gap-2"
                              >
                                  {formStatus === 'submitting' ? (
                                      <><Loader2 className="animate-spin" size={20} /> Processing...</>
                                  ) : (
                                      <>Claim My Free Quote <ArrowRight size={18} /></>
                                  )}
                              </Button>
                              
                              {formStatus === 'error' && (
                                  <p className="text-red-500 text-xs text-center mt-2">Error sending message. Please try again.</p>
                              )}

                              <p className="text-center text-[10px] text-slate-400 mt-4 flex items-center justify-center gap-1">
                                  <ShieldCheck size={12} /> Your information is 100% secure.
                              </p>
                          </form>
                      </>
                  )}
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* CONVERSION BOOSTERS - Solid background to cover the fixed parallax image */}
        <div className="relative z-20 bg-slate-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] pt-8">
          <WhyChooseUs />
          <Testimonials />
          <Gallery />
        </div>

      </main>

      <div className="relative z-20 bg-slate-900">
        <Footer />
      </div>
    </div>
  );
};

export default FormPage;
