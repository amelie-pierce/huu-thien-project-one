import { Container, Pagination, SectionHeading, clampPage } from "@/components/ui";
import { getCategories, getCategory, getProducts } from "@/features/catalog/api";

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
  const page = clampPage(pageParam, first.totalPages);
  const { items, totalPages, total } = await getProducts({ category: slug, page });
  console.log({ items, totalPages });

  return (
    <>
      <Hero />
      <Container className={s.container} id="product-page">
        <SectionHeading
          title={category.name}
          action={{ label: `${total} item${total !== 1 ? 's' : ''}` }}
        />
        <ProductGrid products={items} variant="page" />
        <div className={s.pagination}>
          <Pagination
            page={page}
            total={totalPages}
            getHref={(p) => `/menu/${category.slug}?page=${p}#product-page`}
          />
        </div>
      </Container>
    </>
  );
}
