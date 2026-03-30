"use client";
import Image from "next/image";
import Link from "next/link";

import { Category } from "@/types";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_publish", true);

      if (error) {
        console.error(error);
        return;
      }

      setCategories(data);
    };

    fetchCategories();
  }, []);

  console.log("Fetched categories:", categories);

  return (
    <section className=" w-full overflow-y-auto">
      <div className="flex flex-col md:flex-row gap-1 mx-auto px-4 md:px-0 w-screen">
        {categories.map((cat: Category, index) => (
          <Link
            prefetch={false}
            key={`cat-${index}`}
            href={`/package?keywords=${cat.keywords}`}
            className="group relative overflow-hidden md:h-60 h-30 w-full"
          >
            {/* Background Image */}
            <Image
              src={cat.bg_image_url}
              alt={cat.name}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/20 via-black/5 to-transparent">
              <h3 className="text-white text-xl md:text-2xl font-bold tracking-wider uppercase transform translate-y-0 group-hover:-translate-y-1 transition-transform">
                {cat.name}
              </h3>
              <div className="w-8 h-1 bg-white mt-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
