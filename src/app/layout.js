import { Montserrat } from "next/font/google";
import "./globals.css";
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "NextCode - Empowering the Next Generation of Coders",
  description: "Join NextCode, the premier coding club for students. Participate in workshops, hackathons, competitions, and build amazing projects with like-minded developers.",
  keywords: "coding club, programming, hackathons, workshops, students, developers, NextCode",
  authors: [{ name: "NextCode Team" }],
  openGraph: {
    title: "NextCode - Empowering the Next Generation of Coders",
    description: "Join NextCode, the premier coding club for students. Participate in workshops, hackathons, competitions, and build amazing projects.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ea580c",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
