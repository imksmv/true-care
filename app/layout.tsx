import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { settings } from "@/settings";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "/styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: settings.name,
  description: settings.description,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="h-full">{children}</main>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
