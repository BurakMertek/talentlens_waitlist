
import React from 'react';

interface LogoProps {
  isScrolled?: boolean;
}

export const Logo = ({ isScrolled = false }: LogoProps) => {
  return (
    <div className="flex items-center">
      <img 
        src="/lovable-uploads/305c70f2-d31b-44d5-89e2-96fd10734f11.png" 
        alt="Logo"
        className={`w-auto object-contain transition-all duration-300 ${
          isScrolled ? 'h-6 lg:h-8' : 'h-8 lg:h-10'
        }`}
      />
    </div>
  );
};
