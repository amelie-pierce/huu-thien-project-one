import { Hero } from "../components/hero/Hero";
import type { Metadata } from "next";
import { MenuSection } from "@/features/catalog/components/menu-section/MenuSection";
import { getCategoriesPreview } from "@/features/catalog/catalog.service";

export const metadata: Metadata = { title: "Menu" };

export default async function Page() {
  const categories = await getCategoriesPreview();
  return (
    <>
      <Hero />
      <MenuSection categories={categories} />
    </>
  );
}