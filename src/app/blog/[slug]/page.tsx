import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/grovia/Navbar";
import Footer from "@/components/grovia/Footer";
import SmoothScroll from "@/components/grovia/SmoothScroll";
import PostViewClient from "./PostViewClient";
import { getSiteContent } from "@/lib/contentStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getSiteContent();
  const posts: any[] = content?.blog?.posts || [];
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Yazı Bulunamadı — CODEICON Blog",
    };
  }

  const siteTitle = content?.brand?.siteTitle || "CODEICON";

  return {
    title: `${post.title} — ${siteTitle}`,
    description: post.excerpt || `${post.title} makalesi`,
    openGraph: {
      title: `${post.title} — ${siteTitle}`,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getSiteContent();
  const posts: any[] = content?.blog?.posts || [];
  const post = posts.find((p) => p.slug === slug);

  if (!post || post.published === false) {
    notFound();
  }

  const relatedPosts = posts.filter((p) => p.slug !== slug && p.published !== false);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codeicon.co";
  const postUrl = `${baseUrl}/blog/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleBody: post.content,
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: post.coverImage ? [post.coverImage] : undefined,
    keywords: Array.isArray(post.tags) ? post.tags.join(", ") : post.tags,
    articleSection: post.category,
    inLanguage: "tr-TR",
    publisher: {
      "@type": "Organization",
      name: "CODEICON",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/favicon.ico`,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F2EE] text-[#1A1A1A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SmoothScroll />
      <Navbar content={content} />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <PostViewClient post={post} relatedPosts={relatedPosts} />
      </main>
      <Footer content={content} />
    </div>
  );
}
