import ApiGateway from "../Shared/ApiGateway";
import { Book } from "./Books.type";

class BooksModel {
  httpGateway: ApiGateway;
  route: string;

  constructor() {
    this.httpGateway = new ApiGateway();
    this.route = "books";
  }

  getBooks = async (user: string): Promise<Book[]> => {
    const booksDto = await this.httpGateway.get(`/${this.route}/${user}`);
    return booksDto;
  };

  getPrivateBooks = async (user: string): Promise<Book[]> => {
    const privateBooksDto = await this.httpGateway.get(
      `/${this.route}/${user}/private`
    );
    return privateBooksDto;
  };

  addBook = async (
    user: string,
    { name, author }: { name: string; author: string }
  ) => {
    const bookAddDto = await this.httpGateway.post(`/${this.route}/${user}`, {
      name,
      author,
    });
    return bookAddDto && bookAddDto.status === "ok" ? true : false;
  };
}

const booksModel = new BooksModel();
export default booksModel;
