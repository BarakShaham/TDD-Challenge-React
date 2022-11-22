import { observer } from "mobx-react";
import React, { useState } from "react";

import { Books } from "../Books";
import BooksController from "../Books/Books.ctrl";
import { Switch } from "../Switch";
import SwitchController from "../Switch/Switch.ctrl";
import { ButtonNames } from "./HomePage.type";

const HomePage = observer(() => {
  const [switchController] = useState(
    new SwitchController({
      isOn: false,
      leftBtnName: ButtonNames.LEFT,
      rightBtnName: ButtonNames.RIGHT,
    })
  );

  return (
    <>
      <Switch controller={switchController} />
      <Books
        controller={
          new BooksController({ isPrivateBooks: switchController.isSwitchOn })
        }
      />
    </>
  );
});
export default HomePage;
