import { Container, Pagination, SectionHeading } from "@/components/ui";
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
  const page = Number(pageParam || 1);
  
  const { products, pagination, categoryName } = await getProducts(slug, page);
  const { total, totalPages } = pagination;
  if (!products?.length) notFound();
  return (
    <>
      <Hero />
      <Container className={s.container} id="product-page">
        <SectionHeading
          title={categoryName}
          action={{ label: `${total} item${total !== 1 ? 's' : ''}` }}
        />
        <ProductGrid products={products} variant="page" />
        <div className={s.pagination}>
          <Pagination
            page={page}
            total={totalPages}
            getHref={(p) => `/menu/${slug}?page=${p}#product-page`}
          />
        </div>
      </Container>
    </>
  );
}
