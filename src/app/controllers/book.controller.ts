import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

bookRoutes.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const book = await Book.create(body);

      res.status(201).json({
        success: true,
        message: "Book created successfully.",
        data: book,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

bookRoutes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookGenre = req.query.filter as string;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sort = (req.query.sort as string) || "asc";
    const bookLimit = parseInt(req.query.limit as string) || 10;

    let books = [];
    if (bookGenre) {
      books = await Book.find({ genre: bookGenre })
        .sort({ [sortBy]: sort === "asc" ? 1 : -1 })
        .limit(bookLimit);
    } else {
      books = await Book.find();
    }
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully.",
      data: books,
    });
  } catch (error: any) {
    next(error);
  }
});

bookRoutes.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;
      const book = await Book.findById(bookId);

      res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    } catch (error: any) {
      next(error);
    }
  }
);
bookRoutes.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;
      const updateBook = req.body;
      const book = await Book.findByIdAndUpdate(bookId, updateBook, {
        new: true,
      });

      res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    } catch (error: any) {
      next(error);
    }
  }
);
bookRoutes.delete(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;
      const book = await Book.findByIdAndDelete(bookId);

      res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } catch (error: any) {
      next(error);
    }
  }
);
