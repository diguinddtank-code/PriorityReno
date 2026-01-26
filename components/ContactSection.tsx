import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2, Navigation } from 'lucide-react';
import Button from './Button';
import { createPortal } from 'react-dom';

const ContactSection: React.FC = () => {

  const locations = [
    "Duluth", "Johns Creek", "Alpharetta", "Buckhead", "Suwanee", 
    "Milton", "Roswell", "Sandy Springs", "Dunwoody", "Brookhaven", 
    "Marietta", "Cumming", "Norcross", "Peachtree Corners", "Decatur"
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none mix-blend-multiply"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* LEFT COLUMN: CONTACT INFO & MAP */}
                <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
                    <div>
                        <span className="text-brand-orange font-bold uppercase tracking-widest text-xs bg-brand-orange/10 px-3 py-1 rounded-full">Contact Us</span>
                        <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mt-4 leading-tight">
                            Visit Our Showroom or <br/>
                            <span className="text-brand-orange">We Come to You.</span>
                        </h2>
                        <p className="text-slate-600 mt-4 text-lg max-w-xl">
                            Serving the entire Metro Atlanta area. Stop by our Duluth showroom to view full slabs, or schedule a free in-home estimate.
                        </p>
                    </div>

                    {/* Contact Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
                             <div className="bg-brand-orange/10 w-12 h-12 rounded-full flex items-center justify-center text-brand-orange">
                                <MapPin size={24} />
                             </div>
                             <div>
                                 <h4 className="font-bold text-slate-900 mb-1">Visit Showroom</h4>
                                 <p className="text-slate-600 text-sm">4579 Abbotts Bridge Road,<br/>Duluth, GA 30096</p>
                             </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
                             <div className="bg-brand-orange/10 w-12 h-12 rounded-full flex items-center justify-center text-brand-orange">
                                <Mail size={24} />
                             </div>
                             <div>
                                 <h4 className="font-bold text-slate-900 mb-1">Email Us</h4>
                                 <a href="mailto:priorityrenovationsatl@gmail.com" className="text-slate-600 text-sm hover:text-brand-orange transition-colors break-all">priorityrenovationsatl@gmail.com</a>
                                 <p className="text-xs text-slate-400 mt-1">24/7 Online Support</p>
                             </div>
                        </div>
                    </div>

                    {/* Map Container - Light Theme */}
                    <div className="h-[350px] w-full bg-slate-200 rounded-2xl overflow-hidden border border-slate-300 relative shadow-md group">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.467862416393!2d-84.17515392429464!3d34.03241512401831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f598b04618779b%3A0x629555085440669!2s4579%20Abbotts%20Bridge%20Rd%2C%20Duluth%2C%20GA%2030097!5e0!3m2!1sen!2sus!4v1716300000000!5m2!1sen!2sus" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                        ></iframe>
                        
                        {/* Get Directions Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-auto bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-4 transition-transform duration-300 md:group-hover:scale-105">
                            <div className="text-center md:text-left">
                                <p className="font-bold text-slate-900 text-sm">Priority Renovations HQ</p>
                                <p className="text-xs text-slate-500">4579 Abbotts Bridge Rd, Duluth</p>
                            </div>
                            <a 
                                href="https://www.google.com/maps/dir/?api=1&destination=4579+Abbotts+Bridge+Rd,+Duluth,+GA+30097" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full md:w-auto bg-brand-orange text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                            >
                                <Navigation size={14} /> Get Directions
                            </a>
                        </div>
                    </div>
                    
                    {/* Locations Tags */}
                    <div>
                         <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">Service Areas</p>
                         <div className="flex flex-wrap gap-2">
                            {locations.map((loc, i) => (
                                <span key={i} className="inline-block px-3 py-1 bg-white text-slate-600 text-xs rounded-full border border-slate-200 shadow-sm">
                                    {loc}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: HIGH CONVERSION FORM (STICKY) */}
                <div className="lg:col-span-5 order-1 lg:order-2">
                    <div id="quote-form" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 relative overflow-hidden group scroll-mt-28">
                         
                         {/* Orange Top Accent */}
                         <div className="absolute top-0 left-0 right-0 h-2 bg-brand-orange"></div>

                         <div className="mb-6">
                            <div className="inline-flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-widest mb-2 bg-brand-orange/5 px-3 py-1 rounded-md">
                                <ShieldCheck size={14} /> Price Match Guarantee
                            </div>
                            <h3 className="text-3xl font-serif text-slate-900">Get Your Free Quote</h3>
                            <p className="text-slate-500 mt-2 text-sm">Lock in today's material pricing. No obligation.</p>
                         </div>

                         <form 
                            className="space-y-4" 
                            action="https://formsubmit.co/priorityrenovationsatl@gmail.com"
                            method="POST"
                         >
                            {/* FormSubmit Configuration */}
                            <input type="hidden" name="_subject" value="New Bottom Contact Inquiry" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="table" />
                            
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">First Name</label>
                                    <input required type="text" name="name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all focus:ring-2 focus:ring-brand-orange/20" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">Phone</label>
                                    <input required type="tel" name="phone" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all focus:ring-2 focus:ring-brand-orange/20" placeholder="(555) 000-0000" />
                                </div>
                             </div>

                             <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">Email Address</label>
                                <input required type="email" name="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all focus:ring-2 focus:ring-brand-orange/20" placeholder="john@example.com" />
                             </div>

                             <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">Project Details</label>
                                <textarea name="message" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all focus:ring-2 focus:ring-brand-orange/20 h-32 resize-none" placeholder="I'm interested in quartz countertops for my kitchen..."></textarea>
                             </div>

                             <Button 
                                variant="primary" 
                                fullWidth 
                                type="submit"
                                className="mt-2 py-4 text-base shadow-xl shadow-brand-orange/30 hover:shadow-brand-orange/50"
                             >
                                Check Availability & Price
                             </Button>

                             <p className="text-center text-[10px] text-slate-400 mt-4 flex items-center justify-center gap-1">
                                <ShieldCheck size={12} /> Your privacy is our priority. No spam.
                             </p>
                         </form>
                    </div>
                </div>

            </div>

        </div>
    </section>
  );
};

export default ContactSection;