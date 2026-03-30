"use client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const BlogCard = ({ post }: { post: any }) => {
  return (
    <Link
      prefetch={false}
      href={``}
      className="group block"
      onClick={(e) => {
        e.preventDefault();
        // Handle click event
        toast.error(
          "Blog post details are not available yet. Stay tuned for updates!",
          {
            duration: 4000,
          }
        );
      }}
    >
      <div className="flex flex-col md:flex-row w-full border border-muted hover:border-primary/50 transition-all rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md">
        {/* LEFT SIDE: Meta & Info (1/5 approx) */}
        <div className="w-full md:w-2/5 p-6 flex flex-col justify-between bg-muted/5">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold uppercase tracking-widest text-primary/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                {post.subtitle}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-muted">
            <p className="text-xs font-semibold">{post.author}</p>
            <p className="text-[10px] text-muted-foreground uppercase">
              {post.date}
            </p>
          </div>
        </div>
        <div className="w-full md:w-3/5 relative h-[250px] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1200px) 100vw, 80vw"
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
