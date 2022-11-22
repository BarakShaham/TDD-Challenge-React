import React from "react";
import { observer } from "mobx-react";

import { Loader } from "../../Loader";
import { Props } from "../Books";

export const AddBookButton = observer(({ controller }: Props) => {
  const buttonLoadingState = controller.addBookLoadingStatus;

  if (buttonLoadingState === "pending") return <Loader />;
  if (buttonLoadingState === "error")
    return <div>{controller.addBookError}</div>;

  return (
    <button
      onClick={() => controller.addBook({ name: "name", author: "author" })}
    >
      Add
    </button>
  );
});
