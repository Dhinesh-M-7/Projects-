import React from "react";

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        aspectRatio: "1",
        float: "left",
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      style: { backgroundColor: props.color, aspectRatio: "1", float: "left" },
    };
  }

  render() {
    return <div className="gameTile" style={this.state.style}></div>;
  }
}
