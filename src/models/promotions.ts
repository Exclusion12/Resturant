import mongoose, { Decimal128 } from "mongoose";
const schema = mongoose.Schema;

export interface promotionDocument extends mongoose.Document {
  name: string;
  image: string;
  label: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const promotion = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
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

const promotions = mongoose.model<promotionDocument>("promotion", promotion);
export default promotions;
