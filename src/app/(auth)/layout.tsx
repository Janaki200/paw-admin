import type { Metadata } from 'next';
import Image from 'next/image';
import { PawPrintIcon } from '@/components/icons/paw-print';

export const metadata: Metadata = {
  title: 'Authentication | Paw Admin Center',
  description: 'Login or Register for Paw Admin Center',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium text-primary-foreground">
          <PawPrintIcon className="mr-2 h-6 w-6" />
          Paw Admin Center
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-primary-foreground">
              &ldquo;Managing pet care efficiently. One booking at a time.&rdquo;
            </p>
            <footer className="text-sm text-primary-foreground/80">The Paw Team</footer>
          </blockquote>
        </div>
      </div>
       <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
           {children}
        </div>
      </div>
    </div>
  );
}
