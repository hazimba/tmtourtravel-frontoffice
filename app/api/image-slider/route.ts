import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data: imagesSlider } = await supabase
    .from("images-slider")
    .select("*");

  return new Response(JSON.stringify(imagesSlider), {
    headers: { "Content-Type": "application/json" },
  });
}
