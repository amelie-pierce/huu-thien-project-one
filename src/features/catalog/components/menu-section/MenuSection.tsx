import { Category } from "../../types";
import { CategoryNav } from "../category-nav/CategoryNav";
import { CategorySection } from "../category-section/CategorySection";
import { Container } from "@/components/ui";
import s from "./menu-section.module.scss";

export function MenuSection({ categories }: { categories: Category[] }) {
  const navItems = categories.map(({ slug, name }) => ({ slug, name }));

  return (
    <Container className={s.layout}>
      <div className={s.sidebar}>
        <CategoryNav items={navItems} />
      </div>

      <div className={s.content}>
        {categories.map((category) => (
          <CategorySection key={category.slug} category={category} />
        ))}
      </div>
    </Container>
  );
}
