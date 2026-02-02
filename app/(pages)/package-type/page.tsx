import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

const PackageTypePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  console.log("id params:", id);

  // const { data, error } = await supabase
  //   .from("packages")
  //   .select("*")
  //   .eq("uuid", id)
  //   .single();

  // if (error || !data) {
  //   return <div className="p-10 text-center">Package not found</div>;
  // }

  console.log("Type ID:", params.id);

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8 font-sans text-slate-900">
      <h1 className="text-3xl font-bold mb-6">Type Page - {params.id}</h1>
      <p>This is the type page content for type {params.id}.</p>
    </main>
  );
};

export default PackageTypePage = async ({ params }: { params: { id: string } }) => {;
