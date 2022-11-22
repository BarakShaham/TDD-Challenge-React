import { makeAutoObservable, runInAction } from "mobx";

import { LoadingState } from "../Shared/types";
import { mockUser } from "./Books.mock";
import booksModel from "./Books.model";
import { BookErrors, BookList, Book } from "./Books.type";

export default class BooksController {
  private books: Book[] = [];
  private isPrivateBooks;
  private booksLoadingState: LoadingState = "pending";
  private addBookState: LoadingState = "done";

  constructor(data?: { isPrivateBooks: boolean }) {
    this.isPrivateBooks = data?.isPrivateBooks || false;
    makeAutoObservable(this);
  }

  async init() {
    this.getBooks();
  }

  async getBooks() {
    this.booksLoadingState = "pending";
    try {
      const books = this.isPrivateBooks
        ? await booksModel.getPrivateBooks(mockUser)
        : await booksModel.getBooks(mockUser);
      runInAction(() => {
        this.books = books;
        this.booksLoadingState = "done";
      });
    } catch (e) {
      runInAction(() => {
        this.booksLoadingState = "error";
      });
    }
  }

  async addBook({ name, author }: { name: string; author: string }) {
    this.addBookState = "pending";
    let isBookAdded = false;
    try {
      isBookAdded = await booksModel.addBook(mockUser, {
        name,
        author,
      });
      runInAction(async () => {
        await this.init();
        this.addBookState = "done";
      });
    } catch (e) {
      runInAction(() => {
        this.addBookState = "error";
      });
    } finally {
      return isBookAdded;
    }
  }

  get booksLoadingStatus() {
    return this.booksLoadingState;
  }
  get addBookLoadingStatus() {
    return this.addBookState;
  }

  get addBookError() {
    return BookErrors.ADD_BOOK;
  }
  get loadBooksError() {
    return BookErrors.LOAD_BOOKS;
  }

  get booksList(): BookList[] {
    return this.books.map((book) => ({
      description: `${book.author}: ${book.name}`,
    }));
  }
}
