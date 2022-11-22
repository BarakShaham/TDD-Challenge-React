import BooksController from "./Books.ctrl";
import { BooksFactory, privateBooksFactory } from "./Books.mock";
import booksModel from "./Books.model";

let booksController: BooksController;

beforeEach(async () => {
  booksController = new BooksController();

  booksModel.getBooks = jest.fn().mockImplementation(() => {
    return Promise.resolve(BooksFactory.build());
  });
  booksModel.getPrivateBooks = jest.fn().mockImplementation(() => {
    return Promise.resolve(privateBooksFactory.build());
  });
  booksModel.addBook = jest.fn().mockImplementation(() => {
    return Promise.resolve(true);
  });
  // booksModel.addBook = jest.fn(
  //   (user: string, { author, name }: { author: string; name: string }) => {
  //     const hasMissingParam = !author || !name || !user;
  //     if (hasMissingParam) return Promise.resolve(false);
  //     return Promise.resolve(true);
  //   }
  // );
});

describe("Books actions", () => {
  it("Should fetch all books by default", async () => {
    await booksController.init();
    expect(booksController.booksList.length).toBe(2);
    expect(booksController.booksLoadingStatus).toBe("done");
  });
  it("Should fail to fetch all books", async () => {
    booksModel.getBooks = jest.fn().mockImplementation(() => {
      return Promise.reject();
    });
    await booksController.init();
    expect(booksController.booksList.length).toBe(0);
    expect(booksController.booksLoadingStatus).toBe("error");
  });
  it("Should fetch only private books", async () => {
    const booksController = new BooksController({ isPrivateBooks: true });
    await booksController.init();
    expect(booksController.booksList.length).toBe(1);
  });

  it("Should successfuly add a book ", async () => {
    const isBookAdded = await booksController.addBook({
      author: "author",
      name: "name",
    });
    expect(isBookAdded).toBeTruthy();
    expect(booksController.addBookLoadingStatus).toBe("done");
  });

  it("Should fail to add a book", async () => {
    booksModel.addBook = jest.fn().mockImplementation(() => {
      return Promise.reject();
    });
    const isBookAdded = await booksController.addBook({
      author: "author",
      name: "",
    });
    expect(isBookAdded).toBeFalsy();
    expect(booksController.addBookLoadingStatus).toBe("error");
  });
});

describe("Books computeds", () => {
  it("Should return a bookList", async () => {
    await booksController.init();
    expect(booksController.booksList.length).toBe(2);
  });
});
