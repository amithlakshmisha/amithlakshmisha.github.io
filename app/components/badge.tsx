import React from 'react';

type BadgeProps = {
  text: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'muted';
  size?: 'sm' | 'md' | 'lg';
  /** kit color as "r, g, b" — overrides the variant palette */
  kit?: string;
};

/** Kit chip — small squared tag like a shirt sponsor patch. */
const Badge: React.FC<BadgeProps> = ({ text, variant = 'primary', size = 'md', kit }) => {
  const baseClasses = "inline-flex items-center font-display font-bold uppercase tracking-wider rounded-md border transition-colors duration-200";

  const variantClasses = {
    primary: "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/30 hover:bg-secondary/20",
    accent: "bg-accent/10 text-accent border-accent/30 hover:bg-accent/20",
    muted: "bg-muted/10 text-muted border-muted/30 hover:bg-muted/20"
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-sm"
  };

  const kitStyle: React.CSSProperties | undefined = kit
    ? {
        color: `rgb(${kit})`,
        background: `rgba(${kit}, 0.10)`,
        borderColor: `rgba(${kit}, 0.35)`,
      }
    : undefined;

  return (
    <span
      className={`${baseClasses} ${kit ? '' : variantClasses[variant]} ${sizeClasses[size]}`}
      style={kitStyle}
    >
      {text}
    </span>
  );
};

export default Badge;
