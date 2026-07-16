import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Katakana Sharp — Train Your Eye",
  description: "Focused katakana recognition drills for Japanese learners ready to stop hesitating.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
