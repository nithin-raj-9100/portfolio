import React, { useState, useRef, useEffect } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function SpotlightCard({ children, className = "", ...props }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      {/* Spotlight overlay effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, var(--color-spotlight-glow, rgba(0, 107, 255, 0.08)), transparent 80%)`
            : "transparent",
          opacity: isHovered ? 1 : 0,
          zIndex: 1,
        }}
      />
      {/* Subtle border highlight effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 border-2 border-transparent"
        style={{
          background: isHovered
            ? `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, var(--color-spotlight-border, rgba(0, 107, 255, 0.4)), transparent 80%)`
            : "transparent",
          WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: isHovered ? 1 : 0,
          zIndex: 2,
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
