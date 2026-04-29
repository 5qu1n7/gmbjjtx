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
      <body className="min-h-screen bg-white relative">
        {/* Full-screen watermark background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/gustavo-machado.jpg"
            alt="Gustavo Machado"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ opacity: 0.12 }}
          />
        </div>
        <div className="relative z-10">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
