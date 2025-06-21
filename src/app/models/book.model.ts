import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

interface BookDocument extends IBook, Document {
  updateAvailability: () => void;
}

const bookSchema = new Schema<BookDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "This book is unavailable, remaining 0 books"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.methods.updateAvailability = function () {
  if (this.copies > 0) {
    this.available = true;
  } else {
    this.available = false;
  }
};

export const Book = model<BookDocument>("Book", bookSchema);
