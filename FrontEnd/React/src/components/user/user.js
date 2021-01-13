import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TutorialDataService from "../services/tutorial.service";

class User extends Component {

  state = {
    herois: []
  }

  componentDidMount() {
    TutorialDataService.getAll()
      .then(res => {
        const herois = res.data;
        this.setState({ herois });
      })
  }

  render() {
    return (
      <ul>
        { this.state.herois.map(herois => 
        <div> 
          <tr>
            <td> {herois.nome} </td>
            <td> {herois.poder} </td>
          </tr>
        </div>
        )}
      </ul>
    )
  }
}

export default User;