import { Factory } from "fishery";
import { faker } from "@faker-js/faker";

import { Book } from "./Books.type";

const ownerId = "postnikov";
export const mockUser = "postnikov";

export const privateBooksFactory: Factory<Book[]> = Factory.define<Book[]>(
  () => [
    {
      id: Number(faker.database.mongodbObjectId()),
      name: faker.name.firstName(),
      author: faker.name.firstName(),
      ownerId,
      isPrivate: true,
    },
  ]
);

export const BooksFactory: Factory<Book[]> = Factory.define<Book[]>(() => [
  ...privateBooksFactory.build(),
  {
    id: Number(faker.database.mongodbObjectId()),
    name: faker.name.firstName(),
    author: faker.name.firstName(),
    ownerId,
  },
]);
