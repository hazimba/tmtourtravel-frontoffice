import { NextResponse as Response } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase.from("packages").select("*");

    if (error) {
      console.error("Error fetching packages:", error.message);
      return Response.json(
        { error: "Error loading packages." },
        { status: 500 }
      );
    }

    return Response.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
