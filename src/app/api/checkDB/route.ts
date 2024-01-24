import { connectToDatabase } from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    const { db } = await connectToDatabase();
    return new NextResponse("connected", db);
}