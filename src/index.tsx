import React from "react";
import { createRoot } from "react-dom/client";
import { observer } from "mobx-react";

import "./styles.css";
import { HomePage } from "./HomePage";

function App() {
  return <HomePage />;
}

const ObservedApp = observer(App);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(<ObservedApp />);
