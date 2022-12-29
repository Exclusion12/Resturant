import mongoose from "mongoose";
const schema = mongoose.Schema;

export interface favouriteDocument extends mongoose.Document {
  user: string;
  dishes: string[];
  createdAt: Date;
  updatedAt: Date;
}

const favourite = new schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    dishes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dish",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const favourites = mongoose.model<favouriteDocument>("favourite", favourite);
export default favourites;
