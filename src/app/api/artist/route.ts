import Artist from "@/app/models/Artist";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/libs/mongodb";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    const { vibes, genre, artist, popularity, imageUrl } = await request.json();

    // Connect to MongoDB
    await connectMongoDB();

    try {
        // Create a new artist recommendation
        const newArtist = await Artist.create({ vibes, genre, artist, popularity, imageUrl });
        return NextResponse.json({ message: "Recommendation added", artist: newArtist }, { status: 201 });
    } catch (error) {
        console.error("Error adding recommendation:", error);
        return NextResponse.json({ message: "Failed to add recommendation"}, { status: 500 });
    }
} 

export async function GET() {
  try {
    // Connect to the database
    await connectMongoDB();

    // Fetch all artists from the database
    const artists = await Artist.find().select("-_id -__v"); // Exclude any fields you don't want in the response

    if (!artists.length) {
      return NextResponse.json({ message: "No artists found." }, { status: 404 });
    }

    return NextResponse.json(artists, { status: 200 });
  } catch (error) {
    console.error("Error retrieving artists:", error);
    return NextResponse.json({ message: "Error retrieving artists." }, { status: 500 });
  }
}
