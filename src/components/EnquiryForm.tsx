"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { business } from "@/content/business";
import {
  isServiceSlug,
  serviceFormLabels,
  serviceSlugs,
  suburbIndex,
  type ServiceSlug,
} from "@/content/taxonomy";
import { pageContext, track } from "@/lib/analytics";
import ThemedSelect, { type SelectOption } from "@/components/ThemedSelect";

/**
 * Formspree form xkopaqvd. NEXT_PUBLIC_ENQUIRY_ENDPOINT overrides it for
 * test builds so development never sends a real lead.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || "https://formspree.io/f/xkopaqvd";

type Method = "any" | "phone" | "whatsapp" | "email";
type Field = "name" | "phone" | "email" | "service" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const methods: { value: Method; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
];

const methodLabel: Record<Method, string> = {
  any: "No preference",
  phone: "Phone call",
  whatsapp: "WhatsApp",
  email: "Email",
};

const timingOptions = [
  "As soon as possible",
  "Within 1–3 months",
  "In 3–6 months",
  "Just researching for now",
];

const fieldOrder: Field[] = ["name", "phone", "email", "service", "message"];

const OTHER_SUBURB = "Other";

const serviceOptions: SelectOption[] = [
  ...serviceSlugs.map((slug) => ({ value: slug, label: serviceFormLabels[slug] })),
  { value: "other", label: "Other / not sure" },
];

const suburbOptions: SelectOption[] = [
  ...suburbIndex.map((s) => ({
    value: s.name,
    label: s.name,
    group: s.region === "West" ? "Melbourne's west" : "Melbourne's southeast",
  })),
  { value: OTHER_SUBURB, label: "Other suburb" },
];

const timingSelectOptions: SelectOption[] = [
  { value: "", label: "Not sure yet" },
  ...timingOptions.map((t) => ({ value: t, label: t })),
];

/** A known suburb keeps its name; anything else becomes "Other" plus text. */
function splitSuburb(raw: string): { choice: string; other: string } {
  const value = raw.trim();
  if (!value) return { choice: "", other: "" };
  const known = suburbIndex.find((s) => s.name.toLowerCase() === value.toLowerCase());
  return known ? { choice: known.name, other: "" } : { choice: OTHER_SUBURB, other: value };
}

function validPhone(raw: string): boolean {
  const digits = raw.replace(/[\s().-]/g, "");
  return /^(?:\+?61|0)[2-478]\d{8}$/.test(digits);
}

function validEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw);
}

function validate(data: FormData): Errors {
  const get = (k: string) => String(data.get(k) ?? "").trim();
  const name = get("name");
  const phone = get("phone");
  const email = get("email");
  const method = (get("contact_method") || "any") as Method;
  const errors: Errors = {};

  if (!name) errors.name = "Enter your name.";

  if (phone && !validPhone(phone)) {
    errors.phone = "Enter an Australian phone number, e.g. 0412 345 678.";
  } else if ((method === "phone" || method === "whatsapp") && !phone) {
    errors.phone = `Enter a phone number so we can contact you by ${method === "phone" ? "phone" : "WhatsApp"}.`;
  }

  if (email && !validEmail(email)) {
    errors.email = "Enter an email address like name@example.com.";
  } else if (method === "email" && !email) {
    errors.email = "Enter an email address so we can reply by email.";
  }

  if (!phone && !email && !errors.phone && !errors.email) {
    errors.phone = "Enter a phone number or an email address.";
  }

  if (!get("service")) errors.service = "Choose the type of project.";
  if (!get("message")) errors.message = "Tell us a little about the project.";
  return errors;
}

export default function EnquiryForm({
  placement,
  tone = "light",
  variant = "full",
  defaultService,
  defaultSuburb,
  readUrlParams = false,
}: {
  /** Analytics placement and Formspree form_source, e.g. "quote_page". */
  placement: string;
  tone?: "light" | "dark";
  /** "compact" drops the optional timing field. */
  variant?: "full" | "compact";
  defaultService?: ServiceSlug;
  defaultSuburb?: string;
  /** Prefill service/suburb from ?service= and ?suburb= (quote page). */
  readUrlParams?: boolean;
}) {
  const id = useId();
  const fid = (name: string) => `${id}-${name}`;
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formErrorRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [attempted, setAttempted] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [service, setService] = useState<string>(defaultService ?? "");
  const [suburbChoice, setSuburbChoice] = useState(() => splitSuburb(defaultSuburb ?? "").choice);
  const [suburbOther, setSuburbOther] = useState(() => splitSuburb(defaultSuburb ?? "").other);
  const [timing, setTiming] = useState("");
  const [method, setMethod] = useState<Method>("any");

  useEffect(() => {
    if (!readUrlParams) return;
    const params = new URLSearchParams(window.location.search);
    const fromService = params.get("service");
    const fromSuburb = params.get("suburb");
    // The URL is only readable after hydration on this static page.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isServiceSlug(fromService)) setService(fromService);
    if (fromSuburb) {
      const { choice, other } = splitSuburb(fromSuburb.slice(0, 60));
      setSuburbChoice(choice);
      setSuburbOther(other);
    }
  }, [readUrlParams]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") formErrorRef.current?.focus();
  }, [status]);

  const dark = tone === "dark";
  const labelCls = `font-body text-[14px] font-semibold ${dark ? "text-white" : "text-navy"}`;
  const hintCls = `font-body text-[13px] ${dark ? "text-white/65" : "text-navy/70"}`;
  const errorCls = `font-body text-[13px] font-medium ${dark ? "text-[#ffb4a8]" : "text-[#b42318]"}`;
  const inputCls = (field?: Field) =>
    `w-full min-h-[48px] border px-4 py-3 font-body text-[16px] outline-none transition-[border-color,box-shadow] duration-hover focus:ring-2 disabled:opacity-60 ${
      dark
        ? "bg-navy-light text-white placeholder:text-white/60 focus:border-gold-bright focus:ring-gold-bright/40"
        : "bg-white text-navy placeholder:text-navy/40 focus:border-navy focus:ring-gold-bright/50"
    } ${
      field && errors[field]
        ? dark ? "border-[#ffb4a8]" : "border-[#b42318]"
        : dark ? "border-white/20" : "border-navy/20"
    }`;

  const describedBy = (field: Field, hint?: boolean) =>
    [errors[field] ? fid(`${field}-error`) : "", hint ? fid(`${field}-hint`) : ""].filter(Boolean).join(" ") ||
    undefined;

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("quote_form_start", { ...pageContext(window.location.pathname), placement });
  };

  const revalidate = () => {
    if (!attempted || !formRef.current) return;
    setErrors(validate(new FormData(formRef.current)));
  };
  // Themed selects don't fire a native change event, so pass the new value
  // in rather than reading it back from the not-yet-updated form.
  const revalidateWith = (field: string, value: string) => {
    if (!attempted || !formRef.current) return;
    const data = new FormData(formRef.current);
    data.set(field, value);
    setErrors(validate(data));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setAttempted(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    setFormError("");
    const first = fieldOrder.find((f) => found[f]);
    if (first) {
      document.getElementById(fid(first))?.focus();
      return;
    }

    const payload = new FormData();
    for (const [k, v] of data.entries()) {
      if (k === "service") payload.append(k, isServiceSlug(String(v)) ? serviceFormLabels[v as ServiceSlug] : "Other / not sure");
      else if (k === "contact_method") payload.append(k, methodLabel[(String(v) || "any") as Method]);
      else payload.append(k, String(v).trim());
    }

    setStatus("submitting");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (res.ok) {
        setStatus("success");
        track("quote_form_submit", {
          ...pageContext(window.location.pathname),
          placement,
          service_context: String(data.get("service") ?? ""),
          suburb_context: String(data.get("suburb") ?? ""),
          contact_method: (String(data.get("contact_method")) || "any") as Method,
        });
        return;
      }
      let serverErrors: Errors = {};
      try {
        const body = (await res.json()) as { errors?: { field?: string; message?: string }[] };
        for (const err of body.errors ?? []) {
          if (err.field && (fieldOrder as string[]).includes(err.field)) {
            serverErrors[err.field as Field] = err.message ? `${err.message.charAt(0).toUpperCase()}${err.message.slice(1)}.` : "Check this field.";
          }
        }
      } catch {
        serverErrors = {};
      }
      setErrors(serverErrors);
      setFormError(
        Object.keys(serverErrors).length > 0
          ? "Please check the highlighted fields and try again."
          : `Your enquiry wasn't sent. Please try again, or call us on ${business.phoneDisplay}.`,
      );
      setStatus("error");
    } catch {
      setFormError(
        `We couldn't reach our enquiry service, so your enquiry wasn't sent. Check your connection and try again, or call ${business.phoneDisplay}.`,
      );
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={`p-8 outline-none ${dark ? "bg-navy-light text-white" : "bg-off-white text-navy"}`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-bright text-navy">
          <Check aria-hidden="true" size={24} strokeWidth={2.5} />
        </span>
        <h2 className="mt-5 font-display text-[28px] font-bold leading-tight">Thanks, your enquiry has been sent</h2>
        <p className={`mt-3 font-body text-[16px] leading-[1.7] ${dark ? "text-white/80" : "text-navy/75"}`}>
          We&apos;ll review your details and contact you
          {method === "any" ? "" : ` by ${methodLabel[method].toLowerCase()}`} to arrange the next step.
          If it&apos;s urgent, call{" "}
          <a href={`tel:${business.phoneE164}`} className="font-semibold underline underline-offset-4">
            {business.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  const pending = status === "submitting";
  const errorCount = Object.keys(errors).length;

  return (
    <form
      ref={formRef}
      action={ENDPOINT}
      method="post"
      noValidate
      onSubmit={onSubmit}
      onFocusCapture={onStart}
      onChange={revalidate}
      className="grid gap-5"
      aria-describedby={formError ? fid("form-error") : undefined}
    >
      <input type="hidden" name="_subject" value="New enquiry from the Konntey website" />
      <input type="hidden" name="form_source" value={placement} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {(formError || (attempted && errorCount > 0)) && (
        <div
          ref={formErrorRef}
          id={fid("form-error")}
          tabIndex={-1}
          role="alert"
          className={`border-l-4 p-4 font-body text-[15px] outline-none ${
            dark ? "border-[#ffb4a8] bg-white/5 text-white" : "border-[#b42318] bg-[#fef3f2] text-navy"
          }`}
        >
          {formError ||
            `Please fix ${errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} to send your enquiry.`}
        </div>
      )}

      <fieldset disabled={pending} className="grid gap-5">
        <div className="grid gap-2">
          <label htmlFor={fid("name")} className={labelCls}>Name</label>
          <input
            id={fid("name")}
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={inputCls("name")}
          />
          {errors.name && <p id={fid("name-error")} className={errorCls}>{errors.name}</p>}
        </div>

        <fieldset className="grid gap-4">
          {/* A legend sits outside the fieldset's grid, so the gap never
              applies beneath it; space it explicitly. The hint then sits
              8px above the options, matching label-to-input spacing. */}
          <legend className={`mb-1.5 ${labelCls}`}>How should we contact you?</legend>
          <p id={fid("contact-hint")} className={`-mb-2 leading-[1.5] ${hintCls}`}>
            Give us a phone number, an email address or both.
          </p>
          <div role="radiogroup" aria-label="Preferred contact method" className="flex flex-wrap gap-2">
            {methods.map((m) => (
              <label
                key={m.value}
                className={`inline-flex min-h-[44px] cursor-pointer items-center border px-4 font-body text-[15px] transition-colors duration-hover has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-bright ${
                  method === m.value
                    ? dark ? "border-gold-bright bg-gold-bright text-navy" : "border-navy bg-navy text-white"
                    : dark ? "border-white/25 text-white/85 hover:border-white" : "border-navy/20 text-navy/80 hover:border-navy"
                }`}
              >
                <input
                  type="radio"
                  name="contact_method"
                  value={m.value}
                  checked={method === m.value}
                  onChange={() => setMethod(m.value)}
                  className="sr-only"
                />
                {m.label}
              </label>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor={fid("phone")} className={labelCls}>
                Phone{method === "phone" || method === "whatsapp" ? "" : <span className={`font-normal ${hintCls}`}> (or email)</span>}
              </label>
              <input
                id={fid("phone")}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={describedBy("phone")}
                className={inputCls("phone")}
              />
              {errors.phone && <p id={fid("phone-error")} className={errorCls}>{errors.phone}</p>}
            </div>
            <div className="grid gap-2">
              <label htmlFor={fid("email")} className={labelCls}>
                Email{method === "email" ? "" : <span className={`font-normal ${hintCls}`}> (or phone)</span>}
              </label>
              <input
                id={fid("email")}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={describedBy("email")}
                className={inputCls("email")}
              />
              {errors.email && <p id={fid("email-error")} className={errorCls}>{errors.email}</p>}
            </div>
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <label id={fid("service-label")} htmlFor={fid("service")} className={labelCls}>Project type</label>
            <ThemedSelect
              id={fid("service")}
              labelId={fid("service-label")}
              name="service"
              value={service}
              onChange={(v) => {
                setService(v);
                revalidateWith("service", v);
              }}
              options={serviceOptions}
              placeholder="Choose one"
              placeholderDisabled
              tone={tone}
              invalid={!!errors.service}
              describedBy={describedBy("service")}
              className={inputCls("service")}
            />
            {errors.service && <p id={fid("service-error")} className={errorCls}>{errors.service}</p>}
          </div>
          <div className="grid gap-2">
            <label id={fid("suburb-label")} htmlFor={fid("suburb")} className={labelCls}>
              Suburb <span className={`font-normal ${hintCls}`}>(optional)</span>
            </label>
            <ThemedSelect
              id={fid("suburb")}
              labelId={fid("suburb-label")}
              // With "Other", the typed suburb below is submitted instead.
              name={suburbChoice === OTHER_SUBURB ? undefined : "suburb"}
              value={suburbChoice}
              onChange={setSuburbChoice}
              options={suburbOptions}
              placeholder="Choose your suburb"
              tone={tone}
              className={inputCls()}
            />
            {suburbChoice === OTHER_SUBURB && (
              <input
                id={fid("suburb-other")}
                name="suburb"
                type="text"
                autoComplete="address-level2"
                aria-label="Your suburb"
                placeholder="Type your suburb"
                value={suburbOther}
                onChange={(e) => setSuburbOther(e.target.value)}
                className={inputCls()}
              />
            )}
          </div>
        </div>

        {variant === "full" && (
          <div className="grid gap-2">
            <label id={fid("timing-label")} htmlFor={fid("timing")} className={labelCls}>
              Timing <span className={`font-normal ${hintCls}`}>(optional)</span>
            </label>
            <ThemedSelect
              id={fid("timing")}
              labelId={fid("timing-label")}
              name="timing"
              value={timing}
              onChange={setTiming}
              options={timingSelectOptions.slice(1)}
              placeholder={timingSelectOptions[0].label}
              tone={tone}
              className={inputCls()}
            />
          </div>
        )}

        <div className="grid gap-2">
          <label htmlFor={fid("message")} className={labelCls}>Project details</label>
          <p id={fid("message-hint")} className={`-mt-1 ${hintCls}`}>
            What you&apos;d like done, rough size and anything we should know.
          </p>
          <textarea
            id={fid("message")}
            name="message"
            rows={variant === "full" ? 6 : 4}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message", true)}
            className={`${inputCls("message")} resize-y`}
          />
          {errors.message && <p id={fid("message-error")} className={errorCls}>{errors.message}</p>}
        </div>
      </fieldset>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="group inline-flex min-h-[52px] items-center justify-center gap-2 bg-gold-bright px-7 py-3 font-body text-[16px] font-semibold text-navy transition-colors duration-hover ease-brand hover:bg-[#e0b847] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send enquiry"}
          {!pending && (
            <ArrowRight
              aria-hidden="true"
              size={16}
              strokeWidth={2.25}
              className="transition-transform duration-hover ease-brand group-hover:translate-x-0.5"
            />
          )}
        </button>
        <p className={hintCls}>
          We only use your details to respond to this enquiry.{" "}
          <Link href="/privacy" className={`underline underline-offset-4 ${dark ? "text-white" : "text-navy"}`}>
            Privacy policy
          </Link>
        </p>
      </div>
      <p aria-live="polite" className="sr-only">{pending ? "Sending your enquiry" : ""}</p>
    </form>
  );
}
