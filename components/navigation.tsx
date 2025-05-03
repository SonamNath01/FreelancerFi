'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'DAO', href: '/dao' },
    { label: 'Escrow', href: '/escrow' },
  ];

  return (
    <header className="fixed top-6 left-6 right-6 z-50 mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-lg font-bold">FreelancerFi</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="text-sm font-medium text-zinc-400 hover:text-white relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isAuth ? (
            <ConnectButton showBalance={false} />
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
              >
                <Link href="/login">Log In</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/50 text-white hover:from-purple-500/30 hover:to-blue-500/30"
              >
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/50 backdrop-blur-lg border-t border-white/10 rounded-b-2xl">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="text-sm font-medium text-zinc-400 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-zinc-800">
              {isAuth ? (
                <ConnectButton showBalance={false} />
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 mb-2"
                  >
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/50 text-white hover:from-purple-500/30 hover:to-blue-500/30"
                  >
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
