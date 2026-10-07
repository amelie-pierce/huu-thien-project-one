'use client';

import { ChatIcon, ShoppingCartIcon, StoreIcon, UserIcon } from '@/components/ui/icons';
import { Container, PillNav, type PillNavItem } from '@/components/ui';

import { ProductSearch } from '@/features/search/components/ProductSearch';
import s from './header.module.scss';
import { useAuth } from '@/features/auth/auth-context';
import { useCart } from '@/features/cart/cart-context';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const { count, isOpen, openCart } = useCart();
  const { user, view, openAuth } = useAuth();
  const [contactPath, setContactPath] = useState<string | null>(null);

  const active = isOpen
    ? 'cart'
    : view
      ? 'profile'
      : contactPath === pathname
        ? 'contact'
        : pathname.startsWith('/menu') || pathname.startsWith('/products')
          ? 'menu'
          : null;

  const items: PillNavItem[] = [
    { key: 'menu', label: 'Menu', icon: <StoreIcon />, href: '/menu', onClick: () => setContactPath(null) },
    {
      key: 'contact',
      label: 'Contact',
      icon: <ChatIcon />,
      href: '#contact',
      onClick: () => setContactPath(pathname),
    },
    { key: 'cart', label: 'Cart', icon: <ShoppingCartIcon />, onClick: openCart, badge: count },
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserIcon />,
      avatar: user?.email.charAt(0),
      onClick: user ? undefined : () => openAuth('signIn'),
    },
  ];

  return (
    <header className={s.header}>
      <Container className={s.inner}>
        <PillNav
          label="Shop"
          items={items.map((item) => ({ ...item, active: item.key === active }))}
        />
        <ProductSearch />
      </Container>
    </header>
  );
}
