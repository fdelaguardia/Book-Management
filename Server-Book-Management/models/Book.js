const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
    {
        title: String,
        author: String,
        publicationYear: Number,
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