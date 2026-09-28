import { Credits } from '@/features/open-world/components/Credits';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Open World · Credits' };

export default function OpenWorldCreditsPage() {
  return <Credits />;
}
