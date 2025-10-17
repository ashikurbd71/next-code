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
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  themeColor: "#ea580c",
  openGraph: {
    title: "NextCode - Empowering the Next Generation of Coders",
    description: "Join NextCode, the premier coding club for students. Participate in workshops, hackathons, competitions, and build amazing projects.",
    type: "website",
  },
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
