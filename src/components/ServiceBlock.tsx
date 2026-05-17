"use client";

import { m } from "framer-motion";
import Image from "next/image";
import CircleArrow from "@/components/CircleArrow";

interface ServiceBlockProps {
  kicker: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  dark: boolean;
  imageLeft: boolean;
  index: number;
  sectionId?: string;
  children?: React.ReactNode;
}

export default function ServiceBlock({
  kicker,
  title,
  body,
  image,
  imageAlt,
  dark,
  imageLeft,
  index,
  sectionId,
  children,
}: ServiceBlockProps) {
  return (
    <section
      id={sectionId}
      className={`relative overflow-hidden ${
        dark ? "bg-off-white text-navy pt-20 pb-10" : "bg-white text-navy pt-20"
      }`}
    >
      <div className="absolute left-4 top-6 sm:left-8 sm:top-10 lg:left-10 opacity-[0.04] pointer-events-none z-0 font-display text-[clamp(4rem,13vw,16rem)] font-black text-current leading-none select-none">
        0{index + 1}
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          <div
            className={`lg:col-span-7 ${
              imageLeft ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="parent-group relative w-full"
            >
              <div className="bracket-corners bracket-corners-extra relative overflow-hidden border border-navy/10 p-1">
                <div className="relative h-[380px] w-full overflow-hidden sm:h-[500px] lg:h-[700px] contain-paint">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div
                  className={`corner-cut ${
                    dark ? "corner-cut-offwhite-tl" : "corner-cut-white-tl"
                  }`}
                />
                <div
                  className={`corner-cut ${
                    dark ? "corner-cut-offwhite-br" : "corner-cut-white-br"
                  }`}
                />
              </div>
            </m.div>
          </div>

          <div
            className={`lg:col-span-5 ${
              imageLeft ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12"
            }`}
          >
            <m.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="font-body text-[12px] font-semibold uppercase tracking-kicker text-gold-bright">
                {kicker}
              </div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-display tracking-tightest text-navy">
                {title.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={`inline-block mr-3 lg:mr-5 ${
                      i === 0 && dark ? "text-gold-bright" : ""
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </h2>
              <m.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-[2px] w-24 origin-left bg-navy/20"
              />
            </m.div>

            <m.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="mt-10 lg:mt-16"
            >
              <p className="max-w-xl font-body text-[16px] xl:text-[18px] leading-[1.8] text-navy/70">
                {body}
              </p>

              {children}
              
              <div className="mt-10">
                <a
                  href="/#contact"
                  className="group inline-flex items-center gap-4 font-display text-[15px] font-black uppercase tracking-button text-navy transition-colors duration-300 hover:text-gold"
                >
                  <span>Discuss Your Project</span>
                  <CircleArrow className="transition-transform duration-300 group-hover:translate-x-2" />
                </a>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
