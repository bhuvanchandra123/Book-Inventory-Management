const { Timestamp } = require("bson");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: String,
        publishedYear: Number,
        copiesAvailable: Number
    },
    { Timestamp: true }
);

const Books = mongoose.model("Book", bookSchema);

module.exports = {Books};