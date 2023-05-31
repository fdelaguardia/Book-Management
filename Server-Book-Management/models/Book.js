const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        author: {
            type: String,
            required: true,
        },
        publicationYear: {
            type: Number,
            required: true,
        },
        usersWhoFavorited: [{ type: Schema.Types.ObjectId, ref: "User" }],
        usersCurrentlyReading: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timeseries: true,
        timestamps: true,
    }
);

const Book = model("Book", bookSchema);

module.exports = Book;