import mongoose from "mongoose";
const schema = mongoose.Schema;
const leader = new schema({
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
}, {
    timestamps: true,
});
const leaders = mongoose.model("leader", leader);
export default leaders;
