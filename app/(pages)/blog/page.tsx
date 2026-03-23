import BlogCard from "./BlogCard";

const DUMMY_POSTS = [
  {
    slug: "breathtaking-bali",
    title: "Breathtaking Bali: A Journey Through Rice Terraces",
    subtitle:
      "Discover the hidden gems of Ubud and the serene beauty of the Tegallalang rice fields in our latest summer expedition.",
    author: "Sarah Jenkins",
    date: "March 15, 2026",
    tags: ["Nature", "Adventure"],
    image:
      "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/package-main-image/8e61cf3f-28a5-4bd2-b36f-bae411633519-20260323-195915.jpg",
  },
  {
    slug: "swiss-alps-magic",
    title: "Magic in the Swiss Alps",
    subtitle:
      "Snow-capped peaks and chocolate-box villages. Our winter tour was nothing short of a fairy tale.",
    author: "Markus Vane",
    date: "February 28, 2026",
    tags: ["Winter", "Luxury"],
    image:
      "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/package-main-image/90ca676f-7431-40c0-a3ae-03e28cbcf3bf-20260323-200038.webp",
  },
];

const GalleryPage = async () => {
  return (
    <div className="p-4 max-w-7xl mx-auto flex flex-col gap-2">
      <div className="space-y-1">
        <div className="flex flex-col gap-4 md:py-8 py-4">
          <h1 className="md:text-3xl text-2xl font-bold text-primary">
            Travel Stories
          </h1>
          <h2 className="md:text-lg text-muted-foreground md:max-w-5xl max-w-sm text-sm hidden md:block">
            Discover stories from our journeys, where each destination holds a
            memorable experience worth sharing. From breathtaking landscapes to
            meaningful moments along the way, explore our travel history through
            photos and stories that capture the essence of every adventure and
            the memories that continue to inspire future travels.
          </h2>
          <h2 className="md:text-lg text-muted-foreground md:max-w-5xl max-w-sm text-sm md:hidden">
            Discover stories from our journeys, where each destination holds a
            memorable experience worth sharing.
          </h2>
        </div>
      </div>
      <section className="space-y-8 pb-12">
        <div className="flex flex-col md:gap-8 gap-6">
          {DUMMY_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
