import { supabase } from "@/lib/supabaseClient";

export default async function SharePage({
  params,
}: {
  params: { uuid: string };
}) {
  const { data } = await supabase
    .from("packages")
    .select("*")
    .eq("uuid", params.uuid)
    .single();

  if (!data) {
    return <div>Package not found</div>;
  }

  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <p className="text-gray-500 mt-2">{data.subtitle}</p>

      <img src={data.main_image_url} className="rounded-xl mt-6" />

      <p className="mt-6">{data.highlight}</p>
    </div>
  );
}
