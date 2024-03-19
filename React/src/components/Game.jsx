import React from "react";
import Tile from "./Tile";
import "./gamecontainer.css";
let tcount = 0;
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameMatrix: [],
      snakeList: [
        [1, 1],
        [1, 2],
        [2, 2],
      ],
      increment: [1, 0],
      gameOver: false,
      food: [10, 10],
      isFoodVisible: true,
    };
  }
  generateFood = (matrix) => {
    let x = parseInt(Math.random() * 18),
      y = parseInt(Math.random() * 18);
    let gameMatrix = [];
    matrix.map((row) => {
      let t = [];
      row.map((point) => {
        t.push(point);
      });
      gameMatrix.push(t);
    });
    gameMatrix[x][y] = 2;
    return [gameMatrix, [x, y]];
  };
  gameTick = () => {
    let body = [];
    this.state.snakeList.map((i) => body.push(i));
    tcount = (tcount + 1) % 40;
    let newInc = this.state.increment;
    let newX = this.state.snakeList[0][0] + newInc[0],
      newY = this.state.snakeList[0][1] + newInc[1];
    if (
      this.state.snakeList.filter((i) => {
        return i[0] == newX % 19 && i[1] == newY % 19;
      }).length ||
      newX < 0 ||
      newX > 18 ||
      newY < 0 ||
      newY > 18
    )
      this.setState({ gameOver: true });
    else {
      let gamematrix = this.state.gameMatrix;
      let food = this.state.food;
      let ifv = this.state.isFoodVisible;
      if (tcount == 39) {
        gamematrix = this.generateFood(gamematrix);
        food = gamematrix[1];
        gamematrix = gamematrix[0];
        ifv = true;
      }
      body.unshift([newX % 19, newY % 19]);
      if (!(body[0][0] == food[0] && body[0][1] == food[1])) body.pop();
      else ifv = false;
      this.setState({
        snakeList: body,
        food: food,
        isFoodVisible: ifv,
        gameMatrix: gamematrix,
      });
      console.log(this.state);
    }
  };
  componentDidMount() {
    this._isMounted = true;
    window.fnInterval = setInterval(this.gameTick, 100);
    const keyboard = document.querySelector("body");
    keyboard.addEventListener("keydown", (e) => {
      let newInc;
      if (e.key == "ArrowUp") newInc = [-1, 0];
      else if (e.key == "ArrowDown") newInc = [1, 0];
      else if (e.key == "ArrowLeft") newInc = [0, -1];
      else if (e.key == "ArrowRight") newInc = [0, 1];
      if (
        newInc[0] + this.state.increment[0] == 0 &&
        newInc[1] + this.state.increment[1] == 0
      )
        return;
      this.setState({ increment: newInc });
    });
  }
  static getDerivedStateFromProps(props, state) {
    let temp = [];
    for (let i = 0; i < 19; i++) {
      let temp2 = [];
      for (let j = 0; j < 19; j++) {
        temp2.push(0);
      }
      temp.push(temp2);
    }
    temp[state.food[0]][state.food[1]] = 2;
    state.snakeList.map((i) => {
      let x = i[0],
        y = i[1];
      temp[x][y] = 1;
    });
    return { gameMatrix: temp };
  }
  renderGameMatrix = () => {
    return this.state.gameMatrix.map((row) => {
      return row.map((t) => {
        if (t == 2) return <Tile color={"red"}></Tile>;
        return <Tile color={t ? "blue" : "lightgrey"}></Tile>;
      });
    });
  };
  restartGame = () => {
    this.setState({
      gameOver: false,
      snakeList: [
        [1, 1],
        [1, 2],
        [2, 2],
      ],
      increment: [1, 0],
      food: [10,10]
    });
  };
  render() {
    return (
      <div className="gameContainer">
        {" "}
        {this.state.gameOver ? (
          <>
            {" "}
            <p>"Game Over"</p>{" "}
            <button onClick={this.restartGame}>Restart</button>{" "}
          </>
        ) : (
          this.renderGameMatrix()
        )}{" "}
        <h1>{this.state.snakeList.length - 3}</h1>{" "}
      </div>
    );
  }
}
