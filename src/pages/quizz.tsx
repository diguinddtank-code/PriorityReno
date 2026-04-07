import React, { useState, useEffect } from "react";
import Image from "next/image";
import AnnouncementBar from "../../components/AnnouncementBar";
import {
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
      {/* Background Image */}
      <div className="fixed inset-0 z-0 h-[100vh] bg-black">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Kitchen Remodel"
          fill
          sizes="100vw"
          priority
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
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 relative z-20 flex-grow flex flex-col items-center text-center">
        
        {/* Hero Text (Centered) */}
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-lg">
          Get Your Free{" "}
          <span className="text-brand-orange">Custom Estimate</span>
        </h1>
        <p className="text-slate-200 text-sm md:text-base max-w-xl mx-auto mb-8 drop-shadow-md">
          Answer a few quick questions about your project to see if you
          qualify for our factory-direct pricing.
        </p>

        {/* Quiz Container */}
        <div className="w-full max-w-xl mx-auto text-left">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative border border-slate-100">
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
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
                      Are you a homeowner?
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Select an option below to begin.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleAnswer("isHomeowner", "Yes")}
                      className="flex flex-col items-center justify-center p-4 sm:p-5 border-2 border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all group bg-white"
                    >
                      <CheckCircle2 className="text-emerald-500 mb-2 w-10 h-10 group-hover:scale-110 transition-transform" />
                      <span className="text-base sm:text-lg font-bold text-slate-800">
                        Yes
                      </span>
                    </button>
                    <button
                      onClick={() => handleAnswer("isHomeowner", "No")}
                      className="flex flex-col items-center justify-center p-4 sm:p-5 border-2 border-slate-200 rounded-xl hover:border-red-500 hover:bg-red-50 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all group bg-white"
                    >
                      <XCircle className="text-red-500 mb-2 w-10 h-10 group-hover:scale-110 transition-transform" />
                      <span className="text-base sm:text-lg font-bold text-slate-800">
                        No
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Project Scope */}
              {step === 2 && (
                <div className="animate-fade-in">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
                      What is the scope of your project?
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Select the option that best describes your needs.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {[
                      { id: "Kitchen Remodel", icon: Home },
                      { id: "Bathroom Remodel", icon: Droplets },
                      { id: "Countertops Only", icon: LayoutTemplate },
                      { id: "Cabinet Refacing", icon: Hammer },
                      { id: "Custom Cabinets", icon: LayoutTemplate },
                      { id: "Outdoor Kitchen", icon: Home },
                      { id: "Commercial Project", icon: Award },
                      { id: "Other", icon: Sparkles },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleAnswer("projectScope", item.id)}
                        className="flex items-center gap-3 p-2.5 sm:p-3 border-2 border-slate-200 rounded-xl hover:border-brand-orange hover:bg-brand-orange/5 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-left group bg-white"
                      >
                        <div className="bg-slate-100 p-2 rounded-full group-hover:bg-brand-orange group-hover:text-white transition-colors text-slate-600">
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
                  <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
                      When do you want to start?
                    </h2>
                    <p className="text-slate-500 text-sm">
                      This helps us check our installation schedule.
                    </p>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      { id: "As soon as possible", icon: Clock },
                      { id: "1-2 Months", icon: Calendar },
                      { id: "3-6 Months", icon: CalendarDays },
                      { id: "Just browsing / Planning", icon: Search },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleAnswer("timeline", item.id)}
                        className="w-full flex items-center justify-between p-3 sm:p-4 border-2 border-slate-200 rounded-xl hover:border-brand-orange hover:bg-brand-orange/5 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-left group bg-white"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon
                            className="text-slate-400 group-hover:text-brand-orange transition-colors"
                            size={18}
                          />
                          <span className="text-sm sm:text-base font-bold text-slate-800">
                            {item.id}
                          </span>
                        </div>
                        <ChevronRight
                          className="text-slate-300 group-hover:text-brand-orange transition-colors"
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
                  <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
                      Where is your project located?
                    </h2>
                    <p className="text-slate-500 text-sm">
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
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
                      Final Step!
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Enter your details to see if you qualify for our current
                      promotions.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      required
                      type="text"
                      value={answers.name}
                      onChange={(e) =>
                        setAnswers({ ...answers, name: e.target.value })
                      }
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all"
                      placeholder="Full Name"
                    />
                    <input
                      required
                      type="tel"
                      value={answers.phone}
                      onChange={(e) =>
                        setAnswers({ ...answers, phone: e.target.value })
                      }
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all"
                      placeholder="Phone Number"
                    />
                    <input
                      required
                      type="email"
                      value={answers.email}
                      onChange={(e) =>
                        setAnswers({ ...answers, email: e.target.value })
                      }
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-brand-orange focus:bg-white outline-none transition-all"
                      placeholder="Email Address"
                    />

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full bg-brand-orange text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-brand-orange/30 hover:bg-orange-600 hover:shadow-brand-orange/50 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <Loader2 className="animate-spin" size={24} />{" "}
                          Processing...
                        </>
                      ) : (
                        <>
                          See If I Qualify <Sparkles size={20} />
                        </>
                      )}
                    </button>

                    {formStatus === "error" && (
                      <p className="text-red-500 text-xs text-center mt-2">
                        Error submitting. Please try again.
                      </p>
                    )}

                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-4">
                      <Lock size={12} />
                      <span>
                        Your information is 100% secure and encrypted.
                      </span>
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
                  <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 mb-2">
                    You are Qualified!
                  </h2>
                  <p className="text-slate-600 text-sm mb-6">
                    Your project in{" "}
                    <strong>{cityInfo?.name || answers.zipCode}</strong> is
                    eligible for our factory-direct pricing.
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-sm text-slate-700">
                    Expect a call at <strong>{answers.phone}</strong> shortly to
                    provide your free estimate.
                  </div>
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-md"
                  >
                    Return to Homepage
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust Badges Below Quiz */}
        {step < 6 && (
          <div className="mt-6 sm:mt-8 w-full max-w-xl mx-auto relative z-20">
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
