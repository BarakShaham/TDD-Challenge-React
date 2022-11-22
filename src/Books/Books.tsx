import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { Loader } from "../Loader";
import BooksController from "./Books.ctrl";
import { AddBookButton } from "./components/AddBookButton";

export interface Props {
  controller: BooksController;
}

const Books = observer(({ controller }: Props) => {
  useEffect(() => {
    async function load() {
      controller.init();
    }
    load();
  }, [controller]);

  const booksLoadingState = controller.booksLoadingStatus;

  if (booksLoadingState === "pending") return <Loader />;
  if (booksLoadingState === "error")
    return <div>{controller.loadBooksError}</div>;

  return (
    <div>
      {controller.booksList.map((book, i) => (
        <div key={i}>{book.description}</div>
      ))}
      <AddBookButton controller={controller} />
    </div>
  );
});

export default Books;
