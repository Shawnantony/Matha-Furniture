import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";
import { getGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside beautifully furnished homes and spaces styled with Matha Furniture collections.",
};

export default async function GalleryPage() {
  const images = await getGallery();

  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Gallery"
        description="Get inspired by real spaces styled with our furniture collections."
      />
      <div className="container-wide py-12">
        <GalleryGrid images={images} />
      </div>
    </>
  );
}
