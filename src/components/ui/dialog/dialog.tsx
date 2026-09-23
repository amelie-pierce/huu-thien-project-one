"use client";

import { useEffect, useRef } from "react";

import { CloseIcon } from "../icons";
import { cn } from "@/lib/cn";
import s from "./dialog.module.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  placement?: "center" | "right";
  title?: React.ReactNode;
  hideClose?: boolean;
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  footerClassName?: string;
  headerClassName?: string;
};

export function Dialog({
  open,
  onClose,
  placement = "center",
  title,
  hideClose,
  className,
  children,
  footer,
  headerClassName,
  footerClassName,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cn(s.dialog, className)}
      data-placement={placement}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      // onClick={(event) => {
      //   if (event.target === ref.current) onClose();
      // }}
    >
      <div className={s.panel}>
        {(title || !hideClose) && (
          <header className={cn(s.header, headerClassName)}>
            {title ? <h2 className={s.title}>{title}</h2> : <span />}
            {!hideClose && (
              <button type="button" className={s.close} onClick={onClose} aria-label="Close">
                <CloseIcon size={25} />
              </button>
            )}
          </header>
        )}
        <div className={s.body}>{children}</div>
        {footer && <footer className={cn(s.footer, footerClassName)}>{footer}</footer>}
      </div>
    </dialog>
  );
}
