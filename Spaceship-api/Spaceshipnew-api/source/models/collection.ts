import mongoose, { Schema } from "mongoose";
import collection from "../interfaces/collection";

const collectionSchema: Schema = new Schema(
  {
    id: {
      type: String,
    },
    serial: {
      type: String,
    },
    uri: {
      type: String,
    },
    name: {
      type: String,
    },
    price: {
      type: String,
    },
    owner: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    hasSelled: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    collection: "collectionNFT"
  }
);

export default mongoose.model<collection>("collectionNFT", collectionSchema);
