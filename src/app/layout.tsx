"use client";

import { Kanit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/layout/Sidebar";
import Settings from "@/components/Settings";
import { Toaster } from "@/components/ui/toaster";
import { store } from "@/stores/store";
import { ReduxProvider } from "@/stores/ReduxProvider";
import { ThemeProvider } from "@/layout/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import CodeDrawer from "@/components/CodeDrawer";
import { Session } from "next-auth";
import AuthWrapper from "@/components/AuthWrapper";

const kanit = Kanit({ weight: ["300", "400", "500", "600"], subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Chateau",
    template: "%s | Chateau the Chatbot",
  },
  description: "A Chatbot named Chateau",
};

type LayoutProps = {
  children: React.ReactNode;
  session: Session;
};

export default function RootLayout({ children, session }: LayoutProps) {
  const preloadedState = store.getState();

  return (
    <html lang="en">
      <body className={kanit.className}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ReduxProvider preloadedState={preloadedState}>
              <AuthWrapper>
                <div className="fixed top-5 right-5">
                  <Settings />
                </div>
                <div className="fixed top-16 right-5">
                  <CodeDrawer />
                </div>
                <main className="flex min-h-screen w-full">
                  <Sidebar />
                  <div className="lg:ml-64 flex-1">{children}</div>
                </main>
                <Toaster />
              </AuthWrapper>
            </ReduxProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
