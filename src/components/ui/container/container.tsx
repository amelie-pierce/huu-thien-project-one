import type { HTMLAttributes } from 'react';
import styles from './container.module.scss';

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export default function Container({
  className = '',
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={`${styles.container} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}