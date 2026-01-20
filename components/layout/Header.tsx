"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "홈" },
    { href: "/generate", label: "번호 생성" },
    { href: "/premium", label: "프리미엄" },
    { href: "/about", label: "소개" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-md border-b border-accent-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-gold to-lucky-red flex items-center justify-center shadow-gold group-hover:shadow-gold-lg transition-shadow">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-neutral-cream">
              EIKO<span className="text-accent-gold">.KR</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-cream/80 hover:text-accent-gold transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/generate" className="btn-primary text-sm">
              무료로 시작하기
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-cream/80 hover:text-accent-gold transition-colors"
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-accent-gold/20">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-neutral-cream/80 hover:text-accent-gold transition-colors duration-200 font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/generate"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary text-center mt-2"
              >
                무료로 시작하기
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
