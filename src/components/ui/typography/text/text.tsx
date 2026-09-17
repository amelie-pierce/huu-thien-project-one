import type {
    ElementType,
    HTMLAttributes,
    ReactNode,
} from 'react';

import { cn } from '@/utils';
import styles from './text.module.scss';

export type TextSize =
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl';
    

export type TextVariant =
    | 'default'
    | 'muted';

export interface TextProps
    extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    size?: TextSize;
    variant?: TextVariant;
    children: ReactNode;
}

export function Text({
    as: Component = 'p',
    size = 'md',
    variant = 'default',
    className,
    children,
    ...props
}: TextProps) {
    return (
        <Component
            className={cn(
                styles.text,
                styles[size],
                styles[variant],
                className,
            )}
            {...props}
        >
            {children}
        </Component>
    );
}