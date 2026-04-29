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
      <body className="min-h-screen bg-gray-50 relative">
        {/* Full-screen watermark background */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/gustavo-machado.jpg')",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.08,
          }}
        />
        <div className="relative z-10">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
