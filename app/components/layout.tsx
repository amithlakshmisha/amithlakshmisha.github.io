import Head from '@/node_modules/next/head';
import Link from '@/node_modules/next/link';
import React from 'react';
import ContactMe from './contactMe';
import ThemeToggle from './toggleTheme';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div>
    <Head>
      <title>Amith Lakshmisha - Portfolio</title>
      <meta name="description" content="Amith Lakshmisha's professional portfolio" />
    </Head>
    <header className="p-4 fixed w-full z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <ContactMe/>
        <ul className="flex space-x-4 text-xl">
          <li><Link href="#about">About</Link></li>
          <li><Link href="#work">Work</Link></li>
          {/* <li><Link href="#projects">Projects</Link></li> */}
          <a href="/AmithLakshmishaDetailedResumeNY.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
          <ThemeToggle/>
        </ul>
      </nav>
    </header>
    <main className="container mx-auto p-4 pt-16">
      {children}
    </main>
    <footer className="p-4 text-center">
      <p>&copy; {new Date().getFullYear()} Anvitha Lakshmisha. All rights reserved.</p>
    </footer>
  </div>
);

export default Layout;
