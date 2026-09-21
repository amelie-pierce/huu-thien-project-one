import { Category } from "../../types";
import { ProductGrid } from "../product-grid/ProductGrid";
import { SectionHeading } from "@/components/ui";
import s from "./category-section.module.scss";

export function CategorySection({ category }: { category: Category }) {
  return (
    <section id={category.slug} className={s.section} aria-labelledby={`${category.slug}-title`}>
      <SectionHeading
        id={`${category.slug}-title`}
        title={category.name}
        action={{ label: "See all", href: `/menu/${category.slug}` }}
      />
      <ProductGrid products={category.products} />
    </section>
  );
}
