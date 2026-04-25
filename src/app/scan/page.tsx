"use client";

import NavBar from "@/components/NavBar";

import { m } from "framer-motion";
import Link from "next/link";
import { 
  Hammer, 
  Wrench, 
  Key, 
  Zap, 
  BoxSelect, // for fencing/grid
  Armchair, // for furniture
  Settings, 
  Home, 
  Utensils, 
  Sprout, 
  Leaf, 
  PenTool, 
  Paintbrush, 
  PaintBucket, // for plastering
  Droplet, 
  ClipboardCheck
} from "lucide-react";

const services = [
  { name: "Carpentry Work", icon: <Hammer className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "Cabinet Installation & Repairs", icon: <Wrench className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "Door & Lock Repairs", icon: <Key className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "Electrical (Basic – lights, switches)", icon: <Zap className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "Fencing Work", icon: <BoxSelect className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "Furniture Assembly", icon: <Armchair className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "General Repairs", icon: <Settings className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "Home Maintenance", icon: <Home className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "Kitchen Repairs & Upgrades", icon: <Utensils className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "Landscaping Work", icon: <Sprout className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "Mulching Work", icon: <Leaf className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "Odd Jobs & Small Renovations", icon: <PenTool className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "Painting & Touch-ups", icon: <Paintbrush className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "Plastering & Patching", icon: <PaintBucket className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "Plumbing (Basic – leaks, fittings)", icon: <Droplet className="text-gold-bright" size={24} strokeWidth={2} /> },
  { name: "End of Lease Repairs", icon: <ClipboardCheck className="text-gold-bright" size={24} strokeWidth={2} /> },
];

export default function ScanLandingPage() {
  return (
    <div className="bg-navy text-white font-body min-h-screen flex flex-col hide-scrollbar">
      {/* We use the exact NavBar component from the rest of the site */}
      <NavBar theme="dark" />

      {/* Main content wrapped in a mobile-first, centered container */}
      <main className="flex-grow flex flex-col items-center w-full max-w-2xl mx-auto px-6 pt-[120px] pb-20 relative">
        <div className="grain-overlay" />
        
        {/* Hero Section */}
        <section className="w-full text-center mb-16 relative z-10">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-display text-[32px] sm:text-[40px] font-black uppercase tracking-tightest leading-none text-white">
              KONNTEY
            </div>
            <div className="font-display text-[12px] sm:text-[14px] font-bold tracking-[2px] uppercase text-gold-bright mt-2 mb-6">
              Homes &amp; Renovations
            </div>
            
            <h1 className="font-display text-[24px] sm:text-[32px] font-black uppercase leading-[1.1] mb-4">
              Quality you can see. <br/>
              <span className="text-gold-bright">Service you can trust.</span>
            </h1>
            <p className="font-body text-[15px] text-white/70 uppercase tracking-kicker">
              Serving Melbourne &amp; surrounds
            </p>
          </m.div>
        </section>

        {/* Services Grid */}
        <section className="w-full mb-16 relative z-10">
          <m.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-3 hover:bg-white/10 transition-colors"
              >
                <div className="bg-navy/50 p-3 rounded-full border border-gold-bright/30">
                  {service.icon}
                </div>
                <span className="font-body text-[13px] sm:text-[14px] font-medium leading-tight text-white/90">
                  {service.name}
                </span>
              </div>
            ))}
          </m.div>
        </section>

        {/* CTA Section */}
        <section className="w-full flex flex-col gap-4 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <a 
              href="tel:0493191798" 
              className="w-full bg-gold-bright text-navy py-4 font-display text-[16px] font-black uppercase tracking-button text-center rounded-lg hover:bg-white transition-colors shadow-lg shadow-gold-bright/20"
            >
              Get a Free Quote
            </a>
            <Link 
              prefetch={true}
              href="/#contact" 
              className="w-full border-2 border-white/20 bg-transparent text-white py-4 font-display text-[16px] font-black uppercase tracking-button text-center rounded-lg hover:border-gold-bright hover:text-gold-bright transition-colors"
            >
              Send us a Message
            </Link>
          </m.div>
        </section>
      </main>

      {/* Footer Strip */}
      <footer className="w-full bg-navy border-t border-white/10 py-6 text-center relative z-10">
        <p className="font-body text-[12px] uppercase tracking-kicker text-white/50">
          © {new Date().getFullYear()} Konntey Home &amp; Renovations
        </p>
      </footer>
    </div>
  );
}
