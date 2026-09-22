"use client";

import type { CartLine } from "../types";
import Image from "next/image";
import { QuantityStepper } from "@/components/ui/quantity-stepper/quantity-stepper";
import { formatPrice } from "@/lib/format";
import s from "./cart.module.scss";
import { useCart } from "../cart-context";

export function CartLineItem({ line }: { line: CartLine }) {
  const { dispatch } = useCart();

  return (
    <li className={s.line}>
      <div className={s.thumb}>
        <Image src={line.image} alt={line.name} fill sizes="64px" className={s.thumbImage} />
      </div>

      <div className={s.lineBody}>
        <p className={s.lineName}>{line.name}</p>
        <p className={s.lineMeta}>
          {formatPrice(line.unitPrice, { decimals: 2 })} | {line.size}
        </p>
        <p className={s.lineMeta}>
          Total: {formatPrice(line.unitPrice * line.qty, { decimals: 2 })}
        </p>

        <div className={s.lineActions}>
          <QuantityStepper
            value={line.qty}
            onChange={(qty) => dispatch({ type: "setQty", key: line.key, qty })}
            label={`Quantity for ${line.name}`}
          />
          <button
            type="button"
            className={s.remove}
            onClick={() => dispatch({ type: "remove", key: line.key })}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
