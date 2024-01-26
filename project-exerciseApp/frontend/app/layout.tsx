import type { Metadata } from 'next';
import '@/app/styles/globals.css';
import React from 'react';

import { ChildrenProp } from '@/app/types/ChildrenProp';

export const metadata: Metadata = {
  title: 'exerciseApp',
  description: 'Guide for exercise',
};

export default function RootLayout({ children }: ChildrenProp) {
  return (
    <html lang='ko'>
      <body className='flex flex-col justify-between h-screen max-h-screen '>
        {children}
      </body>
    </html>
  );
}