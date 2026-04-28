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
    "w-full bg-transparent border-b border-border py-3 text-charcoal placeholder:text-muted text-sm outline-none focus:border-charcoal transition-colors duration-200";

  return (
    <Section className="pt-32 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <FadeIn>
          <div className="flex flex-col gap-6">
            <span className="text-xs tracking-widest uppercase text-accent font-sans">
              Contact
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl text-charcoal leading-snug">
              {heading}
            </h1>
            <p className="text-warm-gray leading-relaxed max-w-md">
              {paragraph}
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <div>
                <p className="text-xs tracking-widest uppercase text-muted font-sans mb-1">Email</p>
                <a
                  href={`mailto:${email}`}
                  className="text-charcoal hover:text-accent transition-colors duration-200"
                >
                  {email}
                </a>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-muted font-sans mb-1">Instagram</p>
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal hover:text-accent transition-colors duration-200"
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
              <span className="text-4xl font-serif text-charcoal">Thank you.</span>
              <p className="text-warm-gray leading-relaxed">
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
                <label htmlFor="name" className="text-xs tracking-widest uppercase text-muted font-sans block mb-2">Name</label>
                <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Your name" className={inputBase} />
              </div>
              <div>
                <label htmlFor="email" className="text-xs tracking-widest uppercase text-muted font-sans block mb-2">Email</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputBase} />
              </div>
              <div>
                <label htmlFor="message" className="text-xs tracking-widest uppercase text-muted font-sans block mb-2">Message</label>
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
