import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase.from("images-slider").select("*");
    const images = data || [];
    if (error) throw error;

    return NextResponse.json(images);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch images" },
      { status: 500 }
    );
  }
}
