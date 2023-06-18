import { Kanit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/layout/Sidebar";

const kanit = Kanit({ weight: ["300", "400", "500", "600"], subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Chateau",
    template: "%s | Chateau the Chatbot",
  },
  description: "A Chatbot named Chateau",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <main className="flex min-h-screen w-full">
          <Sidebar />
          <div className="lg:ml-64 flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
