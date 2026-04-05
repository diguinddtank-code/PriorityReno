"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

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
  threshold = 0.05
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Accessibility check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setShouldAnimate(false);
    }
  }, []);

  const getVariants = () => {
    if (!shouldAnimate) {
      return {
        hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
        visible: { opacity: 1, x: 0, y: 0, scale: 1 }
      };
    }

    switch (variant) {
      case 'up': 
        return {
          hidden: { opacity: 0, y: 40, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1 }
        };
      case 'down': 
        return {
          hidden: { opacity: 0, y: -40, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1 }
        };
      case 'left': 
        return {
          hidden: { opacity: 0, x: -20, scale: 0.98 },
          visible: { opacity: 1, x: 0, scale: 1 }
        };
      case 'right': 
        return {
          hidden: { opacity: 0, x: 20, scale: 0.98 },
          visible: { opacity: 1, x: 0, scale: 1 }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'static':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        };
      default: 
        return {
          hidden: { opacity: 0, y: 40, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1 }
        };
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: "50px" }}
      transition={{ 
        duration: duration / 1000, 
        delay: delay / 1000, 
        ease: [0.19, 1, 0.22, 1] 
      }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};