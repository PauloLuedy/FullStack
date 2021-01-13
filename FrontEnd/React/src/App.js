import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Use from "./components/user"
import Personagem from "./components/personagem"


class App extends Component {
  render() {
    return(
    <div>
      <Use/>
      <Personagem/>
    </div>
    );
  }
}

export default App;