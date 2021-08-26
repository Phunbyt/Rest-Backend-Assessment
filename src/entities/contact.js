import mongoose, { Schema } from "mongoose";

export const ContactSchema = new Schema(
  {
    //  define the necessary fields for your contact list

    firstname: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    gender: { type: String, enum: ["male", "female"], required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { collection: "contacts" }
);

ContactSchema.index({}, { sparse: true });

export default mongoose.model("Contact", ContactSchema);
