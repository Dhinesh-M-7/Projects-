import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <Link to="/game">Play game</Link>
      </div>
    );
  }
}
