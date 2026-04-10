"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function MaskTitle({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] overflow-hidden bg-navy pt-[120px]"
    >
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-16">
          {/* Text Content */}
          <div className="flex flex-col justify-center lg:col-span-5 xl:col-span-6">
            <h1 className="flex flex-col gap-1 font-display text-[clamp(4.2rem,11vw,8rem)] xl:text-[9.5rem] font-black uppercase leading-[0.82] tracking-tighter text-white">
              <MaskTitle delay={0}>IT&apos;S YOUR</MaskTitle>
              <MaskTitle delay={0.1}>
                <span className="relative inline-block text-gold-bright">
                  HOME.
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                    className="absolute -bottom-2 left-0 h-[6px] w-full origin-left bg-gold-bright"
                  />
                </span>
              </MaskTitle>
              <MaskTitle delay={0.2}>WE BUILD</MaskTitle>
              <MaskTitle delay={0.3}>IT RIGHT.</MaskTitle>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 max-w-md font-body text-[16px] leading-[1.7] text-white/90"
            >
              Licensed renovation builders in Melbourne delivering affordable kitchen renovations, 
              bathroom renos, home extensions & deck building. Quality craftsmanship servicing 
              Tarneit, Truganina, Werribee & all western Melbourne suburbs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-10"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative inline-flex overflow-hidden bg-gold-bright px-8 py-5 font-display text-[16px] font-black uppercase tracking-button text-navy"
              >
                <span className="relative z-10 transition-transform duration-300 block group-hover:-translate-y-12">
                  Get a Free Quote
                </span>
                <span className="absolute inset-x-0 top-12 z-10 flex h-full items-center justify-center transition-transform duration-300 group-hover:-translate-y-12">
                  Ready? →
                </span>
              </a>
            </motion.div>
          </div>

          {/* Hero Image Block */}
          <div className="relative mt-8 lg:col-span-7 xl:col-span-6 lg:mt-0 xl:mt-12">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[65vh] min-h-[450px] w-full overflow-hidden border border-white/5 parent-group"
            >
              <Image
                src="/images/hero_main.png"
                alt="Premium home renovation by Konntey — licensed builders Melbourne"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                priority
              />

              {/* Corner cuts */}
              <div className="corner-cut corner-cut-tl" />
              <div className="corner-cut corner-cut-br" />

              {/* Chevrons */}
              <div className="chevron-decoration chevron-tl">»</div>
              <div className="chevron-decoration chevron-br">»</div>

              {/* Badge overlay */}
              <div className="absolute bottom-6 right-6 z-10 border border-gold-bright/30 bg-navy/80 px-5 py-3 backdrop-blur-md">
                <span className="font-display text-[14px] font-black uppercase tracking-button text-gold-bright">
                  Melbourne&apos;s Own
                </span>
              </div>
            </motion.div>


          </div>
        </div>
      </div>
    </section>
  );
}
