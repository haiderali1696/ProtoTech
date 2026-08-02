import React from 'react';
import { useTheme } from './ThemeProvider';

interface LogoProps {
  className?: string;
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = 'w-16 h-16 object-contain', alt = 'ProtoTech Logo' }) => {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/DarkLogo.png' : '/Lightlogo.jpeg';

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={`${className} rounded-xl`}
    />
  );
};
