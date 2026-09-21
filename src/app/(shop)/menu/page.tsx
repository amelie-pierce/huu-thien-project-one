import { Hero } from "../components/hero/Hero";
import { MenuSection } from "@/features/catalog/components/menu-section/MenuSection";
import { getCategoriesPreview } from "@/features/catalog/api";

export default async function Page() {
  const categories = await getCategoriesPreview();
  return (
    <>
      <Hero />
      <MenuSection categories={categories} />
    </>
  );
}