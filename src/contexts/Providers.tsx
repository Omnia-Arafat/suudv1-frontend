'use client';

import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { I18nProvider } from './I18nContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <I18nProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </I18nProvider>
  );
}