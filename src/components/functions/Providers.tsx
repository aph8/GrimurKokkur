// src/components/Providers.tsx
'use client';

import { ReactNode } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

type Props = { children: ReactNode };
/**
 * Wraps the application in providers such as the progress bar.
 */

export default function Providers({ children }: Props) {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="var(--accent-bg)"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
