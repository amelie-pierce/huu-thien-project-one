import { Label, Text } from '@/components/ui';

import styles from './stat.module.scss';

interface StatProps {
  value: string;
  label: string;
}

export function Stat({ value, label }: StatProps) {
  return (
    <div className={styles.stat}>
      <Text className={styles.value}>{value}</Text>
      <Text className={styles.label}>{label}</Text>
    </div>
  );
}