import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";

export default class Routing extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/game" Component={Game}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
