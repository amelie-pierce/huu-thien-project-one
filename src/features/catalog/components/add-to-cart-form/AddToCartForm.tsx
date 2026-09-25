"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { ChipGroup } from "@/components/ui/chip-group/chip-group";
import { useCart } from "@/features/cart/cart-context";
import { SIZES, type Product, type Size } from "../../types";
import s from "../product-detail/product-detail.module.scss";

export function AddToCartForm({ product, onSizeChange }: { product: Product, onSizeChange?: (price: number) => void }) {
  const { dispatch, openCart } = useCart();
  const [size, setSize] = useState<Size>("Small");
  const getPrice = (size: Size) => {
    return product.sizes.find((item) => item.name === size)?.price ?? product.price;
  };
  function addToCart() {
    dispatch({
      type: "add",
      line: {
        productId: product.id.toString(),
        slug: product.slug,
        name: product.name,
        image: product.imageUrl,
        unitPrice: getPrice(size),
        size,
      },
    });
    openCart();
  }

  return (
    <div className={s.form}>
      <ChipGroup label="Sizes" name="size" options={SIZES} value={size} onChange={(newSize) => { setSize(newSize); onSizeChange?.(getPrice(newSize)); }} />
      <Button size="md" onClick={addToCart} className={s.submit}>
        Add to cart
      </Button>
    </div>
  );
}
