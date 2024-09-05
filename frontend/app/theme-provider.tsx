"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useTheme } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: 'children';
}


export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}

export const useThemeValue = () => {
	const { theme } = useTheme();
	return theme;
  };