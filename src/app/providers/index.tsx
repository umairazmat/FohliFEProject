import type { ReactNode } from "react";
import { ApolloAppProvider } from "./ApolloProvider";
import { ThemeProvider } from "./ThemeProvider";
import { App as AntdApp } from "antd";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ApolloAppProvider>
      <ThemeProvider>
        <AntdApp>{children}</AntdApp>
      </ThemeProvider>
    </ApolloAppProvider>
  );
}
