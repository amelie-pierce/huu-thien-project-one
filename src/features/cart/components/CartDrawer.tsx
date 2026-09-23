"use client";

import { Button, Text } from "@/components/ui";

import { CartLineItem } from "./CartLineItem";
import { Dialog } from "@/components/ui/dialog/dialog";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import s from "./cart.module.scss";
import { useCart } from "../cart-context";
import { useRouter } from 'next/navigation'

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, closeCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
    closeCart();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeCart}
      placement="right"
      footerClassName={s.drawerFooter}
      title={<div className={s.cartTitle}>Shopping Cart {count > 0 ? `(${count})` : ''}</div>}
      footer={
        lines.length > 0 ? (
          <div className={s.summary}>
            <div className={s.summaryRow}>
              <Text className={s.subTotalLabel} as="span">Subtotal</Text>
              <Text as="span">
                {formatPrice(subtotal)}
              </Text>
            </div>
            {/* <Link href="/checkout" className={s.checkout} onClick={closeCart}>
              Checkout
            </Link> */}
            <Button className={s.checkout} onClick={handleCheckout}>Checkout</Button>
          </div>
        ) : undefined
      }
    >
      {lines.length === 0 ? (
        <div className={s.empty}>
          <Text>Your cart is empty.</Text>
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
