import { getAllPresets } from "core";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
   const presets = getAllPresets().map(p => {
      return {
         name: p.title,
         tags: p.tags,
      }
   })
   const data = JSON.stringify(presets);
   return NextResponse.json({ data });
}