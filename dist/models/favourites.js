import mongoose from "mongoose";
const schema = mongoose.Schema;
const favourite = new schema({
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
}, {
    timestamps: true,
});
const favourites = mongoose.model("favourite", favourite);
export default favourites;
