'use client'

import { SessionProvider } from "next-auth/react";
import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;  // Ensure the syntax is correct here
};
