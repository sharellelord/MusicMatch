import { connectMongoDB } from "@/app/libs/mongodb";
import Artist from "@/app/models/Artist";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    // Connect to the database
    await connectMongoDB();

    // Attempt to delete the item
    const deletedItem = await Artist.findByIdAndDelete(id);
    if (!deletedItem) {
        return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params; // Extract the ID from the route parameters
  
    // Connect to MongoDB
    await connectMongoDB();
  
    try {
      // Fetch the artist by ID
      const artist = await Artist.findById(id);
      if (!artist) {
        return NextResponse.json({ message: "Artist not found" }, { status: 404 });
      }
      return NextResponse.json(artist, { status: 200 });
    } catch (error) {
      console.error("Error fetching artist by ID:", error);
      return NextResponse.json({ message: "Failed to fetch artist" }, { status: 500 });
    }
  }
