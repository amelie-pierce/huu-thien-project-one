'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { Text } from '../typography';
import { cn } from '@/lib/cn';
import s from './expandable-text.module.scss';

export interface ExpandableTextProps {
    children: ReactNode;
    /** Lines shown while collapsed. */
    lines?: number;
    /** When false, renders the full text without clamping or toggle. */
    enabled?: boolean;
    moreLabel?: string;
    lessLabel?: string;
    /** Applied to the text element. */
    className?: string;
}

export function ExpandableText({
    children,
    lines = 3,
    enabled = true,
    moreLabel = 'See more',
    lessLabel = 'See less',
    className,
}: ExpandableTextProps) {
    const id = useId();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);
    const [overflowing, setOverflowing] = useState(false);

    // Only show the toggle when the clamped text is actually cut off
    useEffect(() => {
        const el = wrapperRef.current?.firstElementChild;
        if (!enabled || expanded || !el) return;

        const check = () => setOverflowing(el.scrollHeight > el.clientHeight + 1);
        check();
        const observer = new ResizeObserver(check);
        observer.observe(el);
        return () => observer.disconnect();
    }, [enabled, expanded, lines, children]);

    if (!enabled) {
        return <Text className={className}>{children}</Text>;
    }

    return (
        <div
            ref={wrapperRef}
            className={s.wrapper}
            style={{ '--expandable-lines': lines } as CSSProperties}
        >
            <Text id={id} className={cn(className, !expanded && s.clamped)}>
                {children}
            </Text>
            {(overflowing || expanded) && (
                <button
                    type="button"
                    className={s.toggle}
                    aria-expanded={expanded}
                    aria-controls={id}
                    onClick={() => setExpanded((v) => !v)}
                >
                    {expanded ? lessLabel : moreLabel}
                </button>
            )}
        </div>
    );
}
