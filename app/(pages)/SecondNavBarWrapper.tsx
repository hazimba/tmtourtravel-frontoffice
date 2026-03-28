import { supabase } from "@/lib/supabaseClient";
import SecondNavBar from "./SecondNavBar";

export default async function NavbarWrapper() {
  const { data } = await supabase
    .from("packages")
    .select("uuid, title, country, type, main_image_url");

  return <SecondNavBar initialPackages={data || []} />;
}
