import mongoose from "mongoose";
const schema = mongoose.Schema;
const promotion = new schema({
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
}, {
    timestamps: true,
});
const promotions = mongoose.model("promotion", promotion);
export default promotions;
