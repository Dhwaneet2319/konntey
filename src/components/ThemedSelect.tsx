"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  /** Options sharing a group render under one heading, in order. */
  group?: string;
}

type Props = {
  id: string;
  /** id of the visible <label>, used to name the listbox. */
  labelId: string;
  /** Omit to keep the value out of the submitted form. */
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  /** Required fields can't go back to the empty placeholder. */
  placeholderDisabled?: boolean;
  tone?: "light" | "dark";
  invalid?: boolean;
  describedBy?: string;
  /** The field styling shared with the form's text inputs. */
  className: string;
};

const TYPEAHEAD_RESET_MS = 600;

/**
 * Site-themed select. Server HTML (and any visit without JavaScript) gets a
 * native <select>, so the form always works; after hydration it becomes a
 * select-only combobox (WAI-ARIA APG pattern) with a hidden input carrying
 * the value. Focus stays on the trigger and options are announced through
 * aria-activedescendant.
 */
export default function ThemedSelect({
  id,
  labelId,
  name,
  value,
  onChange,
  options,
  placeholder,
  placeholderDisabled = false,
  tone = "light",
  invalid = false,
  describedBy,
  className,
}: Props) {
  const [enhanced, setEnhanced] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [openUp, setOpenUp] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", at: 0 });

  const listId = `${id}-listbox`;
  const optionId = (i: number) => `${id}-option-${i}`;
  const selectedIndex = options.findIndex((o) => o.value === value);
  const dark = tone === "dark";

  // Swap the native select for the themed one only once JavaScript runs.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setEnhanced(true), []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  useEffect(() => {
    if (!open || active < 0) return;
    const option = document.getElementById(optionId(active));
    // The first option of a group brings its heading into view too.
    const group = option?.parentElement?.closest<HTMLElement>("li[role=presentation]");
    const firstInGroup = group?.querySelector("[role=option]") === option;
    (firstInGroup ? group : option)?.scrollIntoView({ block: "nearest" });
    // optionId only depends on id, which never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active]);

  if (!enhanced) {
    return (
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className={className}
      >
        <option value="" disabled={placeholderDisabled}>{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    );
  }

  const openList = (index: number) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const below = window.innerHeight - rect.bottom;
      setOpenUp(below < 300 && rect.top > below);
    }
    setActive(index);
    setOpen(true);
  };

  const choose = (index: number) => {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
  };

  const findByText = (key: string) => {
    const now = Date.now();
    const state = typeahead.current;
    state.text = now - state.at > TYPEAHEAD_RESET_MS ? key : state.text + key;
    state.at = now;
    const start = open ? active : selectedIndex;
    const ordered = [...options.slice(start + 1), ...options.slice(0, start + 1)];
    const hit = ordered.find((o) => o.label.toLowerCase().startsWith(state.text.toLowerCase()));
    return hit ? options.indexOf(hit) : -1;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList(selectedIndex >= 0 ? selectedIndex : e.key === "ArrowUp" ? last : 0);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const hit = findByText(e.key);
        if (hit >= 0) onChange(options[hit].value);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(i + 1, last));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (e.altKey) choose(active);
        else setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "PageDown":
        e.preventDefault();
        setActive((i) => Math.min(i + 5, last));
        break;
      case "PageUp":
        e.preventDefault();
        setActive((i) => Math.max(i - 5, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        // APG: Tab keeps the highlighted option, closes and moves on.
        choose(active);
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          const hit = findByText(e.key);
          if (hit >= 0) setActive(hit);
        }
    }
  };

  // Options rendered under their group headings, keeping flat indexes for
  // keyboard navigation and aria-activedescendant.
  const groups: { label?: string; items: { option: SelectOption; index: number }[] }[] = [];
  options.forEach((option, index) => {
    const current = groups[groups.length - 1];
    if (current && current.label === option.group) current.items.push({ option, index });
    else groups.push({ label: option.group, items: [{ option, index }] });
  });

  const selected = options[selectedIndex];

  return (
    <div ref={rootRef} className="relative">
      {name && <input type="hidden" name={name} value={value} />}
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${id}`}
        aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList(selectedIndex >= 0 ? selectedIndex : 0))}
        onKeyDown={onKeyDown}
        className={`${className} flex items-center justify-between gap-3 text-left`}
      >
        <span className={`truncate ${selected ? "" : dark ? "text-white/60" : "text-navy/45"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          aria-hidden="true"
          size={18}
          strokeWidth={2.25}
          className={`shrink-0 transition-transform duration-hover ease-brand ${open ? "rotate-180" : ""} ${
            dark ? "text-gold-bright" : "text-gold-deep"
          }`}
        />
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={labelId}
        tabIndex={-1}
        hidden={!open}
        className={`themed-scroll absolute inset-x-0 z-30 max-h-72 overflow-y-auto border py-1.5 shadow-[0_18px_40px_-16px_rgba(13,31,60,0.45)] ${
          openUp ? "bottom-full mb-1.5" : "top-full mt-1.5"
        } ${dark ? "border-white/15 bg-navy-light" : "border-navy/15 bg-white"}`}
      >
        {groups.map((group, g) =>
          group.label ? (
            <li key={group.label} role="presentation">
              <p
                id={`${id}-group-${g}`}
                className={`px-4 pb-1 pt-3 font-body text-[11px] font-semibold uppercase tracking-[0.08em] ${
                  dark ? "text-gold-bright/80" : "text-gold-deep"
                }`}
              >
                {group.label}
              </p>
              <ul role="group" aria-labelledby={`${id}-group-${g}`}>
                {group.items.map(({ option, index }) => renderOption(option, index))}
              </ul>
            </li>
          ) : (
            group.items.map(({ option, index }) => renderOption(option, index))
          ),
        )}
      </ul>
    </div>
  );

  function renderOption(option: SelectOption, index: number) {
    const isSelected = option.value === value;
    const isActive = index === active;
    return (
      <li
        key={option.value}
        id={optionId(index)}
        role="option"
        aria-selected={isSelected}
        onPointerDown={(e) => e.preventDefault()}
        onPointerEnter={() => setActive(index)}
        onClick={() => {
          choose(index);
          buttonRef.current?.focus();
        }}
        className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 font-body text-[15px] ${
          isActive
            ? dark ? "bg-white/10 text-white" : "bg-off-white text-navy"
            : dark ? "text-white/85" : "text-navy/85"
        } ${isSelected ? "font-semibold" : ""}`}
      >
        {option.label}
        {isSelected && (
          <Check
            aria-hidden="true"
            size={16}
            strokeWidth={2.5}
            className={`shrink-0 ${dark ? "text-gold-bright" : "text-gold-deep"}`}
          />
        )}
      </li>
    );
  }
}
