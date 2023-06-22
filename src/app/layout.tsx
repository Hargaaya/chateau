import { Kanit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/layout/Sidebar";
import Settings from "@/components/Settings";
import { Toaster } from "@/components/ui/toaster";
import { store } from "@/stores/store";
import { ReduxProvider } from "@/stores/ReduxProvider";

const kanit = Kanit({ weight: ["300", "400", "500", "600"], subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Chateau",
    template: "%s | Chateau the Chatbot",
  },
  description: "A Chatbot named Chateau",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const preloadedState = store.getState();

  return (
    <html lang="en">
      <body className={kanit.className}>
        <ReduxProvider preloadedState={preloadedState}>
          <div className="fixed top-5 right-5">
            <Settings />
          </div>
          <main className="flex min-h-screen w-full">
            <Sidebar />
            <div className="lg:ml-64 flex-1">{children}</div>
          </main>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
