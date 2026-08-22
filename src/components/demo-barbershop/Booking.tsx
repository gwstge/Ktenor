"use client";

import { useMemo, useState } from "react";
import { serviceGroups } from "@/content/demo-barbershop/services";
import { team } from "@/content/demo-barbershop/team";

const DAYS = ["Today", "Tomorrow", "Wed 20", "Thu 21"];
const SLOTS = ["09:00", "09:30", "10:30", "11:00", "13:00", "13:30", "15:00", "16:30", "17:30", "18:30"];
// A few slots read as taken so the picker feels like a real live calendar,
// not an empty demo grid — deterministic per day so it doesn't reshuffle.
const TAKEN: Record<number, string[]> = {
  0: ["09:30", "11:00", "16:30"],
  1: ["10:30", "13:30", "18:30"],
  2: ["09:00", "15:00"],
  3: ["13:00", "17:30", "18:30"],
};

type Status = "idle" | "sending" | "sent";

export function Booking() {
  const allServices = useMemo(() => serviceGroups.flatMap((g) => g.items.map((i) => ({ ...i, category: g.category }))), []);

  const [service, setService] = useState<string | null>(null);
  const [barber, setBarber] = useState<string>("No preference");
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!service || !slot || !name.trim() || !phone.trim()) {
      setError("Pick a service, a time and leave your name and phone.");
      return;
    }
    setError(null);
    setStatus("sending");
    // Demo only — nothing is sent anywhere. Simulated delay so the flow
    // reads as real rather than an instant, suspicious-looking flip.
    window.setTimeout(() => setStatus("sent"), 900);
  }

  function reset() {
    setService(null);
    setBarber("No preference");
    setSlot(null);
    setName("");
    setPhone("");
    setStatus("idle");
  }

  return (
    <section id="booking" className="relative isolate bg-[var(--charcoal-raised)] py-20 md:py-28">
      <div className="section-wash" data-tone="brass" aria-hidden />
      <div className="container-page relative z-[1]">
        <header data-reveal className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-copper">Book a chair</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3rem)] leading-tight text-ivory">
            Pick a service, a barber, a time.
          </h2>
          <p className="mt-3 text-sm text-ivory-muted">
            Demo booking flow — nothing is actually sent or reserved.
          </p>
        </header>

        <div data-reveal className="mx-auto mt-14 max-w-3xl rounded-xl border border-[var(--line)] bg-[var(--charcoal)] p-6 sm:p-10">
          {status === "sent" ? (
            <div className="py-6 text-center">
              <span aria-hidden className="mx-auto flex w-fit gap-1.5">
                <span className="h-6 w-1.5 rounded-full bg-copper" />
                <span className="h-6 w-1.5 rounded-full bg-copper/70" />
                <span className="h-6 w-1.5 rounded-full bg-copper" />
              </span>
              <h3 className="mt-6 font-display text-[1.6rem] text-ivory">Request received.</h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ivory-muted">
                In a real booking this is where {"we'd"} confirm your slot by SMS. This is a demo —
                nothing was actually booked or sent anywhere.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-7 rounded-sm border border-copper/50 px-6 py-3 text-sm font-semibold text-copper transition-colors hover:bg-copper/10"
              >
                Book another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-9">
              <fieldset>
                <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-ivory-muted">
                  1. Service
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {allServices.map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setService(s.name)}
                      aria-pressed={service === s.name}
                      className={`rounded-sm border px-3.5 py-2 text-sm transition-colors ${
                        service === s.name
                          ? "border-copper bg-copper/15 text-copper"
                          : "border-[var(--line)] text-ivory-soft hover:border-copper/40"
                      }`}
                    >
                      {s.name} <span className="text-ivory-muted">· {s.price}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-ivory-muted">
                  2. Barber
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["No preference", ...team.map((b) => b.name)].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setBarber(n)}
                      aria-pressed={barber === n}
                      className={`rounded-sm border px-3.5 py-2 text-sm transition-colors ${
                        barber === n
                          ? "border-copper bg-copper/15 text-copper"
                          : "border-[var(--line)] text-ivory-soft hover:border-copper/40"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-ivory-muted">
                  3. Time
                </legend>
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {DAYS.map((d, i) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setDay(i);
                        setSlot(null);
                      }}
                      aria-pressed={day === i}
                      className={`shrink-0 rounded-sm border px-4 py-2 text-sm transition-colors ${
                        day === i
                          ? "border-copper bg-copper/15 text-copper"
                          : "border-[var(--line)] text-ivory-soft hover:border-copper/40"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {SLOTS.map((t) => {
                    const taken = TAKEN[day]?.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        disabled={taken}
                        onClick={() => setSlot(t)}
                        aria-pressed={slot === t}
                        className={`rounded-sm border px-2 py-2.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
                          slot === t
                            ? "border-copper bg-copper/15 text-copper"
                            : "border-[var(--line)] text-ivory-soft hover:border-copper/40"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-ivory-muted">
                  4. Your details
                </legend>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    autoComplete="name"
                    className="rounded-sm border border-[var(--line)] bg-[var(--charcoal-raised)] px-4 py-3 text-body text-ivory outline-none transition-colors placeholder:text-ivory-muted focus-visible:border-copper"
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    type="tel"
                    autoComplete="tel"
                    className="rounded-sm border border-[var(--line)] bg-[var(--charcoal-raised)] px-4 py-3 text-body text-ivory outline-none transition-colors placeholder:text-ivory-muted focus-visible:border-copper"
                  />
                </div>
              </fieldset>

              {error ? (
                <p role="alert" className="text-sm text-[#e0a0a0]">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-sm bg-copper px-7 py-4 text-sm font-semibold text-charcoal-deep transition-transform duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Request appointment"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
