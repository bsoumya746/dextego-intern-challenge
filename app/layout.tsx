import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Header } from "../components/Header"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* The body gradient and text color are now handled in globals.css */}
          <Header />
          <main className="min-h-screen px-4 py-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}