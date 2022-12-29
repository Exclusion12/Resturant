import mongoose, { Decimal128 } from "mongoose";
const schema = mongoose.Schema;

export interface commentDocument extends mongoose.Document {
  rating: number;
  comment: string;
  author: string;
}
const commentschema = new schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export interface dishDocument extends mongoose.Document {
  name: string;
  description: string;
  category: string;
  image: string;
  label: string;
  price: number;
  featured: boolean;
  comments: commentDocument[];
  createdAt: Date;
  updatedAt: Date;
}
const dish = new schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    comments: { type: [commentschema], default: [] },
  },
  {
    timestamps: true,
  }
);

const dishes = mongoose.model<dishDocument>("dish", dish);
export default dishes;
