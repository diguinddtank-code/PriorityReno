import React, { useEffect, useRef, useState } from 'react';

export interface RevealProps {
  children?: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  duration?: number;
  variant?: "up" | "down" | "left" | "right" | "scale" | "fade";
  threshold?: number;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  className = "", 
  delay = 0,
  duration = 800,
  variant = "up",
  threshold = 0.2
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = () => {
    if (!isVisible) {
      switch (variant) {
        case 'up': return 'translateY(40px)';
        case 'down': return 'translateY(-40px)';
        case 'left': return 'translateX(-40px)';
        case 'right': return 'translateX(40px)';
        case 'scale': return 'scale(0.95)';
        case 'fade': return 'translate(0,0)';
        default: return 'translateY(40px)';
      }
    }
    return variant === 'scale' ? 'scale(1)' : 'translate(0,0)';
  };

  return (
    <div
      ref={ref}
      className={`${className}`}
      style={{
        width,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};