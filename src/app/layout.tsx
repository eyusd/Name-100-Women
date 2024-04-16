import type { Metadata, Viewport } from "next";
import { DM_Sans as FontSans } from "next/font/google"
import { Space_Mono as FontMono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Name 100 Women",
  description: "Name 100 Women. The game.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: 'resizes-content'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "bg-background font-sans antialiased flex items-center justify-center h-dvh w-screen",
          fontSans.variable,
          fontMono.variable,
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            themes={["light", "dark"]}
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
    </html>
  );
}
