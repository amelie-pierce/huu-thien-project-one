"use client";

import { CartLineItem } from "./CartLineItem";
import { Dialog } from "@/components/ui/dialog/dialog";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import s from "./cart.module.scss";
import { useCart } from "../cart-context";

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, closeCart } = useCart();

  return (
    <Dialog
      open={isOpen}
      onClose={closeCart}
      placement="right"
      title={`Shopping Cart (${count})`}
      footer={
        lines.length > 0 ? (
          <div className={s.summary}>
            <div className={s.summaryRow}>
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <Link href="/checkout" className={s.checkout} onClick={closeCart}>
              Checkout
            </Link>
          </div>
        ) : undefined
      }
    >
      {lines.length === 0 ? (
        <div className={s.empty}>
          <p>Your cart is empty.</p>
          <Link href="/menu" className={s.emptyLink} onClick={closeCart}>
            Shop Now
          </Link>
        </div>
      ) : (
        <ul className={s.lines}>
          {lines.map((line) => (
            <CartLineItem key={line.key} line={line} />
          ))}
        </ul>
      )}
    </Dialog>
  );
}
