import type { Metadata } from "next";
import { getSiteContents } from "@/lib/api/site-content";
import { ContactContent } from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Shibani about purchasing artwork or commissions.",
};

export default async function ContactPage() {
  const c = await getSiteContents([
    "contact_heading",
    "contact_paragraph",
    "contact_email",
    "contact_instagram",
  ]);

  return (
    <ContactContent
      heading={c["contact_heading"]}
      paragraph={c["contact_paragraph"]}
      email={c["contact_email"]}
      instagram={c["contact_instagram"]}
    />
  );
}
