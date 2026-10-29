import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/localization/LanguageContext';
import { SchoolStoreProvider } from '@/lib/store/schoolStore';
import { TopBar } from '@/components/layout/TopBar';
import { InstitutionalHeader } from '@/components/layout/InstitutionalHeader';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'HALISHAHAR PUBLIC SCHOOL AND COLLEGE | হালিশহর পাবলিক স্কুল এন্ড কলেজ (EIIN: 136764)',
  description: 'Official Portal of Halishahar Public School and College. Estd: 2002. House-42-43, Road-04, B-Block, Halishahar H/E, Chattogram.',
  icons: {
    icon: '/assets/school-logo.png',
    apple: '/assets/school-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#183149] antialiased">
        <LanguageProvider>
          <SchoolStoreProvider>
            <TopBar />
            <InstitutionalHeader />
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </SchoolStoreProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
