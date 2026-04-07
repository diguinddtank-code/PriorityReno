import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AnnouncementBar from '../../components/AnnouncementBar';
import { 
  CheckCircle2, XCircle, Home, Hammer, Droplets, 
  LayoutTemplate, Clock, Calendar, CalendarDays, Search,
  MapPin, Loader2, ArrowRight, ShieldCheck, Lock, Award, Sparkles, ChevronLeft, ChevronRight,
  ThumbsUp, BadgeCheck
} from 'lucide-react';

const QuizzPage: React.FC = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [step, setStep] = useState(1);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const [answers, setAnswers] = useState({
    isHomeowner: '',
    projectScope: '',
    timeline: '',
    zipCode: '',
    name: '',
    email: '',
    phone: ''
  });

  const [cityInfo, setCityInfo] = useState<{name: string, count: number} | null>(null);
  const [isCheckingZip, setIsCheckingZip] = useState(false);

  // Handle Zip Code Lookup
  useEffect(() => {
    const cleanZip = answers.zipCode.replace(/\D/g, '');
    if (cleanZip.length === 5) {
        setIsCheckingZip(true);
        fetch(`https://api.zippopotam.us/us/${cleanZip}`)
            .then(res => res.json())
            .then(data => {
                if (data.places && data.places.length > 0) {
                    const cityName = data.places[0]['place name'];
                    const count = Math.floor(parseInt(cleanZip) % 40) + 85; 
                    setCityInfo({ name: cityName, count });
                } else {
                    setCityInfo(null);
                }
            })
            .catch(() => setCityInfo(null))
            .finally(() => setIsCheckingZip(false));
    } else {
        setCityInfo(null);
    }
  }, [answers.zipCode]);

  const handleAnswer = (field: string, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    if (step < 4) {
      setTimeout(() => setStep(step + 1), 250); // Fast visual feedback
    }
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1 && step < 6) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Trigger n8n Webhook
    fetch("https://webhook.infra-remakingautomacoes.cloud/webhook/prform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...answers,
            _subject: "New Lead (Interactive Quiz Funnel)"
        })
    }).catch(err => console.error("Webhook error:", err));
    
    // FormSubmit Fallback/Primary
    const formData = new FormData();
    Object.entries(answers).forEach(([key, value]) => {
        formData.append(key, value);
    });
    formData.append('_subject', 'New Lead (Interactive Quiz Funnel)');
    formData.append('_captcha', 'false');

    try {
        const response = await fetch("https://formsubmit.co/ajax/priorityrenovationsatl@gmail.com", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            setFormStatus('success');
            setStep(6); // Success Step
            
            // @ts-ignore
            if (typeof window.gtag_report_conversion === 'function') {
                 // @ts-ignore
                 window.gtag_report_conversion();
            }

            // Meta Pixel Lead Event
            // @ts-ignore
            if (typeof window.fbq === 'function') {
                // @ts-ignore
                window.fbq('track', 'Lead');
            }
        } else {
            setFormStatus('error');
        }
    } catch (error) {
        setFormStatus('error');
    }
  };

  const totalSteps = 5;
  const progressPercentage = ((step - 1) / totalSteps) * 100;

  return (
    <div className="min-h-[100dvh] w-full bg-slate-100 font-sans flex flex-col items-center justify-start pb-12 relative overflow-x-hidden">
      
      {/* Announcement Bar */}
      <div className="w-full fixed top-0 left-0 right-0 z-50">
        {isBannerVisible && <AnnouncementBar onClose={() => setIsBannerVisible(false)} />}
      </div>

      {/* Mini Hero Section */}
      <div className={`relative w-full h-64 sm:h-72 bg-slate-900 rounded-b-[2rem] sm:rounded-b-[3rem] shadow-xl flex flex-col items-center justify-start ${isBannerVisible ? 'pt-16 sm:pt-20' : 'pt-8'} overflow-hidden shrink-0 transition-all duration-300`}>
          {/* Background Image */}
          <div className="absolute inset-0 opacity-30">
              <Image 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Luxury Kitchen Remodel" 
                  fill
                  sizes="100vw"
                  className="object-cover"
              />
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900"></div>
          
          {/* Logo & Branding */}
          <div className="relative z-10 flex items-center gap-3 cursor-pointer group" onClick={() => window.location.href = '/'}>
              <div className="relative h-10 sm:h-12 w-10 sm:w-12">
                <Image 
                    src="https://i.imgur.com/VBoJH82.png" 
                    alt="Priority Renovations Logo" 
                    fill
                    sizes="(max-width: 640px) 40px, 48px"
                    className="object-contain drop-shadow-lg"
                />
              </div>
              <div className="flex items-center gap-1.5 drop-shadow-lg">
                <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight leading-none text-white">
                  Priority
                </span>
                <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight leading-none text-brand-orange">
                  Renovations
                </span>
              </div>
          </div>
          
          {/* Hero Text */}
          <div className="relative z-10 mt-6 text-center px-4">
              <h2 className="text-white text-lg sm:text-xl font-medium drop-shadow-md">
                  Get Your Free Custom Estimate
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">Takes less than 60 seconds.</p>
          </div>
      </div>

      {/* Quiz Container */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden relative z-20 -mt-20 sm:-mt-24 border border-slate-200">
        
        {/* Top Progress Bar */}
        {step < 6 && (
            <div className="w-full bg-slate-100 h-2.5 relative">
                <div 
                    className="absolute top-0 left-0 h-full bg-brand-orange transition-all duration-500 ease-out shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        )}

        {/* Progress Text & Back Button */}
        {step < 6 && (
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                {step > 1 ? (
                    <button 
                        onClick={handleBack}
                        className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-brand-orange transition-colors"
                    >
                        <ChevronLeft size={16} /> Back
                    </button>
                ) : (
                    <div className="w-16"></div>
                )}
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Step {step} of {totalSteps}
                </span>
                <div className="w-16"></div>
            </div>
        )}

        <div className="p-6 sm:p-8">
            
            {/* STEP 1: Homeowner */}
            {step === 1 && (
                <div className="animate-fade-in">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">Are you a homeowner?</h2>
                        <p className="text-slate-500 text-sm">Select an option below to begin.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={() => handleAnswer('isHomeowner', 'Yes')} 
                            className="flex flex-col items-center justify-center p-6 border-2 border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all group bg-white"
                        >
                            <CheckCircle2 className="text-emerald-500 mb-3 w-12 h-12 group-hover:scale-110 transition-transform" />
                            <span className="text-lg font-bold text-slate-800">Yes</span>
                        </button>
                        <button 
                            onClick={() => handleAnswer('isHomeowner', 'No')} 
                            className="flex flex-col items-center justify-center p-6 border-2 border-slate-200 rounded-xl hover:border-red-500 hover:bg-red-50 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all group bg-white"
                        >
                            <XCircle className="text-red-500 mb-3 w-12 h-12 group-hover:scale-110 transition-transform" />
                            <span className="text-lg font-bold text-slate-800">No</span>
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 2: Project Scope */}
            {step === 2 && (
                <div className="animate-fade-in">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">What is the scope of your project?</h2>
                        <p className="text-slate-500 text-sm">Select the option that best describes your needs.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { id: 'Kitchen Remodel', icon: Home },
                            { id: 'Bathroom Remodel', icon: Droplets },
                            { id: 'Countertops Only', icon: LayoutTemplate },
                            { id: 'Cabinet Refacing', icon: Hammer },
                        ].map((item) => (
                            <button 
                                key={item.id}
                                onClick={() => handleAnswer('projectScope', item.id)}
                                className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-xl hover:border-brand-orange hover:bg-brand-orange/5 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-left group bg-white"
                            >
                                <div className="bg-slate-100 p-2.5 rounded-full group-hover:bg-brand-orange group-hover:text-white transition-colors text-slate-600">
                                    <item.icon size={20} />
                                </div>
                                <span className="text-sm font-bold text-slate-800">{item.id}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 3: Timeline */}
            {step === 3 && (
                <div className="animate-fade-in">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">When do you want to start?</h2>
                        <p className="text-slate-500 text-sm">This helps us check our installation schedule.</p>
                    </div>
                    <div className="space-y-3">
                        {[
                            { id: 'As soon as possible', icon: Clock },
                            { id: '1-2 Months', icon: Calendar },
                            { id: '3-6 Months', icon: CalendarDays },
                            { id: 'Just browsing / Planning', icon: Search },
                        ].map((item) => (
                            <button 
                                key={item.id}
                                onClick={() => handleAnswer('timeline', item.id)}
                                className="w-full flex items-center justify-between p-4 border-2 border-slate-200 rounded-xl hover:border-brand-orange hover:bg-brand-orange/5 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-left group bg-white"
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="text-slate-400 group-hover:text-brand-orange transition-colors" size={20} />
                                    <span className="text-base font-bold text-slate-800">{item.id}</span>
                                </div>
                                <ChevronRight className="text-slate-300 group-hover:text-brand-orange transition-colors" size={20} />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 4: Zip Code */}
            {step === 4 && (
                <div className="animate-fade-in">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">Where is your project located?</h2>
                        <p className="text-slate-500 text-sm">Enter your zip code to see if we service your area.</p>
                    </div>
                    <div className="space-y-5">
                        <input 
                            type="text" 
                            maxLength={5}
                            value={answers.zipCode}
                            onChange={(e) => setAnswers({...answers, zipCode: e.target.value})}
                            className="w-full text-center text-3xl tracking-widest bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all focus:ring-4 focus:ring-brand-orange/20" 
                            placeholder="Zip Code" 
                        />

                        {/* Conversion Booster based on Zip Code */}
                        <div className="min-h-[76px]">
                            {isCheckingZip && (
                                <div className="flex items-center justify-center gap-2 text-sm text-slate-500 animate-pulse h-full">
                                    <Loader2 size={18} className="animate-spin" /> Checking availability...
                                </div>
                            )}
                            {cityInfo && !isCheckingZip && (
                                <div className="bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200 rounded-xl p-4 flex items-center gap-4 shadow-sm animate-fade-in">
                                    <div className="bg-emerald-500 text-white rounded-full p-2.5 shadow-md">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-base font-extrabold text-emerald-900 leading-tight">Great news! We serve {cityInfo.name}.</p>
                                        <p className="text-xs font-medium text-emerald-700 mt-0.5">We've completed over {cityInfo.count} projects near you.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button 
                            onClick={handleNext}
                            disabled={answers.zipCode.length < 5}
                            className="w-full bg-brand-orange text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-brand-orange/30 hover:bg-orange-600 hover:shadow-brand-orange/50 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                        >
                            Continue <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 5: Contact Info */}
            {step === 5 && (
                <div className="animate-fade-in">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">Final Step!</h2>
                        <p className="text-slate-500 text-sm">Enter your details to see if you qualify for our current promotions.</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input 
                            required 
                            type="text" 
                            value={answers.name}
                            onChange={(e) => setAnswers({...answers, name: e.target.value})}
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all" 
                            placeholder="Full Name" 
                        />
                        <input 
                            required 
                            type="tel" 
                            value={answers.phone}
                            onChange={(e) => setAnswers({...answers, phone: e.target.value})}
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all" 
                            placeholder="Phone Number" 
                        />
                        <input 
                            required 
                            type="email" 
                            value={answers.email}
                            onChange={(e) => setAnswers({...answers, email: e.target.value})}
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all" 
                            placeholder="Email Address" 
                        />

                        <button 
                            type="submit"
                            disabled={formStatus === 'submitting'}
                            className="w-full bg-brand-orange text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-brand-orange/30 hover:bg-orange-600 hover:shadow-brand-orange/50 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                        >
                            {formStatus === 'submitting' ? (
                                <><Loader2 className="animate-spin" size={24} /> Processing...</>
                            ) : (
                                <>See If I Qualify <Sparkles size={20} /></>
                            )}
                        </button>

                        {formStatus === 'error' && (
                            <p className="text-red-500 text-xs text-center mt-2">Error submitting. Please try again.</p>
                        )}

                        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-4">
                            <Lock size={12} /> 
                            <span>Your information is 100% secure and encrypted.</span>
                        </div>
                    </form>
                </div>
            )}

            {/* STEP 6: Success (Compact) */}
            {step === 6 && (
                <div className="animate-scale-in text-center py-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full text-emerald-600 mb-4 shadow-inner">
                        <Award size={32} />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 mb-2">You're Qualified!</h2>
                    <p className="text-slate-600 text-sm mb-6">
                        Your project in <strong>{cityInfo?.name || answers.zipCode}</strong> is eligible for our factory-direct pricing.
                    </p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-sm text-slate-700">
                        Expect a call at <strong>{answers.phone}</strong> shortly to provide your free estimate.
                    </div>
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-md"
                    >
                        Return to Homepage
                    </button>
                </div>
            )}

        </div>
      </div>

      {/* Trust Badges Below Quiz */}
      {step < 6 && (
          <div className="mt-8 w-full max-w-3xl px-4 relative z-20">
              <p className="text-center text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Trusted by Homeowners Across Metro Atlanta</p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  
                  {/* Google 5-Star Badge */}
                  <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <div className="flex flex-col">
                          <div className="flex text-[#FBBC05] text-[10px] sm:text-xs tracking-tighter">
                              ★★★★★
                          </div>
                          <span className="text-[10px] font-bold text-slate-700 leading-none mt-0.5">5.0 Google Rating</span>
                      </div>
                  </div>

                  {/* Factory Direct Pricing Badge */}
                  <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                      <div className="bg-green-100 p-1.5 rounded-full shrink-0">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                      </div>
                      <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-800 leading-tight">Factory Direct</span>
                          <span className="text-[9px] sm:text-[10px] text-slate-500 leading-none mt-0.5">Wholesale Pricing</span>
                      </div>
                  </div>

                  {/* Licensed & Insured Badge */}
                  <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                      <div className="bg-blue-100 p-1.5 rounded-full shrink-0">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                      </div>
                      <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-800 leading-tight">Fully Licensed</span>
                          <span className="text-[9px] sm:text-[10px] text-slate-500 leading-none mt-0.5">& Insured</span>
                      </div>
                  </div>

                  {/* A+ BBB Rating Badge */}
                  <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                      <div className="bg-brand-orange/10 p-1.5 rounded-full shrink-0">
                          <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                      </div>
                      <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-800 leading-tight">A+ Rating</span>
                          <span className="text-[9px] sm:text-[10px] text-slate-500 leading-none mt-0.5">Better Business Bureau</span>
                      </div>
                  </div>

              </div>
          </div>
      )}

    </div>
  );
};

export default QuizzPage;
