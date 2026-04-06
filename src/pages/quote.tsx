import React, { useState } from 'react';
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
      
      {/* Background Video */}
      <div className="fixed inset-0 z-0 h-[100vh] bg-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-80"
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
        >
          <source src="https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        
        {/* Lighter Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/20"></div>
      </div>

      <main className="w-full relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center relative">
            
            {/* 1. Hero Text */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-lg">
                Get Your <span className="text-brand-orange">Free Custom Quote</span>
              </h1>
              <p className="text-slate-200 text-base md:text-lg max-w-lg mx-auto drop-shadow-md font-medium">
                Fill out the form below to tell us about your project and lock in factory-direct pricing.
              </p>
            </div>

            {/* 2. The Form */}
            <div className="w-full">
              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden border border-slate-100">
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
                                      <option value="cabinet-refacing">Cabinet Refacing</option>
                                      <option value="custom-cabinets">Custom Cabinets</option>
                                      <option value="kitchen-remodel">Full Kitchen Remodel</option>
                                      <option value="bathroom-remodel">Bathroom Remodel</option>
                                      <option value="outdoor-kitchen">Outdoor Kitchen / BBQ</option>
                                      <option value="commercial">Commercial Project</option>
                                      <option value="other">Other</option>
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
                </div>
            </div>

          </div>
        </div>
      </main>

      {/* 3. Conversion Boosters (Full width below the hero/form section) */}
      <div className="relative z-10 bg-white">
        <WhyChooseUs />
        <Testimonials />
        <Gallery />
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default FormPage;
