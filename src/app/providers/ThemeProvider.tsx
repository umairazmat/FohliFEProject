import type { PropsWithChildren } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useThemeStore } from "./themeStore";

export function ThemeProvider({ children }: PropsWithChildren) {
  const mode = useThemeStore((s) => s.mode);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          mode === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#0ea5e9",
          borderRadius: 12,
          fontSize: 14,
        },
        components: {
          Modal: { paddingMD: 16 },
          Button: { borderRadius: 12 },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
