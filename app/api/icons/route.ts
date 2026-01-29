import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase.storage.from("icon-logo").list("");
    if (error) throw error;

    const logos = await Promise.all(
      data.map(async (file) => {
        const { data: signedUrlData } = await supabase.storage
          .from("icon-logo")
          .createSignedUrl(file.name, 60 * 60 * 24 * 365);
        return {
          name: file.name,
          url: signedUrlData?.signedUrl,
        };
      })
    );

    return NextResponse.json(logos);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch logos" },
      { status: 500 }
    );
  }
}
