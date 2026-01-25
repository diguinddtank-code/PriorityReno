import React, { useEffect, useRef, useState } from 'react';

export interface RevealProps {
  children?: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  duration?: number;
  variant?: "up" | "left" | "right" | "down" | "scale" | "static"; 
  threshold?: number;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  className = "", 
  delay = 0,
  duration = 1000, 
  variant = "up",
  threshold = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Accessibility check
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
        rootMargin: "0px 0px -10% 0px"
      } 
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  // --- Safe 3D Transforms ---
  // Reduced offsets (20px-40px) to preventing overflow on mobile
  const getTransform = () => {
    if (!shouldAnimate) return 'none';
    if (isVisible) return 'perspective(1200px) translate3d(0, 0, 0) scale(1) rotateX(0)';

    switch (variant) {
      case 'up': 
        return 'perspective(1200px) translate3d(0, 40px, 0) scale(0.98) rotateX(5deg)';
      case 'down': 
        return 'perspective(1200px) translate3d(0, -40px, 0) scale(0.98)';
      case 'left': 
        // Very subtle side motion to avoid X-overflow
        return 'perspective(1200px) translate3d(-20px, 0, 0) scale(0.98)';
      case 'right': 
        // Very subtle side motion to avoid X-overflow
        return 'perspective(1200px) translate3d(20px, 0, 0) scale(0.98)';
      case 'scale':
        return 'perspective(1200px) scale(0.9)';
      case 'static':
        return 'perspective(1200px) translate3d(0, 20px, 0)';
      default: 
        return 'perspective(1200px) translate3d(0, 40px, 0) scale(0.98)';
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
        transition: shouldAnimate 
          ? `opacity ${duration}ms cubic-bezier(0.19, 1, 0.22, 1) ${delay}ms, 
             transform ${duration}ms cubic-bezier(0.19, 1, 0.22, 1) ${delay}ms`
          : 'none',
        willChange: 'opacity, transform',
        transformStyle: 'preserve-3d', 
        backfaceVisibility: 'hidden' 
      }}
    >
      {children}
    </div>
  );
};