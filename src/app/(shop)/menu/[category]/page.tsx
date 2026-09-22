import { Container, SectionHeading } from "@/components/ui";
import { getCategories, getCategory, getProducts } from "@/features/catalog/api";

import { CategorySection } from "@/features/catalog/components/category-section/CategorySection";
import { Hero } from "../../components/hero/Hero";
import type { Metadata } from "next";
import { ProductGrid } from "@/features/catalog/components/product-grid/ProductGrid";
import { notFound } from "next/navigation";
import s from "./category.module.scss";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  return { title: category ? category.name : "Menu" };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category: slug } = await params;
  const { page: pageParam } = await searchParams;

  const category = await getCategory(slug);
  if (!category) notFound();

  const first = await getProducts({ category: slug, page: 1 });
  const page = Math.max(1, Math.min(Number(pageParam ?? 1), first.totalPages));
  const { items, totalPages } = await getProducts({ category: slug, page });
  console.log({ items, totalPages });

  return (
    <>
      <Hero />
      <Container className={s.container}>
        <SectionHeading
          title={category.name}
          action={{ label: `${items.length} item${items.length !== 1 ? "s" : ""}` }}
        />
        <ProductGrid products={items} variant="page" />
      </Container>

      <CategorySection category={category} />
    </>
  );
}
