"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Training",
    href: "#",
    children: [
      { name: "Online Courses", href: "/courses" },
      { name: "Offline Training", href: "/training" },
    ],
  },
  { name: "IT Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-dark text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-10">
          <div className="flex items-center gap-6">
            <a
              href="tel:+8801700000000"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+880 1700-000000</span>
            </a>
            <a
              href="mailto:info@resda.org"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>info@resda.org</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary-200">
              Skill Empowerment for the Nation&apos;s...
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-primary/5"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo-symbol.png"
                  alt="RESDA Emblem"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="text-2xl font-black text-primary tracking-tight">
                  RESDA
                </span>
                <p className="text-[10px] text-body -mt-1 hidden sm:block font-medium">
                  Skill Empowerment for the Nation&apos;s
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(link.name)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <button className="flex items-center gap-1 px-4 py-2 text-heading hover:text-primary font-medium transition-colors rounded-lg hover:bg-primary-50">
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          dropdownOpen === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {dropdownOpen === link.name && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl shadow-primary/10 border border-border py-2 animate-in fade-in slide-in-from-top-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2.5 text-heading hover:text-primary hover:bg-primary-50 transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2 text-heading hover:text-primary font-medium transition-colors rounded-lg hover:bg-primary-50"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors rounded-lg hover:bg-primary-50"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 text-sm"
              >
                Portal
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-heading hover:text-primary rounded-lg hover:bg-primary-50 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-border bg-white animate-in slide-in-from-top-2">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.name}>
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === link.name ? null : link.name
                        )
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-heading hover:text-primary font-medium transition-colors rounded-lg hover:bg-primary-50"
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          dropdownOpen === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {dropdownOpen === link.name && (
                      <div className="ml-4 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2.5 text-body hover:text-primary hover:bg-primary-50 transition-colors rounded-lg"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-heading hover:text-primary font-medium transition-colors rounded-lg hover:bg-primary-50"
                  >
                    {link.name}
                  </Link>
                )
              )}
              <div className="pt-3 border-t border-border grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2.5 bg-slate-100 text-heading font-semibold rounded-lg hover:bg-slate-200 transition-colors text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors text-sm"
                >
                  Student Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
