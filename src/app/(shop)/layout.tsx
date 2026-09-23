import { AuthModal } from '@/features/auth/components/AuthModal';
import { CartDrawer } from '@/features/cart/components/CartDrawer';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Providers } from './providers';

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
