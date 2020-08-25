import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/Main";

function App() {
    return (
        <Router>
            <Route component={Main} exact path="/" />
        </Router>
    );
}

export default App;
