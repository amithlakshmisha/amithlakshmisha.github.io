import React from 'react';

type BadgeProps = {
  text: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'muted';
  size?: 'sm' | 'md' | 'lg';
};

const Badge: React.FC<BadgeProps> = ({ text, variant = 'primary', size = 'md' }) => {
  const baseClasses = "inline-flex items-center font-semibold rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md";
  
  const variantClasses = {
    primary: "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
    secondary: "bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20",
    accent: "bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20",
    muted: "bg-muted/10 text-muted border border-muted/20 hover:bg-muted/20"
  };
  
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} mr-2 mb-2`}>
      {text}
    </span>
  );
};

export default Badge;
