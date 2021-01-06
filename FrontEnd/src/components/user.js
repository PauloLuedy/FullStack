import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import s from "../services/tutorial.service";

class User extends Component {

  state = {
    api: []
  }

  componentDidMount() {
    s.getAll()
      .then(res => {
        console.log('res',res);
        const api = res.data;
        this.setState({ api });
      })
  }


  render() {
    return (
      <ul>
        { this.state.api.map(apiaux => 
        <div> 
        <li>{apiaux.poder}</li>
        </div>
        )}
      </ul>
    )
  }
}

export default User;