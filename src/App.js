import React from "react";
import ReactDOM from "react-dom";
import Clock from "./components/Clock";

const App = () => {
    return (
        <>
            <h1>Hi Mom</h1>
            <Clock></Clock>
        </>
        
    );
};

ReactDOM.render(<App />, document.getElementById("root"));