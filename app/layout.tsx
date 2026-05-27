import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

import "./globals.css";
import { googleSansCode, notoSansSC, robotoSlab } from "@/lib/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Chorlab"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-cn"
      suppressHydrationWarning
      className={cn(notoSansSC.className, robotoSlab.className, googleSansCode.variable, "antialiased overflow-hidden")}>
      <body>
        <ThemeProvider>
          <main className="h-screen flex flex-col">
            <Navbar />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
