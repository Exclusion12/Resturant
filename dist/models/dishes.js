import mongoose from "mongoose";
const schema = mongoose.Schema;
const commentschema = new schema({
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
}, {
    timestamps: true,
});
const dish = new schema({
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
}, {
    timestamps: true,
});
const dishes = mongoose.model("dish", dish);
export default dishes;
