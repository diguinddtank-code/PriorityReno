import React, { useState, useEffect } from "react";
import { X, ArrowRight, Tag } from "lucide-react";
import { useRouter } from "next/router";

interface AnnouncementBarProps {
  isVisible?: boolean;
  onClose?: () => void;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  isVisible = true,
  onClose,
}) => {
  const router = useRouter();

  const handleQuoteClick = () => {
    router.push("/quote");
  };

  const [mounted, setMounted] = useState(false);
  const [deadline, setDeadline] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    const date = new Date();
    date.setDate(date.getDate() + 2);
    setDeadline(
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    );
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative z-[60] bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white h-auto min-h-[32px] py-1.5 flex items-center justify-center px-8 shadow-lg border-b border-white/10 overflow-hidden">
      {/* Subtle Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-shimmer"></div>

      <div className="relative z-10 flex flex-row items-center justify-center gap-2 text-[10px] md:text-xs font-bold tracking-wide w-full text-center truncate">
        <div className="flex items-center gap-2 justify-center truncate">
          <div className="bg-yellow-400 text-red-700 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest animate-pulse shrink-0">
            Flash Sale
          </div>
          <span className="truncate">
            <span className="font-extrabold text-white mr-1">30% OFF</span>
            Countertops & Cabinets {mounted ? `— Ends ${deadline}` : ""}
          </span>
        </div>

        <button
          onClick={handleQuoteClick}
          className="hidden md:flex items-center gap-1 bg-yellow-400 text-red-700 px-3 py-0.5 rounded-full text-[10px] font-black hover:bg-yellow-300 transition-colors shadow-sm uppercase tracking-wider transform hover:scale-105 duration-200 shrink-0"
        >
          Claim Offer <ArrowRight size={10} />
        </button>
      </div>

      <button
        onClick={onClose}
        className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 hover:bg-black/10 rounded-full transition-colors text-white/90 hover:text-white z-20"
        aria-label="Close announcement"
      >
        <X size={12} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
