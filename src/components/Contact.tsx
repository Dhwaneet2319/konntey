"use client";

import { motion } from "framer-motion";
import { Copy, MapPin, Clock, Info } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

const contactColumns = [
  {
    title: "CONTACT US",
    icon: <Copy size={18} className="text-gold" />,
    text: "Melbourne, VIC\n0493 191 798\ninfo@konnteyhomerenovations.com.au",
  },
  {
    title: "SERVICES",
    icon: <MapPin size={18} className="text-gold" />,
    text: "Kitchen & Bathroom\nExtensions\nDecks & Outdoor\nPainting & Finishing\n& Many More",
  },
  {
    title: "COMPANY",
    icon: <Info size={18} className="text-gold" />,
    text: "About Us\nCareers\nGet a Quote",
  },
  {
    title: "WORKING HOURS",
    icon: <Clock size={18} className="text-gold" />,
    text: "Mon–Fri 7:00am–5:00pm\nSat by appointment",
  },
];

function ContactForm() {
  const [state, handleSubmit] = useForm("xkopaqvd");

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center border-2 border-gold-bright">
          <svg className="h-8 w-8 text-gold-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="mt-6 font-display text-[24px] font-black uppercase tracking-button text-white">
          Request Received
        </h4>
        <p className="mt-3 max-w-sm font-body text-[16px] leading-[1.7] text-white/70">
          Thanks for reaching out. We&apos;ll review your details and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="font-body text-[12px] font-semibold uppercase tracking-kicker text-white/50">Full Name</label>
          <input type="text" id="name" name="name" required className="w-full border-b border-white/20 bg-transparent py-3 font-body text-white transition-colors focus:border-gold-bright focus:outline-none" placeholder="John Doe" />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="font-body text-[12px] text-red-400" />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="font-body text-[12px] font-semibold uppercase tracking-kicker text-white/50">Phone Number</label>
          <input type="tel" id="phone" name="phone" required className="w-full border-b border-white/20 bg-transparent py-3 font-body text-white transition-colors focus:border-gold-bright focus:outline-none" placeholder="0493 191 798" />
          <ValidationError prefix="Phone" field="phone" errors={state.errors} className="font-body text-[12px] text-red-400" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="font-body text-[12px] font-semibold uppercase tracking-kicker text-white/50">Email Address</label>
        <input type="email" id="email" name="email" required className="w-full border-b border-white/20 bg-transparent py-3 font-body text-white transition-colors focus:border-gold-bright focus:outline-none" placeholder="john@example.com" />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="font-body text-[12px] text-red-400" />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="font-body text-[12px] font-semibold uppercase tracking-kicker text-white/50">Project Details</label>
        <textarea id="message" name="message" rows={3} required className="w-full border-b border-white/20 bg-transparent py-3 font-body text-white transition-colors focus:border-gold-bright focus:outline-none resize-none" placeholder="Tell us about your renovation..."></textarea>
        <ValidationError prefix="Message" field="message" errors={state.errors} className="font-body text-[12px] text-red-400" />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="group relative inline-flex w-full overflow-hidden bg-gold-bright px-10 py-5 font-display text-[16px] font-black uppercase tracking-button text-navy disabled:opacity-60 sm:w-auto"
      >
        <span className="relative z-10 transition-transform duration-300 block group-hover:-translate-y-[150%]">
          {state.submitting ? "Sending..." : "Submit Initial Request"}
        </span>
        <span className="absolute inset-x-0 top-[150%] z-10 flex h-full items-center justify-center transition-transform duration-300 group-hover:-translate-y-[150%]">
          Send to Konntey →
        </span>
      </button>
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative bg-navy overflow-hidden">
      <div className="grain-overlay" />
      
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-8 lg:py-32">
        {/* Giant wordmark mask reveal */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(5rem,21vw,18rem)] font-black uppercase leading-[0.8] tracking-[-4px] lg:tracking-[-10px] text-gold-bright mix-blend-screen"
          >
            KONNTEY
          </motion.h2>
        </div>

        {/* Info grid */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {contactColumns.map((col, index) => (
            <motion.div
              key={col.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group border border-white/5 bg-navy-light/90 p-8 transition-colors duration-500 hover:bg-navy-light"
            >
              <div className="flex items-center justify-between">
                <div className="font-display text-[16px] font-black uppercase tracking-button text-gold-bright">
                  {col.title}
                </div>
                <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {col.icon}
                </div>
              </div>
              <div className="mt-6 font-body text-[15px] leading-loose text-white/70 whitespace-pre-line">
                {col.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inline Contact Form */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid gap-12 lg:grid-cols-2 border border-white/10 bg-navy-light p-8 sm:p-12 lg:p-16"
        >
          <div className="max-w-xl space-y-4">
            <h3 className="font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase tracking-tightest text-white">
              REQUEST A <span className="text-gold-bright">QUOTATION</span>
            </h3>
            <p className="font-body text-[16px] leading-[1.8] text-white/70">
              Fill out the form with your project details. We will review your requirements and get back to you within 24 hours to arrange an on-site consultation.
            </p>
          </div>
          
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
