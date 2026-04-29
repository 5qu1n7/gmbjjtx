import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "BJJ Curriculum - Gustavo Machado",
  description: "Brazilian Jiu Jitsu curriculum and training tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{
        backgroundImage: "url('/gustavo-machado.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(249, 250, 251, 0.85)',
      }}>
        <div className="relative z-10">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
