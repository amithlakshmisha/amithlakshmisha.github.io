"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ContactMe from './contactMe';
import ThemeToggle from './toggleTheme';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-card/80 backdrop-blur-lg border-b border-border shadow-card' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="animate-slide-in-left">
              <ContactMe />
            </div>
            <div className="flex items-center space-x-8 animate-slide-in-right">
              <ul className="hidden md:flex space-x-8 text-lg font-medium">
                <li>
                  <Link 
                    href="#about" 
                    className="text-muted hover:text-primary transition-colors duration-200 hover:scale-105 transform"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#work" 
                    className="text-muted hover:text-primary transition-colors duration-200 hover:scale-105 transform"
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <a 
                    href="/AmithLakshmishaDetailedResumeNY.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-primary text-white px-4 py-2 rounded-xl font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105 transform"
                  >
                    Resume
                  </a>
                </li>
              </ul>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-muted text-sm">
              &copy; {new Date().getFullYear()} Amith Lakshmisha. All rights reserved.
            </p>
            <p className="text-muted text-xs mt-2">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
