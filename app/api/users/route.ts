import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  try {
    const { data, error } = await supabase.from("profiles").select("*");

    if (error) {
      console.error("Error fetching users:", error.message);
      return NextResponse.json(
        { error: "Error loading users." },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
