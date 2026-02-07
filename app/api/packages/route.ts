import { NextResponse as Response } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title");
  const country = searchParams.get("country");
  const type = searchParams.get("type");

  let query = supabase.from("packages").select("*");

  if (title) {
    query = query.ilike("title", `%${title}%`);
  }
  if (country) {
    query = query.ilike("country", `%${country}%`);
  }
  if (type) {
    query = query.eq("type", type);
  }

  try {
    const { data, error } = await query;

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
