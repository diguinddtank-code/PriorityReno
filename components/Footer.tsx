import React, { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ArrowUp, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import Button from './Button';
import { createPortal } from 'react-dom';

const Footer: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  const locations = [
    "Duluth", "Johns Creek", "Alpharetta", "Buckhead", "Suwanee", 
    "Milton", "Roswell", "Sandy Springs", "Dunwoody", "Brookhaven", 
    "Marietta", "Cumming", "Norcross", "Peachtree Corners", "Decatur"
  ];

  return (
    <footer className="bg-slate-950 text-white pt-16 md:pt-24 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 mb-12">
          
          {/* Brand & Contact Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-white/5 p-1 rounded-md border border-white/10">
                 <img 
                  src="https://i.imgur.com/VBoJH82.png" 
                  alt="Priority Renovations Logo" 
                  loading="lazy"
                  width="40"
                  height="40"
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-serif font-bold tracking-tight leading-none text-white">PRIORITY</span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-orange">RENOVATIONS</span>
              </div>
            </div>
            
            <p className="text-slate-400 leading-relaxed pr-6 font-light text-sm md:text-base">
              Atlanta's #1 Granite & Quartz Installers. We are factory-direct stone importers providing premium installation services for countertops, cabinets, and kitchens.
            </p>

            <div className="space-y-4">
                <div className="flex items-start gap-3 text-slate-300">
                    <MapPin className="text-brand-orange shrink-0 mt-1" size={18} />
                    <span>4579 Abbotts Bridge Road,<br/>Duluth, GA 30096</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="text-brand-orange shrink-0" size={18} />
                    <a href="tel:4703804785" className="hover:text-white transition-colors">+1 (470) 380-4785</a>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="text-brand-orange shrink-0" size={18} />
                    <a href="mailto:priorityrenovationsatl@gmail.com" className="hover:text-white transition-colors">priorityrenovationsatl@gmail.com</a>
                </div>
            </div>

            <div className="flex space-x-4 pt-2">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-300 text-slate-400">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
             <div>
                <h4 className="text-white font-bold mb-4 md:mb-6">Company</h4>
                <ul className="space-y-3 md:space-y-4 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-brand-orange transition-colors">About Priority</a></li>
                  <li><a href="#locations" className="hover:text-brand-orange transition-colors">Project Gallery</a></li>
                  <li><a href="#testimonials" className="hover:text-brand-orange transition-colors">Local Reviews</a></li>
                  <li><a href="#process" className="hover:text-brand-orange transition-colors">Installation Process</a></li>
                </ul>
             </div>
             <div>
                <h4 className="text-white font-bold mb-4 md:mb-6">Services</h4>
                <ul className="space-y-3 md:space-y-4 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-brand-orange transition-colors">Countertop Installation</a></li>
                  <li><a href="#" className="hover:text-brand-orange transition-colors">Cabinet Refacing</a></li>
                  <li><a href="#" className="hover:text-brand-orange transition-colors">Kitchen Remodeling</a></li>
                  <li><a href="#" className="hover:text-brand-orange transition-colors">Bathroom Vanities</a></li>
                </ul>
             </div>
          </div>

          {/* HIGH CONVERSION FORM */}
          <div className="lg:col-span-5">
            <div id="quote-form" className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 relative overflow-hidden group scroll-mt-24 shadow-2xl">
               {/* Decorative Background */}
               <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-orange/20 transition-colors pointer-events-none"></div>
               
               {/* Badge */}
               <div className="absolute top-0 right-0 bg-brand-orange text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg flex items-center gap-1 z-10">
                 <ShieldCheck size={12} /> BEST PRICE IN GA
               </div>

               <div className="relative z-10">
                   <h4 className="font-serif text-2xl text-white mb-2">Get Your Free Quote</h4>
                   <p className="text-slate-400 text-sm mb-6">Lock in this month's special pricing. No obligation.</p>
                   
                   <form className="space-y-3" onSubmit={handleSubmit}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input required type="text" placeholder="Name" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-brand-orange outline-none text-sm transition-colors focus:ring-1 focus:ring-brand-orange" />
                        <input required type="tel" placeholder="Phone" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-brand-orange outline-none text-sm transition-colors focus:ring-1 focus:ring-brand-orange" />
                     </div>
                     <input required type="email" placeholder="Email Address" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-brand-orange outline-none text-sm transition-colors focus:ring-1 focus:ring-brand-orange" />
                     <textarea placeholder="Tell us about your project (Cabinets, Countertops, etc.)" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-brand-orange outline-none text-sm h-24 resize-none transition-colors focus:ring-1 focus:ring-brand-orange"></textarea>
                     
                     <Button 
                        variant="primary" 
                        fullWidth 
                        disabled={formStatus === 'submitting'}
                        className="font-bold tracking-wide relative overflow-hidden"
                     >
                        {formStatus === 'submitting' ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Sending...
                            </span>
                        ) : "Get Best Price & Availability"}
                     </Button>
                     <p className="text-center text-[10px] text-slate-500 mt-2 flex items-center justify-center gap-1">
                        <ShieldCheck size={10} /> Your information is secure.
                     </p>
                   </form>
               </div>
            </div>
          </div>
        </div>

        {/* MAP & SEO LOCATION SECTION */}
        <div className="border-t border-slate-800 pt-12 pb-12">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* Map Container */}
                <div className="lg:col-span-8 h-[300px] md:h-[350px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 relative shadow-xl">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.467862416393!2d-84.17515392429464!3d34.03241512401831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f598b04618779b%3A0x629555085440669!2s4579%20Abbotts%20Bridge%20Rd%2C%20Duluth%2C%20GA%2030097!5e0!3m2!1sen!2sus!4v1716300000000!5m2!1sen!2sus" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(85%)' }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="hover:filter-none transition-all duration-500"
                    ></iframe>
                    <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur text-white px-4 py-2 rounded-lg border border-slate-700 text-xs shadow-lg">
                        <p className="font-bold text-brand-orange">Priority Renovations HQ</p>
                        <p>Duluth, GA</p>
                    </div>
                </div>

                {/* SEO Locations List */}
                <div className="lg:col-span-4">
                    <h5 className="text-white font-serif text-xl mb-4 flex items-center gap-2">
                        <MapPin className="text-brand-orange" size={20} />
                        Installers Near Me
                    </h5>
                    <p className="text-slate-400 text-sm mb-6">
                        Looking for "countertop installers near me" or "cabinet refacing in Atlanta"? We serve the entire Metro area.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {locations.map((loc, i) => (
                            <span key={i} className="inline-block px-3 py-1.5 bg-slate-900 text-slate-300 text-xs rounded-full border border-slate-800 hover:border-brand-orange hover:text-white transition-colors cursor-default">
                                {loc}, GA
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Priority Renovations LLC. 
            <span className="mx-2">|</span> 
            <a href="#" className="hover:text-white">Privacy</a>
          </div>
          
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-brand-orange transition-colors"
          >
            Back to Top <ArrowUp size={14} />
          </button>
        </div>
      </div>

      {/* SUCCESS MODAL PORTAL */}
      {formStatus === 'success' && createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-fade-in" onClick={() => setFormStatus('idle')}></div>
              <div className="bg-white rounded-2xl p-8 max-w-md w-full relative z-10 shadow-2xl animate-scale-in text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-serif text-slate-900 mb-2">Quote Request Received!</h3>
                  <p className="text-slate-500 mb-6">
                      Thank you for contacting Priority Renovations. One of our specialists will review your details and contact you shortly.
                  </p>
                  <Button fullWidth onClick={() => setFormStatus('idle')}>
                      Close
                  </Button>
              </div>
          </div>,
          document.body
      )}
    </footer>
  );
};

export default Footer;