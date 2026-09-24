import { Category } from "../../types";
import { ProductGrid } from "../product-grid/ProductGrid";
import { SectionHeading } from "@/components/ui";
import s from "./category-section.module.scss";

export function CategorySection({ category }: { category: Category }) {
  console.log(category);
  return (
    <section id={category.slug} className={s.section} aria-labelledby={`${category.slug}-title`}>
      <SectionHeading
        id={`${category.slug}-title`}
        title={category.name}
        action={category.total > 6 ? { label: "See all", href: `/menu/${category.slug}` } : undefined }
      />
      <ProductGrid products={category.products} />
    </section>
  );
}
