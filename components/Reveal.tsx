import React, { useEffect, useRef, useState } from 'react';

export interface RevealProps {
  children?: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  duration?: number;
  variant?: "up" | "left" | "right" | "static"; // Simplified variants for this style
  threshold?: number;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  className = "", 
  delay = 0,
  duration = 1000, // 1s duration for that heavy, premium feel
  variant = "up",
  threshold = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Accessibility check: Disable animation if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setShouldAnimate(false);
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold,
        rootMargin: "0px 0px -10% 0px" // Trigger slightly before element is fully in view
      } 
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  // --- "3D Perspective Glide" Logic ---
  // This mimics physical objects landing in a 3D space.
  const getTransform = () => {
    if (!shouldAnimate) return 'none';
    if (isVisible) return 'perspective(1200px) translate3d(0, 0, 0) scale(1) rotateX(0)';

    // Initial States based on variant
    switch (variant) {
      case 'up': 
        // Starts lower, tilted back 15deg, and scaled down (95%)
        return 'perspective(1200px) translate3d(0, 80px, 0) scale(0.95) rotateX(15deg)';
      case 'left': 
        return 'perspective(1200px) translate3d(-60px, 0, 0) scale(0.95) rotateY(-10deg)';
      case 'right': 
        return 'perspective(1200px) translate3d(60px, 0, 0) scale(0.95) rotateY(10deg)';
      case 'static':
        return 'perspective(1200px) translate3d(0, 40px, 0) scale(0.98)';
      default: 
        return 'perspective(1200px) translate3d(0, 80px, 0) scale(0.95) rotateX(15deg)';
    }
  };

  return (
    <div
      ref={ref}
      className={`${className}`}
      style={{
        width,
        opacity: isVisible || !shouldAnimate ? 1 : 0,
        transform: getTransform(),
        // Ease Out Expo: Starts fast, lands very gently. Feels expensive.
        transition: shouldAnimate 
          ? `opacity ${duration}ms cubic-bezier(0.19, 1, 0.22, 1) ${delay}ms, 
             transform ${duration}ms cubic-bezier(0.19, 1, 0.22, 1) ${delay}ms`
          : 'none',
        willChange: 'opacity, transform',
        transformStyle: 'preserve-3d', // Ensures children render correctly in 3D space
        backfaceVisibility: 'hidden'   // Performance boost
      }}
    >
      {children}
    </div>
  );
};