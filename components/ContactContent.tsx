"use client";

import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { useState } from "react";

interface Props {
  email: string;
  instagram: string;
  heading: string;
  paragraph: string;
}

export function ContactContent({ email, instagram, heading, paragraph }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputBase =
    "w-full bg-transparent border-b border-border py-3.5 text-charcoal placeholder:text-muted font-sans text-[16px] outline-none focus:border-charcoal transition-colors duration-300";

  return (
    <Section className="pt-32 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <FadeIn>
          <div className="flex flex-col gap-6">
            <span className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-accent">
              Contact
            </span>
            <h1 className="font-serif font-normal text-[48px] leading-[1.1] tracking-[-0.02em] text-charcoal">
              {heading}
            </h1>
            <p className="font-sans text-[16px] leading-[1.6] text-warm-gray max-w-md">
              {paragraph}
            </p>

            <div className="flex flex-col gap-6 mt-4">
              <div>
                <p className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted mb-2">Email</p>
                <a
                  href={`mailto:${email}`}
                  className="font-sans text-[16px] text-charcoal transition-opacity duration-300 hover:opacity-70"
                >
                  {email}
                </a>
              </div>
              <div>
                <p className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted mb-2">Instagram</p>
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[16px] text-charcoal transition-opacity duration-300 hover:opacity-70"
                >
                  @{instagram}
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          {submitted ? (
            <div className="flex flex-col items-start gap-4 py-16">
              <span className="font-serif font-normal text-[32px] leading-[1.2] text-charcoal">Thank you.</span>
              <p className="font-sans text-[16px] leading-[1.6] text-warm-gray">
                Your message has been received. I&apos;ll be in touch soon.
              </p>
              <Button
                variant="ghost"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", message: "" });
                }}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div>
                <label htmlFor="name" className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted block mb-2">Name</label>
                <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Your name" className={inputBase} />
              </div>
              <div>
                <label htmlFor="email" className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted block mb-2">Email</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputBase} />
              </div>
              <div>
                <label htmlFor="message" className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted block mb-2">Message</label>
                <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Tell me about the piece you're interested in, or anything else on your mind." className={`${inputBase} resize-none`} />
              </div>
              <Button type="submit" variant="primary" className="self-start">Send Message</Button>
            </form>
          )}
        </FadeIn>
      </div>
    </Section>
  );
}
