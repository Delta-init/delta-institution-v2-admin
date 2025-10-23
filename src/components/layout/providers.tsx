"use client";
import React from "react";
import ThemeProvider from "./ThemeToggle/theme-provider";
import {
  SessionProvider,
  SessionProviderProps,
  useSession,
} from "next-auth/react";
import ReactQueryProvider from "../providers/react-query";
import { HeroUIProvider } from "@heroui/react";
import LiveSessionMonitor from "./liveSessionMonitor";
export default function Providers({
  session,
  children,
}: {
  session: SessionProviderProps["session"];
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <HeroUIProvider>
              <LiveSessionMonitor>{children}</LiveSessionMonitor>
            </HeroUIProvider>
          </ReactQueryProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
