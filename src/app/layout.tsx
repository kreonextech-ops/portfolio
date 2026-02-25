import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kreonex.com"),
  title: {
    default: "Kreonex Technologies | AI Engineering & Digital Solutions Studio",
    template: "%s | Kreonex Technologies",
  },
  description:
    "Kreonex Technologies builds complete digital ecosystems — AI Agents, CRM, ERP, Mobile Apps, SaaS platforms, Social Media Marketing, and end-to-end AI Automation. Based in Siliguri, West Bengal.",
  keywords: [
    "Kreonex Technologies",
    "AI engineering studio",
    "AI automation",
    "agentic AI",
    "AI agents",
    "CRM development",
    "ERP solutions",
    "SaaS development",
    "mobile app development",
    "social media marketing",
    "SMM agency",
    "digital marketing Siliguri",
    "web development India",
    "Next.js development",
    "LangGraph",
    "full stack development",
    "AI product photography",
    "business automation",
  ],
  authors: [{ name: "Kreonex Technologies", url: "https://www.kreonex.com" }],
  creator: "Kreonex Technologies",
  publisher: "Kreonex Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Kreonex Technologies | AI Engineering & Digital Solutions",
    description:
      "We build intelligent digital ecosystems — from AI agents and automation to mobile apps, CRM, SaaS, and next-gen social media marketing.",
    url: "https://www.kreonex.com",
    siteName: "Kreonex Technologies",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Kreonex Technologies Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kreonex Technologies | AI Engineering & Digital Solutions",
    description:
      "AI Agents · CRM · Mobile Apps · SaaS · SMM — complete digital ecosystems powered by cutting-edge AI.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://www.kreonex.com",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kreonex Technologies",
              url: "https://www.kreonex.com",
              logo: "https://www.kreonex.com/logo.png",
              description:
                "Advanced AI engineering studio building intelligent digital ecosystems — AI Agents, CRM, ERP, Mobile Apps, SaaS, and Social Media Marketing.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Siliguri",
                addressRegion: "West Bengal",
                addressCountry: "IN",
              },
              telephone: "+91-6296102605",
              sameAs: [
                "https://www.linkedin.com/company/kreonex",
                "https://github.com/kreonex",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-6296102605",
                contactType: "sales",
                availableLanguage: ["English", "Hindi"],
              },
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "AI Agents",
                "CRM Development",
                "SaaS Development",
                "Mobile App Development",
                "Social Media Marketing",
                "Business Automation",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <CustomCursor />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
