import mongoose from "mongoose";
const schema = mongoose.Schema;

export interface leaderDocument extends mongoose.Document {
  name: string;
  image: string;
  designation: string;
  abbr: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
const leader = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    abbr: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const leaders = mongoose.model<leaderDocument>("leader", leader);
export default leaders;
