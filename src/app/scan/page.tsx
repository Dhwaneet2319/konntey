import React from "react";
import {
  Hammer,
  Grid,
  DoorOpen,
  Lightbulb,
  Fence,
  Sofa,
  Wrench,
  Home,
  Utensils,
  TreePine,
  Leaf,
  Ruler,
  Paintbrush,
  Brush,
  Droplet,
  Key,
  PhoneCall,
  Mail,
} from "lucide-react";

export const metadata = {
  title: "Scan | Konntey Home & Renovations",
  description:
    "Quality you can see. Service you can trust. Melbourne handyman and renovation services.",
};

export default function ScanPage() {
  const services = [
    { name: "Carpentry Work", icon: Hammer },
    { name: "Cabinet Installation & Repairs", icon: Grid },
    { name: "Door & Lock Repairs", icon: DoorOpen },
    { name: "Electrical (Basic – lights, switches)", icon: Lightbulb },
    { name: "Fencing Work", icon: Fence },
    { name: "Furniture Assembly", icon: Sofa },
    { name: "General Repairs", icon: Wrench },
    { name: "Home Maintenance", icon: Home },
    { name: "Kitchen Repairs & Upgrades", icon: Utensils },
    { name: "Landscaping Work", icon: TreePine },
    { name: "Mulching Work", icon: Leaf },
    { name: "Odd Jobs & Small Renovations", icon: Ruler },
    { name: "Painting & Touch-ups", icon: Paintbrush },
    { name: "Plastering & Patching", icon: Brush },
    { name: "Plumbing (Basic – leaks, fittings)", icon: Droplet },
    { name: "End of Lease Repairs", icon: Key },
  ];

  return (
    <div className="min-h-screen bg-navy text-white font-body selection:bg-gold-bright selection:text-navy pb-8">
      <div className="max-w-md mx-auto px-4 pt-12 pb-6 flex flex-col gap-8 animate-in fade-in duration-700">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
            Konntey Home & <span className="text-gold">Renovations</span>
          </h1>
          <p className="text-lg text-off-white/90">
            Quality you can see. Service you can trust.
          </p>
          <p className="text-sm text-gold uppercase tracking-widest font-semibold">
            Serving Melbourne & surrounds
          </p>
        </div>

        {/* Services Grid */}
        <div className="bg-navy-light/50 border border-white/5 rounded-2xl p-6 shadow-xl glass">
          <h2 className="text-xl font-display font-bold mb-6 text-center tracking-wide text-white border-b border-white/10 pb-4">
            Our Services
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-3 rounded-xl bg-navy/50 border border-white/5 hover:border-gold/30 transition-colors"
                >
                  <Icon className="w-7 h-7 text-gold mb-2" strokeWidth={1.5} />
                  <span className="text-xs font-medium text-off-white/90 leading-tight">
                    {service.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col gap-4 mt-2">
          <a
            href="tel:0493191798"
            className="w-full py-4 px-6 bg-gold hover:bg-gold-bright text-navy font-bold text-center rounded-xl transition-colors shadow-lg text-lg flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-5 h-5" />
            Get a Free Quote
          </a>
          <a
            href="mailto:info@konnteyhomerenovations.com.au"
            className="w-full py-4 px-6 bg-navy-light border border-white/10 hover:border-white/20 text-white font-bold text-center rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Send us a Message
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-xs text-white/40 font-body">
            © 2025 Konntey Home & Renovations
          </p>
        </footer>
      </div>
    </div>
  );
}
