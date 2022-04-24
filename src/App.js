import React from "react";
import ReactDOM from "react-dom";
import Clock from "./components/Clock";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header></Header>
      <Clock></Clock>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
