import { AuthModal } from '@/features/auth/components/AuthModal';
import { CartDrawer } from '@/features/cart/components/CartDrawer';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: 'Coffee, tea and pastries from Life Begins After Coffee.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <AuthModal />
      </Providers>
    </>
  );
}
