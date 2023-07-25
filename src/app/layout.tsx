import { Kanit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/layout/Sidebar";
import Settings from "@/components/Settings";
import { Toaster } from "@/components/ui/toaster";
import { store } from "@/stores/store";
import { ReduxProvider } from "@/stores/ReduxProvider";
import { ThemeProvider } from "@/layout/ThemeProvider";
import BoardDrawer from "@/components/bookmark/BoardDrawer";
import { Session } from "next-auth";
import AuthWrapper from "@/components/AuthWrapper";
import NextAuthProvider from "@/components/NextAuthProvider";
import InitProvider from "@/components/InitProvider";
import Profile from "@/components/Profile";

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
        <NextAuthProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ReduxProvider preloadedState={preloadedState}>
              <AuthWrapper>
                <InitProvider>
                  <div className="flex flex-col items-center gap-4 fixed top-5 right-5">
                    <Profile />
                    <Settings />
                    <BoardDrawer />
                  </div>
                  <main className="flex min-h-screen w-full">
                    <Sidebar />
                    <div className="lg:ml-64 flex-1">{children}</div>
                  </main>
                  <Toaster />
                </InitProvider>
              </AuthWrapper>
            </ReduxProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
