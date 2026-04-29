import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "BJJ Curriculum - Gustavo Machado",
  description: "52-week Brazilian Jiu-Jitsu training curriculum with rotating positions and techniques",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BJJ Curriculum",
  },
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192" },
      { url: "/icon-512x512.png", sizes: "512x512" },
    ],
    apple: [
      { url: "/icon-192x192.png", sizes: "192x192" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#00ff88" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BJJ Curriculum" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((reg) => console.log('Service Worker registered'))
                    .catch((err) => console.log('Service Worker registration failed:', err));
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
