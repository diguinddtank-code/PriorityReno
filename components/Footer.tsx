import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 border-b border-slate-900 pb-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
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
            
            <p className="text-slate-400 leading-relaxed text-sm">
              Atlanta's #1 Granite & Quartz Installers. Factory-direct stone importers providing premium installation services.
            </p>

            <div className="flex space-x-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-300 text-slate-500">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest">Contact</h4>
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                  <MapPin className="text-brand-orange shrink-0 mt-0.5" size={16} />
                  <span>4579 Abbotts Bridge Road,<br/>Duluth, GA 30096</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <Phone className="text-brand-orange shrink-0" size={16} />
                  <a href="tel:4703804785" className="hover:text-white transition-colors">+1 (470) 380-4785</a>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <Mail className="text-brand-orange shrink-0" size={16} />
                  <a href="mailto:priorityrenovationsatl@gmail.com" className="hover:text-white transition-colors">priorityrenovationsatl@gmail.com</a>
              </div>
          </div>

          {/* Links Section */}
             <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Company</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-brand-orange transition-colors">About Priority</a></li>
                  <li><a href="#locations" className="hover:text-brand-orange transition-colors">Project Gallery</a></li>
                  <li><a href="#testimonials" className="hover:text-brand-orange transition-colors">Local Reviews</a></li>
                  <li><a href="#process" className="hover:text-brand-orange transition-colors">Installation Process</a></li>
                </ul>
             </div>
             <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Services</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-brand-orange transition-colors">Countertop Installation</a></li>
                  <li><a href="#" className="hover:text-brand-orange transition-colors">Cabinet Refacing</a></li>
                  <li><a href="#" className="hover:text-brand-orange transition-colors">Kitchen Remodeling</a></li>
                  <li><a href="#" className="hover:text-brand-orange transition-colors">Bathroom Vanities</a></li>
                </ul>
             </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-600 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Priority Renovations LLC. All rights reserved.
            <span className="mx-2 hidden md:inline">|</span> 
            <a href="#" className="hover:text-white block md:inline mt-1 md:mt-0">Privacy Policy</a>
          </div>
          
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-brand-orange transition-colors"
          >
            Back to Top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;