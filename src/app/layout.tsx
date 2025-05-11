import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/components/provider/theme-provider";
import Providers from "@/components/provider/providers";
import "./globals.css";
import "./theme.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Providers>
            <Toaster />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
