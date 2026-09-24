import type { Metadata } from "next";
import { ProductDetail } from "@/features/catalog/components/product-detail/ProductDetail";
import { getProductBySlug } from "@/features/catalog/api";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? product.name : "Product" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
