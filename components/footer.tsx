import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Linkedin,
  Twitter,
  Github,
  Dribbble,
  MapPin,
  Phone,
  Mail,
  Activity,
  X,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <Image
                  src="/images/metadots-logo.svg"
                  alt="Metadots"
                  width={160}
                  height={40}
                  className="h-10 w-auto brightness-0 invert"
                />
                <p className="text-slate-300 max-w-md leading-relaxed">
                  Transforming businesses through innovative technology
                  solutions. We don't just build software—we architect the
                  future of digital experiences.
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Connect With Us</h4>
                <div className="flex space-x-4">
                  {[
                    {
                      name: "LinkedIn",
                      icon: Linkedin,
                      color: "hover:bg-blue-600",
                      link: "https://www.linkedin.com/company/metadots",
                    },
                    {
                      name: "X",
                      icon: X,
                      color: "hover:bg-slate-900",
                      link: "https://x.com/Metadotsco",
                    },
                    // {
                    //   name: "Clutch",
                    //   icon: Github,
                    //   color: "hover:bg-slate-600",
                    //   link: "https://www.clutch.co/profile/metadots",
                    // },
                    {
                      name: "Instagram",
                      icon: Instagram,
                      color: "hover:bg-pink-500",
                      link: "https://www.instagram.com/metadots.co",
                    },
                  ].map((social, index) => (
                    <div
                      key={social.name}
                      className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center ${social.color} transition-all duration-300 cursor-pointer transform hover:scale-110 shadow-lg hover:shadow-xl`}>
                      <a href={social.link} target="_blank" rel="noopener noreferrer">
                        <social.icon className="w-5 h-5" aria-hidden="true" />
                      </a>
                      <span className="sr-only">{social.name}</span>
                    </div>
                  ))}
                  <div 
                      className={`w-12 h-12 rounded-xl hover:bg-slate-600 flex items-center justify-center  transition-all duration-300 cursor-pointer transform hover:scale-110 shadow-lg hover:shadow-xl`}>
                      <a href={"https://www.clutch.co/profile/metadots"} target="_blank" rel="noopener noreferrer">
                       <Image
                          src="/images/clutch.png"
                          alt="Clutch"
                          width={140}
                          height={32}
                          className="h-8 w-8"
                          priority
                        />
                      </a>
                      <span className="sr-only"></span>
                    </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Stay Updated</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="Enter your email"
                    className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-blue-500 h-11"
                  />
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 h-11">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-white">Services</h3>
              <ul className="space-y-3">
                {[
                  "Web Development",
                  "Mobile Apps",
                  "AI Solutions",
                  "Cloud Services",
                  "Digital Strategy",
                  "Consulting",
                ].map((service, index) => (
                  <li key={service}>
                    <Link
                      href="#"
                      className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group">
                      <ArrowRight
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-hidden="true"
                      />
                      <span>{service}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-white">Company</h3>
              <ul className="space-y-3">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Portfolio", href: "/projects" },
                  { name: "Blog", href: "/blogs" },
                  { name: "Careers", href: "/careers" },
                  { name: "Contact", href: "#contact" },
                  { name: "Privacy Policy", href: "#" },
                ].map((item, index) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group">
                      <ArrowRight
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-hidden="true"
                      />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Contact Info */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-3 text-slate-400">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm">
                    17 J3 Johar Town, Lahore 54000, Punjab - Pakistan
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm">+44 7400 926311</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm">+1 (585) 928-3494</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm">sales@metadots.co</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} Metadots. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-slate-500">
                <div className="flex items-center space-x-1">
                  <Activity
                    className="w-3 h-3 text-green-400 animate-pulse"
                    aria-hidden="true"
                  />
                  <span className="text-xs">All systems operational</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <Link
                href="#"
                className="text-slate-400 hover:text-white text-xs md:text-sm transition-colors">
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-white text-xs md:text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-white text-xs md:text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
