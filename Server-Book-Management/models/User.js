const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        favoriteBooks: [{ type: Schema.Types.ObjectId, ref: "Book" }],
        currentlyReading: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    },
    {
        timeseries: true,
        timestamps: true,
    }
);

const User = model("User", userSchema);

module.exports = User;