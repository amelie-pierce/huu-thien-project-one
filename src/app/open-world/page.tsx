import { OpenWorld } from '@/features/open-world';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Open World' };

export default function OpenWorldPage() {
  return <OpenWorld />;
}
