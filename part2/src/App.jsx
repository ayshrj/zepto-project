import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import ComposeEmail from "./ComposeEmail";
import AutoCompleteChips from "./AutoCompleteChips";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AutoCompleteChips />
      {/* <ComposeEmail /> */}
    </>
  );
}

export default App;
