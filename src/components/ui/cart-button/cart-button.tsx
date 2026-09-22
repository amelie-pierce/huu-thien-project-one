"use client";

import { CartIcon } from "@/components/ui/icons";
import s from "./cart-button.module.scss";
import { useCart } from "@/features/cart/cart-context";

export function CartButton() {
  const { count, openCart } = useCart();

  return (
    <button
      type="button"
      className={s.cart}
      onClick={openCart}
    >
      <CartIcon size={36} />
      {count > 0 && (
        <span className={s.badgeCounter}>
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
