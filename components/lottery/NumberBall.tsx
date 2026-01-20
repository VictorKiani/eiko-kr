"use client";

import { useEffect, useState } from "react";

interface NumberBallProps {
  number: number;
  variant?: "gold" | "red" | "blue" | "default";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  delay?: number;
}

export default function NumberBall({
  number,
  variant = "default",
  size = "md",
  animated = false,
  delay = 0,
}: NumberBallProps) {
  const [isVisible, setIsVisible] = useState(!animated);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [animated, delay]);

  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-lg",
    lg: "w-16 h-16 text-xl",
  };

  const variantClasses = {
    default: "bg-gradient-to-br from-accent-gold to-accent-gold-dark text-primary",
    gold: "bg-gradient-to-br from-accent-gold to-accent-gold-dark text-primary",
    red: "bg-gradient-to-br from-lucky-red to-lucky-red-dark text-white",
    blue: "bg-gradient-to-br from-tech-blue to-tech-blue-dark text-white",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-full flex items-center justify-center font-bold shadow-lg
        ${animated ? (isVisible ? "animate-number-reveal" : "opacity-0 scale-0") : ""}
        transition-all duration-300 hover:scale-110 hover:shadow-gold-lg
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {number}
    </div>
  );
}
