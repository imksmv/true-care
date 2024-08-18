import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { SETTINGS } from "@/lib/constans";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";
import "/styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: SETTINGS.name,
  description: SETTINGS.description,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "remove-scrollbar bg-background font-sans antialiased",
          fontSans.variable,
        )}
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
