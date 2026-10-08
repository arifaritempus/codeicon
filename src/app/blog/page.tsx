import type { Metadata } from "next";
import Navbar from "@/components/grovia/Navbar";
import Footer from "@/components/grovia/Footer";
import SmoothScroll from "@/components/grovia/SmoothScroll";
import BlogClient from "./BlogClient";
import { getSiteContent } from "@/lib/contentStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const siteTitle = content?.brand?.siteTitle || "CODEICON";
  const blogTitle = content?.blog?.title || "MICE & Seyahat Teknolojileri Blogu";
  const blogSubtitle = content?.blog?.subtitle || "Acente operasyonları, finans yönetimi ve turizm teknolojilerinde sektörel rehberler ve analizler.";

  return {
    title: `${blogTitle} — ${siteTitle}`,
    description: blogSubtitle,
    openGraph: {
      title: `${blogTitle} — ${siteTitle}`,
      description: blogSubtitle,
      type: "website",
    },
  };
}

export default async function BlogPage() {
  const content = await getSiteContent();
  const blogSettings = content?.blog || {};

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F2EE] text-[#1A1A1A]">
      <SmoothScroll />
      <Navbar content={content} />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <BlogClient blogSettings={blogSettings} brand={content?.brand} />
      </main>
      <Footer content={content} />
    </div>
  );
}
