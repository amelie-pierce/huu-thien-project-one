import type { Category, Product } from "@/features/catalog/types";

const DESCRIPTION =
  "Our Cold Brew is slow-steeped for 16 hours to bring out smooth, bold flavors with lower acidity and natural sweetness. Served chilled over ice, it's refreshing, energizing, and perfect for any time of day.";

const IMAGES = {
  hotCup: "/images/shop/products/expresso_cropped.png",
  icedCup: "/images/shop/products/Virgin-Mojito.png",
  muffin: "/images/shop/products/muffin.png",
  macaroon: "/images/shop/products/macaroon.png",
  brownie: "/images/shop/products/brownie.png",
};

function build(
  categorySlug: string,
  items: Array<{ name: string; price: number; image: string; isNew?: boolean }>
): Product[] {
  return items.map((item, index) => {
    const slug = `${item.name.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`;
    return {
      id: `${categorySlug}-${index + 1}`,
      slug,
      name: item.name,
      price: item.price,
      image: item.image,
      description: DESCRIPTION,
      categorySlug,
      isNew: item.isNew,
    };
  });
}

export const categories: Category[] = [
  {
    slug: "coffee",
    name: "Coffee",
    products: build("coffee", [
      { name: "Cold Brew", price: 600, image: IMAGES.hotCup, isNew: true },
      { name: "Espresso", price: 600, image: IMAGES.hotCup, isNew: true },
      { name: "Latte", price: 600, image: IMAGES.hotCup },
      { name: "Cappuccino", price: 600, image: IMAGES.hotCup },
      { name: "Black Coffee", price: 600, image: IMAGES.hotCup },
      { name: "Americano", price: 600, image: IMAGES.hotCup },
      { name: "Flat White", price: 650, image: IMAGES.hotCup },
      { name: "Mocha", price: 700, image: IMAGES.hotCup },
      { name: "Macchiato", price: 650, image: IMAGES.hotCup },
      { name: "Cortado", price: 600, image: IMAGES.hotCup },
      { name: "Affogato", price: 750, image: IMAGES.hotCup },
      { name: "Ristretto", price: 550, image: IMAGES.hotCup },
      { name: "Long Black", price: 600, image: IMAGES.hotCup },
      { name: "Caramel Latte", price: 700, image: IMAGES.hotCup },
    ]),
  },
  {
    slug: "cold-drinks",
    name: "Cold Drinks",
    products: build("cold-drinks", [
      { name: "Virgin Mojito", price: 600, image: IMAGES.icedCup, isNew: true },
      { name: "Iced Latte", price: 600, image: IMAGES.icedCup },
      { name: "Iced Americano", price: 600, image: IMAGES.icedCup },
      { name: "Iced Mocha", price: 650, image: IMAGES.icedCup },
      { name: "Lemon Iced Tea", price: 550, image: IMAGES.icedCup },
    ]),
  },
  {
    slug: "bakery",
    name: "Bakery",
    products: build("bakery", [
      { name: "Muffin", price: 250, image: IMAGES.muffin, isNew: true },
      { name: "Macaroon", price: 600, image: IMAGES.macaroon },
      { name: "Brownie", price: 600, image: IMAGES.brownie },
    ]),
  },
];
