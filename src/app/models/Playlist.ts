import mongoose, { Schema, model, models } from "mongoose";

const playlistSchema = new Schema(
  {
    _id: {
        type: String,
        required: true,
      },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
      default: "/logo.png"
    },
    songs: {
      type: [String],
      required: true,
      default: [],
    },
    tags: {
      type: [String],
      required: false,
      default: [],
    },
  },
);

const Playlist = models.Playlist || model("Playlist", playlistSchema);

export default Playlist;

