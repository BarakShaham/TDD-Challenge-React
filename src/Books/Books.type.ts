export interface Book {
  id: number;
  ownerId: string;
  name: string;
  author: string;
  isPrivate?: boolean;
}

export interface BookList {
  description: string;
}

export enum BookErrors {
  LOAD_BOOKS = "Unable to load a book",
  ADD_BOOK = "Unable to add a book",
}
