import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import AnnouncementBar from "../../components/AnnouncementBar";
import {
  Check,
  CheckCircle2,
  XCircle,
  Home,
  Hammer,
  Droplets,
  LayoutTemplate,
  Clock,
  Calendar,
  CalendarDays,
  Search,
  MapPin,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Lock,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  BadgeCheck,
  Star,
} from "lucide-react";

const QuizzPage: React.FC = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [step, setStep] = useState(1);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [answers, setAnswers] = useState({
    isHomeowner: "",
    projectScope: "",
    timeline: "",
    zipCode: "",
    name: "",
    email: "",
    phone: "",
  });

  const [cityInfo, setCityInfo] = useState<{
    name: string;
    count: number;
  } | null>(null);
  const [isCheckingZip, setIsCheckingZip] = useState(false);

  // Handle Zip Code Lookup
  useEffect(() => {
    const cleanZip = answers.zipCode.replace(/\D/g, "");
    if (cleanZip.length === 5) {
      setIsCheckingZip(true);
      fetch(`https://api.zippopotam.us/us/${cleanZip}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.places && data.places.length > 0) {
            const cityName = data.places[0]["place name"];
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
    setAnswers((prev) => ({ ...prev, [field]: value }));
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
    setFormStatus("submitting");

    // Trigger n8n Webhook
    fetch("https://webhook.infra-remakingautomacoes.cloud/webhook/prform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...answers,
        _subject: "New Lead (Interactive Quiz Funnel)",
      }),
    }).catch((err) => console.error("Webhook error:", err));

    // FormSubmit Fallback/Primary
    const formData = new FormData();
    Object.entries(answers).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("_subject", "New Lead (Interactive Quiz Funnel)");
    formData.append("_captcha", "false");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/priorityrenovationsatl@gmail.com",
        {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        },
      );

      if (response.ok) {
        setFormStatus("success");
        setStep(6); // Success Step
        setIsAnalyzing(true);
        setTimeout(() => {
          setIsAnalyzing(false);
        }, 2500); // 2.5 seconds of fake analyzing

        // @ts-ignore
        if (typeof window.gtag_report_conversion === "function") {
          // @ts-ignore
          window.gtag_report_conversion();
        }

        // Meta Pixel Lead Event
        // @ts-ignore
        if (typeof window.fbq === "function") {
          // @ts-ignore
          window.fbq("track", "Lead");
        }
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  const totalSteps = 5;
  const progressPercentage = ((step - 1) / totalSteps) * 100;

  return (
    <div className="min-h-[100dvh] w-full bg-slate-900 font-sans flex flex-col items-center justify-start pb-12 relative overflow-x-hidden">
      <Head>
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&fm=webp" />
      </Head>
      {/* Background Image */}
      <div className="fixed inset-0 z-0 h-[100vh] bg-black">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&fm=webp"
          alt="Luxury Kitchen Remodel"
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-900/40"></div>
      </div>

      {/* Announcement Bar */}
      <div className="w-full fixed top-0 left-0 right-0 z-50">
        {isBannerVisible && (
          <AnnouncementBar onClose={() => setIsBannerVisible(false)} />
        )}
      </div>

      {/* Navbar / Logo Area */}
      <div
        className={`w-full relative z-20 px-4 sm:px-6 lg:px-8 ${isBannerVisible ? "pt-20 sm:pt-24" : "pt-8 sm:pt-12"}`}
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-center gap-3 cursor-pointer group"
          onClick={() => (window.location.href = "/")}
        >
          <div className="relative h-10 sm:h-12 w-10 sm:w-12">
            <Image
              src="https://i.imgur.com/VBoJH82.png"
              alt="Priority Renovations Logo"
              fill
              sizes="(max-width: 640px) 40px, 48px"
              priority
              fetchPriority="high"
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
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 relative z-20 flex-grow flex flex-col items-center text-center">
        
        {/* Hero Text (Centered) */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 mb-3 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">Checking Local Availability</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-white mb-2 leading-tight drop-shadow-lg">
          Check If You <span className="text-brand-orange">Qualify</span>
        </h1>
        <p className="text-slate-200 text-xs md:text-sm max-w-xl mx-auto mb-4 drop-shadow-md">
          Take this 30-second quiz to see if your project qualifies for our exclusive factory-direct pricing.
        </p>

        {/* Quiz Container */}
        <div className="w-full max-w-xl mx-auto text-left">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative border border-slate-100">
            {/* Stepper Progress Bar */}
            {step < 6 && (
              <div className="pt-5 pb-4 px-2 sm:px-8 border-b border-slate-100 bg-slate-50/50 relative">
                {step > 1 && (
                  <button
                    onClick={handleBack}
                    className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1 text-[10px] sm:text-xs font-bold text-slate-400 hover:text-brand-orange transition-colors z-20"
                  >
                    <ChevronLeft size={14} /> Back
                  </button>
                )}
                <div className="relative flex justify-between items-start w-full max-w-sm mx-auto mt-4 sm:mt-2">
                  {/* Connecting Line Background */}
                  <div className="absolute top-4 left-[16px] right-[16px] h-[2px] bg-slate-200 z-0 -translate-y-1/2">
                    {/* Connecting Line Active */}
                    <div
                      className="absolute top-0 left-0 h-full bg-brand-orange transition-all duration-500"
                      style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                    ></div>
                  </div>

                  {[
                    { num: 1, label: "START" },
                    { num: 2, label: "SCOPE" },
                    { num: 3, label: "TIME" },
                    { num: 4, label: "AREA" },
                    { num: 5, label: "DETAILS" },
                  ].map((s) => {
                    const isActive = step === s.num;
                    const isCompleted = step > s.num;
                    return (
                      <div key={s.num} className="relative z-10 flex flex-col items-center gap-2 w-12 sm:w-16">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                            isActive
                              ? "bg-brand-orange text-white ring-4 ring-brand-orange/20"
                              : isCompleted
                              ? "bg-brand-orange text-white"
                              : "bg-white text-slate-400 border-2 border-slate-200"
                          }`}
                        >
                          {isCompleted ? <Check size={16} strokeWidth={3} /> : s.num}
                        </div>
                        <span
                          className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-center ${
                            isActive ? "text-slate-800" : "text-slate-400"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="p-4 sm:p-6">
              {/* STEP 1: Homeowner */}
              {step === 1 && (
                <div className="animate-fade-in">
                  <div className="text-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-1">
                      Are you a homeowner?
                    </h2>
                    <p className="text-slate-500 text-xs">
                      Select an option below to begin.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleAnswer("isHomeowner", "Yes")}
                      className="flex items-center justify-center gap-2 p-3 sm:p-4 border-2 border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50/50 hover:shadow-md active:scale-95 transition-all group bg-white"
                    >
                      <CheckCircle2 className="text-emerald-500 w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="text-base font-bold text-slate-800">
                        Yes
                      </span>
                    </button>
                    <button
                      onClick={() => handleAnswer("isHomeowner", "No")}
                      className="flex items-center justify-center gap-2 p-3 sm:p-4 border-2 border-slate-200 rounded-xl hover:border-red-500 hover:bg-red-50/50 hover:shadow-md active:scale-95 transition-all group bg-white"
                    >
                      <XCircle className="text-red-500 w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="text-base font-bold text-slate-800">
                        No
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Project Scope */}
              {step === 2 && (
                <div className="animate-fade-in">
                  <div className="text-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-1">
                      What is the scope of your project?
                    </h2>
                    <p className="text-slate-500 text-xs">
                      Select the option that best describes your needs.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {[
                      { id: "Kitchen Remodel", icon: Home },
                      { id: "Bathroom Remodel", icon: Droplets },
                      { id: "Countertops Only", icon: LayoutTemplate },
                      { id: "Cabinet Refacing", icon: Hammer },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleAnswer("projectScope", item.id)}
                        className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-xl hover:border-brand-orange hover:bg-orange-50/50 hover:shadow-md active:scale-95 transition-all text-left group bg-white"
                      >
                        <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-brand-orange group-hover:text-white transition-colors text-slate-600 shadow-sm">
                          <item.icon size={18} />
                        </div>
                        <span className="text-sm font-bold text-slate-800">
                          {item.id}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Timeline */}
              {step === 3 && (
                <div className="animate-fade-in">
                  <div className="text-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-1">
                      When do you want to start?
                    </h2>
                    <p className="text-slate-500 text-xs">
                      This helps us check our installation schedule.
                    </p>
                  </div>
                  <div className="space-y-2">
                    {[
                      { id: "As soon as possible", icon: Clock },
                      { id: "1-2 Months", icon: Calendar },
                      { id: "3-6 Months", icon: CalendarDays },
                      { id: "Just browsing / Planning", icon: Search },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleAnswer("timeline", item.id)}
                        className="w-full flex items-center justify-between p-3 border-2 border-slate-200 rounded-xl hover:border-brand-orange hover:bg-orange-50/50 hover:shadow-md active:scale-95 transition-all text-left group bg-white"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-brand-orange group-hover:text-white transition-colors text-slate-500 shadow-sm">
                            <item.icon size={18} />
                          </div>
                          <span className="text-sm font-bold text-slate-800 group-hover:text-brand-orange transition-colors">
                            {item.id}
                          </span>
                        </div>
                        <ChevronRight
                          className="text-slate-400 group-hover:text-brand-orange transition-colors"
                          size={18}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Zip Code */}
              {step === 4 && (
                <div className="animate-fade-in">
                  <div className="text-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-1">
                      Where is your project located?
                    </h2>
                    <p className="text-slate-500 text-xs">
                      Enter your zip code to see if we service your area.
                    </p>
                  </div>
                  <div className="space-y-5">
                    <input
                      type="text"
                      maxLength={5}
                      value={answers.zipCode}
                      onChange={(e) =>
                        setAnswers({ ...answers, zipCode: e.target.value })
                      }
                      className="w-full text-center text-3xl tracking-widest bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all focus:ring-4 focus:ring-brand-orange/20"
                      placeholder="Zip Code"
                    />

                    {/* Conversion Booster based on Zip Code */}
                    <div className="min-h-[76px]">
                      {isCheckingZip && (
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 animate-pulse h-full">
                          <Loader2 size={18} className="animate-spin" />{" "}
                          Checking availability...
                        </div>
                      )}
                      {cityInfo && !isCheckingZip && (
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200 rounded-xl p-4 flex items-center gap-4 shadow-sm animate-fade-in">
                          <div className="bg-emerald-500 text-white rounded-full p-2.5 shadow-md">
                            <MapPin size={24} />
                          </div>
                          <div className="text-left">
                            <p className="text-base font-extrabold text-emerald-900 leading-tight">
                              Great news! We serve {cityInfo.name}.
                            </p>
                            <p className="text-xs font-medium text-emerald-700 mt-0.5">
                              We have completed over {cityInfo.count} projects
                              near you.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={answers.zipCode.length < 5}
                      className="w-full bg-brand-orange text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-brand-orange/30 hover:bg-orange-600 hover:shadow-brand-orange/50 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                    >
                      Continue <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: Contact Info */}
              {step === 5 && (
                <div className="animate-fade-in">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full text-emerald-600 mb-2 shadow-inner">
                      <ShieldCheck size={24} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-1">
                      Where should we send your results?
                    </h2>
                    <p className="text-slate-500 text-xs">
                      Enter your details to see if you qualify for factory-direct pricing.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-2.5">
                    <div className="relative">
                      <input
                        required
                        type="text"
                        value={answers.name}
                        onChange={(e) =>
                          setAnswers({ ...answers, name: e.target.value })
                        }
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all focus:ring-4 focus:ring-brand-orange/10"
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="relative">
                      <input
                        required
                        type="tel"
                        value={answers.phone}
                        onChange={(e) =>
                          setAnswers({ ...answers, phone: e.target.value })
                        }
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all focus:ring-4 focus:ring-brand-orange/10"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        value={answers.email}
                        onChange={(e) =>
                          setAnswers({ ...answers, email: e.target.value })
                        }
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all focus:ring-4 focus:ring-brand-orange/10"
                        placeholder="Email Address"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full bg-brand-orange text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-brand-orange/30 hover:bg-orange-600 hover:shadow-brand-orange/50 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <Loader2 className="animate-spin" size={24} />{" "}
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Check My Eligibility <ArrowRight size={20} />
                        </>
                      )}
                    </button>

                    {formStatus === "error" && (
                      <p className="text-red-500 text-xs text-center mt-2">
                        Error submitting. Please try again.
                      </p>
                    )}

                    <div className="flex flex-col items-center justify-center gap-1 mt-3">
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                        <Lock size={10} />
                        <span>256-bit Secure Encryption</span>
                      </div>
                      <span className="text-[10px] text-slate-400">We respect your privacy. No spam.</span>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 6: Success (Flashy Reveal) */}
              {step === 6 && (
                <div className="py-2 sm:py-4">
                  {isAnalyzing ? (
                    <div className="animate-fade-in flex flex-col items-center justify-center text-center space-y-4 py-8">
                      <div className="relative w-20 h-20 mb-2">
                        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-brand-orange rounded-full border-t-transparent animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Search className="text-brand-orange animate-pulse" size={24} />
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-slate-800 animate-pulse">Analyzing your responses...</h2>
                      <div className="text-xs text-slate-500 space-y-2 text-left mt-4 bg-slate-50 p-4 rounded-xl border border-slate-100 w-full max-w-xs mx-auto">
                        <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500"/> Checking service area...</p>
                        <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500"/> Verifying project scope...</p>
                        <p className="flex items-center gap-2 animate-pulse"><Loader2 size={14} className="animate-spin text-brand-orange"/> Calculating eligibility...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="animate-scale-in text-center flex flex-col items-center">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-40 animate-pulse rounded-full"></div>
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full text-white shadow-2xl transform hover:scale-105 transition-transform relative z-10">
                          <Award size={40} className="animate-bounce" />
                        </div>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 mb-2 uppercase tracking-tight">
                        Congratulations!
                      </h2>
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-sm inline-block">
                        You Are Qualified
                      </div>
                      <p className="text-slate-600 text-sm mb-6">
                        Your project in <strong>{cityInfo?.name || answers.zipCode}</strong> has been approved for our <span className="font-bold text-brand-orange">Factory-Direct Pricing</span>!
                      </p>
                      <div className="bg-slate-900 rounded-2xl p-5 mb-6 text-sm text-white shadow-xl w-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange to-orange-400"></div>
                        <p className="font-medium mb-2 text-emerald-400 flex items-center justify-center gap-2">
                          <CheckCircle2 size={18} /> Priority Status Activated
                        </p>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          Our team is reviewing your details. Expect a call at <br/><strong className="text-white text-lg tracking-wider block mt-1 mb-1">{answers.phone}</strong> shortly to schedule your free estimate.
                        </p>
                      </div>
                      <button
                        onClick={() => (window.location.href = "/")}
                        className="w-full bg-slate-100 text-slate-800 font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-colors shadow-sm border border-slate-200"
                      >
                        Return to Homepage
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust Badges Below Quiz */}
        {step < 6 && (
          <div className="mt-4 w-full max-w-xl mx-auto relative z-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow-lg">
                <div className="bg-white p-1 rounded-full">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" width={16} height={16} alt="Google" />
                </div>
                <div className="flex text-[#FBBC05] space-x-0.5">
                  <Star size={10} fill="currentColor"/>
                  <Star size={10} fill="currentColor"/>
                  <Star size={10} fill="currentColor"/>
                  <Star size={10} fill="currentColor"/>
                  <Star size={10} fill="currentColor"/>
                </div>
                <span className="text-[10px] text-white font-bold uppercase tracking-wide">5.0 Rating</span>
              </div>
              
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow-lg">
                <ShieldCheck size={20} className="text-green-500" />
                <span className="text-[10px] text-white font-bold uppercase tracking-wide">Licensed & Insured</span>
              </div>
              
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow-lg">
                <BadgeCheck size={20} className="text-brand-orange" />
                <span className="text-[10px] text-white font-bold uppercase tracking-wide">Factory Direct</span>
              </div>
              
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow-lg">
                <ThumbsUp size={20} className="text-blue-400" />
                <span className="text-[10px] text-white font-bold uppercase tracking-wide">100% Guaranteed</span>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default QuizzPage;
