import type {
    LabelHTMLAttributes,
    ReactNode,
} from 'react';

import { cn } from '@/utils';
import styles from './label.module.scss';

export interface LabelProps
    extends LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
}

export function Label({
    className,
    children,
    ...props
}: LabelProps) {
    return (
        <label
            className={cn(styles.label, className)}
            {...props}
        >
            {children}
        </label>
    );
}