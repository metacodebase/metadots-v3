"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlignJustify, X } from "lucide-react";
import { Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();

  // Handle hash changes for client-side navigation
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    // Set initial hash
    setCurrentHash(window.location.hash);

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigationLinks = [
    { href: "/#services", label: "Services" },
    { href: "/#portfolio", label: "Portfolio" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blogs" },
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/contact-us", label: "Contact" },
  ];

  const isActiveLink = (href: string) => {
    // Handle hash links (for home page sections)
    if (href.startsWith("/#")) {
      const hash = href.substring(1); // Remove the leading slash to get just the hash
      return pathname === "/" && currentHash === hash;
    }
    // Handle regular page links
    return pathname === href;
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLinkClick = () => {
    setDrawerOpen(false);
  };

  const handleMenuClick = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/100">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/images/metadots-logo.svg"
                alt="Metadots"
                width={140}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActiveLink(link.href)
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button
              className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700"
              asChild>
              <Link href="/contact-us">Get a Quote</Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[#000] hover:bg-transparent hover:text-black "
              onClick={handleMenuClick}
              aria-label="Open navigation menu">
              <AlignJustify className="h-5 w-5 focus:text-black" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center">
            <Image
              src="/images/metadots-logo.svg"
              alt="Metadots"
              width={120}
              height={28}
              className="h-7 w-auto"
            />
          </div>
        }
        extra={
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDrawerClose}
            className="hover:bg-transparent hover:text-black p-1"
            aria-label="Close navigation menu">
            <X className="h-5 w-5" />
          </Button>
        }
        placement="right"
        onClose={handleDrawerClose}
        open={drawerOpen}
        width={300}
        closable={false}
        styles={{
          body: { padding: 0 },
          header: {
            borderBottom: "1px solid #e5e7eb",
            padding: "16px 24px",
          },
        }}>
        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-4">
            <div className="space-y-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActiveLink(link.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile CTA Button */}
          <div className="px-6 py-4 border-t border-gray-200">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              asChild
              onClick={handleLinkClick}>
              <Link href="/contact-us">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
